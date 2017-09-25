/* @flow */

import React from 'react';
import { Editor } from '../../src';

const SelectedOptions = () =>
(<div className="rdw-storybook-root">
  <h3>Editor with only selected toolbar options.</h3>
  <Editor
    toolbar={{
      options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
      inline: {
        options: ['italic', 'underline'],
      },
    }}
    toolbarClassName="rdw-storybook-toolbar"
    wrapperClassName="rdw-storybook-wrapper"
    editorClassName="rdw-storybook-editor"
  />
</div>);

export default SelectedOptions;
