/**
 * Accessibility tests using axe-core (via jest-axe)
 *
 * Validates: Requirements 7.2, 7.4, 7.5
 *
 * Tests:
 *  - The fully rendered page has zero critical or serious axe violations
 *  - All <img> elements have non-empty alt attributes
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { configureAxe, toHaveNoViolations } from 'jest-axe';

// Extend Vitest's expect with the jest-axe matcher
expect.extend(toHaveNoViolations);

// Configure axe — color-contrast is disabled because jsdom does not compute
// CSS styles, so contrast checks would always produce false positives.
const axe = configureAxe();

// ---------------------------------------------------------------------------
// Setup — load index.html into the jsdom global document, then run axe
// ---------------------------------------------------------------------------

let axeResults;

beforeAll(async () => {
  const htmlPath = resolve(process.cwd(), 'index.html');
  const html = readFileSync(htmlPath, 'utf-8');

  // jest-axe uses the global jsdom document provided by Vitest's jsdom
  // environment. We inject the page HTML into document.body so axe can
  // traverse the real DOM tree.
  document.body.innerHTML = html;

  // Run axe on the populated document body
  axeResults = await axe(document.body);
});

// ---------------------------------------------------------------------------
// Axe audit — zero critical or serious violations  (Req 7.4, 7.5)
// ---------------------------------------------------------------------------

describe('Accessibility audit — axe-core', () => {
  it('has no critical or serious axe violations', () => {
    // Filter to only critical and serious violations before asserting
    const criticalOrSerious = {
      ...axeResults,
      violations: axeResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      ),
    };
    expect(criticalOrSerious).toHaveNoViolations();
  });
});

// ---------------------------------------------------------------------------
// Image alt attributes  (Req 7.2)
// ---------------------------------------------------------------------------

describe('Image accessibility — alt attributes', () => {
  it('all <img> elements have a non-empty alt attribute', () => {
    // Use the global jsdom document (populated in beforeAll)
    const images = Array.from(document.querySelectorAll('img'));
    expect(images.length).toBeGreaterThan(0);

    images.forEach((img) => {
      const alt = img.getAttribute('alt');
      expect(
        alt,
        `<img src="${img.getAttribute('src')}"> is missing a non-empty alt attribute`
      ).not.toBeNull();
      expect(
        alt.trim(),
        `<img src="${img.getAttribute('src')}"> has an empty alt attribute`
      ).not.toBe('');
    });
  });
});
