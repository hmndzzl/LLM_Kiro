/**
 * Example-based tests for the Menu Section
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 7.2
 *
 * Tests:
 *  - The menu section contains exactly 2 Taco Cards
 *  - Each Taco Card contains a name (<h3>), description (<p>), and price (.taco-price)
 *  - All <img> elements within Taco Cards have non-empty alt attributes
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';

// ---------------------------------------------------------------------------
// Setup — parse the real index.html once for all tests
// ---------------------------------------------------------------------------

let document;

beforeAll(() => {
  const htmlPath = resolve(process.cwd(), 'index.html');
  const html = readFileSync(htmlPath, 'utf-8');
  const dom = new JSDOM(html);
  document = dom.window.document;
});

// ---------------------------------------------------------------------------
// Menu Section — exactly 2 Taco Cards  (Req 3.1, 3.2)
// ---------------------------------------------------------------------------

describe('Menu Section — Taco Card count', () => {
  it('contains a menu section with id="menu"', () => {
    const menuSection = document.querySelector('#menu');
    expect(menuSection).not.toBeNull();
  });

  it('contains exactly 2 Taco Cards (.taco-card)', () => {
    const menuSection = document.querySelector('#menu');
    expect(menuSection).not.toBeNull();

    const tacoCards = menuSection.querySelectorAll('.taco-card');
    expect(tacoCards).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// Menu Section — each Taco Card has name, description, and price  (Req 3.3)
// ---------------------------------------------------------------------------

describe('Menu Section — Taco Card content', () => {
  it('each Taco Card contains an <h3> name element', () => {
    const tacoCards = document.querySelectorAll('#menu .taco-card');
    expect(tacoCards.length).toBeGreaterThan(0);

    tacoCards.forEach((card) => {
      const name = card.querySelector('h3');
      expect(name).not.toBeNull();
      expect(name.textContent.trim()).not.toBe('');
    });
  });

  it('each Taco Card contains a <p> description element', () => {
    const tacoCards = document.querySelectorAll('#menu .taco-card');
    expect(tacoCards.length).toBeGreaterThan(0);

    tacoCards.forEach((card) => {
      const description = card.querySelector('p');
      expect(description).not.toBeNull();
      expect(description.textContent.trim()).not.toBe('');
    });
  });

  it('each Taco Card contains a price element (.taco-price)', () => {
    const tacoCards = document.querySelectorAll('#menu .taco-card');
    expect(tacoCards.length).toBeGreaterThan(0);

    tacoCards.forEach((card) => {
      const price = card.querySelector('.taco-price');
      expect(price).not.toBeNull();
      expect(price.textContent.trim()).not.toBe('');
    });
  });
});

// ---------------------------------------------------------------------------
// Menu Section — all <img> elements have non-empty alt attributes  (Req 7.2)
// ---------------------------------------------------------------------------

describe('Menu Section — image alt attributes', () => {
  it('all <img> elements within Taco Cards have a non-empty alt attribute', () => {
    const images = document.querySelectorAll('#menu .taco-card img');

    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt.trim()).not.toBe('');
    });
  });
});
