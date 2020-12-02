/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const defaultEditorState = Editor.utils.EditorState.createEmpty();

  return (
    <Editor
      {...args}
      defaultEditorState={defaultEditorState}
      onEditorStateChange={(eState) => { console.log(eState) }}
    />
  );
};

All.argTypes = {
  ...disabledArgtypes,
};

All.args = {
  ...commonArgs,
};

export default {
  title: 'Library/UncontrolledEditor',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
