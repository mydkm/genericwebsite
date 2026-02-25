const grid = document.querySelector('[data-project-grid]');
const latestBlogPanel = document.querySelector('[data-latest-blog]');
const latestBlogTitle = document.querySelector('[data-latest-title]');
const latestBlogDate = document.querySelector('[data-latest-date]');
const latestBlogExcerpt = document.querySelector('[data-latest-excerpt]');
const latestBlogLink = document.querySelector('[data-latest-link]');

function toSafeText(value) {
  if (value === null || value === undefined) return '';
  return String(value);
}

function toStatusClass(status) {
  const normalized = toSafeText(status)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'private';
}

function appendTextElement(parent, tag, className, text) {
  if (!text) return;
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = toSafeText(text);
  parent.appendChild(element);
}

function appendLink(parent, config) {
  if (!config || !config.href || !config.label) return;

  const link = document.createElement('a');
  link.href = toSafeText(config.href);
  link.textContent = toSafeText(config.label);

  if (config.external) {
    link.target = '_blank';
    link.rel = 'noreferrer';
  }

  parent.appendChild(link);
}

function renderProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const head = document.createElement('div');
  head.className = 'project-head';

  const name = document.createElement('h3');
  name.className = 'project-name';
  name.textContent = toSafeText(project.name || 'Untitled project');

  const status = document.createElement('span');
  const statusValue = toSafeText(project.status || 'private');
  status.className = `status-badge status-${toStatusClass(statusValue)}`;
  status.textContent = statusValue;

  head.append(name, status);

  const media = document.createElement('div');
  media.className = 'project-media';
  if (project.thumbnail && project.thumbnail.url) {
    const image = document.createElement('img');
    image.src = toSafeText(project.thumbnail.url);
    image.alt = toSafeText(project.thumbnail.alt || `${name.textContent} preview`);
    media.appendChild(image);
  }

  const body = document.createElement('div');
  body.className = 'project-body';

  appendTextElement(body, 'p', 'project-tagline', project.tagline);
  appendTextElement(body, 'p', 'project-description', project.description);

  if (Array.isArray(project.stack) && project.stack.length > 0) {
    const tags = document.createElement('div');
    tags.className = 'project-tags';

    project.stack.forEach((entry) => {
      const chip = document.createElement('span');
      chip.textContent = toSafeText(entry);
      tags.appendChild(chip);
    });

    body.appendChild(tags);
  }

  if (Array.isArray(project.links) && project.links.length > 0) {
    const actions = document.createElement('div');
    actions.className = 'project-actions';

    project.links.forEach((linkConfig) => appendLink(actions, linkConfig));

    if (actions.children.length > 0) {
      body.appendChild(actions);
    }
  }

  card.append(head, media, body);
  return card;
}

function renderProjects(payload) {
  if (!grid) return;

  grid.innerHTML = '';

  if (!payload || !Array.isArray(payload.projects) || payload.projects.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'projects-empty';
    empty.textContent = 'No projects yet. Add entries to main/projects.json to populate this section.';
    grid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  payload.projects.forEach((project) => {
    fragment.appendChild(renderProjectCard(project));
  });
  grid.appendChild(fragment);
}

function hideLatestBlogCard() {
  if (!latestBlogPanel) return;
  latestBlogPanel.style.display = 'none';
}

function renderLatestBlog(payload) {
  if (!latestBlogPanel) return;

  if (!payload || !Array.isArray(payload.posts) || payload.posts.length === 0) {
    hideLatestBlogCard();
    return;
  }

  const [latest] = payload.posts;
  if (!latest || !latest.title || !latest.href) {
    hideLatestBlogCard();
    return;
  }

  if (latestBlogTitle) latestBlogTitle.textContent = toSafeText(latest.title);
  if (latestBlogDate) {
    latestBlogDate.textContent = toSafeText(latest.date || '');
    if (latest.date) latestBlogDate.setAttribute('datetime', toSafeText(latest.date));
    else latestBlogDate.removeAttribute('datetime');
  }
  if (latestBlogExcerpt) latestBlogExcerpt.textContent = toSafeText(latest.excerpt || '');
  if (latestBlogLink) latestBlogLink.href = toSafeText(latest.href);
}

async function loadProjects() {
  const projectsUrl = new URL('./projects.json', import.meta.url);

  try {
    const response = await fetch(projectsUrl);
    if (!response.ok) {
      throw new Error(`Failed to load projects.json (${response.status})`);
    }

    const payload = await response.json();
    renderProjects(payload);
  } catch (error) {
    if (grid) {
      grid.innerHTML = '';
      const fallback = document.createElement('p');
      fallback.className = 'projects-empty';
      fallback.textContent = 'Project feed could not be loaded. Check main/projects.json formatting.';
      grid.appendChild(fallback);
    }
    console.error(error);
  }
}

async function loadLatestBlog() {
  const postsUrl = new URL('../blog/posts.json', import.meta.url);

  try {
    const response = await fetch(postsUrl);
    if (!response.ok) {
      throw new Error(`Failed to load blog/posts.json (${response.status})`);
    }

    const payload = await response.json();
    renderLatestBlog(payload);
  } catch (error) {
    hideLatestBlogCard();
    console.error(error);
  }
}

loadProjects();
loadLatestBlog();
