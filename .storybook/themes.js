import { create } from '@storybook/theming/create';
import packageJson from '../package.json';

export const primary = create({
  base: 'light',

  colorPrimary: '#0000001a',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: '#0000001a',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Nunito Sans", "Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: 'black',
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: `Innovaccer Rich Text Editor v${packageJson.version}`,
  //brandUrl: 'https://github.com/innovaccer/design-system/'
});
