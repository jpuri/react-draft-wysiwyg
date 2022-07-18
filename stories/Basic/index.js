/* @flow */

import React from 'react';
import { Editor } from '../../src';

const Basic = () => (<div className="rdw-storybook-root">
  <Editor
    toolbarClassName="rdw-storybook-toolbar"
    wrapperClassName="rdw-storybook-wrapper"
    editorClassName="rdw-storybook-editor"
    placeholder='Start typing'
  />
</div>);

export default Basic;
