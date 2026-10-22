# Md Sazzad Hossain — Personal research portfolio

## React portfolio (version 2)

The React/Vite project runs from the repository root, with source code in [`src/`](src/). It includes interactive research filters, expandable project notes, a responsive gallery, photo carousels for research and achievement cards, and a full-screen photo viewer.

The React app is the main site, deployed with GitHub Actions.

### Add your photographs (no code editing)

Put photos in **`src/assets/photos/`**. Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` (uppercase extensions also work). The build discovers them automatically.

| Place on website | Folder inside `src/assets/photos/` |
| --- | --- |
| Homepage portrait | `portrait.jpg` (top-level image, not a folder) |
| Underwater research | `underwater/` |
| Model reliability research | `model-reliability/` |
| Thermal IR research | `thermal-ir/` |
| Research poster/talk | `research-presentation/` |
| ICPC regional contest | `icpc/` |
| MumbaiHacks invitation | `mumbai-hacks/` |
| National Innovation Fair | `innovation-fair/` |
| Club leadership | `club/` |
| Teaching foundation course | `teaching/` |
| Community/campus | `campus/` |
| Programming Combat award | `programming-combat/` |
| Battle of Brains award | `battle-of-brains/` |
| Poster presentation award | `poster-champion/` |
| General awards | `awards/` |

### Multiple photos for a single topic

Each event already has its own folder. Simply upload photos with consecutive numbers:

```text
src/assets/photos/
├── club-leadership.JPG        # your existing photo is preserved
├── icpc-dhaka-2023.JPG        # your existing photo is preserved
├── club/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.webp
├── icpc/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
└── teaching/
    ├── 1.jpg
    └── 2.jpg
```

**Uploading on GitHub:** Open the desired folder, choose **Add file → Upload files**, select your local `1.jpg`, `2.jpg`, `3.jpg` files, and commit. The `.gitkeep` files only make the empty folders visible in GitHub.

Your original top-level photos and older naming pattern are still supported. Their images join the matching event collection automatically. New photos display in natural numeric order (`1, 2, 3, …, 10`), with carousel arrows, dots, keyboard arrows and mobile swipe. A single photo displays normally.

**Adding a new event:** Create another folder such as `robotics-contest/` and put `1.jpg`, `2.jpg` inside. The Gallery will automatically group those images into one new album. No React or JSON editing is needed.

Only use photographs you have permission to publish. An invitation should not be illustrated as attendance unless you actually participated. For faster loading, prefer compressed JPEG or WebP images (ideally under 400 KB each).

### Develop and test locally

Run from the **repository root**:

```sh
npm install
npm run dev
npm test
npm run build
```

Vite uses relative asset paths (`base: './'`) so the site works on GitHub Pages at `https://1sazzad.github.io/profile/` and on Vercel.

### GitHub Pages deployment

1. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
2. The workflow at `.github/workflows/deploy-react.yml` builds and publishes the site when React source files, photos, or package files change on `main`.
3. The built output is deployed from `dist/`.

The existing `gallery.json` is retained as legacy metadata. The current React gallery reads the real images in `src/assets/photos/` automatically.

## License

Personal profile content, photographs, and identity belong to Md Sazzad Hossain. No general reuse license is granted for personal content or photographs.
