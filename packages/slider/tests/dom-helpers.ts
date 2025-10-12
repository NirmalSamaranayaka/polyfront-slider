/**
 * @file dom-helpers.ts
 * @description
 * Tiny, typed helper utilities for querying elements in unit tests.
 * Keeps Shadow DOM and Web Component tests clean and type-safe.
 *
 * Usage:
 *   import { qs, qsa } from './dom-helpers';
 *   const root = el.shadowRoot as ShadowRoot;
 *   const thumb = qs<HTMLButtonElement>(root, '.thumb');
 *   const thumbs = qsa<HTMLButtonElement>(root, '.thumb');
 */

/**
 * Query a single element by selector, casted to the expected type.
 * Throws an error if the element isn't found (for strict test safety).
 */
export const qs = <T extends Element>(root: ParentNode, sel: string): T => {
  const el = root.querySelector(sel);
  if (!el) throw new Error(`Element not found: ${sel}`);
  return el as T;
};

/**
 * Query all elements by selector, returning a NodeListOf<T>.
 * Returns an empty list if nothing matches (consistent with querySelectorAll).
 */
export const qsa = <T extends Element>(root: ParentNode, sel: string): NodeListOf<T> =>
  root.querySelectorAll(sel) as NodeListOf<T>;
