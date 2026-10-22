import React, { useEffect, useRef, useState } from 'react';
import { galleryItems } from '../gallery.js';
import ZoomablePhoto from './ZoomablePhoto.jsx';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'research', label: 'Research' },
  { key: 'events', label: 'Events' },
  { key: 'awards', label: 'Awards' },
  { key: 'community', label: 'Community' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);
  const populated = galleryItems.filter((item) => item.photos.length > 0);
  const filtered = populated.filter((item) => filter === 'all' || item.category === filter);
  const selectedPhoto = selected?.item.photos[selected.index];

  function open(item) {
    previousFocus.current = document.activeElement;
    setSelected({ item, index: 0 });
  }

  function close() {
    setSelected(null);
    requestAnimationFrame(() => previousFocus.current?.focus());
  }

  function move(direction) {
    setSelected((current) => {
      if (!current || current.item.photos.length < 2) return current;
      return { ...current, index: (current.index + direction + current.item.photos.length) % current.item.photos.length };
    });
  }

  useEffect(() => {
    if (!selected) return;
    const former = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function onKeyDown(event) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'Tab') {
        const buttons = [...document.querySelectorAll('.photo-dialog button:not(:disabled)')];
        const first = buttons[0];
        const last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = former; document.removeEventListener('keydown', onKeyDown); };
  }, [selected]);

  return (
    <section className="content-section gallery-section" id="gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title">Selected photographs</h2>
      <p className="section-lead">Research presentations, competitions, and activities with the Programming Club of IST. Select an album to view its images and captions.</p>
      {populated.length ? <>
        <div className="photo-filters" role="group" aria-label="Filter photo albums">
          {categories.filter((category) => category.key === 'all' || populated.some((item) => item.category === category.key)).map((category) => (
            <button type="button" key={category.key} className={filter === category.key ? 'is-active' : ''} aria-pressed={filter === category.key} onClick={() => setFilter(category.key)}>{category.label}</button>
          ))}
        </div>
        {filtered.length ? <div className="photo-grid">
          {filtered.map((item) => (
            <button type="button" className="album-card" key={item.stem} onClick={() => open(item)} aria-label={`Open ${item.title}, ${item.photos.length} ${item.photos.length === 1 ? 'photograph' : 'photographs'}`}>
              <img src={item.photos[0].url} alt={item.photos[0].description || item.title} loading="lazy" />
              <span className="album-title">{item.title}</span>
              <span className="album-count">{item.photos.length} {item.photos.length === 1 ? 'photo' : 'photos'}</span>
              {item.photos[0].description && <span className="album-caption">{item.photos[0].description}</span>}
            </button>
          ))}
        </div> : <p className="empty-note">No photographs in this category yet.</p>}
      </> : <p className="empty-note">Photographs will appear here when added to the event folders.</p>}
      {selected && <div className="photo-dialog" role="dialog" aria-modal="true" aria-label={`${selected.item.title} photo album`} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div className="photo-dialog-content">
          <div className="dialog-header"><strong>{selected.item.title}</strong><button ref={closeRef} type="button" aria-label="Close photograph" onClick={close}>Close ✕</button></div>
          <ZoomablePhoto key={`${selected.item.stem}:${selected.index}`} src={selectedPhoto.url} alt={selectedPhoto.description || `${selected.item.title}, image ${selected.index + 1}`} />
          <div className="dialog-footer">
            <p aria-live="polite">{selectedPhoto.description || selected.item.hint}</p>
            <div className="dialog-paging"><button type="button" disabled={selected.item.photos.length < 2} onClick={() => move(-1)} aria-label="Previous photo">←</button><span>{selected.index + 1} / {selected.item.photos.length}</span><button type="button" disabled={selected.item.photos.length < 2} onClick={() => move(1)} aria-label="Next photo">→</button></div>
          </div>
        </div>
      </div>}
    </section>
  );
}
