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

  uploadImageCallBack: Function = (file) => new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
        const data = new FormData(); // eslint-disable-line no-undef
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );

  render() {
    const { editorContent } = this.state;
    return (
      <div className="demo-root">
        <div className="demo-editorSection">
          <div className="demo-editorWrapper">
            <Editor
              toolbarClassName="demo-toolbar"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onChange={this.onEditorChange}
              toolbarAlwaysVisible
              uploadImageCallBack={this.uploadImageCallBack}
            />
          </div>
          <textarea
            className="demo-content no-focus"
            value={draftToHtml(editorContent)}
          />
        </div>
        <div className="demo-label">
          Documentation is work in progress.
        </div>
      </div>
    );
  }
}
