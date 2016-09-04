/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from '../../../src';
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
      <div className="demo4-root">
        <div className="demo4-label">
          Related styles grouped in dropdown.
        </div>
        <div className="demo4-editorWrapper">
          <Editor
            toolbarClassName="demo4-toolbar"
            wrapperClassName="demo4-wrapper"
            editorClassName="demo4-editor"
            onChange={this.onEditorChange}
            toolbarAlwaysVisible
            inlineControlInDropdown
            listControlInDropdown
          />
        </div>
        <textarea
          className="demo4-content no-focus"
          value={draftToHtml(editorContent)}
        />
      </div>
    );
  }
}
