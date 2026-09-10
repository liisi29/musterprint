# Musterprint

Single-page brochure site for Musterprint (siiditrükikoda, Tartu / Tallinn).

Plain static files — no build step, no dependencies. Written from scratch;
brand assets (logo, photos, GIFs) belong to Musterprint.

## Structure

```
index.html            – the whole page
assets/css/style.css  – hand-written styles, no framework
assets/js/main.js      – service modals + mobile nav
assets/media/          – images (card thumbnails + per-service galleries)
```

## Run locally

Any static server, e.g.:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly via `file://` also works, except the
embedded Google map (needs http).

## Deploy

Upload the whole folder to any static host (or the current server's
web root). Nothing to compile.

## TODO

- **Contact form backend.** The form is UI only right now — same setup as
  the Rahuloom site is to be wired in later. Includes a hidden honeypot
  field (`website`) for spam filtering.
- Consider compressing the large media files (`logo-hero.svg` ~1.5 MB,
  `pakend-4.jpg` ~3.5 MB) before going live.
