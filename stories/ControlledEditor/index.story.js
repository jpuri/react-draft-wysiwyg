/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const [editorState, setEditorState] = React.useState(Editor.utils.EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  }

  return (
    <Editor
      {...args}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
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
  title: 'Library/ControlledEditor',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
