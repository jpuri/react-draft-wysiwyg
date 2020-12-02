/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes } from '../__common__/argTypes';

export const All = (args) => (
  <Editor
    {...args}
  />
);

All.argTypes = {
  ...disabledArgtypes,
};

All.args = {
  editorClassName: 'RichTextEditor',
  readOnly: true
};

export default {
  title: 'Library/ReadOnly',
  component: Editor
};
