export function safeUrl(value, { image = false } = {}) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const raw = value.trim();
  // Restrict URLs before they reach an href/src; never trust CMS input.
  if (raw.startsWith('#')) return image ? null : raw;
  try {
    const parsed = new URL(raw, 'https://local.invalid/');
    const allowed = image ? ['http:', 'https:'] : ['http:', 'https:', 'tel:', 'mailto:'];
    return allowed.includes(parsed.protocol) ? raw : null;
  } catch { return null; }
}

export function sortClasses(classes) {
  return [...classes].sort((a, b) => a.startTime.localeCompare(b.startTime) || a.name.localeCompare(b.name, 'el'));
}

export function duration(startTime, endTime) {
  const minutes = (time) => time.split(':').reduce((hours, value) => hours * 60 + Number(value), 0);
  return minutes(endTime) - minutes(startTime);
}

