
import { describe, it, expect } from 'vitest';
import { PolyfrontSlider } from '../src';

describe('polyfront-slider core logic', () => {
  it('auto-derives step and disables gaps when configured', () => {
    const el = new PolyfrontSlider();
    el.setConfig({ values: [0,1500,1600,1700,1800,1900,2000], disableMissingSteps: true });
    el.setValue(1400);
    const v = el.getValue();
    expect([0,1500,1600,1700,1800,1900,2000]).toContain(v);
  });

  it('respects blocked intervals', () => {
    const el = new PolyfrontSlider();
    el.setConfig({ min: 0, max: 100, step: 10, blockedIntervals: [[30,60]], mode: 'range' });
    el.setValue([20, 70]);
    const [a,b] = el.getValue();
    expect(a <= 30 && b >= 60).toBeTruthy();
  });

  it('enforces minThumbDistance', () => {
    const el = new PolyfrontSlider();
    el.setConfig({ min: 0, max: 100, step: 10, mode: 'range', minThumbDistance: 2 });
    el.setValue([20, 20]);
    const [a,b] = el.getValue();
    expect((b - a) >= 20).toBeTruthy();
  });
});
