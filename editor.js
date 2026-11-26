'use strict';

const portfolio = window.PortfolioProjects;
const $ = id => document.getElementById(id);
const draftKey = 'sol-portfolio-studio-v1';
const repo = 'solstirling/solstirling.com';
const snapshot = value => JSON.stringify(value);
let base;
let projects;
let uploads = {};
let activeId;
let previewing = false;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function button(text, action, label) {
  const node = element('button', text);
  node.type = 'button';
  if (label) node.setAttribute('aria-label', label);
  node.addEventListener('click', action);
  return node;
}

function field(caption, value, update, kind = 'text') {
  const label = element('label', undefined, 'field');
  const input = element(kind === 'textarea' ? 'textarea' : 'input');
  if (kind !== 'textarea') input.type = kind;
  else input.rows = 2;
  input.value = value ?? '';
  input.addEventListener('input', () => update(input.value));
  label.append(element('span', caption), input);
  return label;
}

function normalizeAsset(value) {
  const src = value?.trim();
  return src && portfolio.sanitizeUrl(src) !== '#' && !/^mailto:/i.test(src)
    ? portfolio.sanitizeUrl(src) : '';
}

function media(path, alt, type = 'image') {
  const src = uploads[path] || normalizeAsset(path);
  if (!src) return null;
  const node = element(type === 'video' ? 'video' : 'img');
  node.src = src;
  if (type === 'video') node.controls = true;
  else node.alt = alt || '';
  return node;
}

function selected() {
  return projects.find(project => project.id === activeId);
}

function draft() {
  return { base, projects, uploads };
}

function saveDraft(message = 'Draft saved on this browser') {
  try {
    localStorage.setItem(draftKey, snapshot(draft()));
    $('status').textContent = message;
  } catch {
    $('status').textContent = 'Browser storage is full. Download your draft before leaving.';
  }
}

function setProperty(project, key, value) {
  project[key] = value;
  saveDraft();
}

