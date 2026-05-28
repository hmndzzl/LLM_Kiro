# Taquería El Sabor — Landing Page

### Author: Hugo Méndez Lee - 241265

A static, responsive single-page website for **Taquería El Sabor**, a taco restaurant specializing in tacos de carnitas (slow-braised pork) and tacos al pastor (spit-roasted marinated pork). The page serves as the restaurant's primary online presence, showcasing the menu, brand story, and contact information.

---
<img width="1727" height="869" alt="image" src="https://github.com/user-attachments/assets/6dc1045d-c750-49ce-8211-fb673e344bc8" />

<img width="1727" height="875" alt="image" src="https://github.com/user-attachments/assets/460f220e-c276-400f-b5ce-f125bcd2ac00" />

<img width="1724" height="677" alt="image" src="https://github.com/user-attachments/assets/0a62838e-2a60-4e39-bca8-17ff9e3454a7" />

<img width="1724" height="885" alt="image" src="https://github.com/user-attachments/assets/49a55a29-0e49-4740-9437-2088b63595e0" />


## About the Business

**Taquería El Sabor** is rooted in a family tradition from Michoacán, Mexico. Their carnitas recipe has been passed down through three generations — pork shoulder slow-braised in its own fat with orange, bay leaf, and cinnamon. Their tacos al pastor honor the Lebanese-Mexican culinary tradition, with pork marinated overnight in dried chiles, achiote, and pineapple, then roasted on a vertical trompo.

| Detail | Info |
|---|---|
| Address | 123 Main Street, City, State 00000 |
| Phone | +1-555-000-0000 |
| Mon–Thu | 11:00 AM – 9:00 PM |
| Friday | 11:00 AM – 10:00 PM |
| Saturday | 10:00 AM – 10:00 PM |
| Sunday | 10:00 AM – 8:00 PM |
| Instagram | [@example](https://instagram.com/example) |
| Facebook | [El Sabor](https://facebook.com/example) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styles | Vanilla CSS with custom properties (design tokens) |
| JavaScript | Vanilla ES Modules |
| Fonts | Google Fonts — Playfair Display + Inter |
| Testing | Vitest + jsdom + jest-axe |
| Hosting | Any static host (GitHub Pages, Netlify, Vercel, etc.) |

No build step or framework is required. The site runs directly from the file system or any static file server.

---

## Project Structure

```
taco-business-page/
├── index.html              # Main HTML document (single page)
│
├── styles/
│   ├── main.css            # Design tokens (CSS custom properties) + global reset
│   ├── nav.css             # Fixed navigation bar + hamburger menu
│   ├── hero.css            # Full-viewport hero section
│   ├── menu.css            # Menu section + Taco Card grid
│   ├── about.css           # About / Our Story section
│   ├── contact.css         # Contact, hours, phone, social links
│   └── responsive.css      # Cross-cutting media queries (320px – 1920px)
│
├── scripts/
│   └── main.js             # Hamburger toggle, active link tracking, footer year
│
├── data/
│   ├── menu.js             # Menu item data (name, description, price, image paths)
│   └── restaurant.js       # Restaurant info (name, address, hours, social media)
│
├── assets/
│   ├── images/             # Photo assets (see "Adding Images" below)
│   └── icons/              # SVG icons (social media, map pin, etc.)
│
├── tests/
│   ├── nav.test.js         # Unit tests — hamburger toggle + active link tracking
│   ├── hero.test.js        # Structural tests — hero section HTML
│   ├── menu.test.js        # Structural tests — menu section + Taco Cards
│   ├── contact.test.js     # Structural tests — contact section
│   ├── accessibility.test.js  # axe-core audit — zero critical/serious violations
│   └── responsive.test.js  # Responsive layout tests — DOM structure + CSS rules
│
├── package.json
├── vitest.config.js
└── README.md
```

---

## Page Sections

The page is a single scrollable document with five sections rendered top to bottom:

1. **Navigation Bar** — Fixed at the top. Links to Menu, About, and Contact. Collapses to a hamburger menu on mobile.
2. **Hero** — Full-viewport section with the restaurant name, tagline, and a "View Our Menu" CTA button.
3. **Menu** — Two-column card grid (single column on mobile) showing Tacos de Carnitas and Tacos al Pastor with name, description, and price.
4. **About / Our Story** — Two-column layout (text + image) describing the restaurant's background and culinary tradition.
5. **Contact / Find Us** — Address, phone (tap-to-call), operating hours, and social media links.

---

## Adding Images

Place image files in `assets/images/` using these exact filenames:

| File | Used for | Recommended size |
|---|---|---|
| `hero-bg.jpg` | Hero section background | 1920×1080px or larger |
| `carnitas.jpg` | Tacos de Carnitas card | 800×600px (4:3 ratio) |
| `pastor.jpg` | Tacos al Pastor card | 800×600px (4:3 ratio) |
| `about.jpg` | About section photo | 800×600px or taller |

To use different filenames, update the `src` attributes in `index.html` (and the `<link rel="preload">` tag in `<head>` for the hero background).

---

## Customizing Content

All content is hardcoded in `index.html`, with the source data in the `data/` files:

- **Menu items** — edit `data/menu.js` to change taco names, descriptions, prices, or image paths.
- **Restaurant info** — edit `data/restaurant.js` to update the address, phone, hours, social media URLs, or Google Maps embed URL.
- **HTML content** — the HTML in `index.html` reflects the data files. After editing the data files, update the corresponding HTML sections to match.
- **Colors / typography** — all design tokens are CSS custom properties in `styles/main.css` under `:root`.

---

## Design Tokens

Defined in `styles/main.css`:

```css
--color-primary:    #C0392B   /* Deep red — brand accent */
--color-secondary:  #B85C00   /* Burnt orange — secondary accent */
--color-bg:         #FDFAF5   /* Off-white — page background */
--color-text:       #1A1A1A   /* Near-black — body text */
--color-text-light: #FFFFFF   /* White — text on dark backgrounds */
--color-surface:    #FFFFFF   /* Card backgrounds */

--font-heading: 'Playfair Display', Georgia, serif
--font-body:    'Inter', system-ui, sans-serif
```

All color pairs meet **WCAG 2.1 AA** contrast requirements (4.5:1 for normal text, 3:1 for large text).

---

## Running Tests

Install dependencies and run the test suite:

```bash
npm install
npm test
```

The suite runs 55 tests across 6 files covering navigation behavior, HTML structure, accessibility (axe-core), and responsive layout rules.

---

## Deployment

No build step needed. Deploy the project root as a static site:

- **GitHub Pages** — push to a repo and enable Pages from the repository settings.
- **Netlify / Vercel** — drag and drop the project folder, or connect the repo for automatic deploys.
- **Local preview** — open `index.html` directly in a browser, or use a simple static server:

```bash
npx serve .
```

---

## Accessibility

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>`, `<article>`)
- All images have descriptive `alt` text
- All interactive elements have accessible names and visible focus indicators
- Keyboard navigation follows a logical tab order
- WCAG 2.1 AA color contrast on all text/background pairs
- Hamburger button uses `aria-expanded` and `aria-controls`
- Sections use `aria-labelledby` to associate headings

> Full WCAG compliance requires manual testing with assistive technologies (screen readers, keyboard-only navigation) in addition to the automated axe-core audit included in the test suite.
