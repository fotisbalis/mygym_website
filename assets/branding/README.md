# MYGYM branding

The site uses two transparent PNG files supplied by the client in `assets/images/`:

- `MYGYM_Logo.png` (1983 × 482): wordmark for the navbar and favicon.
- `MYGYM_logo_with_FITNESS_EXCELLENCE.png` (1983 × 793): complete logo and motto for the hero and footer. The footer has no separate motto text.

Both images display at their original aspect ratios without cropping. The navbar/footer link retains an accessible name and returns to the home section.

The logo URLs and intrinsic dimensions (`logo` and `fullLogo`), gym name and motto are configured in `src/config/site.js`. The static favicon is configured in `index.html`. `favicon.svg` centers the unmodified wordmark in a transparent square, keeping its original width-to-height ratio so browsers do not stretch it. The logo spans the canvas width; transparent space sits above and below. Regenerate it after replacing the wordmark with `node scripts/generate-favicon.mjs`. The earlier blue-background `mygym-logo.png` is retained here as an unused original asset.
