/**
 * Unit tests for navigation JavaScript behavior
 *
 * Validates: Requirements 2.2, 2.3, 6.2
 *
 * Tests:
 *  - Clicking the hamburger toggles `.nav-open` on the nav element
 *  - Clicking a nav link removes `.nav-open` (closes mobile menu)
 *  - IntersectionObserver callback updates the active link class
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initHamburger, initActiveLinkTracking } from '../scripts/main.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a minimal DOM fragment that mirrors the nav structure used in
 * index.html.  Returns a plain object with references to the key elements.
 */
function buildNavDOM() {
  const root = document.createElement('div');
  root.innerHTML = `
    <nav id="main-nav">
      <button class="nav-hamburger" aria-expanded="false" aria-label="Open navigation menu">
        ☰
      </button>
      <ul id="nav-links">
        <li><a class="nav-link" href="#menu">Menu</a></li>
        <li><a class="nav-link" href="#about">About</a></li>
        <li><a class="nav-link" href="#contact">Contact</a></li>
      </ul>
    </nav>
    <section id="menu"><h2>Menu</h2></section>
    <section id="about"><h2>About</h2></section>
    <section id="contact"><h2>Contact</h2></section>
  `;

  return {
    root,
    nav: root.querySelector('#main-nav'),
    hamburger: root.querySelector('.nav-hamburger'),
    navLinks: Array.from(root.querySelectorAll('#nav-links .nav-link')),
    sections: Array.from(root.querySelectorAll('section[id]')),
  };
}

// ---------------------------------------------------------------------------
// Hamburger toggle tests  (Req 6.2)
// ---------------------------------------------------------------------------

describe('initHamburger — hamburger toggle', () => {
  let dom;

  beforeEach(() => {
    dom = buildNavDOM();
  });

  it('adds .nav-open to <nav> on first hamburger click', () => {
    initHamburger(dom.root);
    dom.hamburger.click();
    expect(dom.nav.classList.contains('nav-open')).toBe(true);
  });

  it('removes .nav-open from <nav> on second hamburger click (toggle off)', () => {
    initHamburger(dom.root);
    dom.hamburger.click(); // open
    dom.hamburger.click(); // close
    expect(dom.nav.classList.contains('nav-open')).toBe(false);
  });

  it('sets aria-expanded="true" when menu opens', () => {
    initHamburger(dom.root);
    dom.hamburger.click();
    expect(dom.hamburger.getAttribute('aria-expanded')).toBe('true');
  });

  it('sets aria-expanded="false" when menu closes via hamburger', () => {
    initHamburger(dom.root);
    dom.hamburger.click(); // open
    dom.hamburger.click(); // close
    expect(dom.hamburger.getAttribute('aria-expanded')).toBe('false');
  });
});

// ---------------------------------------------------------------------------
// Nav link closes mobile menu  (Req 2.2, 6.2)
// ---------------------------------------------------------------------------

describe('initHamburger — nav link closes mobile menu', () => {
  let dom;

  beforeEach(() => {
    dom = buildNavDOM();
  });

  it('removes .nav-open when a nav link is clicked while menu is open', () => {
    initHamburger(dom.root);
    dom.hamburger.click(); // open the menu
    expect(dom.nav.classList.contains('nav-open')).toBe(true);

    dom.navLinks[0].click(); // click first link
    expect(dom.nav.classList.contains('nav-open')).toBe(false);
  });

  it('removes .nav-open for every nav link', () => {
    initHamburger(dom.root);

    dom.navLinks.forEach((link) => {
      // Re-open the menu before each link click
      dom.hamburger.click();
      expect(dom.nav.classList.contains('nav-open')).toBe(true);

      link.click();
      expect(dom.nav.classList.contains('nav-open')).toBe(false);
    });
  });

  it('sets aria-expanded="false" when a nav link closes the menu', () => {
    initHamburger(dom.root);
    dom.hamburger.click(); // open
    dom.navLinks[1].click(); // close via link
    expect(dom.hamburger.getAttribute('aria-expanded')).toBe('false');
  });

  it('does nothing if menu is already closed when a nav link is clicked', () => {
    initHamburger(dom.root);
    // Menu starts closed — clicking a link should leave it closed
    dom.navLinks[0].click();
    expect(dom.nav.classList.contains('nav-open')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// IntersectionObserver active link tracking  (Req 2.3)
// ---------------------------------------------------------------------------

describe('initActiveLinkTracking — active link via IntersectionObserver', () => {
  let dom;

  /**
   * A minimal fake IntersectionObserver that captures the callback and the
   * observed elements so tests can trigger intersection events manually.
   */
  class FakeObserver {
    constructor(callback) {
      this.callback = callback;
      this.observed = [];
      FakeObserver.instance = this;
    }

    observe(el) {
      this.observed.push(el);
    }

    disconnect() {
      this.observed = [];
    }

    /**
     * Simulate an intersection event for a given element with the given ratio.
     * @param {Element} target
     * @param {number} ratio
     */
    trigger(target, ratio) {
      this.callback([{ target, intersectionRatio: ratio }]);
    }
  }

  beforeEach(() => {
    dom = buildNavDOM();
    FakeObserver.instance = null;
  });

  it('adds .active to the nav link matching the most-visible section', () => {
    initActiveLinkTracking(dom.root, FakeObserver);

    const menuSection = dom.sections.find((s) => s.id === 'menu');
    FakeObserver.instance.trigger(menuSection, 0.8);

    const menuLink = dom.navLinks.find((l) => l.getAttribute('href') === '#menu');
    expect(menuLink.classList.contains('active')).toBe(true);
  });

  it('removes .active from previously active link when a new section becomes most visible', () => {
    initActiveLinkTracking(dom.root, FakeObserver);

    const menuSection = dom.sections.find((s) => s.id === 'menu');
    const aboutSection = dom.sections.find((s) => s.id === 'about');

    FakeObserver.instance.trigger(menuSection, 0.8);
    FakeObserver.instance.trigger(aboutSection, 1.0);

    const menuLink = dom.navLinks.find((l) => l.getAttribute('href') === '#menu');
    const aboutLink = dom.navLinks.find((l) => l.getAttribute('href') === '#about');

    expect(menuLink.classList.contains('active')).toBe(false);
    expect(aboutLink.classList.contains('active')).toBe(true);
  });

  it('highlights the section with the highest intersection ratio when multiple are visible', () => {
    initActiveLinkTracking(dom.root, FakeObserver);

    const menuSection = dom.sections.find((s) => s.id === 'menu');
    const aboutSection = dom.sections.find((s) => s.id === 'about');

    // Trigger both sections in the same callback batch
    FakeObserver.instance.callback([
      { target: menuSection, intersectionRatio: 0.3 },
      { target: aboutSection, intersectionRatio: 0.7 },
    ]);

    const menuLink = dom.navLinks.find((l) => l.getAttribute('href') === '#menu');
    const aboutLink = dom.navLinks.find((l) => l.getAttribute('href') === '#about');

    expect(menuLink.classList.contains('active')).toBe(false);
    expect(aboutLink.classList.contains('active')).toBe(true);
  });

  it('observes all sections with id attributes', () => {
    initActiveLinkTracking(dom.root, FakeObserver);
    expect(FakeObserver.instance.observed.length).toBe(dom.sections.length);
  });

  it('disconnects the observer when destroy() is called', () => {
    const { destroy } = initActiveLinkTracking(dom.root, FakeObserver);
    destroy();
    expect(FakeObserver.instance.observed.length).toBe(0);
  });
});
