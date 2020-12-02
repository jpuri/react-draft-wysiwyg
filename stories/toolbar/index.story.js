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
  toolbar: {
    textDecoration: { max: 2 }
  },
  ...commonArgs,
};

export default {
  title: 'Library/Toolbar',
  component: Editor,
};
