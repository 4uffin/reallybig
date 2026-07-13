const formatBytes = bytes => {
  if (bytes === 0) return '0 B';
  const units = ['B','KB','MB','GB','TB'];
  let index = Math.floor(Math.log(bytes) / Math.log(1024));
  if (index < 0) index = 0;
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(1)} ${units[index]}`;
};

const formatCount = n => n.toLocaleString('en-US');

const countFileNodes = node => {
  if (node.type === 'file') return 1;
  return (node.children || []).reduce((sum, child) => sum + countFileNodes(child), 0);
};

const countDirs = node => {
  if (node.type !== 'dir') return 0;
  return 1 + (node.children || []).reduce((sum, child) => sum + countDirs(child), 0);
};

const createSummary = node => {
  const files = countFileNodes(node);
  const directories = countDirs(node) - 1;
  return {
    totalFiles: files,
    totalDirectories: Math.max(0, directories),
    totalBytes: node.size || 0,
  };
};

const createNodeElement = (node, parentSize) => {
  const details = document.createElement('details');
  details.className = 'node';
  if (node.type === 'dir') details.open = true;

  const summary = document.createElement('summary');
  const title = document.createElement('strong');
  title.textContent = node.name;
  summary.appendChild(title);

  const meta = document.createElement('div');
  meta.className = 'meta';

  const size = document.createElement('span');
  size.textContent = `Size: ${formatBytes(node.size || 0)}`;
  meta.appendChild(size);

  if (node.type === 'dir') {
    const count = document.createElement('span');
    count.textContent = `Files: ${formatCount(node.fileCount || countFileNodes(node))}`;
    meta.appendChild(count);
  }

  const percent = document.createElement('span');
  if (parentSize && node.size) {
    const ratio = Math.max(0, Math.min(100, (node.size / parentSize) * 100));
    percent.textContent = `Share: ${ratio.toFixed(1)}%`;
  } else {
    percent.textContent = node.type === 'dir' ? 'Root content' : '';
  }
  meta.appendChild(percent);
  summary.appendChild(meta);
  details.appendChild(summary);

  if (node.type === 'dir' && node.children && node.children.length) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.width = `${Math.max(10, Math.min(100, (node.size / parentSize) * 100 || 100))}%`;
    details.appendChild(bar);

    node.children.forEach(child => {
      const childElement = createNodeElement(child, node.size || parentSize);
      details.appendChild(childElement);
    });
  }

  return details;
};

const buildTopList = (root, limit = 5) => {
  const items = [...(root.children || [])].filter(item => item.type === 'dir');
  items.sort((a,b) => (b.size||0)-(a.size||0));
  return items.slice(0, limit).map((item, index) => {
    const li = document.createElement('li');
    const itemText = document.createElement('div');
    itemText.className = 'item';
    const name = document.createElement('strong');
    name.textContent = `${index + 1}. ${item.name}`;
    const details = document.createElement('small');
    details.textContent = `${formatCount(item.fileCount || countFileNodes(item))} files • ${formatBytes(item.size || 0)}`;
    itemText.appendChild(name);
    itemText.appendChild(details);
    const bar = document.createElement('div');
    bar.className = 'bar';
    const percentage = root.size ? (item.size / root.size) * 100 : 0;
    bar.style.width = `${Math.max(10, Math.min(100, percentage || 100))}%`;
    li.appendChild(itemText);
    li.appendChild(bar);
    return li;
  });
};

const render = data => {
  const statsNode = document.getElementById('stats');
  const treeNode = document.getElementById('tree');
  const topNode = document.getElementById('top-list');

  const summary = createSummary(data);

  const cards = [
    {label:'Total files', value:formatCount(summary.totalFiles)},
    {label:'Directories', value:formatCount(summary.totalDirectories)},
    {label:'Total size', value:formatBytes(summary.totalBytes)},
    {label:'Generated', value:data.generated || 'unknown'}
  ];

  cards.forEach(card => {
    const article = document.createElement('article');
    article.className = 'card';
    const label = document.createElement('strong');
    label.textContent = card.label;
    const value = document.createElement('span');
    value.textContent = card.value;
    article.appendChild(label);
    article.appendChild(value);
    statsNode.appendChild(article);
  });

  const treeRoot = createNodeElement(data, data.size);
  treeNode.appendChild(treeRoot);

  const topItems = buildTopList(data, 5);
  topItems.forEach(item => topNode.appendChild(item));
};

fetch('data.json')
  .then(response => response.json())
  .then(render)
  .catch(error => {
    const root = document.querySelector('.page');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = `Unable to load repo data: ${error.message}`;
    errorMessage.style.color = '#fca5a5';
    root.appendChild(errorMessage);
  });
