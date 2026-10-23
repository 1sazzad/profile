# Portfolio cleanup

The existing white, single-page academic layout and academic text are preserved. The gallery uses a native modal dialog, removing manual focus trapping and keeping focus stable between slides. Touch controls have 44px minimum targets; images reserve their aspect ratios. No dependencies were added or removed: all installed direct dependencies are used.

## Deleted files

- styles.css: obsolete root stylesheet; the entry point imports src/styles.css.
- src/components/TopicCarousel.jsx: no active imports; Gallery owns album navigation.
- src/components/PhotoSlot.jsx: only imported by the unused TopicCarousel.
- gallery.json: no runtime consumer; image discovery reads event folders directly.

## Modified files

- src/App.jsx: explicit portrait dimensions.
- src/components/Gallery.jsx: native modal, keyboard slideshow handling, live slide count, thumbnail dimensions, Photographs heading.
- src/styles.css: native dialog layout, image sizing, larger touch controls.
- src/gallery.js: remove unused exports and redundant cover URLs.
- src/data.js: remove unused presentation fields; preserve academic text and event mappings.
- .github/workflows/deploy-react.yml: test before build, trigger on test changes, remove deleted stylesheet trigger.
- README.md: remove obsolete manifest reference and describe deployment tests.

## Validation

- All 11 existing automated tests passed.
- Production build passed; relative Vite asset paths retained for GitHub Pages and Vercel.
- All six section anchors and generated entry assets checked.
- SHA-256 comparison confirmed all 38 original photo, caption, and placeholder files unchanged. Event folders preserved.
- Browser inventory was empty and opening the in-app browser returned Browser is not available: iab. Visual desktop/tablet/mobile checks, modal focus restoration, slideshow interaction, zoom/pan, and caption display still need browser verification. Utility tests cover numeric grouping, caption matching, and zoom/pan bounds.
- GitHub Actions and Vercel deployments were not executed.

## Remaining improvements

Confirm full publication titles, authors, and verified publication/preprint links before adding them. Several original photographs are 5.9?7.3 MB; optional separately generated thumbnails could improve gallery loading while retaining originals. The portrait currently falls back to the external GitHub avatar until an about or portrait image is supplied.

No commit or push was performed.
