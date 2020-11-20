/* @flow */

import React from 'react';
import { Editor } from '../../src';

/**
 * Default trigger is '@' and default separator between words is ' '.
 * thus there fields are optional.
*/
const Mention = () =>
(<div className="rdw-storybook-root">
  <span>Type @ to see suggestions</span>
  <Editor
    mention={{
      separator: ' ',
      trigger: '@',
      suggestions: [
        { label: 'APPLE', value: 'apple', icon: 'events' },
        { label: 'BANANA', value: 'banana', icon: 'events' },
        { label: 'CHERRY', value: 'cherry', icon: 'events' },
        { label: 'DURIAN', value: 'durian', icon: 'events' },
        { label: 'EGGFRUIT', value: 'eggfruit', icon: 'events' },
        { label: 'FIG', value: 'fig', icon: 'events' },
        { label: 'GRAPEFRUIT', value: 'grapefruit', icon: 'events' },
        { label: 'HONEYDEW', value: 'honeydew', icon: 'events' },
      ],
    }}
    toolbarClassName="rdw-storybook-toolbar"
    wrapperClassName="rdw-storybook-wrapper"
    editorClassName="rdw-storybook-editor"
  />
</div>);

export default Mention;
