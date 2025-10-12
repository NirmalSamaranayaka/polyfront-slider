# 🧾 Changelog

All notable changes to **polyfront-slider** are documented in this file.  
This project follows [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/) style.


---

## [0.0.3] - 2025-10-12
### Added
- Horizontal thumb fix – corrected positioning and centering for smoother, more consistent slider movement in horizontal mode.
- @3nvs/polyfront-slider (scoped, main library)
- polyfront-slider (unscoped shim, re-exports the scoped package)

---

## [0.0.2] - 2025-10-09
### Added
- Added `tests/dom-helpers.ts` for clean, type-safe Shadow DOM queries:
  - `qs<T>()` and `qsa<T>()` helpers simplify tests and avoid `TS2347` errors.
  - Centralized DOM querying for all unit tests.
- Updated test files (`polyfront-slider.a11y.test.ts` and `polyfront-slider.interaction.test.ts`)
- Added **pointer interaction handler** on track for range and single sliders.
- Added **robust event-to-grid mapping** (`eventToFraction`) for happy-dom/jsdom testing environments.
- Added default values for `cfg.min`, `cfg.max`, and `cfg.step` to avoid TS errors.
- Added safe geometry and coordinate fallbacks for test and headless environments.

### ⚙️ Internal
- Maintained 100% compatibility with existing `make()` and `fireEvent` test utilities.
- Confirmed `npm run typecheck` now passes without warnings or errors.

### Fixed
- 🐛 **Reflection loop fix:** Prevented recursive `attributeChangedCallback` calls by ignoring `data-*` attributes (e.g. `data-size`).
- 🧭 **Track click bug:** Clicking on the track now moves the **nearest thumb** correctly in both single and range modes.
- 🔢 **Attribute updates:** `min`, `max`, `step`, and `values` attributes now update slider state dynamically.
- 🧱 Stabilized unit tests across jsdom and happy-dom environments (no more recursion/OOM).

### Changed
- Simplified event binding — track click logic lives only in `attachEvents()` now.
- Unified click/drag logic for predictable behavior across browsers and headless DOMs.
- Optimized `pointToGrid()` and removed redundant handlers.

### Testing
- ✅ All 13 unit tests now pass in `vitest` with `happy-dom` environment.
- Improved test stability on Windows + Node 22 (using single-fork execution).

---

## [0.0.1] - 2025-10-07
### 🎉 Initial Release
- Introduced **polyfront-slider**: a modern, accessible, framework-agnostic Web Component slider  
- Implemented **horizontal** and **vertical** modes  
- Added **single** and **range (dual-thumb)** slider types  
- Built with **TypeScript** and integrated with **Storybook 8.6**  
- Included **showFill** option, `minThumbDistance`, and `blockedIntervals` features  
- Accessible (`ARIA`, keyboard support, form-associated)  
- Includes unit testing with **Vitest (jsdom)**  
- MIT licensed and published on npm
