# @3nvs/polyfront-slider

All notable changes to **@3nvs/polyfront-slider** are documented in this file.  
This project follows [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/) style.

---

## [1.0.0] - 2025-10-12
### 🎉 Initial Scoped Release
This is the first release of the **scoped** package `@3nvs/polyfront-slider`.  
It contains the same implementation previously shipped under the unscoped `polyfront-slider` package (see history below), plus all fixes and additions up to unscoped **0.0.3**.
Horizontal thumb fix – corrected positioning and centering for smoother, more consistent slider movement in horizontal mode.

### Included from prior unscoped releases
#### From 0.0.2
- Added `tests/dom-helpers.ts` for clean, type-safe Shadow DOM queries:
  - `qs<T>()` and `qsa<T>()` helpers simplify tests and avoid `TS2347` errors.
  - Centralized DOM querying for all unit tests.
- Updated test files (`polyfront-slider.a11y.test.ts` and `polyfront-slider.interaction.test.ts`)
- Added **pointer interaction handler** on track for range and single sliders.
- Added **robust event-to-grid mapping** (`eventToFraction`) for happy-dom/jsdom testing environments.
- Added default values for `cfg.min`, `cfg.max`, and `cfg.step` to avoid TS errors.
- Added safe geometry and coordinate fallbacks for test and headless environments.

##### Fixed
- 🐛 Prevented recursive `attributeChangedCallback` loops by ignoring `data-*` attributes.
- 🧭 Track click now moves the **nearest thumb** in single and range modes.
- 🔢 `min`/`max`/`step`/`values` attribute updates now correctly update slider state.
- 🧱 Stabilized unit tests across jsdom and happy-dom (no recursion/OOM).

##### Changed
- Simplified event binding — track click logic lives only in `attachEvents()`.
- Unified click/drag logic for predictable behavior across browsers/headless DOMs.
- Optimized `pointToGrid()` and removed redundant handlers.

##### Testing
- ✅ All 13 unit tests pass in Vitest with `happy-dom`.
- Improved test stability on Windows + Node 22 (single-fork execution).

### Migration Notes
- Install the **scoped** package going forward:
  ```bash
  npm i @3nvs/polyfront-slider
