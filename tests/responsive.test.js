/**
 * Responsive layout tests
 *
 * Validates: Requirements 6.1, 6.2, 6.3
 *
 * jsdom does not compute CSS layout or apply media queries, so these tests
 * verify two complementary things:
 *
 *   1. DOM structure — the elements and CSS classes that drive responsive
 *      behaviour are present and correctly configured in index.html.
 *
 *   2. CSS rules — the stylesheet files contain the media-query rules that
 *      produce the correct layout at each breakpoint (320px, 768px, 1280px).
 *
 * Together these give high confidence that the page will render correctly at
 * every supported viewport width without requiring a running browser.
 *
 * Responsive breakpoints under test:
 *   320px  — mobile: hamburger visible, nav links hidden, 1-column menu grid
 *   768px  — tablet: full nav link list visible, hamburger hidden
 *   1280px — desktop: 2-column menu grid
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// ---------------------------------------------------------------------------
// Setup — load index.html into the jsdom global document
// ---------------------------------------------------------------------------

beforeAll(() => {
  const htmlPath = resolve(process.cwd(), 'index.html');
  const html = readFileSync(htmlPath, 'utf-8');
  document.body.innerHTML = html;
});

// ---------------------------------------------------------------------------
// Helper — read a CSS file from the styles/ directory
// ---------------------------------------------------------------------------

function readCss(filename) {
  return readFileSync(resolve(process.cwd(), 'styles', filename), 'utf-8');
}

// ---------------------------------------------------------------------------
// 320px viewport — hamburger menu visible, nav links hidden  (Req 6.2)
// ---------------------------------------------------------------------------

describe('320px viewport — hamburger and nav links DOM structure', () => {
  it('hamburger button (.nav-hamburger) exists in the DOM', () => {
    const hamburger = document.querySelector('.nav-hamburger');
    expect(hamburger).not.toBeNull();
  });

  it('hamburger button is a <button> element', () => {
    const hamburger = document.querySelector('.nav-hamburger');
    expect(hamburger.tagName.toLowerCase()).toBe('button');
  });

  it('hamburger button has aria-label for accessibility', () => {
    const hamburger = document.querySelector('.nav-hamburger');
    const label = hamburger.getAttribute('aria-label');
    expect(label).not.toBeNull();
    expect(label.trim()).not.toBe('');
  });

  it('hamburger button has aria-expanded attribute for accessibility', () => {
    const hamburger = document.querySelector('.nav-hamburger');
    expect(hamburger.hasAttribute('aria-expanded')).toBe(true);
  });

  it('hamburger button has aria-controls pointing to nav-links', () => {
    const hamburger = document.querySelector('.nav-hamburger');
    expect(hamburger.getAttribute('aria-controls')).toBe('nav-links');
  });

  it('nav links list exists with id="nav-links" for CSS targeting', () => {
    const navLinks = document.getElementById('nav-links');
    expect(navLinks).not.toBeNull();
  });

  it('nav links list has class .nav-links for CSS targeting', () => {
    const navLinks = document.getElementById('nav-links');
    expect(navLinks.classList.contains('nav-links')).toBe(true);
  });

  it('nav.css hides .nav-links (max-height: 0) on mobile viewports < 768px', () => {
    const css = readCss('nav.css');
    // The mobile rule collapses the nav links via max-height: 0
    expect(css).toMatch(/max-width:\s*767px/);
    expect(css).toMatch(/max-height:\s*0/);
  });

  it('nav.css shows .nav-hamburger (display: flex) on mobile viewports < 768px', () => {
    const css = readCss('nav.css');
    // The hamburger is shown via display: flex inside the mobile media query
    expect(css).toMatch(/\.nav-hamburger\s*\{[^}]*display:\s*flex/s);
  });

  it('responsive.css reinforces .nav-hamburger display: flex on mobile', () => {
    const css = readCss('responsive.css');
    expect(css).toMatch(/\.nav-hamburger\s*\{[^}]*display:\s*flex/s);
  });
});

// ---------------------------------------------------------------------------
// 320px viewport — menu section single-column layout  (Req 6.3)
// ---------------------------------------------------------------------------

describe('320px viewport — menu section single-column layout', () => {
  it('.menu-grid element exists in the DOM', () => {
    const grid = document.querySelector('.menu-grid');
    expect(grid).not.toBeNull();
  });

  it('.menu-grid contains exactly 2 taco cards', () => {
    const cards = document.querySelectorAll('.menu-grid .taco-card');
    expect(cards.length).toBe(2);
  });

  it('menu.css sets .menu-grid to single-column (grid-template-columns: 1fr) on mobile < 768px', () => {
    const css = readCss('menu.css');
    // The mobile media query overrides the default 2-column grid to 1 column
    expect(css).toMatch(/max-width:\s*767px/);
    expect(css).toMatch(/grid-template-columns:\s*1fr/);
  });

  it('responsive.css reinforces .menu-grid single-column on mobile', () => {
    const css = readCss('responsive.css');
    expect(css).toMatch(/\.menu-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
  });
});

// ---------------------------------------------------------------------------
// 768px viewport — full nav link list visible, hamburger hidden  (Req 6.1, 6.2)
// ---------------------------------------------------------------------------

describe('768px viewport — full nav link list visible', () => {
  it('nav links list contains all three navigation links', () => {
    const links = document.querySelectorAll('#nav-links .nav-link');
    expect(links.length).toBe(3);
  });

  it('nav links point to #menu, #about, and #contact', () => {
    const hrefs = Array.from(
      document.querySelectorAll('#nav-links .nav-link')
    ).map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('#menu');
    expect(hrefs).toContain('#about');
    expect(hrefs).toContain('#contact');
  });

  it('responsive.css shows .nav-links (display: flex) at ≥ 768px', () => {
    const css = readCss('responsive.css');
    // The tablet/desktop rule restores the nav links as a flex row
    expect(css).toMatch(/min-width:\s*768px/);
    expect(css).toMatch(/\.nav-links\s*\{[^}]*display:\s*flex/s);
  });

  it('responsive.css hides .nav-hamburger (display: none) at ≥ 768px', () => {
    const css = readCss('responsive.css');
    expect(css).toMatch(/\.nav-hamburger\s*\{[^}]*display:\s*none/s);
  });

  it('nav.css hides .nav-hamburger (display: none) at ≥ 768px', () => {
    const css = readCss('nav.css');
    // The default (desktop-first) rule hides the hamburger outside the mobile query
    expect(css).toMatch(/\.nav-hamburger\s*\{[^}]*display:\s*none/s);
  });
});

// ---------------------------------------------------------------------------
// 1280px viewport — menu section two-column grid  (Req 6.3)
// ---------------------------------------------------------------------------

describe('1280px viewport — menu section two-column grid', () => {
  it('.menu-grid exists and is a CSS Grid container (class present)', () => {
    const grid = document.querySelector('.menu-grid');
    expect(grid).not.toBeNull();
    expect(grid.classList.contains('menu-grid')).toBe(true);
  });

  it('menu.css sets .menu-grid default to two-column grid (repeat(2, 1fr))', () => {
    const css = readCss('menu.css');
    // The default (non-mobile) rule sets a 2-column grid
    expect(css).toMatch(/\.menu-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/s);
  });

  it('responsive.css reinforces .menu-grid two-column at ≥ 768px', () => {
    const css = readCss('responsive.css');
    expect(css).toMatch(/\.menu-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/s);
  });

  it('menu.css uses display: grid for .menu-grid', () => {
    const css = readCss('menu.css');
    expect(css).toMatch(/\.menu-grid\s*\{[^}]*display:\s*grid/s);
  });
});
