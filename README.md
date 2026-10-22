# Md Sazzad Hossain — Personal research portfolio

## React portfolio (version 2)

The React/Vite project runs from the repository root, with source code in [`src/`](src/). It adds interactive research filters, expandable project notes, achievement photo slots, a photo archive with category filters, a keyboard-friendly full-screen viewer, and responsive layouts.

The React app is the main site. Use the GitHub Actions deployment below to publish it.

### Add your photographs (no code editing)

Create or open the folder `src/assets/photos/` and drop your images there. Use one of the filenames below (any `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif` extension). The build finds the files automatically and replaces the corresponding photo placeholders.

| Place on website | Photo filename (without extension) |
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

You can add additional photographs with other descriptive names too; they will appear in the gallery automatically. Prefix extra files with `research-`, `award-`, `club-`, or `teaching-` to assign a category automatically; other names default to Events.

Please use only images you have permission to publish. In particular, **an invitation should not be illustrated as physical attendance** unless you actually participated. Prefer compressed WebP or JPEG images (ideally under 400 KB each) for fast loading.

### Develop locally

Run these commands from the repository root (`E:\sazzad\Profile`):

```sh
npm install
npm run dev
```

All npm commands run directly from the repository root.

Build for GitHub Pages with `npm run build`. The configuration includes `base: '/profile/'` so assets resolve at `https://1sazzad.github.io/profile/`.

### Activate the React version on GitHub Pages

1. In your repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, change **Deploy from a branch** to **GitHub Actions**.
3. Open the repository **Actions** tab and run **Build and deploy React portfolio** using **Run workflow**. Future commits that modify the React app or add photos deploy automatically.

The workflow at `.github/workflows/deploy-react.yml` installs, builds, and publishes the React app. The production output is written to `dist/`.


Your existing `gallery.json` is preserved as legacy photo metadata; the React gallery discovers images in `src/assets/photos/` automatically.

## License

Personal profile content, photographs, and identity belong to Md Sazzad Hossain. No general reuse license is granted for personal content or photographs.
