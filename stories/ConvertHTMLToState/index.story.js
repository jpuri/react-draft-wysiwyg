/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const html = `<p><a href="https://innovaccer.github.io/design-system/?path=/story/*" target="_self">Innovaccer Design System</a>&nbsp;</p>`;
  const [editorState, setEditorState] = React.useState(Editor.utils.htmlToState(html).editorState);

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
  title: 'Library/Convert - HTMLToContent',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
