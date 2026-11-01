import { element, photo, state } from '../utils/dom.js';
import { messages as t } from '../locales/el.js';

function enableMouseScrolling(track) {
  // Keep native horizontal trackpad scrolling and browser zoom intact.
  track.addEventListener('wheel', (event) => {
    if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1;
    const delta = event.deltaY * unit;
    const end = track.scrollWidth - track.clientWidth;
    if (end <= 1) return;
    if ((delta < 0 && track.scrollLeft <= 1) || (delta > 0 && track.scrollLeft >= end - 1)) {
      // A wheel gesture can stay latched to the gallery in Chromium.
      // Explicitly hand off to the page once horizontal movement is exhausted.
      event.preventDefault();
      const pageUnit = event.deltaMode === 2 ? window.innerHeight : unit;
      window.scrollBy({ top: event.deltaY * pageUnit, behavior: 'instant' });
      return;
    }

    // Free scrolling avoids snap points swallowing small mouse-wheel steps.
    event.preventDefault();
    track.classList.add('is-mouse-scrolling');
    track.scrollBy({ left: delta, behavior: 'instant' });
  }, { passive: false });

  let drag = null;
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse') {
      track.classList.remove('is-mouse-scrolling');
      return;
    }
    if (event.button !== 0 || !event.isPrimary || !event.target.closest('.gallery-card')) return;
    if (track.scrollWidth <= track.clientWidth) return;
    event.preventDefault();
    track.focus({ preventScroll: true });
    drag = { id: event.pointerId, x: event.clientX, scrollLeft: track.scrollLeft };
    track.classList.add('is-dragging');
    track.setPointerCapture(event.pointerId);
  });
  track.addEventListener('pointermove', (event) => {
    if (drag?.id !== event.pointerId) return;
    track.scrollTo({ left: drag.scrollLeft + drag.x - event.clientX, behavior: 'instant' });
  });
  const endDrag = (event) => {
    if (drag?.id !== event.pointerId) return;
    drag = null;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  };
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('lostpointercapture', endDrag);
  track.addEventListener('dragstart', (event) => event.preventDefault());
}

export function renderGallery(container, images, highlights = []) {
  const inner = element('div', 'container');
  const heading = element('div', 'section-heading');
  heading.append(element('h2', 'eyebrow', t.galleryEyebrow));
  inner.append(heading);
  const track = element('div', 'gallery-track');
  track.tabIndex = 0;
  track.setAttribute('role', 'region');
  track.setAttribute('aria-label', t.galleryLabel);
  if (!images.length) state(track, t.galleryEmpty);
  images.forEach((item) => {
    const figure = element('figure', 'gallery-card');
    figure.append(photo(item));
    track.append(figure);
  });
  inner.append(track);
  if (images.length > 1) {
    enableMouseScrolling(track);
    const controls = element('div', 'gallery-controls');
    controls.append(element('p', 'gallery-hint', t.galleryHint));
    const buttons = element('div', 'gallery-navigation');
    const previous = element('button', 'gallery-button');
    const next = element('button', 'gallery-button');
    previous.type = next.type = 'button';
    previous.setAttribute('aria-label', t.galleryPrevious);
    next.setAttribute('aria-label', t.galleryNext);
    for (const [button, symbol] of [[previous, '←'], [next, '→']]) {
      const icon = element('span', 'gallery-arrow', symbol);
      icon.setAttribute('aria-hidden', 'true');
      button.append(icon);
    }
    const move = (direction) => {
      track.classList.remove('is-mouse-scrolling');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: direction * (track.firstElementChild.getBoundingClientRect().width + gap), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    const update = () => {
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    };
    track.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(track);
    buttons.append(previous, next);
    controls.append(buttons);
    inner.append(controls);
  }
  if (highlights.length) {
    const list = element('ul', 'facility-highlights');
    highlights.forEach((text) => list.append(element('li', '', text)));
    inner.append(list);
  }
  container.replaceChildren(inner);
}
