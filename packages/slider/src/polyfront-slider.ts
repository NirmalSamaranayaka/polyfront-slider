export type Orientation = 'horizontal' | 'vertical';
export type Mode = 'single' | 'range';
export type OutputMode = 'value' | 'index' | 'object';
export type Size = 'sm' | 'md' | 'lg';

export interface PFObjectValue<T = unknown> { value: number | string; data?: T; }
export type BlockedInterval = [number, number];

export interface PFSliderConfig<T = unknown> {
  mode?: Mode; enableRange?: boolean; orientation?: Orientation; size?: Size;
  values?: Array<number | string | PFObjectValue<T>>;
  min?: number; max?: number; step?: number;
  disableMissingSteps?: boolean; blockedIntervals?: BlockedInterval[];
  minThumbDistance?: number; showTicks?: boolean; showLabels?: boolean; showTooltip?: boolean;
  tickEvery?: number; ariaLabel?: string; ariaLabelLower?: string; ariaLabelUpper?: string;
  disabled?: boolean; rtl?: boolean; output?: OutputMode; name?: string;
  showFill?: boolean;
  blocked?: number[] | [number, number][];
}

const BaseHTMLElement: typeof HTMLElement = (globalThis as any).HTMLElement ?? (class {} as any);

const TEMPLATE = typeof document !== 'undefined' ? document.createElement('template') : ({} as any);
if ((TEMPLATE as any).innerHTML !== undefined) {
  (TEMPLATE as HTMLTemplateElement).innerHTML = `
    <style>
      :host {
        /* theme tokens */
        --pf-color-track: oklch(0.9 0 0);
        --pf-color-fill: oklch(0.63 0.17 258);
        --pf-color-fill-strong: oklch(0.55 0.2 258);
        --pf-color-thumb: oklch(1 0 0);
        --pf-color-thumb-border: oklch(0.63 0.17 258);
        --pf-color-tick: oklch(0.64 0 0);
        --pf-color-tick-disabled: oklch(0.85 0 0);
        --pf-color-label: oklch(0.45 0 0);
        --pf-color-tooltip-bg: oklch(0.15 0.05 255);
        --pf-color-tooltip-fg: oklch(1 0 0);
        --pf-radius: 9999px;
        --pf-elev: 0 4px 12px rgba(0,0,0,0.12);
        --pf-track-size: 10px;
        --pf-thumb-size: 24px;
        --pf-tick-size: 6px;
        --pf-focus: 0 0 0 4px color-mix(in oklab, var(--pf-color-fill) 30%, transparent);
        --pf-vpad-start: 10px;  /* left padding for tooltips */
        --pf-vpad-end: 50px;    /* right padding for labels */
        --pf-vgap: 12px;       /* gap from track to tooltip/labels */

        /* layout baseline (no forced height here) */
        display: inline-block;
        inline-size: 100%;
        min-block-size: var(--pf-thumb-size);
        position: relative;
        touch-action: none;
        user-select: none;
        font: 400 14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
      }

      /* sizes */
      :host([data-size="sm"]) { --pf-track-size: 6px;  --pf-thumb-size: 18px; --pf-tick-size: 4px; }
      :host([data-size="lg"]) { --pf-track-size: 10px; --pf-thumb-size: 26px; --pf-tick-size: 8px; }

      /* orientation frame */
      :host([orientation="horizontal"]) { block-size: var(--pf-thumb-size); }
      :host([orientation="vertical"])   { inline-size: var(--pf-thumb-size); block-size: 240px; }

      /* root padding: bottom for H, right for V */
      .root {
        position: relative;
        inline-size: 100%;
        block-size: 100%;
        padding-block: 12px 30px; /* horizontal default */
      }
      :host([orientation="vertical"]) .root {
        padding-block: 0;
         padding-inline: var(--pf-vpad-start) var(--pf-vpad-end);
      }

      /* track & fill */
      .track {
        background: var(--pf-color-track);
        border-radius: var(--pf-radius);
        position: absolute;
        overflow: visible;
      }
      :host([orientation="horizontal"]) .track { left: 0; right: 0; top: 50%; transform: translateY(-50%); height: var(--pf-track-size); }
      :host([orientation="vertical"])   .track { width: var(--pf-track-size);  height: 100%; }

      .fill { position: absolute; border-radius: var(--pf-radius); }
      :host([orientation="horizontal"]) .fill {
        background: linear-gradient(90deg, var(--pf-color-fill), var(--pf-color-fill-strong));
      }
      :host([orientation="vertical"]) .fill {
        background: linear-gradient(180deg, var(--pf-color-fill), var(--pf-color-fill-strong));
      }

      /* thumb */
      .thumb {
        position: absolute;
        width: var(--pf-thumb-size);
        height: var(--pf-thumb-size);
        border-radius: 9999px;
        background: var(--pf-color-thumb);
        border: 2px solid var(--pf-color-thumb-border);
        box-shadow: var(--pf-elev);
        transform: translate(-50%,-50%);
        outline: none;
      }
      :host([orientation="horizontal"]) .thumb { top: 50%; }
      :host([orientation="vertical"]) .thumb {
        left: calc(var(--pf-vpad-start) + (var(--pf-track-size) / 2));
      }

      /* layers: tooltips > labels > ticks */
      .ticks   { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
      .labels  { position: absolute; inset: 0; pointer-events: none; z-index: 1; font-size: 12px; color: var(--pf-color-label); }
      .tooltip { position: absolute; z-index: 2; }

      /* ticks */
      .tick {
        position: absolute;
        width: var(--pf-tick-size);
        height: var(--pf-tick-size);
        background: var(--pf-color-tick);
        border-radius: 9999px;
        transform: translate(-50%,-50%);
      }
      .tick[aria-disabled="true"] { background: var(--pf-color-tick-disabled); }

      /* labels */
      .label  { position: absolute; white-space: nowrap; }
      :host([orientation="horizontal"]) .label { top: calc(100% + 6px); transform: translate(-50%,0); }
      :host([orientation="vertical"]) .label {
        left: calc(100% + var(--pf-vgap));
        transform: translate(0,-50%);
      }

      /* tooltips */
      .tooltip {
        position: absolute;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        background: var(--pf-color-tooltip-bg);
        color: var(--pf-color-tooltip-fg);
        pointer-events: none;
        box-shadow: var(--pf-elev);
        white-space: nowrap;
        z-index: 10;
        transition: opacity 0.2s ease;
        min-width: 32px;
        text-align: center;
      }
      :host([orientation="horizontal"]) .tooltip { 
        transform: translate(-50%, -100%);
        margin-top: -12px;
      }
      :host([orientation="vertical"]) .tooltip {
        /* Position tooltips on the left side to avoid overlap */
        left: calc(var(--pf-vpad-start) - 8px);
        transform: translate(-100%, -50%);
        margin-right: 8px;
      }
      
      /* tooltip arrow */
      .tooltip::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
      }
      :host([orientation="horizontal"]) .tooltip::before {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px 6px 0 6px;
        border-color: var(--pf-color-tooltip-bg) transparent transparent transparent;
      }
      :host([orientation="vertical"]) .tooltip::before {
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 6px 0 6px 6px;
        border-color: transparent transparent transparent var(--pf-color-tooltip-bg);
      }
    </style>
    <div class="root">
      <div class="track" part="track">
        <div class="fill" part="fill"></div>
        <div class="ticks" part="ticks"></div>
        <div class="labels" part="labels"></div>
      </div>
      <button class="thumb" part="thumb" data-thumb="0" aria-label="Lower value"></button>
      <button class="thumb" part="thumb" data-thumb="1" hidden aria-label="Upper value"></button>
      <div class="tooltip" data-tooltip="0" hidden></div>
      <div class="tooltip" data-tooltip="1" hidden></div>
    </div>
  `;
}

