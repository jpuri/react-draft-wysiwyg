/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from 'draftjs-to-html'; // eslint-disable-line import/no-extraneous-dependencies
import { Editor } from '../src';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class Playground extends Component {

  state: any = {
    editorContent: undefined,
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  uploadImageCallBack: Function = file => new Promise(
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
      <div className="playground-root">
        <div className="playground-label">
          Toolbar is alwasy visible.
        </div>
        <div className="playground-editorSection">
          <div className="playground-editorWrapper">
            <Editor
              toolbarClassName="playground-toolbar"
              wrapperClassName="playground-wrapper"
              editorClassName="playground-editor"
              onChange={this.onEditorChange}
              toolbarAlwaysVisible
              uploadImageCallBack={this.uploadImageCallBack}
              toolbarConfig={{
                inline: {
                  visible: true,
                  inDropdown: false,
                },
                blockType: {
                  visible: true,
                },
                fontSize: {
                  visible: true,
                },
                fontFamily: {
                  visible: true,
                },
                list: {
                  visible: true,
                },
                textAlign: {
                  visible: true,
                },
                colorPicker: {
                  visible: true,
                },
                link: {
                  visible: true,
                },
                image: {
                  visible: true,
                },
                history: {
                  visible: true,
                },
              }}
            />
          </div>
          <textarea
            className="playground-content no-focus"
            value={draftToHtml(editorContent)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app')); // eslint-disable-line no-undef
