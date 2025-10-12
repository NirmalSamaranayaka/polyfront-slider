<!-- @SCOPE:start -->
# 🎛️ @3nvs/polyfront-slider (v1.0.0)

[![npm (scoped)](https://img.shields.io/npm/v/%403nvs%2Fpolyfront-slider)](https://www.npmjs.com/package/@3nvs/polyfront-slider)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20Demo-ff4785?logo=storybook)](https://nirmalsamaranayaka.github.io/polyfront-slider)
[![CI](https://github.com/NirmalSamaranayaka/polyfront-slider/actions/workflows/ci.yml/badge.svg)](https://github.com/NirmalSamaranayaka/polyfront-slider/actions/workflows/ci.yml)

> The **official scoped package** for the Polyfront Slider Web Component — built with TypeScript, accessible, framework-agnostic, and optimized for modern apps.
<!-- @SCOPE:end -->

<!-- @UNSCOPE:start -->
# 🎛️ polyfront-slider (v0.0.3)

[![npm version](https://img.shields.io/npm/v/polyfront-slider)](https://www.npmjs.com/package/polyfront-slider)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20Demo-ff4785?logo=storybook)](https://nirmalsamaranayaka.github.io/polyfront-slider)
[![CI](https://github.com/NirmalSamaranayaka/polyfront-slider/actions/workflows/ci.yml/badge.svg)](https://github.com/NirmalSamaranayaka/polyfront-slider/actions/workflows/ci.yml)

> **Notice:**  
> `polyfront-slider` is now a **shim** that re-exports [`@3nvs/polyfront-slider`](https://www.npmjs.com/package/@3nvs/polyfront-slider).  
> It exists for backwards compatibility — there are **no API differences**.
<!-- @UNSCOPE:end -->

---

## ✨ Overview
`polyfront-slider` is an **open-source Web Component slider** that works in **React**, **Vue**, **Angular**, **Svelte**, or plain **HTML/JS**.  

It provides **enterprise-grade configurability**, **theming tokens**, **accessibility**, and **form integration** — all in a single, dependency-free package.

---

## 🚀 Key Features

| Category | Highlights |
|-----------|-------------|
| 🎨 **UI/UX** | OKLCH color system, dark mode, hover/active/focus states, large touch targets, and elevation shadows. |
| 🧩 **Configurable** | Supports `{min, max, step}` or discrete arrays like `[0,1500,1600,…]`. Auto-detects step size and disables missing values. |
| 🧱 **Modes** | Single or dual-thumb (range) slider. |
| 🧠 **Smart Logic** | Auto GCD step detection, blocked intervals, minimum thumb distance. |
| ♿ **Accessible** | Full WAI-ARIA compliance, keyboard navigation, and `form-associated` support. |
| 🖥️ **Responsive** | 100 % width, mobile-friendly, fits any layout. |
| 🌗 **Themeable** | Size presets (`sm`,`md`,`lg`), CSS tokens, and dark/light mode support. |
| 🧪 **Reliable** | TypeScript + Vitest + Storybook 8.6 + GitHub CI. |
| 🧰 **Reusable** | Works standalone or via npm import in any framework. |

---

## 🧩 Installation

```bash
# Scoped (recommended)
npm install @3nvs/polyfront-slider

# or use alias (unscoped)
npm install polyfront-slider
```

---

## 🧑‍💻 Usage

### 1️⃣ Register the component
```ts
import { definePolyfrontSlider } from '@3nvs/polyfront-slider';
definePolyfrontSlider();
```

### 2️⃣ Add to your HTML / JSX
```html
<polyfront-slider id="price-slider" style="inline-size:100%;max-inline-size:480px"></polyfront-slider>
```

### 3️⃣ Configure dynamically
```ts
const slider = document.getElementById('price-slider');
slider.setConfig({
  mode: 'range',
  orientation: 'horizontal',
  size: 'md',
  values: [0,1500,1600,1700,1800,1900,2000],
  showTicks: true,
  showLabels: true,
  showTooltip: true,
  tickEvery: 1,
  disableMissingSteps: true,
  blockedIntervals: [[1600,1699]],
  minThumbDistance: 1,
  name: 'price'
});
```

---

## ⚙️ Config Options

| Option | Type | Default | Description |
|---------|------|----------|-------------|
| `mode` | `'single' \| 'range'` | `'single'` | Enables range (2 thumbs) or single thumb. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider direction. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track and thumb size preset. |
| `values` | `Array<number \| string \| object>` | — | Discrete slider values. |
| `min` / `max` / `step` | `number` | — | Continuous slider range. |
| `disableMissingSteps` | `boolean` | `true` | Disables non-defined steps. |
| `blockedIntervals` | `[number,number][]` | `[]` | Disable ranges of values. |
| `minThumbDistance` | `number` | `0` | Minimum thumb distance in range mode. |
| `showTicks` | `boolean` | `false` | Displays tick marks. |
| `showLabels` | `boolean` | `false` | Displays tick labels. |
| `showTooltip` | `boolean` | `false` | Shows tooltips for thumb values. |
| `tickEvery` | `number` | `1` | Render every N-th tick/label. |
| `rtl` | `boolean` | `false` | Right-to-left layout support. |
| `ariaLabel*` | `string` | — | Accessibility labels. |
| `name` | `string` | — | Enables form submission via JSON value. |

---

## 🎨 Theming & Custom Styles

```css
polyfront-slider {
  --pf-color-fill: oklch(0.63 0.21 35);
  --pf-color-fill-strong: oklch(0.56 0.22 35);
  --pf-color-thumb-border: oklch(0.63 0.21 35);
  --pf-track-size: 10px;
  --pf-thumb-size: 28px;
  --pf-focus: 0 0 0 4px color-mix(in oklab, var(--pf-color-fill) 35%, transparent);
}
```

✅ Supports **dark mode** (`prefers-color-scheme: dark`) and **reduced motion**.

---

## 🧪 Testing

```bash
npm run test
```

Example:
```ts
import { PolyfrontSlider } from '@3nvs/polyfront-slider';

const el = new PolyfrontSlider();
el.setConfig({ min: 0, max: 100, step: 10, mode: 'range' });
el.setValue([20, 80]);
expect(el.getValue()).toEqual([20, 80]);
```

---

## 📘 Storybook Demo

Local preview:
```bash
npm run storybook
```

Live demo → **https://nirmalsamaranayaka.github.io/polyfront-slider**

---

## 🏗️ Build

```bash
npm run build
```

Outputs:
```
dist/
├─ index.mjs
├─ index.cjs
└─ index.d.ts
```

---

## ⚙️ CI / CD via GitHub Actions

| Workflow | Trigger | Purpose |
|-----------|----------|---------|
| **ci.yml** | Push/PR → `main` | Type check, test, build verification |
| **storybook.yml** | Push → `main` | Deploys Storybook to GitHub Pages |
| **release.yml** | Tag push (`v*.*.*`) | Auto-publishes to npm (requires `NPM_TOKEN`) |

---

## 📁 Folder Structure

```
polyfront-slider/
├─ dist/                            ← build output (from @3nvs/polyfront-slider)
├─ src/
│  ├─ index.ts
│  └─ polyfront-slider.ts
├─ tests/                           ← Vitest tests
│  └─ polyfront-slider.test.ts
├─ stories/                          ← Storybook config
│  └─ polyfront-slider.stories.ts
├─ .storybook/
├─ .github/workflows/                ← CI workflows (ci.yml, storybook.yml, etc.)
├─ tsup.config.ts
├─ tsconfig.json
├─ packages/                        ← workspace packages
│  ├─ slider/                       ← canonical scoped package (@3nvs/polyfront-slider)
│  │   ├─ CHANGELOG.md
│  │   └─ package.json
│  └─ slider-shim/                  ← unscoped alias (polyfront-slider)
│      ├─ CHANGELOG.md
│      ├─ index.cjs
│      ├─ index.mjs
│      ├─ index.d.ts
│      └─ package.json
├─ LICENSE
├─ .npmrc                           ← optional npm scope config
└─ package.json                     ← workspace root (private)
└─ README.md
```

---

## 🌍 Publishing to npm

```bash
npm run build
npm version patch
npm publish --access public
```

---

## 👨‍💻 Author

**Nirmal Samaranayaka**  
📧 [nirmal.fullstack@gmail.com](mailto:nirmal.fullstack@gmail.com)  
💼 https://github.com/NirmalSamaranayaka

---

## 🪪 License

MIT © 2025 Nirmal Samaranayaka  
See [`LICENSE`](./LICENSE) for details.
