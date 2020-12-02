/* @flow */

import React from 'react';
import { Button } from '@innovaccer/design-system';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const [editorState, setEditorState] = React.useState(Editor.utils.EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onClick = () => {
    console.log(Editor.utils.convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <div>
      <Editor
        {...args}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <Button
        appearance="primary"
        size="large"
        onClick={onClick}
        className="mt-4"
      >
        Convert to JSON
      </Button>
    </div>
  );
};

All.argTypes = {
  ...disabledArgtypes,
};

All.args = {
  ...commonArgs
};

export default {
  title: 'Library/Convert - ContentToJSON',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
