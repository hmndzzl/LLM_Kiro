/**
 * Example-based tests for the Hero Section
 *
 * Validates: Requirements 1.2, 1.4
 *
 * Tests:
 *  - The <h1> in the hero section contains the restaurant name
 *  - The CTA link (.hero-cta) points to #menu
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
// Hero Section — restaurant name in <h1>  (Req 1.2)
// ---------------------------------------------------------------------------

describe('Hero Section — <h1> restaurant name', () => {
  it('contains an <h1> element inside the hero section', () => {
    const heroSection = document.querySelector('#hero');
    expect(heroSection).not.toBeNull();

    const h1 = heroSection.querySelector('h1');
    expect(h1).not.toBeNull();
  });

  it('<h1> contains "Taquería El Sabor"', () => {
    const h1 = document.querySelector('#hero h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim()).toContain('Taquería El Sabor');
  });
});

// ---------------------------------------------------------------------------
// Hero Section — CTA link points to #menu  (Req 1.4)
// ---------------------------------------------------------------------------

describe('Hero Section — CTA link href', () => {
  it('contains a .hero-cta element inside the hero section', () => {
    const heroSection = document.querySelector('#hero');
    expect(heroSection).not.toBeNull();

    const cta = heroSection.querySelector('.hero-cta');
    expect(cta).not.toBeNull();
  });

  it('.hero-cta href points to "#menu"', () => {
    const cta = document.querySelector('#hero .hero-cta');
    expect(cta).not.toBeNull();
    expect(cta.getAttribute('href')).toBe('#menu');
  });
});
