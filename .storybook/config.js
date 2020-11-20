import { configure } from '@storybook/react';
import '@innovaccer/design-system/css';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
