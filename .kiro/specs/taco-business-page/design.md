# Design Document: Taco Business Landing Page

## Overview

This document describes the technical design for a single-page restaurant website for a taco restaurant specializing in tacos de carnitas and tacos al pastor. The page serves as the restaurant's primary online presence — a static, responsive landing page built with HTML, CSS, and vanilla JavaScript (or a lightweight framework).

The design prioritizes fast load times, mobile-first responsiveness, accessibility compliance (WCAG 2.1 AA), and a visually compelling presentation of the restaurant's brand and menu.

### Key Design Decisions

- **Static site**: No backend required. All content is hardcoded or loaded from a local data file. This keeps hosting simple (GitHub Pages, Netlify, Vercel, etc.) and maximizes performance.
- **Vanilla HTML/CSS/JS**: No heavy framework dependency. A lightweight build tool (Vite) may be used for asset optimization and bundling.
- **Mobile-first CSS**: Styles are written for small viewports first, then enhanced with media queries for larger screens.
- **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` for accessibility and SEO.

---

## Architecture

The page is a single HTML document with modular CSS and a small JavaScript file for interactive behavior (smooth scrolling, hamburger menu toggle).

```
taco-business-page/
├── index.html          # Main HTML document
├── styles/
│   ├── main.css        # Global styles, CSS custom properties
│   ├── nav.css         # Navigation bar styles
│   ├── hero.css        # Hero section styles
│   ├── menu.css        # Menu section and Taco Card styles
│   ├── about.css       # About section styles
│   ├── contact.css     # Contact/location section styles
│   └── responsive.css  # Media queries for breakpoints
├── scripts/
│   └── main.js         # Navigation toggle, smooth scroll, active link tracking
├── assets/
│   ├── images/         # Hero background, taco photos, about section image
│   └── icons/          # Social media icons, map pin icon
└── data/
    └── menu.js         # Menu item data (name, description, price, image path)
```

### Section Layout (top to bottom)

```
┌─────────────────────────────────┐
│  Navigation Bar (fixed)         │
├─────────────────────────────────┤
│  Hero Section                   │
│  (name, tagline, CTA button)    │
├─────────────────────────────────┤
│  Menu Section                   │
│  (Taco Cards: carnitas, pastor) │
├─────────────────────────────────┤
│  About Section                  │
│  (story, image)                 │
├─────────────────────────────────┤
│  Contact Section                │
│  (address, hours, phone, map)   │
├─────────────────────────────────┤
│  Footer                         │
└─────────────────────────────────┘
```

---

## Components and Interfaces

### Navigation Bar

- Fixed position at top of viewport (`position: fixed; top: 0`)
- Contains the restaurant logo/name and anchor links: Menu, About, Contact
- On mobile (< 768px): collapses to a hamburger icon; clicking toggles a dropdown or slide-in menu
- JavaScript tracks scroll position to highlight the active section link (`IntersectionObserver` API)

**Hamburger toggle behavior:**
```
click hamburger icon → toggle `.nav-open` class on <nav>
                     → CSS transitions show/hide the link list
click any nav link   → close the mobile menu + smooth scroll to section
```

### Hero Section

- Full-viewport-height section (`min-height: 100vh`)
- Background: high-quality image with a dark overlay for text legibility
- Content: `<h1>` restaurant name, `<p>` tagline, `<a>` CTA button linking to `#menu`
- CTA button uses smooth scroll (CSS `scroll-behavior: smooth` on `<html>`)

### Menu Section

- Section heading (`<h2>`) identifying it as the menu
- Grid layout: 2 columns on desktop, 1 column on mobile
- Each `Taco_Card` is an `<article>` element containing:
  - `<img>` with descriptive `alt` text (conditionally rendered if image available)
  - `<h3>` taco name
  - `<p>` description of filling and preparation
  - `<span>` price

### About Section

- Two-column layout on desktop (text left, image right), stacked on mobile
- `<h2>` section heading
- `<p>` paragraphs describing restaurant background and culinary tradition
- `<img>` with descriptive `alt` text

