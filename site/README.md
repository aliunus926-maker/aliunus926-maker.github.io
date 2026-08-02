## Younus Ali — Portfolio

Multi-page portfolio built using HTML5, CSS3, JavaScript, and jQuery — following the same
structure and design system as the original template it was adapted from.

## 📌 Tech Stack
HTML5 · CSS3 · JavaScript · jQuery

### Extras
Particles.js, Typed.js, Vanilla-Tilt.js, ScrollReveal, Isotope, Font Awesome, and JSON-driven
skills/work sections.

## 📁 Structure
```
index.html                 main page (all sections)
404.html                   not-found page
skills.json                skills list, rendered into #skills by assets/js/script.js
projects.json               featured work preview, rendered into #work
assets/css/style.css       full site stylesheet
assets/js/app.js           library setup (particles, typed, tilt, scrollreveal)
assets/js/script.js        nav, scrollspy, JSON rendering, counters, contact form
assets/images/             SVG illustrations (no stock photos used)
experience/                full experience timeline subpage (own style.css/script.js)
projects/                  full project grid with category filtering (own style.css/script.js/projects.json)
```

## ⚠️ Running locally
Because the skills and work sections load their content via `fetch()`, opening `index.html`
directly by double-clicking it (a `file://` URL) will fail silently in most browsers —
`fetch()` of local JSON is blocked by CORS under `file://`. Serve the folder instead:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then visit `http://localhost:PORT`. This is also how it should be deployed (Netlify, GitHub
Pages, Vercel, etc. all serve over HTTP, so this isn't a concern once it's hosted).

## 📬 Contact
- Email: aliunus926@gmail.com
- Phone: +92 305 343 5324
- LinkedIn: https://linkedin.com/in/aliunus
