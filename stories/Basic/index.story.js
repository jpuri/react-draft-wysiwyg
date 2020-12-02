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
  ...commonArgs,
  textAlignment: 'left',
  ariaLabel: 'RichTextEditor',
  spellCheck: false,
  readOnly: false
};

export default {
  title: 'Library/Basic',
  component: Editor,
};
