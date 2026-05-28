/**
 * Example-based tests for the Contact Section
 *
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4
 *
 * Tests:
 *  - The contact section contains the address text
 *  - The phone link has an href starting with "tel:"
 *  - The hours list contains an entry for each day of the week (7 days)
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
// Contact Section — address text  (Req 5.1, 5.2)
// ---------------------------------------------------------------------------

describe('Contact Section — address', () => {
  it('contains an <address> element inside the contact section', () => {
    const contactSection = document.querySelector('#contact');
    expect(contactSection).not.toBeNull();

    const address = contactSection.querySelector('address');
    expect(address).not.toBeNull();
  });

  it('<address> contains the restaurant address text', () => {
    const address = document.querySelector('#contact address');
    expect(address).not.toBeNull();
    expect(address.textContent.trim()).toContain('123 Main Street');
  });
});

// ---------------------------------------------------------------------------
// Contact Section — phone tel: link  (Req 5.4)
// ---------------------------------------------------------------------------

describe('Contact Section — phone link', () => {
  it('contains an anchor link for the phone number', () => {
    const contactSection = document.querySelector('#contact');
    expect(contactSection).not.toBeNull();

    const phoneLink = contactSection.querySelector('a[href^="tel:"]');
    expect(phoneLink).not.toBeNull();
  });

  it('phone link href starts with "tel:"', () => {
    const phoneLink = document.querySelector('#contact a[href^="tel:"]');
    expect(phoneLink).not.toBeNull();
    expect(phoneLink.getAttribute('href')).toMatch(/^tel:/);
  });
});

// ---------------------------------------------------------------------------
// Contact Section — hours list has all 7 days  (Req 5.3)
// ---------------------------------------------------------------------------

describe('Contact Section — hours list', () => {
  it('contains a hours list element (.hours-list)', () => {
    const contactSection = document.querySelector('#contact');
    expect(contactSection).not.toBeNull();

    const hoursList = contactSection.querySelector('.hours-list');
    expect(hoursList).not.toBeNull();
  });

  it('hours list contains an entry for each day of the week (7 days)', () => {
    const hoursList = document.querySelector('#contact .hours-list');
    expect(hoursList).not.toBeNull();

    // <dl> uses <dt> for day names
    const dayEntries = hoursList.querySelectorAll('dt');
    expect(dayEntries.length).toBe(7);
  });

  it('hours list contains all 7 days by name', () => {
    const hoursList = document.querySelector('#contact .hours-list');
    expect(hoursList).not.toBeNull();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayEntries = Array.from(hoursList.querySelectorAll('dt')).map(dt => dt.textContent.trim());

    for (const day of days) {
      expect(dayEntries).toContain(day);
    }
  });
});
