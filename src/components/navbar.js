import { element, brand, link } from '../utils/dom.js';
import { messages as t } from '../locales/el.js';

export function renderNavbar(container, gym) {
  const inner = element('div', 'nav-inner');
  const logo = brand(gym);
  const toggle = element('button', 'menu-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-controls', 'navigation');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', t.menuOpen);
  toggle.append(element('span'), element('span'));
  const nav = element('nav', 'navigation');
  nav.id = 'navigation';
  nav.setAttribute('aria-label', t.navigation);
  const facilities = link(t.facilities, '#facilities', 'nav-link');
  const groupPrograms = link(t.groupPrograms, '#group-schedule', 'nav-link');
  const announcements = link(t.announcements, '#announcements', 'nav-link');
  nav.append(facilities, groupPrograms, announcements);
  inner.append(logo, toggle, nav);
  container.replaceChildren(inner);

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? t.menuClose : t.menuOpen);
    container.classList.toggle('menu-is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  for (const anchor of [logo, facilities, groupPrograms, announcements]) {
    anchor.addEventListener('click', () => {
      const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(false);
      if (wasOpen) {
        const target = document.querySelector(anchor.getAttribute('href'));
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    });
  }
  document.addEventListener('click', (event) => {
    if (!container.contains(event.target)) setOpen(false);
  });
  container.addEventListener('focusout', (event) => {
    if (!container.contains(event.relatedTarget)) setOpen(false);
  });
  matchMedia('(min-width: 1025px)').addEventListener('change', () => setOpen(false));

  const entries = [[logo, 'home'], [facilities, 'facilities'], [groupPrograms, 'group-schedule'], [announcements, 'announcements']];
  let pending = false;
  const updateActive = () => {
    const active = [...entries].reverse().find(([, id]) => document.getElementById(id).getBoundingClientRect().top <= window.innerHeight * 0.4) || entries[0];
    entries.forEach(([anchor]) => {
      if (anchor === active[0]) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
    container.classList.toggle('is-scrolled', window.scrollY > 20);
    pending = false;
  };
  window.addEventListener('scroll', () => {
    if (!pending) { pending = true; requestAnimationFrame(updateActive); }
  }, { passive: true });
  updateActive();
}
