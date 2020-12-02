/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const html = `<p>Innovaccer Rich Text Editor</p>`;
  const defaultEditorState = Editor.utils.htmlToState(html).editorState;

  return (
    <Editor
      {...args}
      defaultEditorState={defaultEditorState}
    />
  );
};

All.argTypes = {
  ...disabledArgtypes,
};

All.args = {
  ...commonArgs
};

export default {
  title: 'Library/UncontrolledWithContent',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
