# Md Sazzad Hossain — Personal research portfolio

## React portfolio (version 2)

The new React/Vite source is in [`app/`](app/). It adds interactive research filters, expandable project notes, achievement photo slots, a photo archive with category filters, a keyboard-friendly full-screen viewer, and responsive layouts.

**The original root `index.html` is retained as a working fallback** until you switch GitHub Pages to the React deployment.

### Add your photographs (no code editing)

Create or open the folder `app/src/assets/photos/` and drop your images there. Use one of the filenames below (any `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif` extension). The build finds the files automatically and replaces the corresponding photo placeholders.

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

The root npm commands install and run the React project in `app/`. You do not need to change into that folder.

Build for GitHub Pages with `npm run build`. The configuration includes `base: '/profile/'` so assets resolve at `https://1sazzad.github.io/profile/`.

### Activate the React version on GitHub Pages

1. In your repository, open **Settings → Pages**.
2. Under **Build and deployment → Source**, change **Deploy from a branch** to **GitHub Actions**.
3. Open the repository **Actions** tab and run **Build and deploy React portfolio** using **Run workflow**. Future commits that modify the React app or add photos deploy automatically.

The workflow at `.github/workflows/deploy-react.yml` installs, builds, and publishes the React app. Until you change the source setting, the existing root site remains available.

---

## Original static portfolio (version 1)

A responsive, single-page personal website built with HTML, CSS, and JavaScript. No build step or dependencies are required. It is designed for GitHub Pages and works at a repository subpath such as `https://1sazzad.github.io/profile/`.

## Sections

- Introduction and academic background
- Selected research themes and scholarly work
- Leadership, teaching, awards, and competitive programming
- Filterable photo journal with full-screen gallery viewer
- Contact links

The site uses a GitHub profile avatar for the main portrait. Replace its `src` in `index.html` with a local image when a preferred professional photo is available.

## Add your own photos

1. Add the original photographs to `assets/photos/` (create the folder if necessary). Use descriptive, lowercase names, for example `icpc-dhaka-2025.jpg`.
2. Edit `gallery.json`. Add one object per photograph, like the example below. The initial empty array intentionally displays editorial cards until real photos are added.

```json
[
  {
    "src": "assets/photos/icpc-dhaka-2025.jpg",
    "title": "At the ICPC Dhaka Regional",
    "category": "events",
    "caption": "Dhaka, Bangladesh · 2025",
    "alt": "Md Sazzad Hossain with teammates at a programming contest",
    "size": "wide"
  },
  {
    "src": "assets/photos/research-poster.jpg",
    "title": "Presenting research",
    "category": "research",
    "caption": "Research presentation",
    "alt": "Research presentation photo",
    "size": "narrow"
  }
]
```

Supported categories: `research`, `events`, `awards`, `community`. Supported sizes: `wide`, `narrow`, `tall`, or omit for a regular card. Only reference photos you actually upload and have permission to publish. Image formats `.jpg`, `.png`, `.webp`, and `.avif` work in modern browsers. For faster loading, export most photos at approximately 1600 pixels on the long edge, typically under 400 KB when practical.

The gallery automatically renders every valid entry, arranges cards responsively, filters by category, and opens a keyboard-accessible lightbox. No code changes are needed as photos are added.

## Preview locally

Run a local static server in the repository directory, for example:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. A server is needed for loading `gallery.json`; double-clicking `index.html` directly may block the manifest request.

## Publish with GitHub Pages

In the repository on GitHub, navigate to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose `main`, then `/ (root)`, and save. GitHub will provide the Pages address after deployment. If Pages is already enabled, pushing updates to `main` should redeploy it automatically.

## Before sharing widely

- Replace the GitHub avatar with your preferred portrait.
- Add verified paper titles, co-authors, DOIs, and links once confirmed.
- Upload your real photographs and fill `gallery.json`.
- Check invitation versus attendance wording for individual events.
- Update your degree status when final results are published.

## License

Personal profile content, photographs, and identity belong to Md Sazzad Hossain. No general reuse license is granted for personal content or photographs.