### Contact Section

- Contains: address, operating hours table, phone number (tel: link), optional Google Maps embed, optional social media links
- Phone number wrapped in `<a href="tel:+1XXXXXXXXXX">` for native call behavior
- Hours displayed in a `<table>` or definition list (`<dl>`) for semantic clarity
- Google Maps embed via `<iframe>` (conditionally included)
- Social media links open in new tab with `rel="noopener noreferrer"`

### Footer

- Simple `<footer>` with copyright notice and repeat of key links

---

## Data Models

### Menu Item

Menu content is defined in a JavaScript data file for easy content updates:

```js
// data/menu.js
export const menuItems = [
  {
    id: "carnitas",
    name: "Tacos de Carnitas",
    description: "Slow-braised pork shoulder, cooked in its own fat until tender and golden. Served on a warm corn tortilla with onion, cilantro, and salsa verde.",
    price: "$3.50",
    imageSrc: "assets/images/carnitas.jpg",
    imageAlt: "Two tacos de carnitas on a corn tortilla topped with onion and cilantro"
  },
  {
    id: "pastor",
    name: "Tacos al Pastor",
    description: "Marinated pork cooked on a vertical spit, sliced thin and served with pineapple, onion, cilantro, and salsa roja on a corn tortilla.",
    price: "$3.50",
    imageSrc: "assets/images/pastor.jpg",
    imageAlt: "Tacos al pastor with pineapple and cilantro on a corn tortilla"
  }
];
```

### Restaurant Info

```js
// data/restaurant.js
export const restaurantInfo = {
  name: "Taquería El Sabor",
  tagline: "Carnitas & Al Pastor — Cooked the Traditional Way",
  address: "123 Main Street, City, State 00000",
  phone: "+1-555-000-0000",
  hours: [
    { day: "Monday",    open: "11:00 AM", close: "9:00 PM" },
    { day: "Tuesday",   open: "11:00 AM", close: "9:00 PM" },
    { day: "Wednesday", open: "11:00 AM", close: "9:00 PM" },
    { day: "Thursday",  open: "11:00 AM", close: "9:00 PM" },
    { day: "Friday",    open: "11:00 AM", close: "10:00 PM" },
    { day: "Saturday",  open: "10:00 AM", close: "10:00 PM" },
    { day: "Sunday",    open: "10:00 AM", close: "8:00 PM" }
  ],
  socialMedia: [
    { platform: "Instagram", url: "https://instagram.com/example", label: "Follow us on Instagram" },
    { platform: "Facebook",  url: "https://facebook.com/example",  label: "Like us on Facebook" }
  ],
  mapsEmbedUrl: "https://maps.google.com/maps?q=..." // optional
};
```

### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Colors */
  --color-primary:     #C0392B;  /* Deep red — brand accent */
  --color-secondary:   #E67E22;  /* Warm orange — secondary accent */
  --color-bg:          #FDFAF5;  /* Off-white — page background */
  --color-text:        #1A1A1A;  /* Near-black — body text */
  --color-text-light:  #FFFFFF;  /* White — text on dark backgrounds */
  --color-surface:     #FFFFFF;  /* Card backgrounds */
  --color-overlay:     rgba(0, 0, 0, 0.55); /* Hero image overlay */

  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;        /* 16px */

  /* Spacing */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  4rem;
  --space-xl:  8rem;

  /* Breakpoints (used in media queries) */
  --bp-mobile:  320px;
  --bp-tablet:  768px;
  --bp-desktop: 1200px;
}
```

---

## Correctness Properties

This feature is a static landing page consisting primarily of HTML structure, CSS layout, and minimal JavaScript for UI interactions (scroll behavior, menu toggle). The feature does not involve data transformation pipelines, parsers, serializers, or complex business logic algorithms.

**PBT Assessment**: Property-based testing is **not applicable** to this feature. The page's correctness is defined by:
- Visual rendering and layout (verified by snapshot/visual regression tests)
- DOM structure and semantic HTML (verified by example-based unit tests)
- Accessibility compliance (verified by automated accessibility scanners like axe-core)
- Performance metrics (verified by Lighthouse CI)

None of these are amenable to universal quantification over generated inputs in a cost-effective way. The Correctness Properties section is therefore omitted per the design guidelines.

---

## Error Handling

### Missing Images

- If a taco image is unavailable, the `<img>` element is omitted from the `Taco_Card` entirely (not replaced with a broken image icon). The card layout gracefully fills the space with text content only.
- All images include descriptive `alt` text regardless.

### Missing Optional Data

- If `mapsEmbedUrl` is not set, the Google Maps `<iframe>` is not rendered.
- If `socialMedia` array is empty, the social links section is not rendered.

### JavaScript Failures

- Smooth scrolling and hamburger menu are progressive enhancements. If JavaScript fails to load, anchor links still navigate to sections (default browser behavior), and the full navigation links remain visible (no JS-dependent layout).

### Slow Network / Image Loading

- Images use `loading="lazy"` attribute for below-the-fold content to avoid blocking initial render.
- Hero background image is preloaded via `<link rel="preload">` in `<head>` to prioritize above-the-fold content.

---

## Testing Strategy

This feature is a static landing page. Property-based testing does not apply (see Correctness Properties section). The testing strategy uses a combination of accessibility audits, visual snapshot tests, and example-based unit tests.

### Accessibility Testing

- **Tool**: [axe-core](https://github.com/dequelabs/axe-core) via `@axe-core/playwright` or `jest-axe`
- Run axe on the fully rendered page and each major section
- Verify zero critical or serious accessibility violations
- Verify color contrast ratios meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)
- Verify all images have non-empty `alt` attributes
- Verify all interactive elements are keyboard-reachable and have visible focus indicators

### Structural / Example-Based Tests

Using a DOM testing library (e.g., Playwright or jsdom + Testing Library):

| Test | Validates |
|------|-----------|
| Page contains `<header>`, `<nav>`, `<main>`, `<footer>` | Req 7.3 |
| Navigation bar contains links to #menu, #about, #contact | Req 2.2 |
| Hero section contains `<h1>` with restaurant name | Req 1.2 |
| Hero section contains CTA button/link pointing to #menu | Req 1.4 |
| Menu section contains exactly 2 Taco Cards | Req 3.1, 3.2 |
| Each Taco Card contains name, description, and price | Req 3.3 |
| Contact section contains address, phone `tel:` link, hours | Req 5.1–5.4 |
| Phone link has `href` starting with `tel:` | Req 5.4 |
| All images have non-empty `alt` attributes | Req 7.2 |

### Responsive Layout Tests

Using Playwright with viewport configuration:

| Viewport | Test |
|----------|------|
| 320px width | Navigation collapses to hamburger menu |
| 320px width | Menu section displays single-column layout |
| 375px width | All text is legible (font-size ≥ 14px) |
| 768px width | Navigation shows full link list |
| 1280px width | Menu section displays two-column grid |

### Performance Testing

- **Tool**: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- Run Lighthouse on the built page in mobile simulation mode
- Assert performance score ≥ 80
- Assert all images have `alt` text (Lighthouse accessibility audit)

### Visual Regression Tests (Optional)

- **Tool**: Playwright with `toHaveScreenshot()` or Percy
- Capture baseline screenshots at 375px, 768px, and 1280px viewports
- Detect unintended visual regressions on future changes

### Manual Testing Checklist

- [ ] Keyboard navigation: Tab through all interactive elements in logical order
- [ ] Screen reader: Verify headings, landmarks, and image alt text are announced correctly
- [ ] Phone link: Tap on mobile device to confirm native dialer opens
- [ ] Smooth scroll: Click nav links and CTA button to verify smooth scroll behavior
- [ ] Hamburger menu: Open and close on mobile viewport; verify links close the menu
