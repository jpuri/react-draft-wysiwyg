/* @flow */

import React from 'react';
import { Editor } from '../../src';

/**
 * Default hashCharacter is '#' and default separator between words is ' '.
 * thus there fields are optional. An empty object can also be passed as value of prop hashTag.
*/
const HashTag = () =>
(<div className="rdw-storybook-root">
  <span>Write a hashTag like <pre>{'#rdw'}</pre></span>
  <Editor
    hashtag={{ hashCharacter: '#', separator: ' ' }}
    toolbarClassName="rdw-storybook-toolbar"
    wrapperClassName="rdw-storybook-wrapper"
    editorClassName="rdw-storybook-editor"
  />
</div>);

export default HashTag;
