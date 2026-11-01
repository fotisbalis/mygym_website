import { element, brand, link, photo, socialLinks } from '../utils/dom.js';
import { messages as t } from '../locales/el.js';

function contactRow(label, url, icon) {
  const node = element('div', 'contact-row');
  if (icon) {
    const iconLink = link('', url, 'contact-icon-link');
    iconLink.setAttribute('aria-label', label);
    iconLink.title = label;
    iconLink.append(photo({ ...icon, alt: '' }, 'contact-icon'));
    node.append(iconLink);
  }
  node.append(element('span', 'contact-text', label));
  return node;
}

export function renderFooter(container, gym) {
  const inner = element('div', 'container');
  const grid = element('div', 'footer-grid');
  const identity = element('div', 'footer-brand');
  const social = socialLinks(gym);
  social.setAttribute('role', 'group');
  social.setAttribute('aria-label', t.socialLabel);
  identity.append(brand(gym, gym.fullLogo), social);
  const address = element('div');
  const addressText = element('address');
  addressText.append(element('p', '', gym.contact.address), element('p', '', gym.contact.city));
  const maps = link(t.maps, gym.contact.mapsUrl, 'text-link');
  address.append(element('h3', 'footer-title', t.location), addressText, maps);
  const hours = element('div');
  hours.append(element('h3', 'footer-title', t.hours));
  const list = element('dl', 'opening-hours');
  gym.openingHours.forEach((entry) => {
    const row = element('div');
    row.append(element('dt', '', entry.label), element('dd', '', entry.hours));
    list.append(row);
  });
  hours.append(list);
  const details = element('div', 'footer-contact');
  details.append(
    element('h3', 'footer-title', t.contactLabel),
    contactRow(gym.contact.phone, `tel:${gym.contact.phone.replace(/[^+\d]/g, '')}`, gym.contact.phoneIcon),
    contactRow(gym.contact.email, `mailto:${gym.contact.email}`, gym.contact.emailIcon),
  );
  grid.append(identity, address, hours, details);
  const bottom = element('div', 'footer-bottom');
  bottom.append(element('p', '', '© 2026'));
  inner.append(grid, bottom);
  if (gym.demo) inner.append(element('p', 'demo-notice', t.demo));
  container.replaceChildren(inner);
}
