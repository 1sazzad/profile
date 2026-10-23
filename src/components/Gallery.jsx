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
  const dialogRef = useRef(null);
  const populated = galleryItems.filter((item) => item.photos.length > 0);
  const filtered = populated.filter((item) => filter === 'all' || item.category === filter);
  const selectedPhoto = selected?.item.photos[selected.index];

  function open(item) {
    setSelected({ item, index: 0 });
  }

  function close() {
    setSelected(null);
  }

  function move(direction) {
    setSelected((current) => {
      if (!current || current.item.photos.length < 2) return current;
      return { ...current, index: (current.index + direction + current.item.photos.length) % current.item.photos.length };
    });
  }

  const isOpen = selected !== null;
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const former = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = former;
    };
  }, [isOpen]);

  function onDialogKeyDown(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  return (
    <section className="content-section gallery-section" id="gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title">Photographs</h2>
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
              <img src={item.photos[0].url} alt={item.photos[0].description || item.title} loading="lazy" width="400" height="300" />
              <span className="album-title">{item.title}</span>
              <span className="album-count">{item.photos.length} {item.photos.length === 1 ? 'photo' : 'photos'}</span>
              {item.photos[0].description && <span className="album-caption">{item.photos[0].description}</span>}
            </button>
          ))}
        </div> : <p className="empty-note">No photographs in this category yet.</p>}
      </> : <p className="empty-note">Photographs will appear here when added to the event folders.</p>}
      {selected && <dialog ref={dialogRef} className="photo-dialog" onCancel={close} onKeyDown={onDialogKeyDown} aria-label={`${selected.item.title} photo album`} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div className="photo-dialog-content">
          <div className="dialog-header"><strong>{selected.item.title}</strong><button autoFocus type="button" aria-label="Close photograph" onClick={close}>Close ✕</button></div>
          <ZoomablePhoto key={`${selected.item.stem}:${selected.index}`} src={selectedPhoto.url} alt={selectedPhoto.description || `${selected.item.title}, image ${selected.index + 1}`} />
          <div className="dialog-footer">
            <p aria-live="polite">{selectedPhoto.description || selected.item.hint}</p>
            <div className="dialog-paging"><button type="button" disabled={selected.item.photos.length < 2} onClick={() => move(-1)} aria-label="Previous photo">←</button><span aria-live="polite" aria-atomic="true">{selected.index + 1} / {selected.item.photos.length}</span><button type="button" disabled={selected.item.photos.length < 2} onClick={() => move(1)} aria-label="Next photo">→</button></div>
          </div>
        </div>
      </dialog>}
    </section>
  );
}
