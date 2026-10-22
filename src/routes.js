export const pages = [
  { id: 'home', label: 'Home', title: 'Home' },
  { id: 'about', label: 'About', title: 'About me' },
  { id: 'research', label: 'Research', title: 'Research & publications' },
  { id: 'journey', label: 'Journey', title: 'Leadership & milestones' },
  { id: 'gallery', label: 'Gallery', title: 'Photo gallery' },
  { id: 'contact', label: 'Contact', title: 'Contact' },
];

const validPages = new Set(pages.map((page) => page.id));

export function pageFromHash(hash = '') {
  const fragment = String(hash).replace(/^#\/?/, '').split(/[?#]/)[0].replace(/\/$/, '').toLowerCase();
  return validPages.has(fragment) ? fragment : 'home';
}

export function pageHref(page) {
  return page === 'home' ? '#/' : `#/${page}`;
}
