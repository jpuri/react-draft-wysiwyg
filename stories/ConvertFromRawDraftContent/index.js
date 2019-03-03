/* @flow */

import React, { Component } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from '../../src';

class ConvertFromRawDraftContent extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw({
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
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (<div className="rdw-storybook-root">
      <span>RAW Content: <pre>{'{"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'}</pre></span>
      <Editor
        editorState={editorState}
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    </div>);
  }
}

export default ConvertFromRawDraftContent;
