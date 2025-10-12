import { describe, it, expect, beforeAll } from 'vitest';
import { definePolyfrontSlider } from '../src';

beforeAll(() => {
  definePolyfrontSlider(); // once per suite
});

function makeEl(): any {
  const el = document.createElement('polyfront-slider') as any;
  document.body.appendChild(el);
  return el;
}

describe('PolyfrontSlider – core configuration & value math', () => {
  it('auto-derives step and disables gaps when configured', () => {
    const el = makeEl();
    el.setConfig({
      values: [0, 1500, 1600, 1700, 1800, 1900, 2000],
      disableMissingSteps: true,
      mode: 'single',
    });
    el.setValue(1600);
    expect(el.getValue()).toBe(1600);
  });

  it('respects blocked intervals (clamps to nearest enabled index)', () => {
    const el = makeEl();
    el.setConfig({ min: 0, max: 10, step: 1, blockedIntervals: [[3, 5]] });
    el.setValue(4); // 3..5 blocked
    const v = el.getValue(); // 2 or 6 are nearest legal numbers
    expect([2, 6]).toContain(v);
  });

  it('enforces minThumbDistance in range mode', () => {
    const el = makeEl();
    el.setConfig({ min: 0, max: 10, step: 1, mode: 'range', minThumbDistance: 3 });
    el.setValue([4, 5]); // too close → expand
    const [a, b] = el.getValue();
    expect(Math.abs(b - a)).toBeGreaterThanOrEqual(3);
  });

  it('output:"index" returns the index for discrete arrays', () => {
    const el = makeEl();
    el.setConfig({ values: [100, 200, 300], output: 'index', mode: 'single' });
    el.setValue(300);
    expect(el.getValue()).toBe(2);
  });

  it('output:"object" returns the original object for discrete object values', () => {
    const el = makeEl();
    el.setConfig({
      values: [{ value: 10, data: 'a' }, { value: 20, data: 'b' }, { value: 30, data: 'c' }],
      output: 'object',
      mode: 'single',
    });
    el.setValue({ value: 20 }); // grid mapping accepts object.value
    expect(el.getValue()).toEqual({ value: 20, data: 'b' });
  });

  it('clamps values within min/max when continuous', () => {
    const el = makeEl();
    el.setConfig({ min: 0, max: 100, step: 10, mode: 'single' });
    el.setValue(150);
    expect(el.getValue()).toBe(100);
  });
});
