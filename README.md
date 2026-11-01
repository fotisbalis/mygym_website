# MYGYM — Gym website

A Greek-language, responsive gym website built with semantic HTML, CSS, vanilla ES modules and Vite. MYGYM uses the supplied gym logo, contact details, opening hours and Facebook page. The group schedule is transcribed from the supplied gym video; see [schedule source](docs/schedule-source.md). No backend or CMS is installed.

## Run locally

Requires Node.js 20.19+ or 22.12+ (Node 24 also works) and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For production:

```sh
npm run build
npm run preview
```

The deployable output is `dist/`. For reproducible installs, use `npm ci` with the committed lockfile. Vite is the only project dependency and is development-only.

## Included

- Sticky navigation with a linked logo on the left, section links on the right, active location, keyboard focus styles, a skip link and a mobile menu.
- Large photographic hero with a contact link, footer social links and a horizontal gallery with mouse-wheel scrolling, click-and-drag, native touch/trackpad scrolling, keyboard support and disabled end controls. Facility highlights appear below the gallery controls and are configured in `GymInfo.facilityHighlights`. Vertical wheel scrolling resumes the page at either gallery edge.
- Group programs have a dedicated section and navigation link. Opening hours appear only in the footer, using `GymInfo.openingHours`, including closed days.
- Group classes sorted by start time. All days containing classes are always visible, without day filters. Columns fit the available days on wide desktops, with up to three on tablets; phones stack every available day vertically. Days without classes remain hidden. An entirely empty schedule displays one empty-state message.
- Announcements are intentionally deferred pending discussion with the gym owner. Only the navigation link and static eyebrow heading remain; there is no announcement JavaScript, content service, mock data or pagination.
- Central contact details, hours, phone/email links, social links, maps and current-year copyright.
- Independent async loading/error/retry states, safe text rendering, URL filtering and reduced-motion support.
- Local optimized WebP assets; no external fonts or runtime libraries.

## Project structure

```text
assets/
  branding/                Supplied MYGYM logo and usage notes
  images/                  Local photography and source/license notes
src/
  components/              Navbar, hero, gallery, group schedule, footer
  config/site.js           Central brand, locale, contact and opening hours
  data/mockData.js          Local content and the supplied gym schedule
  locales/el.js            Greek UI dictionary and weekday labels
  services/
    contentService.js      Stable async interface / provider selection
    mockContentService.js  Initial data provider
  styles/                  Variables, base, component and responsive CSS
  utils/                   Safe DOM helpers and pure content utilities
  main.js                  Data orchestration and component composition
tests/content.test.js      Node's built-in test runner; no test dependency
docs/content-contract.md   Entity schemas and Sanity integration plan
index.html                 Semantic shell, static SEO and no-JS fallback
```

## Change branding and content

1. Edit `src/config/site.js` for the name, logo, tagline, accent/foreground colors, locale, timezone, contact details, social URLs and hours. Accent hover/tints derive from the configured color. Keep sufficient text contrast when rebranding. Base colors, typography and spacing are CSS custom properties in `src/styles/variables.css`.
2. Edit `src/data/mockData.js` for hero imagery, gallery order and class sessions. Add/remove array entries; the components update automatically. Use zero-padded times. The announcements eyebrow is static HTML in `index.html` until its requirements are agreed.
3. Replace the local assets and update their dimensions and alternative text. See `assets/images/README.md` for source links and licensing.
4. Interface text is in `src/locales/el.js`. The static HTML contains initial title/description, fallback labels, favicon and no-JS text so these remain useful before the application loads. Update this small static SEO shell when rebranding as well. The application sets the live document title from configuration.

Components never import mock data. The main entry point reads the content service and passes DTOs to each renderer. The mock service returns cloned data asynchronously, leaving the presentation layer independent of content storage.

## Future CMS

See [the complete content contract and Sanity plan](docs/content-contract.md). Implement the same three asynchronous methods in a new provider and change the import in `contentService.js`. Normalize the CMS response in the adapter; the components remain unchanged. The plan covers editable images/order, classes, gym details, image transforms, published content and credential boundaries. Announcements will need an agreed content model and UI before implementation.

## Verification

```sh
npm test
npm run build
```

The tests cover dangerous URL schemes, chronological sorting, nonmutation, service isolation, content contracts and the eleven sessions transcribed from the gym video. For browser checks, verify desktop/mobile navigation, all populated days visible without filters, hidden empty days and a fully empty schedule, horizontal gallery controls, the static announcements anchor, keyboard operation and error/retry states. Test reduced motion and 320–1440px widths. An automated check is not a substitute for final content and accessibility review with the client's real material.

## Static deployment

### GitHub Pages (automatic deployment)

`.github/workflows/deploy.yml` installs locked dependencies with `npm ci`, runs the tests, builds the site with Node.js 24, and deploys only `dist/` on every push to `main`. A local commit alone does not trigger deployment; push it to GitHub. You can also run **Deploy website to GitHub Pages** manually from the Actions tab on `main`.

One-time setup in `fotisbalis/mygym_website`:

1. Open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
2. Confirm your existing domain is listed under **Custom domain** for this repository. Domain configuration belongs to the repository's Pages settings; this workflow does not change DNS or the domain. Custom Actions deployments do not require a `CNAME` file.
3. Commit and push the workflow and source files to `main`. Follow the run under **Actions**; a successful deployment includes the live site URL.

The workflow reads the configured Pages base path and passes it to Vite, supporting both a custom domain and the default repository subdirectory URL. No personal access token or additional deployment secrets are required; it uses GitHub's built-in token and Pages environment. Tests or build failures stop deployment.

Keep editable images and PDFs in the source assets folders, never in `dist/`: Vite regenerates `dist` during each build. Only files included by the build reach the published site; a PDF placed in the repository root is not automatically published.

References: [Vite deployment guide](https://vite.dev/guide/static-deploy#github-pages), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Other static hosts

For Cloudflare Pages or another static host:

- Build command: `npm run build`
- Output directory: `dist`
- Runtime: a supported Node version
- No server, credentials or environment variables required for the mock site

For deployment below a URL subdirectory, configure Vite's `base` before building. Asset imports are processed by Vite. The MVP uses anchor navigation, so no SPA route rewrite is needed.

Before public launch, confirm that the supplied class schedule is still current, approve imagery, agree the announcements requirements with the owner, set `demo: false`, and remove the deliberate `noindex, nofollow` tag from `index.html`. Add the final production canonical URL and sharing metadata once the real domain is known. The page is intentionally excluded from indexing during development. Dynamic content renders client-side; consider build-time prerendering later if stronger search indexing of editorial content becomes necessary.
