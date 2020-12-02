/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => (
  <Editor
    {...args}
  />
);

All.argTypes = {
  ...disabledArgtypes,
};

All.args = {
  mention: {
    label: ' ',
    trigger: '@',
    chipOptions: { type: 'selection' },
    suggestions: [
      { label: 'First Name', value: 'First Name' },
      { label: 'Last Name', value: 'Last Name' },
      { label: 'PCP', value: 'PCP' },
      { label: 'Address', value: 'Address' },
      { label: 'DOB', value: 'DOB' },
    ],
  },
  ...commonArgs
};

export default {
  title: 'Library/Mention - CustomChip',
  component: Editor,
};
