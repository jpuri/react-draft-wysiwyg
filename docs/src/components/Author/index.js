/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
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
      <div className="demo-label">
        Documentation is work in progress.
      </div>
      </div>
    );
  }
}
