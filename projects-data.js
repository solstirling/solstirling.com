(function () {
  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function sanitizeUrl(value) {
    const url = String(value || '').trim();
    if (!url) return '#';
    if (/^(https?:|mailto:)/i.test(url)) return url;
    if (/^(images\/|project\.html|\.\/|\/)/.test(url)) return url.replace(/^\/+/, '');
    return '#';
  }

  function renderInlineMarkdown(value) {
    let html = escapeHtml(value);

    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_match, label, href) {
      const safeHref = sanitizeUrl(href);
      const attrs = /^https?:\/\//i.test(safeHref) ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeHtml(safeHref)}"${attrs}>${label}</a>`;
    });

    return html;
  }

  function renderMarkdown(markdown, { showCaptions = true } = {}) {
    const source = String(markdown || '').trim();
    if (!source) return '';

    return source
      .split(/\n{2,}/)
      .map(function (block) {
        const trimmed = block.trim();
        if (!trimmed) return '';

        const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imageMatch) {
          const alt = imageMatch[1] || 'Project media';
          const src = sanitizeUrl(imageMatch[2]);
          return `
            <figure class="markdown-media">
              <img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">
              ${showCaptions ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ''}
            </figure>
          `;
        }

        const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
        if (headingMatch) {
          const level = Math.min(headingMatch[1].length + 1, 4);
          return `<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`;
        }

        if (/^- /m.test(trimmed)) {
          const items = trimmed
            .split('\n')
            .filter(function (line) {
              return line.trim().startsWith('- ');
            })
            .map(function (line) {
              return `<li>${renderInlineMarkdown(line.trim().slice(2))}</li>`;
            })
            .join('');
          return `<ul>${items}</ul>`;
        }

        return `<p>${renderInlineMarkdown(trimmed.replace(/\n+/g, ' '))}</p>`;
      })
      .join('');
  }

  function projectCardHref(project) {
    return `project.html?project=${encodeURIComponent(project.id)}`;
  }

  function parseProjectDate(value) {
    if (!value) return null;
    const parsed = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function formatProjectDate(value, options) {
    const date = parseProjectDate(value);
    if (!date) return value || '';

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: options && options.includeDay ? 'numeric' : undefined,
      year: 'numeric'
    }).format(date);
  }

  function sortProjects(projects) {
    return [...projects].sort(function (a, b) {
      const orderA = Number.isFinite(a.sortOrder) ? a.sortOrder : 999;
      const orderB = Number.isFinite(b.sortOrder) ? b.sortOrder : 999;
      return orderA - orderB;
    });
  }

  async function loadProjects() {
    const response = await fetch('projects.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Could not load the portfolio projects.');
    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error('Invalid portfolio content.');
    return projects;
  }

  window.PortfolioProjects = {
    loadProjects, escapeHtml, sanitizeUrl, formatProjectDate,
    projectCardHref, renderMarkdown, sortProjects
  };
})();
