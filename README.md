# simplyledgers-web

Static marketing website for SimplyLedgers, AI-powered accounting, GST & TDS automation for CA firms.

## Pages

- `index.html` — home
- `platform.html` — platform overview
- `book-demo.html` — demo request form

## Run locally

```sh
python -m http.server 8080
```

Then open http://127.0.0.1:8080.

## Notes

- `styles.css` is the compiled Tailwind build; edit the HTML class names directly.
- `site.js` handles the mobile menu, header scroll style and form submit.
- The demo form has no backend yet — connect it to Formspree, Netlify Forms or an API in `site.js`.
