
# 🎛️ polyfront-slider (v0.0.1)

> A modern, **TypeScript-based**, **framework-agnostic** Web Component slider — beautifully designed, mobile-first, accessible, and highly configurable.  
> Built by [Nirmal Samaranayaka](mailto:nirmal.fullstack@gmail.com).

---

## ✨ Overview

`polyfront-slider` is an **open-source slider component** designed to work seamlessly across **React**, **Vue**, **Angular**, **Svelte**, or plain **HTML/JS** environments.

It offers **enterprise-level configurability**, **design tokens**, **dark mode**, **accessibility**, and **form integration** — all in a lightweight, dependency-free package.

---

## 🚀 Key Features

| Category | Highlights |
|-----------|-------------|
| 🎨 **UI/UX** | OKLCH color system, dark mode, hover/active/focus animations, large touch hit areas, subtle elevation, and theme tokens. |
| 🧩 **Configurable** | Use either `{min, max, step}` or discrete arrays like `[0,1500,1600,1700,…]`. Auto-step calculation with missing-step disabling. |
| 🧱 **Modes** | Single thumb or dual-thumb (range) slider. |
| 🧠 **Smart Logic** | Automatically detects step size (via GCD), allows min distance enforcement, and blocked value intervals. |
| ♿ **Accessible** | Full WAI-ARIA compliance, keyboard navigation (arrows, PgUp/Dn, Home/End), and `form-associated` element support. |
| 🖥️ **Responsive** | 100% width, touch-friendly, and adaptive to any layout or container. |
| 🌗 **Themeable** | Size presets (`sm`, `md`, `lg`), tokens via CSS variables, and responsive density control. |
| 🧪 **Reliable** | TypeScript + Vitest (jsdom) + Storybook 8.6 + GitHub CI workflows. |
| 🧰 **Reusable** | Works standalone or as an npm module across multiple frameworks. |

---

## 🧩 Installation

```bash
npm install polyfront-slider
```

---

## 🧑‍💻 Usage

### 1️⃣ Register the component

```ts
import { definePolyfrontSlider } from 'polyfront-slider';
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

## 🧮 Config Options

| Option | Type | Default | Description |
|---------|------|----------|-------------|
| `mode` | `'single' | 'range'` | `'single'` | Enables range (2 thumbs) or single thumb. |
| `orientation` | `'horizontal' | 'vertical'` | `'horizontal'` | Slider direction. |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Changes track, thumb, and tick sizes. |
| `values` | `Array<number|string|object>` | — | Discrete slider values. |
| `min/max/step` | `number` | — | Continuous slider range. |
| `disableMissingSteps` | `boolean` | `true` | Disables gaps in discrete arrays. |
| `blockedIntervals` | `[number,number][]` | `[]` | Disable ranges of values. |
| `minThumbDistance` | `number` | `0` | Minimum thumb separation in range mode. |
| `showTicks` | `boolean` | `false` | Displays ticks along track. |
| `showLabels` | `boolean` | `false` | Displays tick labels. |
| `showTooltip` | `boolean` | `false` | Shows tooltips for thumb values. |
| `tickEvery` | `number` | `1` | Render tick/label every Nth step. |
| `rtl` | `boolean` | `false` | RTL layout support. |
| `ariaLabel*` | `string` | — | Accessibility labels. |
| `name` | `string` | — | Enables form submission with JSON string. |

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

✅ Supports **dark mode** (`prefers-color-scheme: dark`) and **reduced motion** preferences.

---

## 🧪 Testing

```bash
npm run test
```

Vitest + jsdom test example:

```ts
import { PolyfrontSlider } from 'polyfront-slider';

const el = new PolyfrontSlider();
el.setConfig({ min: 0, max: 100, step: 10, mode: 'range' });
el.setValue([20, 80]);
expect(el.getValue()).toEqual([20, 80]);
```

---

## 📘 Storybook

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006)

Showcases continuous/discrete modes, sizes, dark mode, and accessibility.

---

## ⚙️ Build

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

## 🧰 CI/CD via GitHub Actions

| Workflow | Trigger | Purpose |
|-----------|----------|---------|
| **ci.yml** | Push/PR to `main` | Type check, test, build verification. |
| **release.yml** | Tag push (`v*.*.*`) | Auto-publishes to npm (needs `NPM_TOKEN`). |
| **storybook.yml** | Push to `main` | Builds & deploys Storybook to GitHub Pages. |

---

## 🧱 Folder Structure

```
polyfront-slider/
├─ src/
│  ├─ index.ts
│  └─ polyfront-slider.ts
├─ tests/
│  └─ polyfront-slider.test.ts
├─ stories/
│  └─ polyfront-slider.stories.ts
├─ .storybook/
├─ .github/workflows/
├─ tsup.config.ts
├─ tsconfig.json
├─ package.json
├─ LICENSE
└─ README.md
```

---

## 🌍 Publishing to npm

```bash
npm run build
npm adduser
npm publish --access public
```

Or push a tag like `v0.0.1` to trigger GitHub Action auto-publish.

---

## 👨‍💻 Author

**Nirmal Samaranayaka**  
📧 [nirmal.fullstack@gmail.com](mailto:nirmal.fullstack@gmail.com)  
💼 [GitHub: NirmalSamaranayaka](https://github.com/NirmalSamaranayaka)

---

## 🪪 License

**MIT License** © 2025 Nirmal Samaranayaka
