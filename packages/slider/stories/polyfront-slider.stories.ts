import type { Meta, StoryObj } from '@storybook/web-components';
import { definePolyfrontSlider, createRangeSlider, createVolumeControl, createPriceSlider, createDiscreteSlider } from '../src/polyfront-slider';

// Ensure the custom element is registered once
definePolyfrontSlider();

type Args = Record<string, any>;

const meta: Meta<Args> = {
  title: 'polyfront-slider/Examples',
  argTypes: {
    mode: { 
      control: 'select', 
      options: ['single', 'range'],
      description: 'Single thumb or range (dual thumb) mode'
    },
    size: { 
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size preset for track and thumb'
    },
    orientation: { 
      control: 'select', 
      options: ['horizontal', 'vertical'],
      description: 'Slider orientation'
    },
    showTicks: {
      control: 'boolean',
      description: 'Show tick marks on the track'
    },
    showLabels: {
      control: 'boolean', 
      description: 'Show labels for tick marks'
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltips with current values'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider'
    }
  },
  args: {
    mode: 'range',
    size: 'md',
    orientation: 'horizontal',
    showTicks: true,
    showLabels: true,
    showTooltip: true,
    disabled: false,
  },

  /**
   * Enhanced render function with better styling and layout
   */
  render: (args: Args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      max-width: 800px;
      padding: 32px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      margin: 16px auto;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      margin-bottom: 32px;
      color: #2c3e50;
    `;
    
    const title = document.createElement('h2');
    title.textContent = `${args.orientation === 'vertical' ? 'Vertical' : 'Horizontal'} ${args.mode === 'range' ? 'Range' : 'Single'} Slider`;
    title.style.cssText = `
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
    `;
    
    const subtitle = document.createElement('p');
    subtitle.textContent = `Size: ${args.size} • ${args.showTicks ? 'Ticks' : 'No ticks'} • ${args.showLabels ? 'Labels' : 'No labels'} • ${args.showTooltip ? 'Tooltips' : 'No tooltips'}`;
    subtitle.style.cssText = `
      margin: 0;
      font-size: 14px;
      opacity: 0.7;
    `;
    
    header.appendChild(title);
    header.appendChild(subtitle);

    const sliderContainer = document.createElement('div');
    sliderContainer.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: ${args.orientation === 'vertical' ? '400px' : '120px'};
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    `;

    const el = document.createElement('polyfront-slider') as any;

    if (args.orientation === 'vertical') {
      el.style.height = '320px';
      el.style.width = '60px';
    } else {
      el.style.width = '100%';
      el.style.maxWidth = '500px';
    }

    // Add event listeners for demo
    el.addEventListener('polyfront-slider-change', (e: any) => {
      console.log('Slider value changed:', e.detail.value);
    });

    sliderContainer.appendChild(el);
    container.appendChild(header);
    container.appendChild(sliderContainer);

    requestAnimationFrame(() => el.setConfig(args));
    return container;
  },
};

export default meta;

/* ------------------------------------------------------------ */
/*  Story 1: Price Range Slider (Horizontal)                    */
/* ------------------------------------------------------------ */
export const PriceRangeSlider: StoryObj<Args> = {
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
    ariaLabel: 'Price range selector',
    ariaLabelLower: 'Minimum price',
    ariaLabelUpper: 'Maximum price',
  },
};

/* ------------------------------------------------------------ */
/*  Story 2: Price Range Slider (Vertical)                      */
/* ------------------------------------------------------------ */
export const PriceRangeSliderVertical: StoryObj<Args> = {
  args: {
    ...PriceRangeSlider.args,
    orientation: 'vertical',
  },
};

/* ------------------------------------------------------------ */
/*  Story 3: Simple Single Slider                               */
/* ------------------------------------------------------------ */
export const SimpleSingleSlider: StoryObj<Args> = {
  args: {
    orientation: 'horizontal',
    mode: 'single',
    size: 'md',
    showTicks: false,
    showLabels: false,
    showTooltip: true,
    min: 0,
    max: 100,
    step: 5,
    ariaLabel: 'Volume control',
  },
};

