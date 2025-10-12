import { describe, it, expect, beforeAll } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import { definePolyfrontSlider } from '../src';
import { qs } from './dom-helpers';

beforeAll(() => definePolyfrontSlider());

const make = () => {
  const el = document.createElement('polyfront-slider') as any;
  document.body.appendChild(el);
  // Ensure the internal track gets a predictable rect via our setup.ts shim:
  // If you want to change dimensions per test, set data-width/height on the element,
  // and component children will inherit the global getBoundingClientRect override.
  return el;
};

describe('PolyfrontSlider – keyboard & pointer', () => {
  it('ArrowRight increases value in LTR horizontal', () => {
    const el = make();
    el.setConfig({ min: 0, max: 10, step: 1, mode: 'single' });
    const root = el.shadowRoot as ShadowRoot;
    const thumb = qs<HTMLButtonElement>(root, '.thumb');
    thumb.focus();
    const before = el.getValue();
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    const after = el.getValue();
    expect(after).toBe(before + 1);
  });

  it('RTL reverses ArrowRight effect in horizontal', () => {
    const el = make();
    el.setConfig({ min: 0, max: 10, step: 1, mode: 'single', rtl: true });
   const root = el.shadowRoot as ShadowRoot;
    const thumb = qs<HTMLButtonElement>(root, '.thumb');
    thumb.focus();
    el.setValue(5);
    fireEvent.keyDown(thumb, { key: 'ArrowRight' }); // should decrease in RTL
    expect(el.getValue()).toBe(4);
  });

  it('PageUp jumps by ~10% of grid', () => {
    const el = make();
    el.setConfig({ min: 0, max: 100, step: 1, mode: 'single' });
    el.setValue(10);
    const root = el.shadowRoot as ShadowRoot;
    const thumb = qs<HTMLButtonElement>(root, '.thumb');
    thumb.focus();
    fireEvent.keyDown(thumb, { key: 'PageUp' });
    expect(el.getValue()).toBeGreaterThan(10);
  });
});
