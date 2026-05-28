# Implementation Plan: Taco Business Landing Page

## Overview

Build a static, responsive single-page restaurant website using HTML, CSS, and vanilla JavaScript. The page is structured as a single `index.html` document with modular CSS files and a small JS file for interactive behavior. Implementation proceeds section by section, wiring everything together at the end.

## Tasks

- [x] 1. Set up project structure and design tokens
  - Create the directory structure: `styles/`, `scripts/`, `assets/images/`, `assets/icons/`, `data/`
  - Create `styles/main.css` with all CSS custom properties (design tokens: colors, typography, spacing, breakpoints) as defined in the design document
  - Create `index.html` with the full semantic HTML skeleton: `<header>`, `<nav>`, `<main>` containing `<section>` elements for hero, menu, about, and contact, plus `<footer>`
  - Add `<link rel="preconnect">` for Google Fonts (Playfair Display, Inter) and the `<link rel="preload">` for the hero background image in `<head>`
  - _Requirements: 7.3_

- [x] 2. Create data files
  - [x] 2.1 Create `data/menu.js` with the `menuItems` array containing carnitas and al pastor entries (id, name, description, price, imageSrc, imageAlt)
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 2.2 Create `data/restaurant.js` with the `restaurantInfo` object containing name, tagline, address, phone, hours array, socialMedia array, and mapsEmbedUrl
    - _Requirements: 1.2, 1.3, 5.1, 5.2, 5.3, 5.6_

- [x] 3. Implement the Navigation Bar
  - [x] 3.1 Create `styles/nav.css` with styles for the fixed navigation bar, logo/name, and anchor links
    - Apply `position: fixed; top: 0` and appropriate z-index
    - Style the nav links for Menu, About, and Contact sections
    - _Requirements: 2.1, 2.2, 2.4_
  - [x] 3.2 Add the hamburger icon button and mobile nav styles to `styles/nav.css`
    - Hide the link list and show the hamburger icon when viewport < 768px
    - Add CSS transitions for the `.nav-open` class to show/hide the link list
    - _Requirements: 6.2_
  - [x] 3.3 Implement hamburger toggle and active-link tracking in `scripts/main.js`
    - Toggle `.nav-open` class on `<nav>` when hamburger is clicked
    - Close the mobile menu when any nav link is clicked
    - Use `IntersectionObserver` to add an active class to the nav link corresponding to the currently visible section
    - _Requirements: 2.2, 2.3, 6.2_
  - [x] 3.4 Write unit tests for navigation JavaScript behavior
    - Test that clicking the hamburger toggles `.nav-open` on the nav element
    - Test that clicking a nav link removes `.nav-open` (closes mobile menu)
    - Test that `IntersectionObserver` callback updates the active link class
    - _Requirements: 2.2, 2.3, 6.2_

- [x] 4. Implement the Hero Section
  - [x] 4.1 Add the Hero Section HTML to `index.html`
    - Include `<h1>` for restaurant name, `<p>` for tagline, and `<a>` CTA button linking to `#menu`
    - _Requirements: 1.2, 1.3, 1.4_
  - [x] 4.2 Create `styles/hero.css` with hero section styles
    - Set `min-height: 100vh`, background image with `--color-overlay` dark overlay
    - Style the `<h1>`, tagline paragraph, and CTA button using design tokens
    - Add `scroll-behavior: smooth` on `<html>` for CTA button smooth scroll
    - _Requirements: 1.4, 1.5_
  - [x] 4.3 Write example-based tests for the Hero Section
    - Test that `<h1>` contains the restaurant name
    - Test that the CTA button/link points to `#menu`
    - _Requirements: 1.2, 1.4_

- [x] 5. Implement the Menu Section
  - [x] 5.1 Add the Menu Section HTML to `index.html`
    - Include `<h2>` section heading and a container for Taco Cards
    - Render two `<article>` Taco Cards (one for carnitas, one for al pastor), each containing `<img>` (with `alt`), `<h3>` name, `<p>` description, and `<span>` price
    - Omit `<img>` element entirely if `imageSrc` is not available (no broken image fallback)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 5.2 Create `styles/menu.css` with menu section and Taco Card styles
    - CSS Grid layout: 2 columns on desktop, 1 column on mobile (< 768px)
    - Style `<article>` cards with surface color, spacing, and typography from design tokens
    - _Requirements: 3.4, 6.3_
  - [x] 5.3 Write example-based tests for the Menu Section
    - Test that the menu section contains exactly 2 Taco Cards
    - Test that each Taco Card contains a name, description, and price
    - Test that all `<img>` elements within Taco Cards have non-empty `alt` attributes
    - _Requirements: 3.1, 3.2, 3.3, 7.2_

