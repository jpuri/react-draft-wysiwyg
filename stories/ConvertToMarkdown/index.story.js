/* @flow */

import React from 'react';
import { Button, Paragraph } from '@innovaccer/design-system';
import draftToMarkdown from 'draftjs-to-markdown';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  //import draftToMarkdown from 'draftjs-to-markdown';
  const [editorState, setEditorState] = React.useState(Editor.utils.EditorState.createEmpty());
  const [markdown, setMarkdown] = React.useState('');

  const onEditorStateChange = (eState) => {
    setEditorState(eState);
  };

  const onClick = () => {
    setMarkdown(draftToMarkdown(Editor.utils.convertToRaw(editorState.getCurrentContent())));
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
        className="mt-4 mb-5"
      >
        Convert to markdown
      </Button>
      <Paragraph>
        {markdown}
      </Paragraph>
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
  title: 'Library/ConvertToMarkdown',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};

