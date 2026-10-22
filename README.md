# Md Sazzad Hossain — Personal research portfolio

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
