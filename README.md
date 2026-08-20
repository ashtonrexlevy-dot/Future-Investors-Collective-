# Future Investors Collective — Website

A static, multi-page marketing site for FIC (Future Investors Collective). No
build step, no framework — just `index.html`, `styles.css`, `main.js`, and a
handful of HTML pages.

## Before you launch — replace these placeholders

- [ ] **`REPLACE_WITH_FORMSPREE_ID`** in [`get-started.html`](get-started.html)
      — the Formspree form action currently points to
      `https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID`. To fix:
      1. Create a free account at [formspree.io](https://formspree.io).
      2. Create a new form and verify Ashton's email as the destination inbox.
      3. Copy the form ID Formspree gives you (the part after `/f/`) and
         paste it into the `action` attribute.
      - If you'd rather not use Formspree at all, open
        [`main.js`](main.js) and switch from "Option A: Formspree" to
        "Option B: mailto fallback" as described in the comments there.
- [ ] **`REPLACE_WITH_ASHTON_EMAIL`** — appears in [`contact.html`](contact.html)
      (email card + `mailto:` link) and in the commented-out mailto fallback
      in [`main.js`](main.js).
- [ ] **`REPLACE_WITH_PHONE`** — appears in [`contact.html`](contact.html)
      (phone card + `tel:` link).
- [ ] **`REPLACE_WITH_INSTAGRAM_HANDLE`** — appears in the footer of every
      page and on [`contact.html`](contact.html). Update both the link
      (`https://instagram.com/REPLACE_WITH_INSTAGRAM_HANDLE`) and the
      displayed `@REPLACE_WITH_INSTAGRAM_HANDLE` text.
- [ ] **`[Founder Name]`** — appears at the bottom of the founder letter on
      [`story.html`](story.html). Replace with the real signature.
- [x] **`assets/logo.png`** — the real FIC logo is in place and appears in
      the header, footer, and homepage hero.
- [x] **`assets/favicon.ico`** — generated from the real logo.

## Preview locally

No build step required. Just open [`index.html`](index.html) directly in
your browser, or serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

### Netlify

1. Drag and drop the `fic-site` folder onto [app.netlify.com/drop](https://app.netlify.com/drop),
   or connect the repo containing this folder and set the site's
   publish directory to `fic-site` (or the repo root if this folder *is*
   the repo root).
2. No build command is needed — it's a static site.

### GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo settings, go to **Pages** and set the source to the branch
   and folder containing these files (e.g. `main` / `root` or `main` / `fic-site`,
   depending on your repo layout).
3. GitHub Pages will serve `index.html` automatically.

### Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Framework preset: "Other" — no build command, output directory is the
   project root (or `fic-site` if nested).

## Structure

```
fic-site/
  index.html        Home
  mission.html       Our Mission
  story.html         Our Story
  get-started.html   Get Started (interest form)
  contact.html       Contact
  styles.css         All styles
  main.js            Nav toggle, scroll reveal, form handling
  assets/
    logo.png         Placeholder — replace with real logo
    favicon.ico       Placeholder — regenerate from real logo if desired
  README.md
```
