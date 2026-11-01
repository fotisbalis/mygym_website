import { element, state } from '../utils/dom.js';
import { sortClasses } from '../utils/content.js';
import { messages as t, days } from '../locales/el.js';

function classCard(item) {
  const card = element('article', 'class-card');
  const time = element('p', 'class-time');
  const start = element('time', '', item.startTime);
  const end = element('time', '', item.endTime);
  start.dateTime = item.startTime;
  end.dateTime = item.endTime;
  time.append(start, document.createTextNode(' – '), end);
  card.append(time, element('h4', '', item.name));
  if (item.category) card.append(element('p', 'class-meta', item.category));
  return card;
}

export function renderSchedule(container, classes, { timeZone = 'Europe/Athens' } = {}) {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone }).format(new Date()).toLowerCase();
  const availableDays = days
    .map((day) => ({ ...day, items: sortClasses(classes.filter((item) => item.day === day.id)) }))
    .filter((day) => day.items.length > 0);
  const inner = element('div', 'container');
  const heading = element('div', 'section-heading');
  const title = element('h2', 'eyebrow', t.scheduleEyebrow);
  title.id = 'group-programs-title';
  container.setAttribute('aria-labelledby', title.id);
  heading.append(title);
  inner.append(heading);
  if (!availableDays.length) {
    const empty = element('div');
    state(empty, t.noClasses);
    inner.append(empty);
    container.replaceChildren(inner);
    return;
  }
  const grid = element('div', 'schedule-grid');
  grid.id = 'schedule-results';
  grid.setAttribute('aria-label', t.weeklySchedule);
  grid.style.setProperty('--schedule-days', availableDays.length);
  grid.style.setProperty('--schedule-tablet-days', Math.min(3, availableDays.length));
  for (const day of availableDays) {
    const column = element('section', `day-column${day.id === today ? ' is-today' : ''}`);
    column.setAttribute('aria-label', day.label);
    const head = element('div', 'day-header');
    head.append(element('h3', '', day.label));
    if (day.id === today) head.append(element('span', 'today-badge', t.today));
    head.append(element('span', 'day-count', t.classCount(day.items.length)));
    const list = element('div', 'day-classes');
    day.items.forEach((item) => list.append(classCard(item)));
    column.append(head, list);
    grid.append(column);
  }
  inner.append(grid, element('p', 'schedule-note', t.scheduleNote));
  container.replaceChildren(inner);
}
