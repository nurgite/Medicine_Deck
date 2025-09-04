# Medicine Man Deck (Early Build)

A lightweight, GitHub Pages–ready web app for your custom oracle deck. Shuffle, draw, and get meanings right in the browser.

## Features
- Single / Two / Three-card spreads
- Optional reversals
- Card images, meanings, movement ritual, mantra
- Copy-the-reading button
- Pure HTML/CSS/JS — easy to host on GitHub Pages

## Structure
```
/ (repo root)
├── index.html
├── styles.css
├── app.js
├── data/
│   └── cards.json
└── assets/
    ├── roadrunner.png
    ├── snake.png
    ├── owl.png
    └── back.png
```

## Add Your Art
Replace the placeholder PNGs in `assets/` with your card images (same filenames), or add new cards and point to them in `data/cards.json`.

## Add Cards
Edit `data/cards.json` and append entries like:
```json
{
  "id": "jaguar",
  "name": "Jaguar",
  "image": "assets/jaguar.png",
  "keywords": ["protection","courage","night-stalker"],
  "mantra": "My power is quiet and precise.",
  "movement": "Low, strong steps; shoulders relaxed; eyes soft but focused.",
  "meaning": "Jaguar guards the threshold. Move silently; act only when necessary.",
  "reversed": "Scattered force or posturing. Return to quiet strength."
}
```

## Run Locally
Just open `index.html` in your browser. (Or serve with any static server.)

## Deploy on GitHub Pages
1. Create a new GitHub repo, upload these files.
2. In repo settings → **Pages** → **Deploy from branch** → choose `main` and `/ (root)`.
3. Wait a minute; your deck will be live at `https://<your-username>.github.io/<repo-name>/`

## License
MIT — adapt freely. Card content © you.
