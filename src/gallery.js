import { photoSlots } from './data.js';

// Vite discovers every photo during the build. Users only need to drop images
// into src/assets/photos and push; there is no manifest to maintain.
const files = import.meta.glob('./assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const entries = Object.entries(files).map(([path, url]) => {
  const filename = path.split('/').pop();
  return { stem: filename.replace(/\.[^.]+$/, '').toLowerCase(), filename, url };
});

const assetByStem = new Map(entries.map((entry) => [entry.stem, entry.url]));

export function photoUrl(stem) {
  return assetByStem.get(stem.toLowerCase()) || null;
}

function humanTitle(stem) {
  return stem.replace(/^(research|events|awards|community)[-_]/, '').replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function categoryFromName(stem) {
  if (/^(research|thermal|paper|poster-)/.test(stem)) return 'research';
  if (/^(award|prize|champion|trophy)/.test(stem)) return 'awards';
  if (/^(club|community|teaching|class|workshop)/.test(stem)) return 'community';
  return 'events';
}

const knownStems = new Set([...photoSlots.map((item) => item.stem), 'portrait']);

export const galleryItems = [
  ...photoSlots.map((item) => ({ ...item, url: photoUrl(item.stem) })),
  ...entries.filter((entry) => !knownStems.has(entry.stem)).map((entry) => ({
    stem: entry.stem,
    category: categoryFromName(entry.stem),
    title: humanTitle(entry.stem),
    hint: 'An extra moment from your photo archive',
    url: entry.url,
  })),
];

export const photosAdded = galleryItems.filter((item) => Boolean(item.url)).length;
