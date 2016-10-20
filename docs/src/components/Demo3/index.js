/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wyiswyg';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Demo1 extends Component {

  state: any = {
    editorContent: undefined,
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  render() {
    const { editorContent } = this.state;
    return (
      <div className="demo1-root">
        <div className="demo1-label">
          Toolbar appears as you focus the editor.
        </div>
        <div className="demo1-editorSection">
          <div className="demo1-editorWrapper">
            <Editor
              toolbarClassName="demo1-toolbar"
              wrapperClassName="demo1-wrapper"
              editorClassName="demo1-editor"
              onChange={this.onEditorChange}
            />
          </div>
          <textarea
            className="demo1-content no-focus"
            value={draftToHtml(editorContent)}
          />
        </div>
      </div>
    );
  }
}