function gcd(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcd(b, a % b); }
function gcdArray(nums: number[]): number {
  const f = nums.filter(n => Number.isFinite(n) && Math.abs(n) > 0);
  if (!f.length) return 1;
  return f.reduce((acc, n) => gcd(acc, Math.round(Math.abs(n))), Math.round(Math.abs(f[0])));
}

export class PolyfrontSlider<T = unknown> extends BaseHTMLElement {
  static formAssociated = true;
  static get observedAttributes() { return ['size', 'orientation', 'mode', 'disabled', 'min', 'max', 'step', 'values']; }

  private root!: ShadowRoot;
  private track!: HTMLElement;
  private fill!: HTMLElement;
  private ticks!: HTMLElement;
  private labels!: HTMLElement;
  private thumbs!: HTMLButtonElement[];
  private tooltips!: HTMLElement[];
  private internals: any;

  private cfg = {
    mode: 'single' as Mode,
    enableRange: true,
    orientation: 'horizontal' as Orientation,
    size: 'md' as Size,
    showTicks: false, showLabels: false, showTooltip: false, tickEvery: 1,
    disabled: false, rtl: false, output: 'value' as OutputMode, disableMissingSteps: true,
    ariaLabel: undefined as string | undefined, ariaLabelLower: undefined as string | undefined,
    ariaLabelUpper: undefined as string | undefined, name: undefined as string | undefined,
    showFill: false, 
  };

  private isDiscrete = false;
  private values: Array<number | string | PFObjectValue<T>> | null = null;
  private min = 0; private max = 100; private step = 1;
  private disabledSet: Set<number> = new Set();
  private blockedIntervals: BlockedInterval[] = [];
  private minThumbDistance = 0;
  private pos0 = 0; private pos1 = 0;

  private ro?: ResizeObserver;

