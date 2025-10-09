var C=Object.defineProperty;var E=(u,c,t)=>c in u?C(u,c,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[c]=t;var p=(u,c,t)=>E(u,typeof c!="symbol"?c+"":c,t);const D=globalThis.HTMLElement??class{},v=typeof document<"u"?document.createElement("template"):{};v.innerHTML!==void 0&&(v.innerHTML=`
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
        --pf-color-tooltip-bg: oklch(0.23 0.02 255);
        --pf-color-tooltip-fg: oklch(0.98 0 0);
        --pf-radius: 9999px;
        --pf-elev: 0 4px 12px rgba(0,0,0,0.12);
        --pf-track-size: 10px;
        --pf-thumb-size: 24px;
        --pf-tick-size: 6px;
        --pf-focus: 0 0 0 4px color-mix(in oklab, var(--pf-color-fill) 30%, transparent);
        --pf-vpad-start: 12px; /* left padding in vertical */
        --pf-vpad-end: 42px;   /* right padding (label column) */
        --pf-vgap: 8px;        /* gap from track to tooltip/labels */

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
        position: relative;
        overflow: visible;
      }
      :host([orientation="horizontal"]) .track { height: var(--pf-track-size); width: 100%; }
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
      .tooltip { z-index: 2; }

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
        padding: 6px 8px;
        border-radius: 8px;
        font-size: 12px;
        background: var(--pf-color-tooltip-bg);
        color: var(--pf-color-tooltip-fg);
        pointer-events: none;
        box-shadow: var(--pf-elev);
      }
      :host([orientation="horizontal"]) .tooltip { transform: translate(-50%,-150%); }
      :host([orientation="vertical"]) .tooltip {
        left: calc(var(--pf-vpad-start) + var(--pf-track-size) + var(--pf-vgap));
        transform: translate(0,-50%);
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
  `);function L(u,c){return c===0?Math.abs(u):L(c,u%c)}function k(u){const c=u.filter(t=>Number.isFinite(t)&&Math.abs(t)>0);return c.length?c.reduce((t,i)=>L(t,Math.round(Math.abs(i))),Math.round(Math.abs(c[0]))):1}class A extends D{constructor(){super();p(this,"root");p(this,"track");p(this,"fill");p(this,"ticks");p(this,"labels");p(this,"thumbs");p(this,"tooltips");p(this,"internals");p(this,"cfg",{mode:"single",enableRange:!0,orientation:"horizontal",size:"md",showTicks:!1,showLabels:!1,showTooltip:!1,tickEvery:1,disabled:!1,rtl:!1,output:"value",disableMissingSteps:!0,ariaLabel:void 0,ariaLabelLower:void 0,ariaLabelUpper:void 0,name:void 0,showFill:!1});p(this,"isDiscrete",!1);p(this,"values",null);p(this,"min",0);p(this,"max",100);p(this,"step",1);p(this,"disabledSet",new Set);p(this,"blockedIntervals",[]);p(this,"minThumbDistance",0);p(this,"pos0",0);p(this,"pos1",0);p(this,"ro");p(this,"onTrackPointerDown",t=>{var h;if(this.cfg.disabled)return;const i=this.track;if(!i)return;const s=this.cfg.orientation!=="vertical",e=s?t.clientX??t.pageX??t.x??0:t.clientY??t.pageY??t.y??0,o=i.getBoundingClientRect(),n=s?(e-o.left)/(o.width||1):(o.bottom-e)/(o.height||1),a=Math.max(0,Math.min(1,n)),r=this.valueFromFractionContinuous(a),l=this.getValue();if(Array.isArray(l)){const[d,f]=l,y=Math.abs(d-r)<=Math.abs(f-r)?[r,f]:[d,r];this.setValue(y)}else this.setValue(r);(h=t.preventDefault)==null||h.call(t)});p(this,"handleTrackPointer",t=>{var h,d;if(this.cfg.disabled)return;const i=this.track.getBoundingClientRect(),s={...i,width:i.width>0?i.width:1,height:i.height>0?i.height:1,bottom:i.bottom??i.top+(i.height>0?i.height:1)},e=this.eventToFraction(t,s),o=this.gridCount(),n=this.clampNearestEnabled(Math.round(e*(o-1))),a=Math.abs(n-this.pos0),r=Math.abs(n-this.pos1),l=this.cfg.mode==="range"&&!this.thumbs[1].hidden?a<=r?0:1:0;this.setThumbPosition(l,n,!0),(h=t.preventDefault)==null||h.call(t),(d=t.stopPropagation)==null||d.call(t)});typeof document<"u"&&v.content&&(this.root=this.attachShadow({mode:"open"}),this.root.appendChild(v.content.cloneNode(!0)),this.track=this.root.querySelector(".track"),this.fill=this.root.querySelector(".fill"),this.ticks=this.root.querySelector(".ticks"),this.labels=this.root.querySelector(".labels"),this.thumbs=Array.from(this.root.querySelectorAll(".thumb")),this.tooltips=Array.from(this.root.querySelectorAll(".tooltip"))),this.internals=this.attachInternals?this.attachInternals():null}static get observedAttributes(){return["size","orientation","mode","disabled","min","max","step","values"]}connectedCallback(){this.ro=new ResizeObserver(()=>this.render()),this.ro.observe(this),!this.style.width&&this.cfg.orientation==="horizontal"&&(this.style.width="100%"),!this.style.height&&this.cfg.orientation==="vertical"&&(this.style.height="240px"),this.fill.style.display=this.cfg.showFill?"block":"none",this.applySizeAttr(),this.ensureSizeDefaults(),this.setupARIA(),this.attachEvents(),this.render()}disconnectedCallback(){var t;(t=this.ro)==null||t.disconnect()}parseNum(t,i){const s=t===null?NaN:Number(t);return Number.isFinite(s)?s:i}attributeChangedCallback(t,i,s){if(i!==s&&!t.startsWith("data-")){switch(t){case"orientation":this.cfg.orientation=s||"horizontal",this.ensureSizeDefaults();break;case"mode":this.cfg.mode=s||"single";break;case"disabled":this.cfg.disabled=s!==null;break;case"name":this.cfg.name=s||void 0;break;case"min":this.isDiscrete=!1,this.min=this.parseNum(s,0);break;case"max":this.isDiscrete=!1,this.max=this.parseNum(s,100);break;case"step":this.isDiscrete=!1,this.step=Math.max(1e-12,this.parseNum(s,1));break;case"values":{this.isDiscrete=!0;const e=(s??"").split(",").map(a=>a.trim()).filter(a=>a.length>0).map(a=>Number.isFinite(Number(a))?Number(a):a);this.values=e;const o=[];let n=!0;for(const a of e)if(typeof a=="number")o.push(a);else{n=!1;break}if(n&&o.length){o.sort((r,l)=>r-l),this.min=o[0],this.max=o[o.length-1];const a=[];for(let r=1;r<o.length;r++)a.push(Math.abs(o[r]-o[r-1]));this.step=k(a)||1}else this.min=0,this.max=e.length-1,this.step=1;this.disabledSet.clear();break}}this.pos0=Math.max(0,Math.min(this.pos0,this.gridCount()-1)),this.pos1=Math.max(0,Math.min(this.pos1,this.gridCount()-1)),(this.cfg.mode==="single"||!this.cfg.enableRange)&&(this.pos1=this.pos0),this.render()}}applySizeAttr(){const t=this.cfg.size;this.getAttribute("data-size")!==t&&this.setAttribute("data-size",t)}valueFromFractionContinuous(t){const i=this.min,s=this.max,e=this.step,o=i+t*(s-i),n=Math.round(o/e)*e;return Math.max(i,Math.min(s,n))}eventToFraction(t,i){const s=this.cfg.orientation!=="vertical",e=t;let o=e.clientX??e.pageX??e.x,n=e.clientY??e.pageY??e.y;(o==null||n==null)&&(typeof e.offsetX=="number"||typeof e.offsetY=="number")&&(o=i.left+(e.offsetX??0),n=i.top+(e.offsetY??0));const a=i.width>0?i.width:1,r=i.height>0?i.height:1,l=i.left??0,h=i.top??0,d=i.bottom??h+r;o==null&&(o=l+a/2),n==null&&(n=h+r/2);const f=s?(o-l)/a:(d-n)/r;return Math.max(0,Math.min(1,f))}setConfig(t){if(t.enableRange!==void 0&&(this.cfg.enableRange=t.enableRange),t.mode&&(this.cfg.mode=this.cfg.enableRange?t.mode:"single"),t.orientation&&(this.cfg.orientation=t.orientation),this.applyBlockedIntervals(),t.size&&(this.cfg.size=t.size),t.disabled!==void 0&&(this.cfg.disabled=t.disabled),t.rtl!==void 0&&(this.cfg.rtl=t.rtl),t.showTicks!==void 0&&(this.cfg.showTicks=t.showTicks),t.tickEvery!==void 0&&(this.cfg.tickEvery=Math.max(1,Math.floor(t.tickEvery))),t.showLabels!==void 0&&(this.cfg.showLabels=t.showLabels),t.showTooltip!==void 0&&(this.cfg.showTooltip=t.showTooltip),t.ariaLabel!==void 0&&(this.cfg.ariaLabel=t.ariaLabel),t.ariaLabelLower!==void 0&&(this.cfg.ariaLabelLower=t.ariaLabelLower),t.ariaLabelUpper!==void 0&&(this.cfg.ariaLabelUpper=t.ariaLabelUpper),t.output&&(this.cfg.output=t.output),t.name!==void 0&&(this.cfg.name=t.name),t.disableMissingSteps!==void 0&&(this.cfg.disableMissingSteps=t.disableMissingSteps),t.minThumbDistance!==void 0&&(this.minThumbDistance=Math.max(0,Math.floor(t.minThumbDistance))),t.blockedIntervals&&(this.blockedIntervals=t.blockedIntervals.slice()),t.showFill!==void 0&&(this.cfg.showFill=t.showFill),t.values){this.isDiscrete=!0,this.values=t.values.slice();const i=[];let s=!0;for(const e of this.values)if(typeof e=="number")i.push(e);else if(typeof e=="object"&&e&&"value"in e&&typeof e.value=="number")i.push(e.value);else{s=!1;break}if(s&&i.length){i.sort((o,n)=>o-n),this.min=i[0],this.max=i[i.length-1];const e=[];for(let o=1;o<i.length;o++)e.push(Math.abs(i[o]-i[o-1]));if(this.step=typeof t.step=="number"?t.step:k(e)||1,this.disabledSet.clear(),this.cfg.disableMissingSteps){const o=new Set(i.map(a=>Math.round((a-this.min)/this.step))),n=this.gridCount();for(let a=0;a<n;a++)o.has(a)||this.disabledSet.add(a)}}else this.min=0,this.max=this.values.length-1,this.step=1,this.disabledSet.clear()}else this.isDiscrete=!1,typeof t.min=="number"&&(this.min=t.min),typeof t.max=="number"&&(this.max=t.max),typeof t.step=="number"&&(this.step=Math.max(1e-12,t.step)),this.values=null,this.disabledSet.clear();this.applyBlockedIntervals(),this.pos0=0,this.pos1=this.gridCount()-1,(this.cfg.mode==="single"||!this.cfg.enableRange)&&(this.pos1=this.pos0),this.applySizeAttr(),this.ensureSizeDefaults(),this.render()}getValue(){const t=e=>this.gridToOutput(e);if(this.cfg.mode==="single"||!this.cfg.enableRange)return t(this.pos0);const i=t(this.pos0),s=t(this.pos1);return i<=s?[i,s]:[s,i]}setValue(t){const i=s=>this.outputToGrid(s);if(this.cfg.mode==="single"||!this.cfg.enableRange)this.pos0=this.clampNearestEnabled(i(t));else if(Array.isArray(t)&&t.length===2){let s=this.clampNearestEnabled(i(t[0])),e=this.clampNearestEnabled(i(t[1]));Math.abs(e-s)<this.minThumbDistance&&(e>s?e=s+this.minThumbDistance:s=e+this.minThumbDistance),this.pos0=Math.min(s,e),this.pos1=Math.max(s,e)}this.render()}gridCount(){if(this.values&&!this.values.every(i=>typeof i=="number"||typeof i=="object"&&i&&"value"in i&&typeof i.value=="number"))return this.values.length;const t=this.max-this.min;return Math.floor(t/this.step+1e-9)+1}gridToNumber(t){return this.min+t*this.step}numberToGrid(t){return Math.round((t-this.min)/this.step)}gridToOutput(t){if(this.values){if(!this.values.every(a=>typeof a=="number"||typeof a=="object"&&a&&"value"in a&&typeof a.value=="number")){const a=this.values[t];return this.cfg.output==="index"?t:a}const e=this.gridToNumber(t);if(this.cfg.output==="index")return t;const o=new Map;for(const a of this.values){const r=typeof a=="object"&&a&&"value"in a?a.value:a;typeof r=="number"&&o.set(r,a)}const n=o.get(e);return this.cfg.output==="object"?n??e:typeof n=="object"&&n?n.value:e}const i=this.gridToNumber(t);return this.cfg.output==="index"?t:i}outputToGrid(t){if(this.values){if(!this.values.every(s=>typeof s=="number"||typeof s=="object"&&s&&"value"in s&&typeof s.value=="number")){if(typeof t=="number")return Math.max(0,Math.min(this.values.length-1,Math.round(t)));const s=this.values.findIndex(e=>(typeof e=="object"?e.value:e)===t);return s>=0?s:0}return typeof t=="object"&&t&&"value"in t&&(t=t.value),typeof t!="number"?0:this.numberToGrid(t)}return typeof t!="number"?0:this.numberToGrid(t)}ensureSizeDefaults(){this.cfg.orientation==="vertical"?this.style.height||(this.style.height="240px"):this.style.width||(this.style.width="100%")}applyBlockedIntervals(){if(!this.blockedIntervals.length)return;const t=s=>this.numberToGrid(s),i=this.gridCount();for(const[s,e]of this.blockedIntervals){const o=Math.max(0,Math.min(t(Math.min(s,e)),i-1)),n=Math.max(0,Math.min(t(Math.max(s,e)),i-1));for(let a=o;a<=n;a++)this.disabledSet.add(a)}}clampNearestEnabled(t){const s=this.gridCount()-1;if(t=Math.max(0,Math.min(s,t)),!this.disabledSet.has(t))return t;for(let e=1;e<=Math.max(t-0,s-t);e++){const o=t-e,n=t+e;if(o>=0&&!this.disabledSet.has(o))return o;if(n<=s&&!this.disabledSet.has(n))return n}return t}pointToGrid(t,i,s){const e=s??this.track.getBoundingClientRect(),o=this.gridCount(),n=e!=null&&e.width&&e.width>0?e.width:1,a=e!=null&&e.height&&e.height>0?e.height:1,r=(e==null?void 0:e.left)??0,l=(e==null?void 0:e.top)??0,h=(e==null?void 0:e.bottom)??l+a,d=t??r+n/2,f=i??l+a/2,y=(this.cfg.orientation==="horizontal"?Math.max(0,Math.min(1,(d-r)/n)):Math.max(0,Math.min(1,(h-f)/a)))*(o-1);return this.clampNearestEnabled(Math.round(y))}setThumbPosition(t,i,s=!1){const e=this.gridCount();let o=this.clampNearestEnabled(Math.max(0,Math.min(e-1,i)));this.cfg.mode==="range"&&this.cfg.enableRange?t===0?(this.pos1-o<this.minThumbDistance&&(o=this.pos1-this.minThumbDistance),o=this.clampNearestEnabled(o),this.pos0=Math.min(o,this.pos1)):(o-this.pos0<this.minThumbDistance&&(o=this.pos0+this.minThumbDistance),o=this.clampNearestEnabled(o),this.pos1=Math.max(o,this.pos0)):this.pos0=o,this.render(),this.emitChange(s?"input":"change")}emitChange(t){const i={value:this.getValue(),pos0:this.pos0,pos1:this.pos1};this.dispatchEvent(new CustomEvent(`polyfront-slider-${t}`,{detail:i,bubbles:!0})),this.internals&&this.cfg.name&&this.internals.setFormValue(JSON.stringify(i.value))}setupARIA(){if(!this.root)return;this.setAttribute("role","group"),this.setAttribute("orientation",this.cfg.orientation);const[t,i]=this.thumbs,s=(e,o,n)=>{e.setAttribute("role","slider"),e.setAttribute("tabindex",this.cfg.disabled?"-1":"0"),e.setAttribute("aria-disabled",String(this.cfg.disabled)),e.setAttribute("aria-orientation",this.cfg.orientation),n?e.setAttribute("aria-label",n):this.cfg.ariaLabel&&e.setAttribute("aria-label",this.cfg.ariaLabel),this.updateAriaValues(e,o)};s(t,this.pos0,this.cfg.ariaLabelLower),this.cfg.mode==="range"&&this.cfg.enableRange?(i.hidden=!1,s(i,this.pos1,this.cfg.ariaLabelUpper)):i.hidden=!0}updateAriaValues(t,i){const s=this.gridCount();t.setAttribute("aria-valuemin","0"),t.setAttribute("aria-valuemax",String(s-1)),t.setAttribute("aria-valuenow",String(i));const e=this.gridToOutput(i);t.setAttribute("aria-valuetext",Array.isArray(e)?e.join(" – "):String(e))}attachEvents(){this.root&&(this.addEventListener("pointerdown",t=>{var s;(((s=t.composedPath)==null?void 0:s.call(t))??[]).includes(this.track)&&this.handleTrackPointer(t)},{capture:!0}),this.track.addEventListener("pointerdown",t=>this.handleTrackPointer(t)),this.thumbs.forEach((t,i)=>{t.addEventListener("pointerdown",s=>{var a,r;if(this.cfg.disabled)return;(r=(a=s.target).setPointerCapture)==null||r.call(a,s.pointerId);const e=this.track.getBoundingClientRect(),o=l=>{const h=this.pointToGrid(l.clientX,l.clientY,e);this.setThumbPosition(i,h,!0)},n=l=>{var h,d;(d=(h=l.target).releasePointerCapture)==null||d.call(h,s.pointerId),window.removeEventListener("pointermove",o),window.removeEventListener("pointerup",n),this.emitChange("change")};window.addEventListener("pointermove",o),window.addEventListener("pointerup",n)})}),this.thumbs.forEach((t,i)=>{t.addEventListener("keydown",s=>{if(this.cfg.disabled)return;const e=s.key;let o=0;const n=Math.max(1,Math.round(this.gridCount()*.1)),a=this.cfg.rtl&&this.cfg.orientation==="horizontal",r=h=>a?-h:h;switch(e){case"ArrowLeft":case"ArrowDown":o=r(-1);break;case"ArrowRight":case"ArrowUp":o=r(1);break;case"PageDown":o=r(-n);break;case"PageUp":o=r(n);break;case"Home":this.setThumbPosition(i,0,!0),this.emitChange("change");return;case"End":this.setThumbPosition(i,this.gridCount()-1,!0),this.emitChange("change");return;default:return}s.preventDefault();const l=i===0?this.pos0:this.pos1;this.setThumbPosition(i,l+o,!0),this.emitChange("change")})}))}render(){if(!this.root)return;this.setupARIA();const t=this.gridCount(),[i,s]=this.thumbs,e=this.pos0/(t-1||1),o=s.hidden?e:this.pos1/(t-1||1);if(this.cfg.orientation==="horizontal"){const h=Math.min(e,o)*100,d=Math.max(e,o)*100;this.fill.style.left=h+"%",this.fill.style.right=100-d+"%",i.style.left=e*100+"%",i.style.top="50%",s.hidden||(s.style.left=o*100+"%",s.style.top="50%")}else{const h=Math.min(e,o)*100,d=Math.max(e,o)*100;this.fill.style.left="0",this.fill.style.right="0",this.fill.style.bottom=h+"%",this.fill.style.top=100-d+"%",i.style.top=100-e*100+"%",i.style.left="",s.hidden||(s.style.top=100-o*100+"%",s.style.left="")}const[n,a]=this.tooltips,r=this.cfg.showTooltip,l=this.gridToOutput(this.pos0);if(n.textContent=String(l),n.hidden=!r,s.hidden)a.hidden=!0;else{const h=this.gridToOutput(this.pos1);a.textContent=String(h),a.hidden=!r}this.cfg.orientation==="horizontal"?(n.style.left=e*100+"%",n.style.top="0%",s.hidden||(a.style.left=o*100+"%",a.style.top="0%")):(n.style.top=100-e*100+"%",s.hidden||(a.style.top=100-o*100+"%")),this.renderTicksAndLabels()}renderTicksAndLabels(){const t=this.gridCount();if(this.ticks.innerHTML="",this.labels.innerHTML="",!this.cfg.showTicks&&!this.cfg.showLabels)return;const i=document.createDocumentFragment(),s=document.createDocumentFragment(),e=this.cfg.tickEvery||1,o=this.track.getBoundingClientRect(),n=this.cfg.orientation==="horizontal"?o.width:o.height,a=18;let r=-1/0;for(let l=0;l<t;l++){const h=l/(t-1||1)*100;if(this.cfg.showTicks&&l%e===0){const f=document.createElement("div");f.className="tick",f.setAttribute("aria-disabled",String(this.disabledSet.has(l))),this.cfg.orientation==="horizontal"?(f.style.left=h+"%",f.style.top="50%"):(f.style.left="50%",f.style.top=100-h+"%"),i.appendChild(f)}const d=!this.cfg.disableMissingSteps||!this.disabledSet.has(l);if(this.cfg.showLabels&&d&&l%e===0){const f=h/100*n;if(f-r>=a){const m=document.createElement("div");m.className="label",m.textContent=String(this.gridToOutput(l)),this.cfg.orientation==="horizontal"?m.style.left=h+"%":m.style.top=100-h+"%",s.appendChild(m),r=f}}}this.ticks.appendChild(i),this.labels.appendChild(s)}}p(A,"formAssociated",!0);function N(u="polyfront-slider"){typeof customElements<"u"&&!customElements.get(u)&&customElements.define(u,A)}N();const R={title:"polyfront-slider/Examples",argTypes:{mode:{control:"select",options:["single","range"]},size:{control:"select",options:["sm","md","lg"]},orientation:{control:"select",options:["horizontal","vertical"]}},args:{mode:"range",size:"md",orientation:"horizontal"},render:u=>{const c=document.createElement("div");c.style.width="100%",c.style.maxWidth="720px",c.style.padding="24px",c.style.boxSizing="border-box",c.style.display="grid",c.style.gap="16px";const t=document.createElement("polyfront-slider");return u.orientation==="vertical"?t.style.height="320px":t.style.width="100%",c.appendChild(t),requestAnimationFrame(()=>t.setConfig(u)),c}},b={args:{orientation:"horizontal",mode:"range",size:"lg",showTicks:!0,tickEvery:1,showLabels:!0,showTooltip:!0,values:[0,1500,1600,1700,1800,1900,2e3],disableMissingSteps:!0,blockedIntervals:[[1600,1699]],minThumbDistance:1}},g={args:{...b.args,orientation:"vertical"}};var x,w,M;b.parameters={...b.parameters,docs:{...(x=b.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    orientation: 'horizontal',
    mode: 'range',
    size: 'lg',
    showTicks: true,
    tickEvery: 1,
    showLabels: true,
    showTooltip: true,
    values: [0, 1500, 1600, 1700, 1800, 1900, 2000],
    disableMissingSteps: true,
    blockedIntervals: [[1600, 1699]],
    minThumbDistance: 1
  }
}`,...(M=(w=b.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};var z,T,S;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    ...DiscreteStyled.args,
    orientation: 'vertical'
  }
}`,...(S=(T=g.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};const I=["DiscreteStyled","DiscreteStyledVertical"];export{b as DiscreteStyled,g as DiscreteStyledVertical,I as __namedExportsOrder,R as default};