- [x] 6. Implement the About Section
  - [x] 6.1 Add the About Section HTML to `index.html`
    - Include `<h2>` heading, `<p>` paragraphs describing restaurant background and culinary tradition, and `<img>` with descriptive `alt` text
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 6.2 Create `styles/about.css` with about section styles
    - Two-column layout on desktop (text left, image right), stacked single-column on mobile
    - Apply typography and spacing from design tokens
    - _Requirements: 4.3_

- [x] 7. Implement the Contact Section
  - [x] 7.1 Add the Contact Section HTML to `index.html`
    - Include address in `<address>` element
    - Display operating hours in a `<table>` or `<dl>` for semantic clarity
    - Wrap phone number in `<a href="tel:+1XXXXXXXXXX">` for native call behavior
    - Conditionally include Google Maps `<iframe>` only if `mapsEmbedUrl` is set
    - Conditionally include social media links (opening in new tab with `rel="noopener noreferrer"`) only if `socialMedia` array is non-empty
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  - [x] 7.2 Create `styles/contact.css` with contact section styles
    - Style address, hours table/list, phone link, map embed, and social links
    - Apply spacing and typography from design tokens
    - _Requirements: 5.1–5.6_
  - [x] 7.3 Write example-based tests for the Contact Section
    - Test that the contact section contains the address text
    - Test that the phone link has an `href` starting with `tel:`
    - Test that the hours table/list contains an entry for each day of the week
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 8. Implement the Footer
  - Add `<footer>` HTML with copyright notice and repeat of key navigation links
  - _Requirements: 7.3_

- [x] 9. Implement responsive styles
  - Create `styles/responsive.css` with media queries for all breakpoints
  - At < 768px: single-column menu grid, stacked about layout, hamburger nav visible
  - At ≥ 768px: two-column menu grid, side-by-side about layout, full nav link list visible
  - Ensure all text is legible (font-size ≥ 14px) at all supported viewport widths (320px–1920px)
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 10. Checkpoint — Wire everything together and verify structure
  - Import all CSS files into `index.html` via `<link>` tags in the correct order
  - Ensure `scripts/main.js` is loaded as a module (`<script type="module">`) at the end of `<body>`
  - Verify the page renders all sections in order: nav → hero → menu → about → contact → footer
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Accessibility and performance hardening
  - [x] 11.1 Audit and fix semantic HTML and ARIA
    - Verify all interactive elements (hamburger button, nav links, CTA) have accessible names
    - Add `aria-label` or `aria-expanded` to the hamburger toggle button
    - Ensure all `<img>` elements have non-empty `alt` attributes
    - Verify logical tab order through all interactive elements
    - _Requirements: 7.2, 7.3, 7.5_
  - [x] 11.2 Verify and fix color contrast
    - Check all text/background color pairs against WCAG 2.1 AA ratios (4.5:1 normal text, 3:1 large text) using the defined CSS custom properties
    - _Requirements: 7.4_
  - [x] 11.3 Add performance optimizations
    - Add `loading="lazy"` to all below-the-fold `<img>` elements
    - Confirm `<link rel="preload">` for hero background image is present in `<head>`
    - _Requirements: 7.1_
  - [x] 11.4 Write accessibility tests using axe-core
    - Set up `jest-axe` or `@axe-core/playwright` in the project
    - Run axe on the fully rendered page and assert zero critical or serious violations
    - Verify all images have non-empty `alt` attributes via axe audit
    - _Requirements: 7.2, 7.4, 7.5_
  - [x] 11.5 Write responsive layout tests using Playwright
    - At 320px viewport: assert hamburger menu is visible and nav links are hidden
    - At 320px viewport: assert menu section displays single-column layout
    - At 768px viewport: assert full nav link list is visible
    - At 1280px viewport: assert menu section displays two-column grid
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 12. Final checkpoint — Ensure all tests pass
  - Run the full test suite (unit tests, accessibility tests, responsive layout tests)
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- The design has no Correctness Properties section — property-based tests are not applicable for this static landing page; unit and accessibility tests are used instead
- JavaScript (hamburger toggle, smooth scroll, active link tracking) is a progressive enhancement — the page must remain functional without JS
- Placeholder content (restaurant name, address, phone, images) should be replaced with real assets before launch
