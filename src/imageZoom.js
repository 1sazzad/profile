export const MIN_ZOOM = 1;
export const MAX_ZOOM = 4;

export function clampZoom(value) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(value * 100) / 100));
}

export function clampPan(x, y, zoom, imageWidth, imageHeight, viewportWidth, viewportHeight) {
  const maxX = Math.max(0, (imageWidth * zoom - viewportWidth) / 2);
  const maxY = Math.max(0, (imageHeight * zoom - viewportHeight) / 2);
  return {
    x: Math.max(-maxX, Math.min(maxX, x)),
    y: Math.max(-maxY, Math.min(maxY, y)),
  };
}
