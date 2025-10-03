import requests
import os
import yaml
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# List of common image extensions to filter for high-confidence wallpaper links
IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.webp') 

# --- Configuration Loading ---
def load_config(config_file='config.yaml'):
    """Loads configuration from the YAML file."""
    try:
        with open(config_file, 'r') as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        print(f"Error: Configuration file '{config_file}' not found.")
        return None

# --- Scraping Logic ---
def scrape_images(config):
    """Scrapes images from the target URL and saves them with improved parsing."""
    if not config:
        return

    url = config['scraper']['target_url']
    repo_folder = config['scraper']['repository_folder']
    
    # Ensure the repository folder exists
    os.makedirs(repo_folder, exist_ok=True)
    print(f"Attempting to scrape: {url}")
    
    try:
        # Use a common user-agent
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        # Raise an HTTPError for bad responses (4xx or 5xx)
        response.raise_for_status() 
    except requests.exceptions.RequestException as e:
        # This will cause the script to fail, but the Action will continue due to 'continue-on-error: true'
        print(f"FATAL: Failed to fetch the URL. Stopping script. Error: {e}")
        # Raising the exception here ensures GitHub Actions registers the failure.
        raise 

    soup = BeautifulSoup(response.text, 'html.parser')
    # Use a set to automatically handle duplicates
    unique_image_urls = set() 

    # --- Robust Image URL Extraction ---
    
    # 1. Search for all <img> tags broadly
    for tag in soup.find_all('img'):
        src = tag.get('src')
        if src:
            unique_image_urls.add(urljoin(url, src))

    # 2. Search for <a> tags linking directly to image files (common for downloads)
    for tag in soup.find_all('a', href=True):
        href = tag['href']
        full_url = urljoin(url, href)
        path = urlparse(full_url).path
        
        # Check if the link path ends with a known image extension
        if path.lower().endswith(IMAGE_EXTENSIONS):
            unique_image_urls.add(full_url)
    
    # --- Filter and Download Logic ---
    
    if not unique_image_urls:
        print("Warning: No viable image URLs found after parsing.")
        return

    print(f"Found {len(unique_image_urls)} unique potential images. Starting download...")
    
    downloaded_count = 0
    # Convert set to list for iteration
    for img_url in list(unique_image_urls): 
        
        # Simple heuristics to skip common non-wallpaper images (logos, avatars, thumbnails)
        url_lower = img_url.lower()
        if any(keyword in url_lower for keyword in ['logo', 'thumb', 'avatar', 'icon']):
            continue

        try:
            # Request the image data
            img_response = requests.get(img_url, stream=True, headers=headers, timeout=15)
            img_response.raise_for_status()
            
            # Further check: Skip if Content-Type isn't a known image type
            content_type = img_response.headers.get('Content-Type', '').lower()
            if not content_type.startswith('image/'):
                 continue

            # Create a unique filename
            url_path = urlparse(img_url).path
            base_filename = os.path.basename(url_path).split('?')[0] # Remove query string
            
            # Use content type to guess the extension, falling back to 'jpg'
            extension = content_type.split('/')[-1] if '/' in content_type else 'jpg'
            
            filename = os.path.join(repo_folder, f"scraped_{base_filename}_{downloaded_count}.{extension}")
            
            with open(filename, 'wb') as f:
                for chunk in img_response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Successfully downloaded: {filename}")
            downloaded_count += 1
                
        except requests.exceptions.RequestException as e:
            print(f"Could not download image {img_url}: {e}")
        except Exception as e:
            print(f"An unexpected error occurred processing {img_url}: {e}")


if __name__ == '__main__':
    try:
        config_data = load_config()
        if config_data:
            scrape_images(config_data)
        print("\nScraping process complete.")
    except Exception as e:
        # Allow the script to exit gracefully even if a major error occurs
        # The 'raise' inside scrape_images is what signals the GitHub Action step failure.
        print(f"\nScript halted due to a critical error: {e}")