  constructor() {
    super();
    if (typeof document !== 'undefined' && (TEMPLATE as any).content) {
      this.root = this.attachShadow({ mode: 'open' });
      this.root.appendChild((TEMPLATE as HTMLTemplateElement).content.cloneNode(true));
      this.track = this.root.querySelector('.track') as HTMLElement;
      this.fill = this.root.querySelector('.fill') as HTMLElement;
      this.ticks = this.root.querySelector('.ticks') as HTMLElement;
      this.labels = this.root.querySelector('.labels') as HTMLElement;
      this.thumbs = Array.from(this.root.querySelectorAll('.thumb')) as HTMLButtonElement[];
      this.tooltips = Array.from(this.root.querySelectorAll('.tooltip')) as HTMLElement[];
    }
    this.internals = (this as any).attachInternals ? (this as any).attachInternals() : null;
  }

 connectedCallback() {
  this.ro = new ResizeObserver(() => this.render());
  this.ro.observe(this);

  if (!this.style.width && this.cfg.orientation === 'horizontal') this.style.width = '100%';
  if (!this.style.height && this.cfg.orientation === 'vertical') this.style.height = '240px';

  this.fill.style.display = this.cfg.showFill ? 'block' : 'none';
  this.applySizeAttr();
  this.ensureSizeDefaults();
  this.setupARIA();
  this.attachEvents(); 

  this.render();
}

  disconnectedCallback() {
    this.ro?.disconnect();
  }

 private parseNum(v: string | null, fallback: number) {
  const n = v === null ? NaN : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
  if (oldValue === newValue) return;
  if (name.startsWith('data-')) return; // avoid reflection loops

  switch (name) {
    case 'orientation':
      this.cfg.orientation = (newValue as Orientation) || 'horizontal';
      this.ensureSizeDefaults();
      break;
    case 'mode':
      this.cfg.mode = (newValue as Mode) || 'single';
      break;
    case 'disabled':
      this.cfg.disabled = newValue !== null;
      break;
    case 'name':
      this.cfg.name = newValue || undefined;
      break;

    // numeric continuous attrs
    case 'min':
      this.isDiscrete = false;
      this.min = this.parseNum(newValue, 0);
      break;
    case 'max':
      this.isDiscrete = false;
      this.max = this.parseNum(newValue, 100);
      break;
    case 'step':
      this.isDiscrete = false;
      this.step = Math.max(1e-12, this.parseNum(newValue, 1));
      break;

    // discrete list via attribute (comma-separated)
    case 'values': {
      this.isDiscrete = true;
      const arr = (newValue ?? '')
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => (Number.isFinite(Number(s)) ? Number(s) : s));
      this.values = arr;
      // recompute numeric projection bounds/step
      const nums: number[] = [];
      let allNumeric = true;
      for (const v of arr) {
        if (typeof v === 'number') nums.push(v);
        else { allNumeric = false; break; }
      }
      if (allNumeric && nums.length) {
        nums.sort((a,b)=>a-b);
        this.min = nums[0]; this.max = nums[nums.length-1];
        const diffs: number[] = [];
        for (let i=1;i<nums.length;i++) diffs.push(Math.abs(nums[i]-nums[i-1]));
        this.step = gcdArray(diffs) || 1;
      } else {
        this.min = 0; this.max = arr.length - 1; this.step = 1;
      }
      this.disabledSet.clear();
      break;
    }
  }
    // after any attribute change, keep indices valid and re-render
    this.pos0 = Math.max(0, Math.min(this.pos0, this.gridCount() - 1));
    this.pos1 = Math.max(0, Math.min(this.pos1, this.gridCount() - 1));
    if (this.cfg.mode === 'single' || !this.cfg.enableRange) this.pos1 = this.pos0;

