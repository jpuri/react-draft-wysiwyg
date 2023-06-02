/* @flow */

import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "../..";

import "../styles.css";

class ConvertToRawDraftContentComponent extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="rdw-storybook-root">
        <Editor
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          readOnly
          className="rdw-storybook-textarea"
          value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

export default {
  title: "Editor",
  component: ConvertToRawDraftContentComponent,
};

export const ConvertToRawDraftContent = {
  args: {},
};
