import test from 'node:test';
import assert from 'node:assert/strict';
import { safeUrl, sortClasses, duration } from '../src/utils/content.js';
import * as service from '../src/services/contentService.js';

test('CMS URLs reject executable schemes and accept intended navigation', () => {
  for (const url of ['javascript:alert(1)', ' JaVaScRiPt:alert(1)', 'data:text/html,<script>1</script>', 'vbscript:1', null, '']) assert.equal(safeUrl(url), null);
  assert.equal(safeUrl('#schedule'), '#schedule');
  assert.equal(safeUrl('https://example.com/path'), 'https://example.com/path');
  assert.equal(safeUrl('mailto:hello@example.com'), 'mailto:hello@example.com');
  assert.equal(safeUrl('tel:+302100000000'), 'tel:+302100000000');
  assert.equal(safeUrl('mailto:hello@example.com', { image: true }), null);
  assert.equal(safeUrl('#schedule', { image: true }), null);
});

test('class ordering is chronological and does not mutate content', () => {
  const items = [{ name: 'Evening', startTime: '18:00' }, { name: 'Morning', startTime: '09:00' }, { name: 'Noon', startTime: '12:15' }];
  assert.deepEqual(sortClasses(items).map((item) => item.name), ['Morning', 'Noon', 'Evening']);
  assert.equal(items[0].name, 'Evening');
  assert.deepEqual(sortClasses([]), []);
  assert.equal(duration('09:30', '10:20'), 50);
});

test('async service returns independent serializable data', async () => {
  const first = await service.getGymInfo();
  first.contact.phone = 'mutated';
  const second = await service.getGymInfo();
  assert.notEqual(second.contact.phone, 'mutated');
  assert.deepEqual(JSON.parse(JSON.stringify(second)), second);
  assert.ok((await service.getGalleryImages()).length > 3);
});

test('gym schedule meets the documented contract and omits unprovided instructor data', async () => {
  const classes = await service.getWeeklySchedule();
  const ids = new Set();
  const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  for (const item of classes) {
    assert.ok(!ids.has(item.id));
    ids.add(item.id);
    assert.ok(validDays.includes(item.day));
    assert.match(item.startTime, /^([01]\d|2[0-3]):[0-5]\d$/);
    assert.match(item.endTime, /^([01]\d|2[0-3]):[0-5]\d$/);
    assert.ok(duration(item.startTime, item.endTime) > 0);
    assert.ok(item.name);
    assert.equal(item.instructor, undefined);
  }
  assert.equal(classes.filter((item) => item.day === 'saturday').length, 0);
});

test('gym schedule matches the eleven sessions in the supplied video', async () => {
  const classes = await service.getWeeklySchedule();
  const expected = {
    monday: ['09:00–10:00 TRX Functional', '18:00–19:00 Pilates Mat', '19:00–20:00 Tabata HIIT'],
    tuesday: ['09:00–10:00 Pilates Mat', '19:00–20:00 Total Body'],
    wednesday: ['09:00–10:00 Yoga', '19:00–20:00 TRX Functional'],
    thursday: ['09:00–10:00 Total Body', '19:00–20:00 Pilates Mat'],
    friday: ['18:00–19:00 Total Body', '19:00–20:00 Yoga'],
  };
  assert.equal(classes.length, 11);
  for (const [day, sessions] of Object.entries(expected)) {
    assert.deepEqual(sortClasses(classes.filter(item => item.day === day))
      .map(item => `${item.startTime}–${item.endTime} ${item.name}`), sessions);
  }
});
