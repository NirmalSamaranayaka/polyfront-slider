import { expect, afterEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Avoid importing '@testing-library/jest-dom' directly (that expects a Jest-global expect)
expect.extend(matchers as any);

// Keep cleanup minimal to avoid re-entrancy issues
afterEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

// Tiny shims (only if missing)
if (!(globalThis as any).ResizeObserver) {
  class RO { observe(){} unobserve(){} disconnect(){} }
  (globalThis as any).ResizeObserver = RO as any;
}
if (!(globalThis as any).PointerEvent) {
  class P extends MouseEvent {
    pointerId = 1;
    constructor(type: string, init?: MouseEventInit) { super(type, init); }
  }
  (globalThis as any).PointerEvent = P as any;
}