    this.render();
}

  private applySizeAttr() {
    const v = this.cfg.size!;
    if (this.getAttribute('data-size') !== v) {
      this.setAttribute('data-size', v);
    }
  }

 private onTrackPointerDown = (e: PointerEvent | MouseEvent) => {
    if (this.cfg.disabled) return;

    const track = this.track as HTMLElement | undefined; // <-- use your existing 'track' field
    if (!track) return;

    const isHorizontal = this.cfg.orientation !== 'vertical';

    // Client coordinate with fallbacks (helps in happy-dom/jsdom)
    const clientPos = isHorizontal
      ? ((e as any).clientX ?? (e as any).pageX ?? (e as any).x ?? 0)
      : ((e as any).clientY ?? (e as any).pageY ?? (e as any).y ?? 0);

    const rect = track.getBoundingClientRect();
    const frac = isHorizontal
      ? (clientPos - rect.left) / (rect.width || 1)
      : (rect.bottom - clientPos) / (rect.height || 1); // top->bottom

    const clamped = Math.max(0, Math.min(1, frac));
    const target = this.valueFromFractionContinuous(clamped);

    const current = this.getValue();
    if (Array.isArray(current)) {
      // range mode: move the nearest thumb only
      const [a, b] = current;
      const moveLeft = Math.abs(a - target) <= Math.abs(b - target);
      const next: [number, number] = moveLeft ? [target, b] : [a, target];
      this.setValue(next);
    } else {
      // single mode
      this.setValue(target);
    }

    e.preventDefault?.();
  };

  private valueFromFractionContinuous(frac: number) {
    const min = this.min;
    const max = this.max;
    const step = this.step;
    const raw = min + frac * (max - min);
    const snapped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, snapped));
  }

  private eventToFraction(e: Event, rect: DOMRect): number {
    const isH = this.cfg.orientation !== 'vertical';

    // 1) Prefer standard coords
    const anyEvt = e as any;
    let cx = anyEvt.clientX ?? anyEvt.pageX ?? anyEvt.x;
    let cy = anyEvt.clientY ?? anyEvt.pageY ?? anyEvt.y;

    // 2) Fall back to offset-like coords if present
    if (cx == null || cy == null) {
      // Some test drivers set offsetX/Y only
      if (typeof anyEvt.offsetX === 'number' || typeof anyEvt.offsetY === 'number') {
        cx = rect.left + (anyEvt.offsetX ?? 0);
        cy = rect.top + (anyEvt.offsetY ?? 0);
      }
    }

    // 3) If still missing, use **center** of the track
    const W = rect.width  > 0 ? rect.width  : 1;
    const H = rect.height > 0 ? rect.height : 1;
    const left   = rect.left ?? 0;
    const top    = rect.top  ?? 0;
    const bottom = rect.bottom ?? (top + H);

    if (cx == null) cx = left + W / 2;
    if (cy == null) cy = top  + H / 2;

    // 4) Compute 0..1, clamped
    const frac = isH
      ? (cx - left) / W
      : (bottom - cy) / H;

    return Math.max(0, Math.min(1, frac));
  }

  setConfig(cfg: PFSliderConfig<T>) {
    if (cfg.enableRange !== undefined) this.cfg.enableRange = cfg.enableRange;
    if (cfg.mode) this.cfg.mode = this.cfg.enableRange ? cfg.mode : 'single';
    if (cfg.orientation) this.cfg.orientation = cfg.orientation;
     this.applyBlockedIntervals();
    if (cfg.size) this.cfg.size = cfg.size;
    if (cfg.disabled !== undefined) this.cfg.disabled = cfg.disabled;
    if (cfg.rtl !== undefined) this.cfg.rtl = cfg.rtl;
    if (cfg.showTicks !== undefined) this.cfg.showTicks = cfg.showTicks;
    if (cfg.tickEvery !== undefined) this.cfg.tickEvery = Math.max(1, Math.floor(cfg.tickEvery));
    if (cfg.showLabels !== undefined) this.cfg.showLabels = cfg.showLabels;
    if (cfg.showTooltip !== undefined) this.cfg.showTooltip = cfg.showTooltip;
    if (cfg.ariaLabel !== undefined) this.cfg.ariaLabel = cfg.ariaLabel;
    if (cfg.ariaLabelLower !== undefined) this.cfg.ariaLabelLower = cfg.ariaLabelLower;
    if (cfg.ariaLabelUpper !== undefined) this.cfg.ariaLabelUpper = cfg.ariaLabelUpper;
    if (cfg.output) this.cfg.output = cfg.output;
    if (cfg.name !== undefined) this.cfg.name = cfg.name;
    if (cfg.disableMissingSteps !== undefined) this.cfg.disableMissingSteps = cfg.disableMissingSteps;
    if (cfg.minThumbDistance !== undefined) this.minThumbDistance = Math.max(0, Math.floor(cfg.minThumbDistance));
    if (cfg.blockedIntervals) this.blockedIntervals = cfg.blockedIntervals.slice();
    if (cfg.showFill !== undefined) this.cfg.showFill = cfg.showFill;

    if (cfg.values) {
      this.isDiscrete = true;
      this.values = cfg.values.slice();
      const nums: number[] = [];
      let allNumeric = true;
      for (const v of this.values) {
        if (typeof v === 'number') nums.push(v);
        else if (typeof v === 'object' && v && 'value' in v && typeof (v as any).value === 'number') nums.push((v as any).value);
        else { allNumeric = false; break; }
      }
      if (allNumeric && nums.length) {
        nums.sort((a,b)=>a-b);
        this.min = nums[0]; this.max = nums[nums.length-1];
        const diffs: number[] = []; for (let i=1;i<nums.length;i++) diffs.push(Math.abs(nums[i]-nums[i-1]));
        this.step = typeof cfg.step === 'number' ? cfg.step : (gcdArray(diffs) || 1);
        this.disabledSet.clear();
        if (this.cfg.disableMissingSteps) {
          const allowed = new Set(nums.map(n => Math.round((n - this.min)/this.step)));
          const count = this.gridCount();
          for (let i=0;i<count;i++) if (!allowed.has(i)) this.disabledSet.add(i);
        }
      } else {
        this.min = 0; this.max = this.values.length - 1; this.step = 1;
        this.disabledSet.clear();
      }
    } else {
      this.isDiscrete = false;
      if (typeof cfg.min === 'number') this.min = cfg.min;
      if (typeof cfg.max === 'number') this.max = cfg.max;
      if (typeof cfg.step === 'number') this.step = Math.max(1e-12, cfg.step);
      this.values = null; this.disabledSet.clear();
    }

    this.applyBlockedIntervals();
    this.pos0 = 0; this.pos1 = this.gridCount() - 1;
    if (this.cfg.mode === 'single' || !this.cfg.enableRange) this.pos1 = this.pos0;
    this.applySizeAttr();
    this.ensureSizeDefaults();
    this.render();
  }

  getValue(): any {
    const out = (i: number) => this.gridToOutput(i);
    if (this.cfg.mode === 'single' || !this.cfg.enableRange) return out(this.pos0);
    const a = out(this.pos0), b = out(this.pos1);
    return a <= b ? [a,b] : [b,a];
  }

  setValue(v: any) {
    const toIdx = (val: any) => this.outputToGrid(val);
    if (this.cfg.mode === 'single' || !this.cfg.enableRange) {
      this.pos0 = this.clampNearestEnabled(toIdx(v));
    } else if (Array.isArray(v) && v.length === 2) {
      let a = this.clampNearestEnabled(toIdx(v[0]));
      let b = this.clampNearestEnabled(toIdx(v[1]));
      if (Math.abs(b-a) < this.minThumbDistance) {
        if (b > a) b = a + this.minThumbDistance;
        else a = b + this.minThumbDistance;
      }
      this.pos0 = Math.min(a,b); this.pos1 = Math.max(a,b);
    }
    this.render();
  }

  private gridCount(): number {
    if (this.values && !this.values.every(v => typeof v === 'number' || (typeof v === 'object' && v && 'value' in v && typeof (v as any).value === 'number'))) {
      return this.values.length;
    }
    const span = this.max - this.min;
    return Math.floor(span / this.step + 1e-9) + 1;
  }
  private gridToNumber(idx: number) { return this.min + idx * this.step; }
  private numberToGrid(n: number) { return Math.round((n - this.min) / this.step); }

  private gridToOutput(idx: number): any {
    if (this.values) {
      const numericProjection = this.values.every(v => typeof v === 'number' || (typeof v === 'object' && v && 'value' in v && typeof (v as any).value === 'number'));
      if (!numericProjection) {
        const v = this.values[idx] as any;
        return this.cfg.output === 'index' ? idx : v;
      }
      const num = this.gridToNumber(idx);
      if (this.cfg.output === 'index') return idx;
      const map = new Map<number, any>();
      for (const v of this.values) {
        const vv = typeof v === 'object' && v && 'value' in v ? (v as any).value : v;
        if (typeof vv === 'number') map.set(vv, v);
      }
      const obj = map.get(num);
      if (this.cfg.output === 'object') return obj ?? num;
      return typeof obj === 'object' && obj ? obj.value : num;
    }
    const num = this.gridToNumber(idx);
    if (this.cfg.output === 'index') return idx;
    return num;
  }
  private outputToGrid(val: any): number {
    if (this.values) {
      const numericProjection = this.values.every(v => typeof v === 'number' || (typeof v === 'object' && v && 'value' in v && typeof (v as any).value === 'number'));
      if (!numericProjection) {
        if (typeof val === 'number') return Math.max(0, Math.min(this.values.length - 1, Math.round(val)));
        const idx = this.values.findIndex(v => (typeof v === 'object' ? (v as any).value : v) === val);
        return idx >= 0 ? idx : 0;
      }
      if (typeof val === 'object' && val && 'value' in val) val = (val as any).value;
      if (typeof val !== 'number') return 0;
      return this.numberToGrid(val);
    }
    if (typeof val !== 'number') return 0;
    return this.numberToGrid(val);
  }

  private ensureSizeDefaults() {
    // Only apply defaults if the user hasn't set explicit sizing.
    if (this.cfg.orientation === 'vertical') {
      if (!this.style.height) this.style.height = '240px'; // give the track real space
      // keep width auto so our :host([orientation="vertical"]) inline-size takes effect
    } else {
      if (!this.style.width) this.style.width = '100%';
    }
  }
  private applyBlockedIntervals() {
    if (!this.blockedIntervals.length) return;
    const toIdx = (v: number) => this.numberToGrid(v);
    const count = this.gridCount();
    for (const [a,b] of this.blockedIntervals) {
      const s = Math.max(0, Math.min(toIdx(Math.min(a,b)), count-1));
      const e = Math.max(0, Math.min(toIdx(Math.max(a,b)), count-1));
      for (let i=s;i<=e;i++) this.disabledSet.add(i);
    }
  }

  private clampNearestEnabled(idx: number): number {
    const min = 0, max = this.gridCount()-1;
    idx = Math.max(min, Math.min(max, idx));
    if (!this.disabledSet.has(idx)) return idx;
    for (let d=1; d<=Math.max(idx-min, max-idx); d++) {
      const L = idx - d, R = idx + d;
      if (L >= min && !this.disabledSet.has(L)) return L;
      if (R <= max && !this.disabledSet.has(R)) return R;
    }
    return idx;
  }

  private pointToGrid(x?: number, y?: number, rect?: DOMRect): number {
    const r = rect ?? this.track.getBoundingClientRect();
    const count = this.gridCount();

    // Safe geometry + center fallbacks for happy-dom
    const W = r?.width && r.width > 0 ? r.width : 1;
    const H = r?.height && r.height > 0 ? r.height : 1;
    const left   = r?.left   ?? 0;
    const top    = r?.top    ?? 0;
    const bottom = r?.bottom ?? (top + H);

    const cx = (x ?? (left + W / 2));
    const cy = (y ?? (top  + H / 2));

    const ratio = this.cfg.orientation === 'horizontal'
      ? Math.max(0, Math.min(1, (cx - left) / W))
      : Math.max(0, Math.min(1, (bottom - cy) / H));

    const raw = ratio * (count - 1);
    return this.clampNearestEnabled(Math.round(raw));
  }

  private setThumbPosition(which: 0|1, gridIdx: number, live = false) {
    const count = this.gridCount();
    let idx = this.clampNearestEnabled(Math.max(0, Math.min(count-1, gridIdx)));
    if (this.cfg.mode === 'range' && this.cfg.enableRange) {
      if (which === 0) {
        if (this.pos1 - idx < this.minThumbDistance) idx = this.pos1 - this.minThumbDistance;
        idx = this.clampNearestEnabled(idx);
        this.pos0 = Math.min(idx, this.pos1);
      } else {
        if (idx - this.pos0 < this.minThumbDistance) idx = this.pos0 + this.minThumbDistance;
        idx = this.clampNearestEnabled(idx);
        this.pos1 = Math.max(idx, this.pos0);
      }
    } else {
      this.pos0 = idx;
    }
    this.render();
    this.emitChange(live ? 'input' : 'change');
  }

  private emitChange(type: 'input'|'change') {
    const detail = { value: this.getValue(), pos0: this.pos0, pos1: this.pos1 };
    this.dispatchEvent(new CustomEvent(`polyfront-slider-${type}`, { detail, bubbles: true }));
    if (this.internals && this.cfg.name) this.internals.setFormValue(JSON.stringify(detail.value));
  }

  private setupARIA() {
    if (!this.root) return;
    this.setAttribute('role','group');
    this.setAttribute('orientation', this.cfg.orientation);
    const [t0, t1] = this.thumbs;
    const apply = (thumb: HTMLButtonElement, idx: number, label?: string) => {
      thumb.setAttribute('role','slider');
      thumb.setAttribute('tabindex', this.cfg.disabled ? '-1' : '0');
      thumb.setAttribute('aria-disabled', String(this.cfg.disabled));
      thumb.setAttribute('aria-orientation', this.cfg.orientation);
      if (label) thumb.setAttribute('aria-label', label);
      else if (this.cfg.ariaLabel) thumb.setAttribute('aria-label', this.cfg.ariaLabel);
      this.updateAriaValues(thumb, idx);
    };
    apply(t0, this.pos0, this.cfg.ariaLabelLower);
    if (this.cfg.mode === 'range' && this.cfg.enableRange) {
      t1.hidden = false; apply(t1, this.pos1, this.cfg.ariaLabelUpper);
    } else { t1.hidden = true; }
  }
  private updateAriaValues(thumb: HTMLButtonElement, gridIdx: number) {
    const count = this.gridCount();
    thumb.setAttribute('aria-valuemin','0');
    thumb.setAttribute('aria-valuemax', String(count-1));
    thumb.setAttribute('aria-valuenow', String(gridIdx));
    const val = this.gridToOutput(gridIdx);
    thumb.setAttribute('aria-valuetext', Array.isArray(val) ? val.join(' – ') : String(val));
  }

  private handleTrackPointer = (e: PointerEvent | MouseEvent) => {
    if (this.cfg.disabled) return;

    const rect = this.track.getBoundingClientRect();
    // If the track has no size (test DOMs), synthesize a minimal rect
    const fakeRect = {
      ...rect,
      width:  rect.width  > 0 ? rect.width  : 1,
      height: rect.height > 0 ? rect.height : 1,
      bottom: rect.bottom ?? (rect.top + (rect.height > 0 ? rect.height : 1)),
    } as DOMRect;

    const frac = this.eventToFraction(e as any, fakeRect);

    // Convert to grid index deterministically
    const count = this.gridCount();
    const pos   = this.clampNearestEnabled(Math.round(frac * (count - 1)));

    // Move **nearest** thumb only
    const d0 = Math.abs(pos - this.pos0);
    const d1 = Math.abs(pos - this.pos1);
    const active = (this.cfg.mode === 'range' && !this.thumbs[1].hidden) ? (d0 <= d1 ? 0 : 1) : 0;

    this.setThumbPosition(active as 0 | 1, pos, true);
    (e as any).preventDefault?.();
    (e as any).stopPropagation?.();
  };


  private attachEvents() {
    if (!this.root) return;
    // 1) Host-level listener (captures events dispatched on the custom element)
    //    Works when tests do: el.dispatchEvent(new PointerEvent('pointerdown', ...))
    this.addEventListener('pointerdown', (e) => {
      // Only handle if the track is in the composed path
      const path = (e as any).composedPath?.() ?? [];
      if (path.includes(this.track)) {
        this.handleTrackPointer(e as PointerEvent);
      }
    }, { capture: true });

    // 2) Direct track listener (works for real user clicks or tests that target the track)
    this.track.addEventListener('pointerdown', (e) => this.handleTrackPointer(e));

     this.thumbs.forEach((thumb, i) => {
      thumb.addEventListener('pointerdown', (e) => {
        if (this.cfg.disabled) return;
        (e.target as HTMLElement).setPointerCapture?.((e as PointerEvent).pointerId);
        const rect = this.track.getBoundingClientRect();
        const move = (ev: PointerEvent) => {
          const p = this.pointToGrid(ev.clientX, ev.clientY, rect);
          this.setThumbPosition(i as 0|1, p, true);
        };
        const up = (ev: PointerEvent) => {
          (ev.target as HTMLElement).releasePointerCapture?.((e as PointerEvent).pointerId);
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
          this.emitChange('change');
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      });
    });

   this.thumbs.forEach((thumb, i) => {
    thumb.addEventListener('keydown', (e) => {
      if (this.cfg.disabled) return;
      const key = (e as KeyboardEvent).key;
      let delta = 0;
      const big = Math.max(1, Math.round(this.gridCount() * 0.1));
      const rtl = this.cfg.rtl && this.cfg.orientation === 'horizontal';
      const neg = (dir: number) => (rtl ? -dir : dir);
      switch (key) {
        case 'ArrowLeft':
        case 'ArrowDown': delta = neg(-1); break;
        case 'ArrowRight':
        case 'ArrowUp':   delta = neg(1); break;
        case 'PageDown':  delta = neg(-big); break;
        case 'PageUp':    delta = neg(big); break;
        case 'Home': this.setThumbPosition(i as 0|1, 0, true); this.emitChange('change'); return;
        case 'End':  this.setThumbPosition(i as 0|1, this.gridCount()-1, true); this.emitChange('change'); return;
        default: return;
      }
      e.preventDefault();
      const current = (i === 0 ? this.pos0 : this.pos1);
      this.setThumbPosition(i as 0|1, current + delta, true);
      this.emitChange('change');
    });
  });
}

  private render() {
    if (!this.root) return;
    this.setupARIA();
    const count = this.gridCount();
    const [t0, t1] = this.thumbs;
    const ratio0 = this.pos0 / (count - 1 || 1);
    const ratio1 = (!t1.hidden) ? this.pos1 / (count - 1 || 1) : ratio0;

    if (this.cfg.orientation === 'horizontal') {
      const left = Math.min(ratio0, ratio1) * 100;
      const right = Math.max(ratio0, ratio1) * 100;
      this.fill.style.left = left + '%';
      this.fill.style.right = (100 - right) + '%';
      t0.style.left = (ratio0 * 100) + '%'; t0.style.top = '50%';
      if (!t1.hidden) { t1.style.left = (ratio1 * 100) + '%'; t1.style.top = '50%'; }
    } else {
      const bottom = Math.min(ratio0, ratio1) * 100;
      const top = Math.max(ratio0, ratio1) * 100;
       this.fill.style.left = '0';
       this.fill.style.right = '0';
       this.fill.style.bottom = bottom + '%';
       this.fill.style.top = (100 - top) + '%';

       // position thumbs vertically; let CSS handle the horizontal (left)
       t0.style.top = (100 - ratio0 * 100) + '%';
       t0.style.left = ''; 

       if (!t1.hidden) {
         t1.style.top = (100 - ratio1 * 100) + '%';
         t1.style.left = ''; 
       }
    }

    const [tip0, tip1] = this.tooltips;
    const showTip = this.cfg.showTooltip;
    const val0 = this.gridToOutput(this.pos0);
    tip0.textContent = String(val0); tip0.hidden = !showTip;

    if (!t1.hidden) {
      const val1 = this.gridToOutput(this.pos1);
      tip1.textContent = String(val1); tip1.hidden = !showTip;
    } else {
      tip1.hidden = true;
    }

    // position tooltips: H sets left/top, V sets top only (left handled in CSS)
    if (this.cfg.orientation === 'horizontal') {
      tip0.style.left = (ratio0 * 100) + '%'; 
      tip0.style.top = '25px'; // Much closer to thumb
      if (!t1.hidden) { 
        tip1.style.left = (ratio1 * 100) + '%'; 
        tip1.style.top = '25px'; // Much closer to thumb
      }
    } else {
        // For vertical sliders, position tooltips on the left side
        tip0.style.top = (100 - ratio0 * 100) + '%';
        if (!t1.hidden) {
          tip1.style.top = (100 - ratio1 * 100) + '%';
        }
    }

    this.renderTicksAndLabels();
  }

  private renderTicksAndLabels() {
    const count = this.gridCount();
    this.ticks.innerHTML = ''; this.labels.innerHTML = '';
    if (!this.cfg.showTicks && !this.cfg.showLabels) return;

    const ticksFrag = document.createDocumentFragment();
    const labelsFrag = document.createDocumentFragment();
    const every = this.cfg.tickEvery || 1;

    // For label density control
    const rect = this.track.getBoundingClientRect();
    const axisSpan = this.cfg.orientation === 'horizontal' ? rect.width : rect.height;
    const minPxGap = 18; // pixels between labels
    let lastPos = -Infinity;

    for (let i = 0; i < count; i++) {
      const pct = (i / (count - 1 || 1)) * 100;

      // ticks (disabled ticks appear dimmed)
      if (this.cfg.showTicks && (i % every === 0)) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.setAttribute('aria-disabled', String(this.disabledSet.has(i)));
        if (this.cfg.orientation === 'horizontal') { tick.style.left = pct + '%'; tick.style.top = '50%'; }
        else { tick.style.left = '50%'; tick.style.top = (100 - pct) + '%'; }
        ticksFrag.appendChild(tick);
      }

      // labels: only for enabled points when disableMissingSteps is true
      const labelAllowed = !this.cfg.disableMissingSteps || !this.disabledSet.has(i);
      if (this.cfg.showLabels && labelAllowed && (i % every === 0)) {
        const posPx = (pct / 100) * axisSpan;
        if (posPx - lastPos >= minPxGap) {
          const label = document.createElement('div');
          label.className = 'label';
          label.textContent = String(this.gridToOutput(i));
          if (this.cfg.orientation === 'horizontal') { label.style.left = pct + '%'; }
          else { label.style.top = (100 - pct) + '%'; }
          labelsFrag.appendChild(label);
          lastPos = posPx;
        }
      }
    }

    this.ticks.appendChild(ticksFrag); this.labels.appendChild(labelsFrag);
  }
}

