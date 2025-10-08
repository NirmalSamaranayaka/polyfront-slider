
/** @type { import('@storybook/web-components-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/web-components-vite', options: {} },
};
export default config;
