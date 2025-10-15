# @3nvs/polyfront-slider

All notable changes to **@3nvs/polyfront-slider** are documented in this file.  
This project follows [Semantic Versioning](https://semver.org/) and the [Keep a Changelog](https://keepachangelog.com/) style.

---

## [1.1.1] – 2025-10-15
- Updating unscope npm keywords

---

## [1.1.0] – 2025-10-14
### 🚀 Major Feature & Developer Experience Upgrade

This release introduces a cleaner API, new helper utilities, enhanced Storybook examples, and full cross-framework support — all while remaining backward compatible with v1.0.0.

### 🎨 Enhanced Storybook Stories
- **Improved visual design** with gradient backgrounds and better layouts
- **Added comprehensive examples** covering all use cases:
  - Price Range Slider (Horizontal & Vertical)
  - Simple Single Slider
  - Volume Control (Vertical)
  - Temperature Range
  - Small Size Slider
  - Disabled State
  - Custom Values Array
  - Helper Functions Demo
- **Better controls** with descriptions and proper argTypes
- **Enhanced styling** for both horizontal and vertical orientations
- **Interactive demos** showing real-time value changes

###  🚀 Enhanced API for Cross-Framework Usage
- **Helper Functions** for common patterns:
  - `createRangeSlider(min, max, step)` - Quick range sliders
  - `createVolumeControl(max)` - Vertical volume controls
  - `createPriceSlider(values)` - Discrete price ranges
  - `createDiscreteSlider(values, mode)` - String/number arrays
  - `createSliderWithProps(props)` - React-style props
- **React-style Props Interface** with onChange/onInput handlers
- **Simplified Integration** across frameworks (React, Vue, Angular, Svelte)

###  📚 Comprehensive Documentation
- **Updated README** with:
  - Quick start guide
  - Helper function examples
  - Framework integration examples (React, Vue, Angular, Svelte)
  - Event handling patterns
  - React-style props usage
- **Usage Examples HTML** with live demos
- **Better code examples** with proper TypeScript types

### 🎯 Framework-Specific Examples
- **React**: useEffect + useRef pattern
- **Vue 3**: Composition API with onMounted
- **Angular**: Component lifecycle with ViewChild
- **Svelte**: onMount/onDestroy lifecycle
- **Vanilla JS**: Direct DOM manipulation

### 🔧 Technical Improvements
- Added `white-space: nowrap` to prevent text wrapping
- Improved CSS transforms for precise positioning
- Responsive tooltip design for different slider sizes
- Vertical tooltip arrow points to thumb


### 📦 Updated Dependencies
- TypeScript `^5.9.3`
- Vite `^7.1.10`
- Happy-DOM `^20.0.0`
- Storybook `^8.6.14`
- Fixed all npm audit vulnerabilities

### 🧪 Quality Assurance
- All tests passing (13/13)
- TypeScript compilation successful
- No linting errors
- Proper TypeScript types for all new functions

### 🎉 Key Benefits
**Developers:**
- Easier integration with helper functions
- Framework-agnostic usage
- Familiar React-style props
- Copy-paste ready examples

**Users:**
- Improved visual design and interactive demos
- 8+ comprehensive Storybook stories
- Professional look with gradient backgrounds

**Maintainers:**
- Clean, well-documented code
- Full TypeScript type safety
- All tests pass
- Extensible API for future helper functions

### ⚙️ Upgrade Notes
- No breaking changes; existing usage remains compatible
- Upgrade via: `npm install @3nvs/polyfront-slider@^1.1.0`

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
