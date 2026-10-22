import React, { useEffect, useRef, useState } from 'react';
import { clampPan, clampZoom, MAX_ZOOM, MIN_ZOOM } from '../imageZoom.js';

export default function ZoomablePhoto({ src, alt }) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const viewportRef = useRef(null);
  const dragging = useRef(null);

  function boundPosition(x, y, scale = zoom) {
    const image = imageRef.current;
    const viewport = viewportRef.current;
    if (!image || !viewport) return { x: 0, y: 0 };
    return clampPan(x, y, scale, image.offsetWidth, image.offsetHeight, viewport.clientWidth, viewport.clientHeight);
  }

  function adjustZoom(amount) {
    setZoom((current) => clampZoom(current + amount));
  }

  function resetZoom() {
    setZoom(MIN_ZOOM);
    setPosition({ x: 0, y: 0 });
  }

  useEffect(() => {
    if (zoom === MIN_ZOOM) setPosition({ x: 0, y: 0 });
    else setPosition((current) => boundPosition(current.x, current.y, zoom));
  }, [zoom]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    function wheelZoom(event) {
      event.preventDefault();
      setZoom((current) => clampZoom(current + (event.deltaY < 0 ? 0.25 : -0.25)));
    }
    viewport.addEventListener('wheel', wheelZoom, { passive: false });
    return () => viewport.removeEventListener('wheel', wheelZoom);
  }, []);

  function startDrag(event) {
    if (zoom <= MIN_ZOOM || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.preventDefault();
    dragging.current = { id: event.pointerId, x: event.clientX, y: event.clientY, origin: position };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event) {
    const start = dragging.current;
    if (!start || start.id !== event.pointerId) return;
    setPosition(boundPosition(start.origin.x + event.clientX - start.x, start.origin.y + event.clientY - start.y));
  }

  function stopDrag(event) {
    if (dragging.current?.id !== event.pointerId) return;
    dragging.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="lightbox-photo-stage" ref={viewportRef} role="group" aria-label="Zoomable photo">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        draggable={false}
        className={zoom > MIN_ZOOM ? 'photo-zoomed' : ''}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})` }}
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onDoubleClick={() => zoom > MIN_ZOOM ? resetZoom() : setZoom(2)}
        title="Double-click to zoom or reset"
      />
      <div className="photo-zoom-toolbar" role="group" aria-label="Photo zoom controls">
        <button type="button" aria-label="Zoom out" disabled={zoom <= MIN_ZOOM} onClick={() => adjustZoom(-0.5)}>−</button>
        <output aria-live="polite">{Math.round(zoom * 100)}%</output>
        <button type="button" aria-label="Zoom in" disabled={zoom >= MAX_ZOOM} onClick={() => adjustZoom(0.5)}>+</button>
        <button type="button" className="photo-zoom-reset" aria-label="Reset photo zoom" disabled={zoom === MIN_ZOOM} onClick={resetZoom}>Reset</button>
      </div>
      {zoom > MIN_ZOOM && <span className="photo-zoom-hint">Drag image to move</span>}
    </div>
  );
}
