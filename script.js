(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const menuButton = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  const progressBar = $('#page-progress');
  const galleryGrid = $('#gallery-grid');
  const galleryCount = $('#gallery-count');
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightbox-image');
  const lightboxTitle = $('#lightbox-title');
  const lightboxCaption = $('#lightbox-caption');

  let gallery = [];
  let visibleGallery = [];
  let activeFilter = 'all';
  let activeImageIndex = 0;
  let lastFocusedElement = null;

  const placeholders = [
    { category: 'research', categoryLabel: 'Research', title: 'Ideas in progress', description: 'Experiments, presentations, and the stories behind the work.', size: 'large' },
    { category: 'events', categoryLabel: 'Events', title: 'Beyond the screen', description: 'Conferences, meetups, and learning in the real world.', size: 'medium' },
    { category: 'awards', categoryLabel: 'Awards', title: 'Milestones matter', description: 'The moments that make the effort worthwhile.', size: 'small' },
    { category: 'community', categoryLabel: 'Community', title: 'Better together', description: 'Teaching, leading, and growing alongside others.', size: 'small' }
  ];

  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
  }

  menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
  $$('#mobile-nav a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!lightbox.hidden) closeLightbox();
      if (!mobileNav.hidden) setMenu(false);
    }
  });

  function updateProgress() {
    const possibleScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = possibleScroll > 0 ? (window.scrollY / possibleScroll) * 100 : 0;
    progressBar.style.width = Math.max(0, Math.min(100, progress)) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
    $$('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    $$('.reveal').forEach((element) => element.classList.add('visible'));
  }

  $('#current-year').textContent = new Date().getFullYear();

  const copyEmail = $('#copy-email');
  const copyFeedback = $('#copy-feedback');
  copyEmail.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyEmail.dataset.email);
      copyFeedback.textContent = 'Copied ✓';
      window.setTimeout(() => { copyFeedback.textContent = 'Copy email ↗'; }, 2200);
    } catch (error) {
      copyFeedback.textContent = 'Select the address to copy';
    }
  });

  function createPlaceholder(item) {
    const article = document.createElement('article');
    article.className = 'gallery-placeholder ' + item.size;
    const top = document.createElement('span');
    top.className = 'placeholder-top';
    top.textContent = item.categoryLabel + ' / Visual journal';
    const bottom = document.createElement('div');
    bottom.className = 'placeholder-bottom';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    bottom.append(title, description);
    article.append(top, bottom);
    return article;
  }

  function createGalleryItem(item, index) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item ' + (item.size || 'regular');
    button.setAttribute('aria-label', 'Open photo: ' + item.title);
    const image = document.createElement('img');
    image.src = item.src;
    image.alt = item.alt || item.title;
    image.loading = 'lazy';
    image.decoding = 'async';
    const overlay = document.createElement('span');
    overlay.className = 'gallery-item-copy';
    const text = document.createElement('span');
    const category = document.createElement('small');
    category.textContent = item.category || 'Moment';
    const title = document.createElement('strong');
    title.textContent = item.title;
    const arrow = document.createElement('span');
    arrow.textContent = '↗';
    text.append(category, title);
    overlay.append(text, arrow);
    button.append(image, overlay);
    button.addEventListener('click', () => openLightbox(index));
    return button;
  }

  function renderGallery() {
    galleryGrid.replaceChildren();
    visibleGallery = gallery.filter((item) => activeFilter === 'all' || item.category === activeFilter);
    if (gallery.length > 0) {
      visibleGallery.forEach((item, index) => galleryGrid.appendChild(createGalleryItem(item, index)));
      galleryCount.textContent = visibleGallery.length + (visibleGallery.length === 1 ? ' MOMENT' : ' MOMENTS');
      if (visibleGallery.length === 0) {
        const note = document.createElement('div');
        note.className = 'gallery-upload-note';
        note.textContent = 'No photos in this category yet. Try another filter.';
        galleryGrid.append(note);
      }
    } else {
      placeholders.filter((item) => activeFilter === 'all' || item.category === activeFilter)
        .forEach((item) => galleryGrid.appendChild(createPlaceholder(item)));
      galleryCount.textContent = 'PHOTO ARCHIVE — COMING SOON';
      const note = document.createElement('div');
      note.className = 'gallery-upload-note';
      const copy = document.createElement('span');
      const strong = document.createElement('strong');
      strong.textContent = 'Your real photos belong here. ';
      copy.append(strong, document.createTextNode('The gallery is ready for research, event, award, and community images.'));
      const path = document.createElement('code');
      path.textContent = 'gallery.json';
      note.append(copy, path);
      galleryGrid.append(note);
    }
  }

  $$('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      $$('.filter-button').forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderGallery();
    });
  });

  function openLightbox(index) {
    if (!visibleGallery.length) return;
    activeImageIndex = index;
    lastFocusedElement = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    updateLightbox();
    $('.lightbox-close', lightbox).focus();
  }

  function updateLightbox() {
    const item = visibleGallery[activeImageIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt || item.title;
    lightboxTitle.textContent = item.title;
    lightboxCaption.textContent = item.caption || item.category || '';
    $('#lightbox-prev').hidden = visibleGallery.length < 2;
    $('#lightbox-next').hidden = visibleGallery.length < 2;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function moveLightbox(direction) {
    if (visibleGallery.length < 2) return;
    activeImageIndex = (activeImageIndex + direction + visibleGallery.length) % visibleGallery.length;
    updateLightbox();
  }

  $$('[data-close-lightbox]').forEach((button) => button.addEventListener('click', closeLightbox));
  $('#lightbox-prev').addEventListener('click', () => moveLightbox(-1));
  $('#lightbox-next').addEventListener('click', () => moveLightbox(1));
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
    if (event.key === 'Tab') {
      const focusable = $$('.lightbox-close, .lightbox-arrow:not([hidden])', lightbox);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  async function loadGallery() {
    try {
      const response = await fetch('gallery.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('Gallery manifest unavailable');
      const payload = await response.json();
      if (!Array.isArray(payload)) throw new Error('Gallery manifest should contain an array');
      gallery = payload.filter((item) => item && typeof item.src === 'string' && typeof item.title === 'string'
        && ['research', 'events', 'awards', 'community'].includes(item.category));
    } catch (error) {
      gallery = [];
    }
    renderGallery();
  }

  loadGallery();
})();
