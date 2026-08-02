## Younus Ali — Portfolio

Multi-page portfolio built using HTML5, CSS3, JavaScript, and jQuery — following the same
structure and design system as the original template it was adapted from.

## 📌 Tech Stack
HTML5 · CSS3 · JavaScript · jQuery

### Extras
Particles.js, Typed.js, Vanilla-Tilt.js, ScrollReveal, Isotope, Font Awesome 6, and
JSON-driven skills/work/recommendations sections.

## 📁 Structure
```
index.html                     main page (all sections)
404.html                       not-found page
skills.json                    skills list, rendered into #skills
projects.json                  featured work preview, rendered into #work
recommendations.json           LinkedIn recommendation screenshots, rendered into #recommendations
assets/css/style.css           full site stylesheet
assets/js/app.js               library setup (particles, typed, tilt, scrollreveal)
assets/js/script.js            nav, scrollspy, JSON rendering, counters, contact form
assets/images/profile.jpg      your photo — replace this file to update it everywhere it's used
assets/images/recommendations/ recommendation screenshots (see below)
experience/                    full experience timeline subpage (own style.css/script.js)
projects/                      full project grid with category filtering (own style.css/script.js/projects.json)
.nojekyll                      tells GitHub Pages not to run this through Jekyll
```

## 🖼️ Updating your profile photo
Replace `assets/images/profile.jpg` with your own picture, keeping the same filename.
No HTML/CSS changes needed — it's referenced by that exact path.

## 💬 Adding/removing LinkedIn recommendations
1. Drop the screenshot into `assets/images/recommendations/`.
2. Add (or remove) a matching entry in `recommendations.json`:
   ```json
   { "file": "your-screenshot.jpg", "alt": "Recommendation from Jane Doe" }
   ```
That's it — the section re-renders itself from that file at runtime.

## ⚠️ Running locally
Because the skills/work/recommendations sections load their content via `fetch()`, opening
`index.html` directly by double-clicking it (a `file://` URL) will fail silently in most
browsers — `fetch()` of local JSON is blocked by CORS under `file://`. Serve the folder
instead:

```bash
npx serve .
# or
python3 -m http.server 8000
```

This is also how it's deployed (GitHub Pages, Netlify, etc. all serve over HTTP), so it's
not a concern once it's hosted.

## 🛠️ Recent fixes (code review)
- **Icons/skills not rendering**: the site was loading Font Awesome 5.15.3, but several icon
  names used across the site (including the header logo and most skills icons) only exist in
  Font Awesome 6. Upgraded the CDN link to 6.5.1 on every page.
- **ScrollReveal not animating skills/work cards**: those cards are injected asynchronously
  from JSON after ScrollReveal already scanned the page, so it found nothing to reveal.
  `app.js` now exposes the ScrollReveal instance so `script.js` can reveal those cards right
  after they're actually added to the DOM.
- **Everything looked "off" for some visitors**: a single `prefers-reduced-motion` check was
  gating particles, tilt, typed text, and ScrollReveal all at once. Now only the continuous
  particle background respects that preference.
- **Fragile CDN loading**: removed brittle SRI `integrity` hashes from the lower-traffic
  enhancement libraries (typed.js, vanilla-tilt, isotope), which fail silently with zero
  console clue if the CDN ever re-serves those bytes.
- Added `.nojekyll` for GitHub Pages robustness.

## 📬 Contact
- Email: aliunus926@gmail.com
- Phone: +92 305 343 5324
- LinkedIn: https://linkedin.com/in/aliunus

