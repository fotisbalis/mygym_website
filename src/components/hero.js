import { element, link, photo } from '../utils/dom.js';
import { safeUrl } from '../utils/content.js';
import { messages as t } from '../locales/el.js';

export function renderHero(container, gym) {
  const image = photo(gym.hero.image, 'hero-image', true);
  if (safeUrl(gym.hero.image.mobileSrc, { image: true })) {
    image.srcset = `${gym.hero.image.mobileSrc} 800w, ${gym.hero.image.src} 1800w`;
    image.sizes = '100vw';
  }
  const inner = element('div', 'hero-inner container');
  const content = element('div', 'hero-content');
  const heading = element('h1', 'hero-brand-heading');
  heading.append(photo({ ...gym.fullLogo, alt: `${gym.name} — ${gym.tagline}` }, 'hero-logo', true));
  const actions = element('div', 'hero-actions');
  actions.append(link(t.heroContact, '#contact', 'text-link'));
  content.append(heading, actions);
  inner.append(content);
  container.replaceChildren(image, inner);
}
