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
const slotByStem = new Map(photoSlots.map((item) => [item.stem, item]));

export function photoUrl(stem) {
  return assetByStem.get(stem.toLowerCase()) || photosForTopic(stem)[0]?.url || null;
}

// Each known topic has a friendly folder, such as photos/club/1.jpg.
// Older files and topic-named subfolders continue to work.
export function folderForTopic(stem) {
  return slotByStem.get(stem)?.folder || stem;
}

export function photosForTopic(stem) {
  return photosForStem(entries, stem, folderForTopic(stem));
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

// Any new event folder automatically becomes one gallery collection.
const extraGroups = new Map();
for (const entry of entries.filter((item) => !knownPaths.has(item.path))) {
  const key = entry.group || entry.stem;
  if (!extraGroups.has(key)) extraGroups.set(key, []);
  extraGroups.get(key).push(entry);
}
const naturalOrder = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

export const galleryItems = [
  ...slotPhotos.map((item) => ({ ...item, url: item.photos[0]?.url || null })),
  ...Array.from(extraGroups, ([stem, photos]) => ({
    stem,
    category: categoryFromName(stem),
    title: humanTitle(stem),
    hint: 'An extra moment from your photo archive',
    url: photos.sort((a, b) => naturalOrder.compare(a.stem, b.stem))[0]?.url || null,
    photos,
  })),
];

export const photosAdded = galleryItems.reduce((total, item) => total + item.photos.length, 0);
export const topicsFilled = galleryItems.filter((item) => item.photos.length > 0).length;
