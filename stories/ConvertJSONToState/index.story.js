/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const contentState = Editor.utils.convertFromRaw({
    "blocks": [
      {
        "key": "637gr",
        "text": "Initialized from content state.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {
          "text-align": "center"
        }
      }
    ],
    "entityMap": {}
  });

  const [editorState, setEditorState] = React.useState(Editor.utils.EditorState.createWithContent(contentState));

  const onEditorStateChange = (eState) => {
    setEditorState(eState);
  };

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
  ...commonArgs
};

export default {
  title: 'Library/Convert - JSONToContent',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
