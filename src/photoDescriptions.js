// Plain-text captions live next to images: club/1.JPG uses club/1.txt.
// Match by path and basename, without depending on the image extension's case.
const withoutExtension = (path) => path.replace(/\.[^/.]+$/, '').toLowerCase();

export function buildDescriptionLookup(textFiles) {
  return new Map(Object.entries(textFiles)
    .filter(([, value]) => typeof value === 'string' && value.trim())
    .map(([path, value]) => [withoutExtension(path), value.trim().replace(/\s+/g, ' ')]));
}

export function descriptionForImage(path, lookup) {
  return lookup.get(withoutExtension(path)) || null;
}