function parseBlock(source) {
  const image = source.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (image) return { type: 'image', alt: image[1], src: image[2] };
  const heading = source.match(/^(#{1,3}) (.+)$/);
  if (heading) return { type: 'heading', level: heading[1].length, text: heading[2] };
  if (/^- /m.test(source) && source.split('\n').every(line => /^- /.test(line))) {
    return { type: 'list', text: source.split('\n').map(line => line.slice(2)).join('\n') };
  }
  return { type: 'text', text: source };
}

function serializeBlock(block) {
  if (block.type === 'heading') return '#'.repeat(block.level || 2) + ' ' + block.text.replace(/\n+/g, ' ');
  if (block.type === 'list') return block.text.split('\n').filter(line => line.trim()).map(line => '- ' + line).join('\n');
  if (block.type === 'image') {
    const alt = block.alt.replace(/[\]\n]/g, ' ');
    const src = normalizeAsset(block.src).replaceAll(')', '%29');
    return src ? '![' + alt + '](' + src + ')' : '';
  }
  return block.text;
}

function uploadControl(caption, onUpload) {
  const label = element('label', undefined, 'field');
  const picker = element('input');
  picker.type = 'file';
  picker.accept = 'image/png,image/jpeg,image/webp';
  picker.addEventListener('change', () => {
    const file = picker.files[0];
    if (!file) return;
    const extensions = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
    if (!extensions[file.type] || file.size > 7_000_000) {
      $('status').textContent = 'Choose a PNG, JPEG, or WebP image under 7 MB.';
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => { $('status').textContent = 'This image could not be read.'; };
    reader.onload = async () => {
      // Re-encode uploads to remove embedded metadata and fit browser draft storage.
      const img = element('img');
      img.src = reader.result;
      try {
        await img.decode();
        const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
        const canvas = element('canvas');
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        const src = canvas.toDataURL('image/webp', .86);
        const ext = src.startsWith('data:image/webp;') ? 'webp' : 'png';
        const path = 'images/studio-' + crypto.randomUUID() + '.' + ext;
        uploads[path] = src;
        onUpload(path);
        saveDraft();
      } catch {
        $('status').textContent = 'This image could not be opened.';
      }
    };
    reader.readAsDataURL(file);
  });
  label.append(element('span', caption), picker);
  return label;
}

function renderProjectList() {
  $('projects').replaceChildren(...portfolio.sortProjects(projects).map(project => {
    const choose = button(project.title || 'Untitled project', () => {
      activeId = project.id;
      previewing = false;
      render();
      $('projects').querySelector('[aria-current=true]')?.focus();
    });
    choose.setAttribute('aria-current', String(project.id === activeId));
    return choose;
  }));
}

function renderEditor(project) {
  const view = $('edit');
  const title = field('Project title', project.title, value => {
    setProperty(project, 'title', value);
    $('projects').querySelector('[aria-current=true]').textContent = value || 'Untitled project';
  });
  title.lastElementChild.classList.add('title-input');
  const cover = media(project.mediaSrc, project.mediaAlt, project.mediaType);
  if (cover) cover.classList.add('cover');
  const coverDetails = element('details');
  coverDetails.append(element('summary', 'Cover and project settings'));
  const props = element('div', undefined, 'properties');
  const properties = [
    ['Cover image or video path', 'mediaSrc'], ['Cover description', 'mediaAlt'],
    ['Status', 'status'], ['Project date', 'date', 'date'], ['Updated date', 'updatedDate', 'date'],
    ['External project URL', 'externalLink'], ['Homepage position', 'sortOrder', 'number']
  ];
  for (const [label, key, kind] of properties) {
    props.append(field(label, project[key], value => {
      if (key === 'sortOrder') {
        setProperty(project, key, Number(value));
        renderProjectList();
      } else setProperty(project, key, value);
    }, kind));
  }
  for (const [label, key] of [['Hide cover on article','hideHeroMedia'], ['Hide image captions','hideMediaCaptions']]) {
    const control = element('label');
    const checkbox = element('input');
    checkbox.type = 'checkbox';
    checkbox.style.width = 'auto';
    checkbox.checked = Boolean(project[key]);
    checkbox.addEventListener('change', () => setProperty(project, key, checkbox.checked));
    control.append(checkbox, ' ' + label);
    props.append(control);
  }
  const typeLabel = element('label', undefined, 'field');
  const mediaType = element('select');
  for (const option of ['image','video']) {
    const item = element('option', option);
    item.value = option;
    mediaType.append(item);
  }
  mediaType.value = project.mediaType || 'image';
  mediaType.addEventListener('change', () => setProperty(project, 'mediaType', mediaType.value));
  typeLabel.append(element('span', 'Cover type'), mediaType);
  props.append(typeLabel, uploadControl('Upload a cover image', path => {
    project.mediaType = 'image';
    setProperty(project, 'mediaSrc', path);
    if (project.id === activeId) {
      render();
      $('edit').querySelector('details').open = true;
    }
  }));
  coverDetails.append(props);
  const removeProject = button('Remove project', () => {
    if (!confirm('Remove this project from the draft? The live site changes when you publish.')) return;
    projects = projects.filter(item => item.id !== project.id);
    activeId = projects[0].id;
    saveDraft();
    render();
  });
  removeProject.disabled = projects.length <= 1;
  coverDetails.append(removeProject);
  view.replaceChildren(title);
  if (cover) view.append(cover);
  view.append(coverDetails,
    field('Homepage summary', project.cardMarkdown, value => setProperty(project, 'cardMarkdown', value), 'textarea'),
    field('Article introduction', project.introMarkdown, value => setProperty(project, 'introMarkdown', value), 'textarea'),
    element('h2', 'Article blocks', 'section-heading')
  );
  const container = element('div');
  const source = (project.bodyMarkdown || '').trim();
  const blocks = source ? source.split(/\n{2,}/).map(parseBlock) : [];
  const sync = () => setProperty(project, 'bodyMarkdown', blocks.map(serializeBlock).filter(Boolean).join('\n\n'));

  function drawBlocks(focusIndex, actionLabel) {
    const labels = { text: 'Text', heading: 'Heading', list: 'Bulleted list', image: 'Image' };
    container.replaceChildren(...blocks.map((block, index) => {
      const item = element('div', undefined, 'block');
      item.dataset.type = block.type;
      const tools = element('div', undefined, 'block-tools');
      const up = button('↑', () => move(-1, 'Move up'), 'Move up');
      const down = button('↓', () => move(1, 'Move down'), 'Move down');
      up.disabled = index === 0;
      down.disabled = index === blocks.length - 1;
      function move(offset, label) {
        const target = index + offset;
        [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
        sync();
        drawBlocks(target, label);
      }
      tools.append(element('span', labels[block.type], 'block-type'), up, down,
        button('Remove', () => {
          blocks.splice(index, 1);
          sync();
          drawBlocks(Math.min(index, blocks.length - 1));
          if (!blocks.length) view.querySelector('.add-block button').focus();
        }, 'Remove block'));
      item.append(tools);
      if (block.type === 'image') {
        const image = media(block.src, block.alt);
        if (image) item.append(image);
        item.append(
          field('Image path', block.src, value => { block.src = value; sync(); }),
          field('Image description', block.alt, value => { block.alt = value; sync(); }),
          uploadControl('Upload image', path => { block.src = path; sync(); drawBlocks(index); })
        );
      } else {
        item.append(field(block.type === 'list' ? 'One bullet per line' : 'Block text', block.text,
          value => { block.text = value; sync(); }, 'textarea'));
      }
      return item;
    }));
    if (focusIndex !== undefined && focusIndex >= 0) {
      const focusBlock = container.children[focusIndex];
      const action = actionLabel && focusBlock.querySelector('[aria-label="' + actionLabel + '"]:not(:disabled)');
      (action || focusBlock.querySelector('textarea,input'))?.focus();
    }
  }

  const add = element('div', undefined, 'add-block');
  for (const [type, label] of [['text','Text'],['heading','Heading'],['list','List'],['image','Image']]) {
    add.append(button('+ ' + label, () => {
      blocks.push(type === 'image' ? { type, src: '', alt: '' } : { type, text: '', level: 2 });
      sync();
      drawBlocks(blocks.length - 1);
    }));
  }
  view.append(container, add);
  drawBlocks();
}

function renderPreview(project) {
  const view = $('preview');
  const page = element('div');
  page.innerHTML = portfolio.renderMarkdown(project.bodyMarkdown, { showCaptions: !project.hideMediaCaptions });
  const intro = element('div');
  intro.innerHTML = portfolio.renderMarkdown(project.introMarkdown || project.cardMarkdown);
  view.replaceChildren(element('h1', project.title), intro);
  const cover = media(project.mediaSrc, project.mediaAlt, project.mediaType);
  if (cover && !project.hideHeroMedia) view.append(cover);
  view.append(page);
  for (const img of view.querySelectorAll('img')) {
    if (uploads[img.getAttribute('src')]) img.src = uploads[img.getAttribute('src')];
  }
}

function render() {
  const project = selected();
  renderProjectList();
  $('preview-toggle').setAttribute('aria-pressed', String(previewing));
  $('preview-toggle').textContent = previewing ? 'Edit' : 'Preview';
  $('preview').hidden = !previewing;
  $('edit').hidden = previewing;
  if (previewing) renderPreview(project);
  else renderEditor(project);
}

function validateProjects(items) {
  if (!Array.isArray(items) || !items.length) throw new Error('A draft needs at least one project.');
  const ids = new Set();
  const textFields = ['status', 'statusColor', 'date', 'updatedDate', 'cardMarkdown', 'introMarkdown',
    'mediaType', 'mediaSrc', 'mediaAlt', 'bodyMarkdown', 'externalLink'];
  const flagFields = ['transparentMedia', 'hideHeroMedia', 'hideMediaCaptions'];
  for (const project of items) {
    if (!project || typeof project.id !== 'string' || !/^[a-z0-9-]+$/.test(project.id) ||
        typeof project.title !== 'string' || ids.has(project.id) ||
        textFields.some(key => key in project && typeof project[key] !== 'string') ||
        flagFields.some(key => key in project && typeof project[key] !== 'boolean') ||
        ('sortOrder' in project && !Number.isFinite(project.sortOrder))) {
      throw new Error('The draft has an invalid or duplicate project.');
    }
    ids.add(project.id);
  }
}

function restoreDraft(value) {
  validateProjects(value.projects);
  if (typeof value.base !== 'string' || !value.uploads || Array.isArray(value.uploads) || typeof value.uploads !== 'object') {
    throw new Error('Choose a backup downloaded from Portfolio Studio.');
  }
  for (const [path, data] of Object.entries(value.uploads)) {
    if (!/^images\/studio-[a-f0-9-]+\.(webp|png)$/.test(path) || typeof data !== 'string' ||
        !/^data:image\/(webp|png);base64,[A-Za-z0-9+/=]+$/.test(data)) {
      throw new Error('Invalid image in draft backup.');
    }
  }
  base = value.base;
  projects = value.projects;
  uploads = value.uploads;
}

function downloadDraft() {
  const blob = new Blob([snapshot(draft())], { type: 'application/json' });
  const link = element('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'portfolio-draft.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

async function github(token, query, variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: snapshot({ query, variables }),
    redirect: 'error'
  });
  if (response.status === 401 || response.status === 403) throw new Error('GitHub rejected the token. Check its access to this repository.');
  if (!response.ok) throw new Error('GitHub is unavailable. Your draft is still here.');
  const result = await response.json();
  if (result.errors?.length) throw new Error(result.errors[0].message);
  return result.data;
}

function base64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

async function publish(token) {
  validateProjects(projects);
  if (projects.some(project => !project.title.trim())) throw new Error('Give each project a title before publishing.');
  const content = JSON.stringify(projects, null, 2) + '\n';
  // Read the content and head from one commit, then use optimistic concurrency on write.
  const { repository } = await github(token, `query {
    repository(owner:"solstirling", name:"solstirling.com") {
      ref(qualifiedName:"refs/heads/main") {
        target {
          ... on Commit {
            oid
            file: file(path:"projects.json") { object { ... on Blob { text } } }
          }
        }
      }
    }
  }`);
  const head = repository?.ref?.target;
  if (!head?.file?.object?.text) throw new Error('GitHub could not locate the current portfolio.');
  if (snapshot(JSON.parse(head.file.object.text)) !== base) {
    throw new Error('The site changed since this draft began. Download your draft, then start from the latest live content before publishing.');
  }
  const additions = [{ path: 'projects.json', contents: base64(content) }];
  for (const [path, src] of Object.entries(uploads)) {
    if (content.includes(path)) additions.push({ path, contents: src.split(',')[1] });
  }
  const data = await github(token, `mutation($input: CreateCommitOnBranchInput!) {
    createCommitOnBranch(input:$input) { commit { oid url } }
  }`, { input: {
    branch: { repositoryNameWithOwner: repo, branchName: 'main' },
    expectedHeadOid: head.oid,
    message: { headline: 'Update portfolio from Studio' },
    fileChanges: { additions }
  } });
  return data.createCommitOnBranch.commit;
}

$('preview-toggle').onclick = () => { previewing = !previewing; render(); };
$('new-project').onclick = () => {
  const project = { id: 'project-' + crypto.randomUUID().slice(0, 12), title: 'Untitled project',
    date: new Date().toISOString().slice(0, 10), status: 'in progress',
    sortOrder: Math.max(0, ...projects.map(item => item.sortOrder || 0)) + 1 };
  projects.push(project);
  activeId = project.id;
  previewing = false;
  saveDraft();
  render();
  $('edit').querySelector('.title-input').select();
};
$('backup').onclick = downloadDraft;
$('reset').onclick = async () => {
  if (!confirm('Replace the local draft with the live website? Download a draft backup first if you want to keep your edits.')) return;
  try {
    const live = await portfolio.loadProjects();
    validateProjects(live);
    base = snapshot(live);
    projects = live;
    uploads = {};
    if (!selected()) activeId = projects[0].id;
    previewing = false;
    saveDraft('Live content loaded');
    render();
  } catch (error) { $('status').textContent = error.message; }
};
$('restore').onchange = async event => {
  const file = event.target.files[0];
  if (!file) return;
  if (!confirm('Replace the draft open in this browser with the selected backup?')) {
    event.target.value = '';
    return;
  }
  try {
    restoreDraft(JSON.parse(await file.text()));
    activeId = projects[0].id;
    saveDraft('Draft imported');
    render();
  } catch (error) { $('status').textContent = error.message; }
  event.target.value = '';
};
$('publish').onclick = () => {
  $('publish-status').textContent = '';
  $('cancel-publish').textContent = 'Cancel';
  $('publish-dialog').showModal();
};
$('cancel-publish').onclick = () => $('publish-dialog').close();
$('publish-dialog').addEventListener('cancel', event => { if ($('submit-publish').disabled) event.preventDefault(); });
$('publish-dialog').addEventListener('close', () => { $('token').value = ''; });
$('publish-form').onsubmit = async event => {
  event.preventDefault();
  if ($('submit-publish').disabled) return;
  const token = $('token').value.trim();
  if (!token) return;
  $('token').value = '';
  $('submit-publish').disabled = true;
  $('cancel-publish').disabled = true;
  $('publish-status').textContent = 'Publishing to GitHub…';
  try {
    const commit = await publish(token);
    base = snapshot(projects);
    // Keep the new preview assets available while GitHub Pages deploys the commit.
    saveDraft('Published to GitHub. GitHub Pages is updating the site.');
    const link = element('a', 'View commit');
    link.href = commit.url;
    $('publish-status').replaceChildren('Published. ', link);
    $('cancel-publish').textContent = 'Close';
  } catch (error) {
    $('publish-status').textContent = error.message;
  } finally {
    $('submit-publish').disabled = false;
    $('cancel-publish').disabled = false;
  }
};

async function init() {
  try {
    const published = await portfolio.loadProjects();
    validateProjects(published);
    base = snapshot(published);
    projects = structuredClone(published);
    let restored = false;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const value = JSON.parse(saved);
        // If no edits remain, prefer the live version once another commit is deployed.
        if ((value.uploads && snapshot(value.projects) !== value.base) || value.base === base) {
          restoreDraft(value);
          restored = true;
        }
      }
    } catch { $('status').textContent = 'The saved browser draft could not be opened.'; }
    const slug = new URLSearchParams(location.search).get('project');
    activeId = projects.some(project => project.id === slug) ? slug : projects[0].id;
    for (const id of ['preview-toggle','publish','new-project','backup','restore','reset']) $(id).disabled = false;
    $('status').textContent = restored ? 'Browser draft restored' : 'Editing a draft of the live website';
    render();
  } catch (error) {
    $('status').textContent = error.message + ' Refresh to retry.';
  }
}

init();
