import React, { useEffect, useRef, useState } from 'react';
import { folderForTopic, photosForTopic } from '../gallery.js';
import PhotoSlot from './PhotoSlot.jsx';

export default function TopicCarousel({ stem, title, className = '' }) {
  const slides = photosForTopic(stem);
  const folder = folderForTopic(stem);
  const [index, setIndex] = useState(0);
  const swipeStart = useRef(null);
  const total = slides.length;
  const active = total ? slides[index % total] : null;

  useEffect(() => { setIndex(0); }, [stem]);

  function move(direction) {
    if (total < 2) return;
    setIndex((previous) => (previous + direction + total) % total);
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  }

  function endTouch(event) {
    if (swipeStart.current === null) return;
    const distance = event.changedTouches[0].clientX - swipeStart.current;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
    swipeStart.current = null;
  }

  return (
    <div className={'topic-carousel ' + className} role="region" aria-roledescription="carousel" aria-label={title + ' photos'} tabIndex={total > 1 ? 0 : undefined} onKeyDown={total > 1 ? onKeyDown : undefined} onTouchStart={(event) => { swipeStart.current = event.touches[0].clientX; }} onTouchEnd={endTouch}>
      <PhotoSlot key={active?.path || stem} stem={stem} src={active?.url} title={title} className="topic-carousel-photo" alt={title + (total > 1 ? ', image ' + (index + 1) + ' of ' + total : '')} />
      {total > 1 && <>
        <div className="topic-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label={'Previous ' + title + ' photo'}>←</button>
          <span aria-live="polite">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <button type="button" onClick={() => move(1)} aria-label={'Next ' + title + ' photo'}>→</button>
        </div>
        <div className="topic-carousel-dots" aria-label="Choose slide">
          {slides.map((slide, slideIndex) => <button key={slide.path} type="button" className={slideIndex === index ? 'active' : ''} aria-label={'Show photo ' + (slideIndex + 1) + ' of ' + total} aria-current={slideIndex === index ? 'true' : undefined} onClick={() => setIndex(slideIndex)} />)}
        </div>
      </>}
      {total === 0 && <div className="topic-carousel-add">Add <code>{folder}/1.jpg</code>, <code>2.jpg</code>, <code>3.jpg</code>…</div>}
    </div>
  );
}
