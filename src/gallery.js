import { photoSlots } from './data.js';
import { photosForStem } from './photoGrouping.js';

// Vite discovers every photo during the build. Users only need to drop images
// into src/assets/photos and push; there is no manifest to maintain.
const files = import.meta.glob('./assets/photos/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const entries = Object.entries(files).map(([path, url]) => {
  const relativePath = path.split('/assets/photos/')[1];
  const segments = relativePath.split('/');
  const filename = segments.at(-1);
  return { path, stem: filename.replace(/\.[^.]+$/, '').toLowerCase(), group: segments.length > 1 ? segments[0].toLowerCase() : null, filename, url };
});

const assetByStem = new Map(entries.filter((entry) => !entry.group).map((entry) => [entry.stem, entry.url]));

export function photoUrl(stem) {
  return assetByStem.get(stem.toLowerCase()) || photosForTopic(stem)[0]?.url || null;
}

// Supports a flat folder with shared filename prefixes or a named subfolder
// such as photos/club-leadership/01.jpg.
export function photosForTopic(stem) {
  return photosForStem(entries, stem);
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

const slotPhotos = photoSlots.map((item) => ({ ...item, photos: photosForTopic(item.stem) }));
const knownPaths = new Set([...slotPhotos.flatMap((item) => item.photos.map((photo) => photo.path)), ...photosForTopic('portrait').map((photo) => photo.path)]);

export const galleryItems = [
  ...slotPhotos.map((item) => ({ ...item, url: item.photos[0]?.url || null })),
  ...entries.filter((entry) => !knownPaths.has(entry.path)).map((entry) => ({
    stem: entry.group ? entry.group + '/' + entry.stem : entry.stem,
    category: categoryFromName(entry.group || entry.stem),
    title: humanTitle(entry.group ? entry.group + '-' + entry.stem : entry.stem),
    hint: 'An extra moment from your photo archive',
    url: entry.url,
    photos: [entry],
  })),
];

export const photosAdded = galleryItems.reduce((total, item) => total + item.photos.length, 0);
export const topicsFilled = galleryItems.filter((item) => item.photos.length > 0).length;
