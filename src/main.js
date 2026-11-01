import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/responsive.css';
import * as contentService from './services/contentService.js';
import { renderNavbar } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderGallery } from './components/gallery.js';
import { renderSchedule } from './components/schedule.js';
import { renderFooter } from './components/footer.js';
import { state } from './utils/dom.js';
import { messages as t } from './locales/el.js';

async function loadSection(id, fetchContent, render) {
  const container = document.getElementById(id);
  const load = async () => {
    container.setAttribute('aria-busy', 'true');
    state(container, t.loading);
    try {
      render(container, await fetchContent());
    } catch (error) {
      console.error(`Unable to load ${id}`, error);
      state(container, t.error, load);
    } finally {
      container.setAttribute('aria-busy', 'false');
    }
  };
  await load();
}

function applyBrand(gym) {
  document.documentElement.lang = gym.locale.split('-')[0];
  document.title = `${gym.name} | ${gym.tagline}`;
  for (const [token, value] of Object.entries({ accent: gym.theme.accent, 'accent-ink': gym.theme.accentInk })) {
    if (/^#[0-9a-f]{6}$/i.test(value)) document.documentElement.style.setProperty(`--${token}`, value);
  }
}

let gymSettings;
// Read shared configuration once, then pass it explicitly to the presentation layer.
await loadSection('home', contentService.getGymInfo, (container, gym) => {
  gymSettings = gym;
  applyBrand(gym);
  renderHero(container, gym);
  renderNavbar(document.getElementById('site-header'), gym);
  renderFooter(document.getElementById('contact'), gym);
});

// Independent failures leave every other section usable. Retry only the failed resource.
await Promise.allSettled([
  loadSection('facilities', contentService.getGalleryImages, (container, images) => renderGallery(container, images, gymSettings?.facilityHighlights)),
  loadSection('group-schedule', contentService.getWeeklySchedule, (container, classes) => renderSchedule(container, classes, gymSettings)),
]);

// Honor deep links after async content has established the page geometry.
if (location.hash) {
  try {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({ behavior: 'instant' });
  } catch { /* Ignore malformed URL fragments without disrupting the page. */ }
}
