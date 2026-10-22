# Md Sazzad Hossain — Personal research portfolio

## React portfolio (version 2)

The React/Vite project runs from the repository root, with source code in [`src/`](src/). It includes interactive research filters, expandable project notes, a responsive gallery, photo carousels for research and achievement cards, and a full-screen photo viewer.

The React app is the main site, deployed with GitHub Actions.

### Add your photographs (no code editing)

Put photos in **`src/assets/photos/`**. Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` (uppercase extensions also work). The build discovers them automatically.

| Place on website | Photo filename or folder name |
| --- | --- |
| Homepage portrait | `portrait` |
| Underwater research | `research-underwater` |
| Model reliability research | `research-reliability` |
| Thermal IR research | `research-thermal` |
| Research poster/talk | `research-presentation` |
| ICPC regional contest | `icpc-regional` |
| MumbaiHacks invitation | `mumbai-hacks` |
| National Innovation Fair | `innovation-fair` |
| Club leadership | `club-leadership` |
| Teaching foundation course | `teaching-foundation` |
| Community/campus | `campus-community` |
| Programming Combat award | `programming-combat` |
| Battle of Brains award | `battle-of-brains` |
| Poster presentation award | `poster-champion` |
| General awards | `awards-moment` |

### Multiple photos for a single topic

For a Programming Club card with multiple images, choose **either or both** of these arrangements:

**A. Same prefix in the main photo folder**

```text
src/assets/photos/
├── club-leadership.JPG        # cover image (already uploaded)
├── club-leadership-02.jpg
├── club-leadership-03.webp
└── club-leadership-workshop.jpg
```

**B. A dedicated subfolder for the topic**

```text
src/assets/photos/
├── club-leadership.JPG        # optional cover image
├── club-leadership/
│   ├── 01.jpg
│   ├── 02.jpg
│   └── 03.webp
└── icpc-regional/
    ├── 01.jpg
    └── 02.jpg
```

The unnumbered top-level file becomes the cover, followed by naturally ordered additional slides. Visitors can use previous/next arrows, slide dots, keyboard arrow keys, and swipe gestures on mobile. The Gallery shows one collection per topic; opening it provides a full-screen slideshow with its own arrows. A single photo appears normally without controls.

Apply the same naming pattern to any topic in the table above. No React or JSON edits are required. Other photos with distinct names appear in the Gallery as separate moments. Photos not matching a known topic are categorized by filename (`research-`, `award-`, `club-`, or `teaching-`), otherwise they appear under Events.

Only use photographs you have permission to publish. An invitation should not be illustrated as attendance unless you actually participated. For faster loading, prefer compressed JPEG or WebP images (ideally under 400 KB each).

### Develop and test locally

Run from the **repository root**:

```sh
npm install
npm run dev
npm test
npm run build
```

Vite is configured with `base: '/profile/'` for `https://1sazzad.github.io/profile/`.

### GitHub Pages deployment

1. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
2. The workflow at `.github/workflows/deploy-react.yml` builds and publishes the site when React source files, photos, or package files change on `main`.
3. The built output is deployed from `dist/`.

The existing `gallery.json` is retained as legacy metadata. The current React gallery reads the real images in `src/assets/photos/` automatically.

## License

Personal profile content, photographs, and identity belong to Md Sazzad Hossain. No general reuse license is granted for personal content or photographs.