/* ------------------------------------------------------------ */
/*  Story 4: Volume Control (Vertical)                         */
/* ------------------------------------------------------------ */
export const VolumeControlVertical: StoryObj<Args> = {
  args: {
    ...SimpleSingleSlider.args,
    orientation: 'vertical',
    min: 0,
    max: 100,
    step: 1,
    showTicks: true,
    tickEvery: 10,
    showLabels: true,
  },
};

/* ------------------------------------------------------------ */
/*  Story 5: Temperature Range                                  */
/* ------------------------------------------------------------ */
export const TemperatureRange: StoryObj<Args> = {
  args: {
    orientation: 'horizontal',
    mode: 'range',
    size: 'md',
    showTicks: true,
    tickEvery: 5,
    showLabels: true,
    showTooltip: true,
    min: -10,
    max: 40,
    step: 1,
    minThumbDistance: 2,
    ariaLabel: 'Temperature range',
    ariaLabelLower: 'Minimum temperature',
    ariaLabelUpper: 'Maximum temperature',
  },
};

/* ------------------------------------------------------------ */
/*  Story 6: Small Size Slider                                  */
/* ------------------------------------------------------------ */
export const SmallSizeSlider: StoryObj<Args> = {
  args: {
    orientation: 'horizontal',
    mode: 'single',
    size: 'sm',
    showTicks: true,
    showLabels: false,
    showTooltip: true,
    min: 0,
    max: 10,
    step: 1,
  },
};

/* ------------------------------------------------------------ */
/*  Story 7: Disabled State                                     */
/* ------------------------------------------------------------ */
export const DisabledSlider: StoryObj<Args> = {
  args: {
    orientation: 'horizontal',
    mode: 'range',
    size: 'md',
    showTicks: true,
    showLabels: true,
    showTooltip: true,
    min: 0,
    max: 100,
    step: 10,
    disabled: true,
  },
};

/* ------------------------------------------------------------ */
/*  Story 9: Both orientation                        */
/* ------------------------------------------------------------ */
export const FixedTooltips: StoryObj<Args> = {
  args: {
    orientation: 'horizontal',
    mode: 'range',
    size: 'lg',
    showTicks: true,
    showLabels: true,
    showTooltip: true,
    min: 0,
    max: 100,
    step: 5,
    minThumbDistance: 5,
  },
  render: (args: Args) => {
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      max-width: 800px;
      padding: 32px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      margin: 16px auto;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      margin-bottom: 32px;
      color: white;
    `;
    
    const title = document.createElement('h2');
    title.textContent = '🎯 Both orientation ';
    title.style.cssText = `
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 600;
    `;
    
    const subtitle = document.createElement('p');
    subtitle.textContent = 'HHorizontal, vertical Sliders with rich features';
    subtitle.style.cssText = `
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
    `;
    
    header.appendChild(title);
    header.appendChild(subtitle);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      margin-top: 24px;
    `;

    // Horizontal slider
    const horizontalCard = document.createElement('div');
    horizontalCard.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      text-align: center;
    `;

    const hTitle = document.createElement('h3');
    hTitle.textContent = 'Horizontal Slider';
    hTitle.style.cssText = `
      margin: 0 0 16px 0;
      font-size: 18px;
      color: #2c3e50;
    `;

    const hSliderContainer = document.createElement('div');
    hSliderContainer.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 120px;
      margin: 16px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 6px;
    `;

    const hSlider = document.createElement('polyfront-slider') as any;
    hSlider.style.width = '100%';
    hSlider.style.maxWidth = '400px';

    hSliderContainer.appendChild(hSlider);
    horizontalCard.appendChild(hTitle);
    horizontalCard.appendChild(hSliderContainer);

    // Vertical slider
    const verticalCard = document.createElement('div');
    verticalCard.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      text-align: center;
    `;

    const vTitle = document.createElement('h3');
    vTitle.textContent = 'Vertical Slider';
    vTitle.style.cssText = `
      margin: 0 0 16px 0;
      font-size: 18px;
      color: #2c3e50;
    `;

    const vSliderContainer = document.createElement('div');
    vSliderContainer.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      margin: 16px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 6px;
    `;

    const vSlider = document.createElement('polyfront-slider') as any;
    vSlider.style.height = '250px';
    vSlider.style.width = '60px';

    vSliderContainer.appendChild(vSlider);
    verticalCard.appendChild(vTitle);
    verticalCard.appendChild(vSliderContainer);

    grid.appendChild(horizontalCard);
    grid.appendChild(verticalCard);
    container.appendChild(header);
    container.appendChild(grid);

    // Configure sliders
    requestAnimationFrame(() => {
      hSlider.setConfig({
        ...args,
        orientation: 'horizontal'
      });
      vSlider.setConfig({
        ...args,
        orientation: 'vertical'
      });
    });

    return container;
  },
};

