import { safeUrl } from './content.js';
import { messages as t } from '../locales/el.js';

export function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function link(label, url, className = '') {
  const href = safeUrl(url);
  if (!href) return element('span', className, label);
  const node = element('a', className, label);
  node.href = href;
  if (/^https?:\/\//i.test(href)) { node.target = '_blank'; node.rel = 'noopener noreferrer'; }
  return node;
}

export function photo(data, className = '', eager = false) {
  const src = safeUrl(data?.src, { image: true });
  if (!src) return element('div', `${className} image-placeholder`);
  const node = element('img', className);
  node.src = src;
  node.alt = data.alt || '';
  node.width = data.width || 900;
  node.height = data.height || 600;
  node.loading = eager ? 'eager' : 'lazy';
  node.decoding = 'async';
  if (eager) node.fetchPriority = 'high';
  node.addEventListener('error', () => { node.replaceWith(element('div', `${className} image-placeholder`)); }, { once: true });
  return node;
}

export function sectionHeading(eyebrow, title, description) {
  const head = element('div', 'section-heading');
  const copy = element('div');
  copy.append(element('p', 'eyebrow', eyebrow), element('h2', '', title));
  head.append(copy);
  if (description) head.append(element('p', 'section-description', description));
  return head;
}

export function state(container, message, retry) {
  const box = element('div', 'state');
  box.setAttribute('role', retry ? 'alert' : 'status');
  box.append(element('p', '', message));
  if (retry) {
    const button = element('button', 'button button-outline', t.retry);
    button.type = 'button';
    button.addEventListener('click', retry);
    box.append(button);
  }
  container.replaceChildren(box);
}

export function brand(gym, logo = gym.logo) {
  const node = link('', '#home', 'brand');
  node.setAttribute('aria-label', `${gym.name} — ${t.home}`);
  if (logo) {
    const wordmark = element('span', 'brand-wordmark');
    wordmark.append(photo({ ...logo, alt: '' }, 'brand-logo', true));
    node.append(wordmark);
  } else {
    node.append(element('span', 'brand-name', gym.name));
  }
  return node;
}

export function socialLinks(gym, className = '') {
  const group = element('div', `social-links ${className}`);
  for (const social of gym.socials) {
    const node = link(social.label, social.url, 'social-link');
    if (social.icon) {
      node.classList.add('social-link-icon');
      node.setAttribute('aria-label', social.label);
      node.title = social.label;
      node.replaceChildren(photo({ ...social.icon, alt: '' }, 'social-icon'));
    }
    group.append(node);
  }
  return group;
}