export function definePolyfrontSlider(tag = 'polyfront-slider') {
  if (typeof customElements !== 'undefined' && !customElements.get(tag)) {
    customElements.define(tag, PolyfrontSlider);
  }
}

/**
 * Helper function to create a slider with common configurations
 * Makes it easier to use across different frameworks
 */
export function createSlider(config: PFSliderConfig = {}): PolyfrontSlider {
  const slider = new PolyfrontSlider();
  slider.setConfig(config);
  return slider;
}

/**
 * Helper function to create a horizontal range slider
 */
export function createRangeSlider(min: number, max: number, step: number = 1): PolyfrontSlider {
  return createSlider({
    mode: 'range',
    orientation: 'horizontal',
    min,
    max,
    step,
    showTooltip: true,
  });
}

/**
 * Helper function to create a vertical volume control
 */
export function createVolumeControl(max: number = 100): PolyfrontSlider {
  return createSlider({
    mode: 'single',
    orientation: 'vertical',
    min: 0,
    max,
    step: 1,
    showTicks: true,
    tickEvery: 10,
    showLabels: true,
    showTooltip: true,
    ariaLabel: 'Volume control',
  });
}

/**
 * Helper function to create a price range slider
 */
export function createPriceSlider(values: number[]): PolyfrontSlider {
  return createSlider({
    mode: 'range',
    orientation: 'horizontal',
    values,
    showTicks: true,
    showLabels: true,
    showTooltip: true,
    disableMissingSteps: true,
    minThumbDistance: 1,
    ariaLabel: 'Price range selector',
  });
}

