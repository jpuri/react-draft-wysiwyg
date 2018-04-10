/* @flow */

import React from 'react';
import { Editor } from '../../src';

const Basic = () => (<div className="rdw-storybook-root">
  <Editor
    ref={(ref) => {console.log('hey ref', ref.focusEditor())}}
    toolbarClassName="rdw-storybook-toolbar"
    wrapperClassName="rdw-storybook-wrapper"
    editorClassName="rdw-storybook-editor"
  />
</div>);

export default Basic;
