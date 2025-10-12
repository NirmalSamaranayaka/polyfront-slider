import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  stories: ['../stories/**/*.stories.@(ts|tsx|js)'],
  addons: ['@storybook/addon-essentials'],
  core: {},
  docs: {
    autodocs: 'tag'
  }
};

export default config;
