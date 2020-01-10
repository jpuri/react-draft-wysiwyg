/* @flow */

import React from 'react';
import { Editor } from '../../src';

const SelectedOptions = () => (
  <div className="rdw-storybook-root">
    <h3>Editor with only selected toolbar options.</h3>
    <Editor
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
    />
  </div>
);

export default SelectedOptions;
