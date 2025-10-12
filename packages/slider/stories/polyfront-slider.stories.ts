import type { Meta, StoryObj } from '@storybook/web-components';
import { definePolyfrontSlider } from '../src/polyfront-slider';

// Ensure the custom element is registered once
definePolyfrontSlider();

type Args = Record<string, any>;

const meta: Meta<Args> = {
  title: 'polyfront-slider/Examples',
  argTypes: {
    mode: { control: 'select', options: ['single', 'range'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
  args: {
    mode: 'range',
    size: 'md',
    orientation: 'horizontal',
  },

  /**
   * Common render function used by all stories.
   * It automatically gives vertical sliders a height
   * so the track is visible in Storybook.
   */
  render: (args: Args) => {
    const wrap = document.createElement('div');
    wrap.style.width = '100%';
    wrap.style.maxWidth = '720px';
    wrap.style.padding = '24px';
    wrap.style.boxSizing = 'border-box';
    wrap.style.display = 'grid';
    wrap.style.gap = '16px';

    const el = document.createElement('polyfront-slider') as any;

    if (args.orientation === 'vertical') {
      el.style.height = '320px'; // vertical needs height
    } else {
      el.style.width = '100%';
    }

    wrap.appendChild(el);
    requestAnimationFrame(() => el.setConfig(args));
    return wrap;
  },
};

export default meta;

/* ------------------------------------------------------------ */
/*  Story 1: Horizontal (default)                               */
/* ------------------------------------------------------------ */
export const DiscreteStyled: StoryObj<Args> = {
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
    minThumbDistance: 1,
  },
};

/* ------------------------------------------------------------ */
/*  Story 2: Vertical                                            */
/* ------------------------------------------------------------ */
export const DiscreteStyledVertical: StoryObj<Args> = {
  args: {
    ...DiscreteStyled.args,
    orientation: 'vertical',
  },
};
