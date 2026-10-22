import React, { useEffect, useRef, useState } from 'react';
import { galleryItems, photosAdded, topicsFilled } from '../gallery.js';

const filters = [
  { key: 'all', label: 'All moments' },
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
  const filtered = galleryItems.filter((item) => filter === 'all' || item.category === filter);
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
    function keyHandler(event) {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll('.react-lightbox button'));
        if (!buttons.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', keyHandler);
    return () => { document.body.style.overflow = former; document.removeEventListener('keydown', keyHandler); };
  }, [selected]);

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="section-top"><div><p className="section-kicker"><span className="index-bubble">04</span> A VISUAL JOURNAL</p><h2 id="gallery-heading">Moments beyond<br /><em>the milestones.</em></h2></div><p className="section-intro">Your photographs will automatically fill these curated spaces. Filter the archive, and open any added image to explore.</p></div>
        <div className="gallery-progress"><div><strong>{photosAdded}</strong><span> photos across {topicsFilled} of {galleryItems.length} topics</span></div><div className="gallery-progress-track"><span style={{ width: (topicsFilled / Math.max(galleryItems.length, 1) * 100) + '%' }} /></div><p>Upload numbered images inside each event folder, for example <code>club/1.jpg</code>, <code>club/2.jpg</code>.</p></div>
        <div className="gallery-toolbar"><div className="gallery-filters" aria-label="Photo categories">{filters.map((item) => <button key={item.key} type="button" className={'filter-button ' + (filter === item.key ? 'active' : '')} aria-pressed={filter === item.key} onClick={() => setFilter(item.key)}>{item.label}</button>)}</div><span className="gallery-count">{filtered.length} TOPICS · {filtered.reduce((count, item) => count + item.photos.length, 0)} PHOTOS</span></div>
        <div className="gallery-grid react-gallery-grid">
          {filtered.map((item, index) => {
            const className = 'react-gallery-card ' + (item.size || '') + ' color-' + item.category;
            return item.url ? <button key={item.stem} type="button" className={className + ' populated'} onClick={() => open(item)} aria-label={'Open ' + item.title + ' photo collection'}><img src={item.url} alt={item.title} loading="lazy" />{item.photos.length > 1 && <span className="gallery-slide-count">{item.photos.length} PHOTOS</span>}<span className="react-gallery-caption"><small>{item.category} / {String(index + 1).padStart(2, '0')}</small><strong>{item.title}</strong><span aria-hidden="true">↗</span></span></button> :
              <article key={item.stem} className={className + ' empty'}><div className="gallery-placeholder-pattern" aria-hidden="true">✳</div><div className="gallery-card-top"><span>{item.category} / {String(index + 1).padStart(2, '0')}</span><span>+ PHOTOS</span></div><div className="gallery-card-bottom"><h3>{item.title}</h3><p>{item.hint}</p><code>{item.folder || item.stem}/1.jpg</code><code>{item.folder || item.stem}/2.jpg</code></div></article>;
          })}
        </div>
        <p className="gallery-footnote">Each topic becomes a slideshow when you add two or more matching files. Unmatched extra images also appear automatically in the gallery.</p>
      </div>
      {selected && <div className="react-lightbox" role="dialog" aria-modal="true" aria-label={selected.item.title + ' photo slideshow'} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className="react-lightbox-content"><button ref={closeRef} type="button" className="react-lightbox-close" aria-label="Close photo" onClick={close}>✕</button><img src={selectedPhoto.url} alt={selected.item.title + ', photo ' + (selected.index + 1)} /><div className="react-lightbox-bottom"><div><small>{selected.item.category.toUpperCase()}</small><strong>{selected.item.title}</strong></div><div className="lightbox-controls"><button type="button" aria-label="Previous photo" disabled={selected.item.photos.length < 2} onClick={() => move(-1)}>←</button><span>{selected.index + 1} / {selected.item.photos.length}</span><button type="button" aria-label="Next photo" disabled={selected.item.photos.length < 2} onClick={() => move(1)}>→</button></div></div></div></div>}
    </section>
  );
}
