/* @flow */

import React, { Component } from 'react';
import { Editor } from '../../src';

class BasicContentState extends Component {
  state = {
    contentState: JSON.parse('{"blocks":[{"key":"a0k70","text":"cherry ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":6,"key":0}],"data":{}}],"entityMap":{"0":{"type":"MENTION","mutability":"IMMUTABLE","data":{"text":"@cherry","value":"cherry","url":"cherry"}}}}'),
  }

  customOptionRenderer = (suggestion, activeIndex, index) => {
    const { label, icon } = suggestion;
    return (
      <div className="Editor-dropdown-option">
        {label}
      </div>
    );
  };

  render() {
    const { contentState } = this.state;
    return (<div className="rdw-storybook-root">
      <span>Content state is JSON
        <pre>
          {'{"entityMap":{},"blocks":[{"key":"1ljs","text":"Initializing from content state","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'}
        </pre>
      </span>
      <Editor
        defaultContentState={contentState}
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        mention={{
          separator: ' ',
          trigger: '@',
          dropdownOptions: { customOptionRenderer: this.customOptionRenderer },
          chipOptions: { type: 'selection' },
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
      />
    </div>);
  }
}

export default BasicContentState;