/**
 * Helper function to create a discrete value slider (e.g., sizes, ratings)
 */
export function createDiscreteSlider(values: (string | number)[], mode: 'single' | 'range' = 'single'): PolyfrontSlider {
  return createSlider({
    mode,
    orientation: 'horizontal',
    values,
    showTicks: true,
    showLabels: true,
    showTooltip: true,
    disableMissingSteps: true,
    output: 'value',
  });
}

/**
 * React-style props interface for easier integration
 */
export interface SliderProps extends PFSliderConfig {
  onChange?: (value: any) => void;
  onInput?: (value: any) => void;
  className?: string;
  style?: Record<string, string>;
  id?: string;
}

/**
 * Helper function to create a slider with React-style props
 */
export function createSliderWithProps(props: SliderProps): PolyfrontSlider {
  const { onChange, onInput, className, style, id, ...config } = props;
  
  const slider = createSlider(config);
  
  if (id) slider.id = id;
  if (className) slider.className = className;
  if (style) {
    Object.assign(slider.style, style);
  }
  
  if (onChange) {
    slider.addEventListener('polyfront-slider-change', (e: any) => {
      onChange(e.detail.value);
    });
  }
  
  if (onInput) {
    slider.addEventListener('polyfront-slider-input', (e: any) => {
      onInput(e.detail.value);
    });
  }
  
  return slider;
}
