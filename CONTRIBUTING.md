![GitHub repo size](https://img.shields.io/github/repo-size/4uffin/reallybig)

# **Contributing to the Big Repo Project**

> **An experiment in pushing GitHub's limits, one massive file at a time.**

First off, thank you for considering contributing! This project has a simple, yet profound, goal: to become one of the largest repositories on GitHub in terms of file size. Your contributions are the lifeblood of this beautifully absurd endeavor.

## **The Mission**

To collectively add as much data as possible to this single repository. I'm testing the limits, one massive commit at a time.

## **Current Repository Stats**

- 📊 **Current Size:** ~3GB and growing!
- 🎯 **Goal:** Push the boundaries of what's possible on GitHub
- 📁 **Files Added:** Various large datasets, media files, and generated content

## **How to Contribute**

There are two main ways to contribute: using the command line (recommended for very large files) or using the GitHub website.

### **Using the Command Line (Recommended)**

Adding weight to the project is easy. Just follow these steps:

1. **Fork the repository** to your own GitHub account.
2. **Clone your fork** to your local machine.
3. **Add Your File(s):**
   * Create a new folder (ex. yourusername/).
   * Place your large file(s) inside your new folder(s).

The structure should look something like this:

```
├── username/
│   ├── images/
│   │   ├── image.png
│   │   └── ...(another image.png)
│   └── audio/
│       └── audio.wav
│       └── ...(another audio.wav)
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

4. **Commit and Push:**
   * Stage your new files: `git add .`
   * Commit them with a descriptive message: `git commit -m "feat: Add 500MB of high-res space images"`
   * Push to your fork: `git push origin main`
5. **Open a Pull Request:** Head back to the original repository on GitHub and open a pull request from your fork. I'll review it and merge it as quickly as possible.

### **Using the GitHub Website (No Command Line)**

If you're not comfortable with the command line, you can contribute directly from the GitHub website. Please note this method can be slow or may fail for extremely large files (over 1-2 GB).

1. **Navigate to the data/ directory** in the main repository.
2. Click **Add file > Create new file**. This will automatically create a fork of the project for you.
3. **Create your folder:** In the file name box, type the name for your new folder followed by a forward slash (/). For example: your-username_files/. The slash is crucial!
4. **Create a placeholder file:** After the slash, type .gitkeep as the filename. The full path should look like data/your-username_files/.gitkeep. This temporary file is just to create the folder.
5. Scroll down and click **"Commit new file"**.
6. **Navigate to your new folder:** In *your forked repository*, go into the data/ directory and click on the folder you just created.
7. **Upload your large file:** Inside your folder, click Add file > Upload files. Drag and drop your large file(s) here.
8. Wait for the upload to complete, then scroll down and click **"Commit changes"**.
9. Finally, go back to the main repository page. You should see a prompt to **"Compare & pull request"**. Click it to open and submit your pull request!

## **What to Contribute (The Heavier, The Better)**

I'm not picky about content, but I am **very** picky about size. Here are some ideas for great contributions:

### **Examples of What I've Already Added:**
* Large datasets (CSV files with millions of rows)
* High-resolution image collections
* Uncompressed audio files
* Generated binary data files
* Archive collections of public domain content

### **Great Contribution Ideas:**
* **Large, high-resolution images or videos** (that you have the rights to, of course!).
* **Uncompressed audio files** (.wav, .aiff, .flac).
* **Public datasets** (CSVs, JSON files with millions of entries).
* **Generated binary files.** Feel free to write a script to generate a file filled with gigabytes of random data.
* **Archived projects or assets** (public domain or open source).
* **Large text files** (logs, documentation, books from Project Gutenberg).
* **Scientific data** (weather data, astronomical observations, etc.).

### **File Size Guidelines:**
* **Sweet Spot:** 50MB - 99MB per file (GitHub's single file limit is 100MB)
* **Multiple Files:** Feel free to split larger datasets across multiple 99MB files
* **Minimum:** If your file is less than **25MB**, consider combining it with other content

### **Compression Guidance:**
* **Prefer uncompressed formats** when possible (they're usually larger!)
* **Raw formats are great:** .wav instead of .mp3, .bmp instead of .jpg
* **If you must compress:** Use minimal compression settings

## **What NOT to Contribute**

To keep this project fun and safe for everyone, please **DO NOT** contribute the following:

* **Anything illegal, offensive, or malicious.** (No malware, viruses, etc.) This is a zero-tolerance rule.
* **Copyrighted material** you do not have permission to distribute.
* **Sensitive or personal information** (API keys, passwords, personal photos, documents).
* **A massive number of tiny files.** This can make cloning difficult and doesn't add size as efficiently as single large files.
* **Anything that violates GitHub's Terms of Service.**

## **Troubleshooting Large File Issues**

### **Common Problems and Solutions:**

**"File is over 100MB" Warning:**
* This is just a warning, not an error. Your file will still be pushed.
* Consider splitting files larger than 99MB into multiple parts if needed.

**Push Timeouts or Failures:**
* Try pushing during off-peak hours (GitHub handles large uploads better with less traffic).
* Use `git config http.postBuffer 524288000` to increase the upload buffer.
* If it still fails, try splitting your contribution into smaller commits.

**Slow Upload Speeds:**
* Large files take time. A 100MB file might take 10-30 minutes depending on your connection.
* Don't cancel the upload - let it finish!

**"Repository too large" Errors:**
* If you encounter this, the repo might be hitting GitHub's limits. Open an issue and I'll investigate.

**Command Line Issues:**
* Make sure you have the latest version of Git installed.
* If `git add .` is slow, try adding specific files: `git add data/your-folder/your-file.dat`

## **A Note on Git LFS**

I am intentionally **not** using Git Large File Storage (LFS). The goal is to bloat the core repository itself. This makes the challenge more interesting! Be aware that files over 100MB will generate a warning from Git, but they can still be pushed (as long as they're under GitHub's hard limits).

## **Questions or Need Help?**

If you run into issues or have questions about contributing:
* **Open an Issue** on the repository - I monitor these regularly
* **Check existing Issues** - someone might have already solved your problem

Let's make this repository legendarily large together!
