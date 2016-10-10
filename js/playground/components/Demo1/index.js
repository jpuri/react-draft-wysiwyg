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
      <div className="demo3-root">
        <div className="demo3-label">
          Toolbar is alwasy visible.
        </div>
        <div className="demo3-editorSection">
          <div className="demo3-editorWrapper">
            <Editor
              toolbarClassName="demo3-toolbar"
              wrapperClassName="demo3-wrapper"
              editorClassName="demo3-editor"
              onChange={this.onEditorChange}
              toolbarAlwaysVisible
              uploadImageCallBack={this.uploadImageCallBack}
            />
          </div>
          <textarea
            className="demo3-content no-focus"
            value={draftToHtml(editorContent)}
          />
        </div>
      </div>
    );
  }
}
