/**
 * main.js — Interactive behavior for Taquería El Sabor landing page
 *
 * Responsibilities:
 *  - Hamburger menu toggle (mobile nav open/close)
 *  - Close mobile menu when a nav link is clicked
 *  - Active nav link tracking via IntersectionObserver
 *  - Footer year population
 *
 * All functions are exported for testability.
 */

// ---------------------------------------------------------------------------
// Hamburger toggle
// ---------------------------------------------------------------------------

/**
 * Initialise the hamburger menu toggle.
 *
 * Clicking the hamburger button toggles the `.nav-open` class on `<nav>` and
 * keeps the `aria-expanded` attribute in sync.  Clicking any nav link closes
 * the mobile menu.
 *
 * @param {Document|Element} [root=document] - DOM root (injectable for tests)
 * @returns {{ destroy: () => void }} - call destroy() to remove event listeners
 */
export function initHamburger(root = document) {
  const nav = root.querySelector('#main-nav');
  const hamburger = root.querySelector('.nav-hamburger');
  const navLinks = root.querySelectorAll('#nav-links .nav-link');

  if (!nav || !hamburger) {
    return { destroy: () => {} };
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute(
      'aria-label',
      isOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
  }

  function closeMenu() {
    nav.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  return {
    destroy() {
      hamburger.removeEventListener('click', toggleMenu);
      navLinks.forEach((link) => {
        link.removeEventListener('click', closeMenu);
      });
    },
  };
}

// ---------------------------------------------------------------------------
// Active link tracking via IntersectionObserver
// ---------------------------------------------------------------------------

/**
 * Initialise active nav link tracking.
 *
 * Uses an IntersectionObserver to watch the page sections.  When a section
 * becomes the most-visible one in the viewport the corresponding nav link
 * receives the `active` class; all others lose it.
 *
 * @param {Document|Element} [root=document] - DOM root (injectable for tests)
 * @param {IntersectionObserver} [ObserverClass=IntersectionObserver] - injectable for tests
 * @returns {{ destroy: () => void }} - call destroy() to disconnect the observer
 */
export function initActiveLinkTracking(root = document, ObserverClass = IntersectionObserver) {
  const sections = root.querySelectorAll('section[id]');
  const navLinks = root.querySelectorAll('#nav-links .nav-link');

  if (!sections.length || !navLinks.length) {
    return { destroy: () => {} };
  }

  /** Map section id → nav link element for O(1) lookup */
  const linkMap = new Map();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap.set(href.slice(1), link);
    }
  });

  /**
   * Track intersection ratios so we can always highlight the section with the
   * highest visibility, even when multiple sections are partially in view.
   * @type {Map<string, number>}
   */
  const ratioMap = new Map();
  sections.forEach((section) => ratioMap.set(section.id, 0));

  function setActiveLink(id) {
    navLinks.forEach((link) => link.classList.remove('active'));
    const activeLink = linkMap.get(id);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  const observer = new ObserverClass(
    (entries) => {
      entries.forEach((entry) => {
        ratioMap.set(entry.target.id, entry.intersectionRatio);
      });

      // Pick the section with the highest intersection ratio
      let bestId = null;
      let bestRatio = 0;
      ratioMap.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId !== null) {
        setActiveLink(bestId);
      }
    },
    {
      // Fire at multiple thresholds for smooth transitions
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
    }
  );

  sections.forEach((section) => observer.observe(section));

  return {
    destroy() {
      observer.disconnect();
    },
  };
}

// ---------------------------------------------------------------------------
// Footer year
// ---------------------------------------------------------------------------

/**
 * Populate the footer year span with the current year.
 *
 * @param {Document|Element} [root=document] - DOM root (injectable for tests)
 */
export function initFooterYear(root = document) {
  const yearSpan = root.querySelector('#footer-year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
}

// ---------------------------------------------------------------------------
// Bootstrap — runs when the module is loaded in the browser
// ---------------------------------------------------------------------------

// Guard against non-browser environments (e.g. jsdom in unit tests) where
// IntersectionObserver may not be defined.
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  initHamburger();
  if (typeof IntersectionObserver !== 'undefined') {
    initActiveLinkTracking();
  }
  initFooterYear();
}
