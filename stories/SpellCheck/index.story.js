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
  ...commonArgs,
  spellCheck: true
};

export default {
  title: 'Library/SpellCheck',
  component: Editor
};