/* ------------------------------------------------------------ */
/*  Story 10: Helper Functions Demo                             */
/* ------------------------------------------------------------ */
export const HelperFunctionsDemo: StoryObj<Args> = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = `
      width: 100%;
      max-width: 1000px;
      padding: 32px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      margin: 16px auto;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      margin-bottom: 32px;
      color: white;
    `;
    
    const title = document.createElement('h2');
    title.textContent = 'Helper Functions Demo';
    title.style.cssText = `
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 600;
    `;
    
    const subtitle = document.createElement('p');
    subtitle.textContent = 'Easy-to-use helper functions for common slider patterns';
    subtitle.style.cssText = `
      margin: 0;
      font-size: 16px;
      opacity: 0.9;
    `;
    
    header.appendChild(title);
    header.appendChild(subtitle);

    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 24px;
    `;

    // Helper functions are already imported at the top

    // Create different slider examples
    const examples = [
      {
        title: 'Range Slider',
        description: 'createRangeSlider(0, 100, 5)',
        slider: createRangeSlider(0, 100, 5)
      },
      {
        title: 'Volume Control',
        description: 'createVolumeControl(100)',
        slider: createVolumeControl(100)
      },
      {
        title: 'Price Slider',
        description: 'createPriceSlider([0, 500, 1000, 1500, 2000])',
        slider: createPriceSlider([0, 500, 1000, 1500, 2000])
      },
      {
        title: 'Size Selector',
        description: 'createDiscreteSlider(["XS", "S", "M", "L", "XL"])',
        slider: createDiscreteSlider(['XS', 'S', 'M', 'L', 'XL'], 'single')
      }
    ];

    examples.forEach((example, index) => {
      const card = document.createElement('div');
      card.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        text-align: center;
      `;

      const cardTitle = document.createElement('h3');
      cardTitle.textContent = example.title;
      cardTitle.style.cssText = `
        margin: 0 0 8px 0;
        font-size: 18px;
        color: #2c3e50;
      `;

      const cardDesc = document.createElement('p');
      cardDesc.textContent = example.description;
      cardDesc.style.cssText = `
        margin: 0 0 16px 0;
        font-size: 12px;
        color: #666;
        font-family: monospace;
        background: #f8f9fa;
        padding: 4px 8px;
        border-radius: 4px;
      `;

      const sliderContainer = document.createElement('div');
      sliderContainer.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80px;
        margin: 16px 0;
      `;

      // Style the slider based on type
      if (example.title === 'Volume Control') {
        example.slider.style.height = '120px';
        example.slider.style.width = '60px';
      } else {
        example.slider.style.width = '100%';
        example.slider.style.maxWidth = '250px';
      }

      sliderContainer.appendChild(example.slider);
      card.appendChild(cardTitle);
      card.appendChild(cardDesc);
      card.appendChild(sliderContainer);
      grid.appendChild(card);
    });

    container.appendChild(header);
    container.appendChild(grid);
    return container;
  },
};
