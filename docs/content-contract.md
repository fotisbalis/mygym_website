# Content contract and future Sanity integration

The frontend depends on three asynchronous functions exported by `src/services/contentService.js`:

| Function | Returns |
| --- | --- |
| `getGymInfo()` | `Promise<GymInfo>` |
| `getGalleryImages()` | `Promise<GalleryImage[]>` in owner-defined order |
| `getWeeklySchedule()` | `Promise<TrainingClass[]>` |

Return ordinary, serializable data. Empty collections are `[]`; a network or validation failure rejects with an `Error`. Components receive data through arguments and never import a provider or mock data. The application shows a loading status, isolates section failures and provides a retry button. Configuration is loaded first because it supplies shared locale, timezone and brand settings.

## Entities

The footer renders `GymInfo.openingHours` in the supplied order, including closed-day labels. Separate split opening periods with a newline in the `hours` string (for example, Saturday: `10:00 – 13:00\n17:00 – 21:00`); the footer displays each period on its own line. There is no separate opening-hours section. Group classes remain a separate collection from `getWeeklySchedule()` and load independently.

```js
// Image: public URL, descriptive Greek alternative text, intrinsic dimensions.
{
  src: '/assets/images/photo.webp', // or a public HTTPS CDN URL
  alt: 'Περιγραφή της φωτογραφίας',
  width: 1800,
  height: 1200
}

// GymInfo: a singleton document; see src/config/site.js for complete sample.
{
  name: 'MYGYM',
  tagline: 'FITNESS EXCELLENCE',
  locale: 'el-GR',
  timeZone: 'Europe/Athens',
  logo: { src: '/assets/images/MYGYM_Logo.png', width: 1983, height: 482 },
  fullLogo: { src: '/assets/images/MYGYM_logo_with_FITNESS_EXCELLENCE.png', width: 1983, height: 793 },
  theme: { accent: '#509ff5', accentInk: '#03182b' },
  demo: true,
  contact: {
    address: '...', city: '...', phone: '...', email: '...', mapsUrl: 'https://...',
    phoneIcon: { src: '/assets/images/phone.png', width: 1209, height: 1135 },
    emailIcon: { src: '/assets/images/email.png', width: 1304, height: 912 }
  },
  socials: [{ id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/MyGym.her', icon: { src: '/assets/images/facebook.png', width: 1024, height: 1536 } }],
  openingHours: [{ label: 'Δευτέρα – Παρασκευή', hours: '09:00 – 22:00' }],
  facilityHighlights: ['Ελεύθερα βάρη', 'Ομαδικά προγράμματα', 'Προσωπική καθοδήγηση'],
  hero: {
    image: { src: '...', mobileSrc: '...', alt: '...', width: 1800, height: 1200 }
  }
}

// GalleryImage: extends Image. Array order controls display order.
{ id: 'strength', src: '...', alt: '...', width: 900, height: 600, title: '...', label: '...' }

// TrainingClass: recurring weekly session, Monday through Saturday.
{
  id: 'monday-pilates',
  day: 'monday', // monday | tuesday | wednesday | thursday | friday | saturday
  name: 'Pilates Mat',
  startTime: '18:00', // zero-padded local HH:mm
  endTime: '19:00'    // same-day end; strictly after start
  // category and instructor are optional; omitted when not supplied.
}

```

All IDs must be unique within their collection. Require nonempty class names and alternative text for informative images. Category and instructor fields are optional; the renderer only displays a category when supplied and does not display instructors. The current schedule is transcribed from the client video documented in `docs/schedule-source.md`. Validate URL schemes, image dimensions, weekdays and time ranges in the future adapter and CMS schemas. Do not silently turn API failures into empty collections. The local provider supplies valid data; this MVP does not include a generic runtime schema validator.

Announcements are deliberately unimplemented pending the gym owner's requirements. Their navigation anchor and eyebrow heading are static HTML in `index.html`. There is no announcement data model, provider method, renderer or pagination in the application. Agree those requirements before extending this contract.

## Future Sanity adapter (not implemented)

1. Create a separate Sanity Studio with a gym singleton, an ordered gallery array and training class documents. Use constrained day values, time validation and required alt text. Keep gallery order editable by the owner. Image, link and descriptive copy fields map to the shapes above.
2. Implement `src/services/sanityContentService.js` with the same three async methods. Normalize Sanity `_id`, asset references, image dimensions and any references inside this adapter. Do not pass Sanity documents or image builders into components.
3. Project Sanity images into public, appropriately sized URLs. Preserve crop/hotspot settings, request WebP/AVIF where appropriate and return intrinsic dimensions. Resolve arrays in the owner's chosen order.
4. Return only published content. Leave the announcements placeholder unchanged until the owner has agreed its scope.
5. Replace the provider import in `contentService.js`. Keep component APIs unchanged. Run the content tests and browser smoke checks, including empty content, slow responses, provider errors and retry behavior.
6. Configure permitted production/preview origins in Sanity. A public dataset can be read without a private token. Public project ID and dataset names may be exposed, but **never put a write token, private read token or draft token in client code or a `VITE_*` variable**. If private reads are needed, add a trusted server-side boundary in a separate future phase.

This is an integration plan, not an installed CMS. No Sanity SDK, backend, credentials, authentication, booking or payment system is included.

## Localization

Interface copy and weekday labels live in `src/locales/el.js`. A future locale module should export the same messages and days. Editorial translations belong to the provider. Set `GymInfo.locale` and `timeZone` for date formatting and the current-day indicator; load the matching dictionary in the entry point. The current version ships Greek only, with no language selector. Update the static shell's `lang`, fallback text and metadata as part of a future localized build.

## Safe rendering and accessibility

CMS-controlled text is assigned with `textContent`; the renderer does not parse content as HTML. Links and image URLs pass through a protocol allowlist. External links use `noopener noreferrer`. Theme values must be six-digit hex colors. Rich text, if later required, needs an explicit block renderer with an allowlisted schema.

Filters use native buttons with `aria-pressed`, standard Tab/Enter/Space navigation and a live result count. The gallery supports native touch/trackpad scrolling, horizontal scrolling with the mouse wheel, mouse dragging, previous/next arrow buttons with accessible labels and keyboard arrow keys. Vertical wheel events scroll the page at gallery boundaries, and Ctrl-wheel zoom is preserved. Mobile navigation manages `aria-expanded`, closes on Escape, returns focus to its toggle, and removes hidden links from keyboard navigation. Motion respects the user's reduced-motion preference.
