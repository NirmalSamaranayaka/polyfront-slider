import { describe, it, expect, beforeAll } from 'vitest';
import { definePolyfrontSlider } from '../src';
import { qsa } from './dom-helpers';

beforeAll(() => definePolyfrontSlider());

const make = () => {
  const el = document.createElement('polyfront-slider') as any;
  document.body.appendChild(el);
  return el;
};

describe('PolyfrontSlider - ARIA & attribute reactions', () => {
  it('updates aria attributes when orientation changes', () => {
    const el = make();
    el.setAttribute('orientation', 'vertical');
    const thumb = el.shadowRoot!.querySelector('.thumb') as HTMLElement;
    expect(thumb.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('toggles second thumb visibility based on mode', () => {
    const el = make();
    const root = el.shadowRoot as ShadowRoot;
    const thumbs = qsa<HTMLButtonElement>(root, '.thumb');
    // default single
    expect(thumbs[1].hidden).toBe(true);
    el.setConfig({ mode: 'range' });
    expect(thumbs[1].hidden).toBe(false);
  });

  it('applies disabled state to ARIA', () => {
    const el = make();
    el.setConfig({ disabled: true });
    const thumb = el.shadowRoot!.querySelector('.thumb') as HTMLElement;
    expect(thumb.getAttribute('aria-disabled')).toBe('true');
    expect(thumb.getAttribute('tabindex')).toBe('-1');
  });
});
