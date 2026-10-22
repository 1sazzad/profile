import React from 'react';
import { photoUrl } from '../gallery.js';

export default function PhotoSlot({ stem, src, title, className = '', alt = '', children, showHint = true }) {
  const image = src || photoUrl(stem);
  return (
    <div className={'react-photo-slot ' + (image ? 'has-photo ' : 'is-placeholder ') + className}>
      {image ? <img src={image} alt={alt || title} loading={stem === 'portrait' ? 'eager' : 'lazy'} /> : (
        <div className="photo-slot-empty">
          <span className="photo-slot-symbol" aria-hidden="true">✳</span>
          <span className="photo-slot-label">PHOTO PLACEHOLDER</span>
          <strong>{title}</strong>
          {showHint && <code>{stem}.jpg</code>}
        </div>
      )}
      {children}
    </div>
  );
}
