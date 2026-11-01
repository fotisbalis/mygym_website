import { readFileSync, writeFileSync } from 'node:fs';

// Embed the original artwork because favicon SVGs cannot load external images.
const logo = readFileSync(new URL('../assets/images/MYGYM_Logo.png', import.meta.url));
const width = logo.readUInt32BE(16);
const height = logo.readUInt32BE(20);
const size = Math.max(width, height);
const x = (size - width) / 2;
const y = (size - height) / 2;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <image x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${logo.toString('base64')}" />
</svg>
`;

writeFileSync(new URL('../assets/branding/favicon.svg', import.meta.url), svg);
