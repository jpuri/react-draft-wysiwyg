/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from 'draftjs-to-html'; // eslint-disable-line import/no-extraneous-dependencies
import draftToMarkdown from 'draftjs-to-markdown'; // eslint-disable-line import/no-extraneous-dependencies
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
} from 'draft-js';
import { Editor } from '../src';
import styles from './styles.css'; // eslint-disable-line no-unused-vars
import draft from '../../css/Draft.css'; // eslint-disable-line no-unused-vars

const contentBlocks = convertFromHTML('<p>Lorem ipsum ' +
      'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
      'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
      'commodo quis dolor in, sagittis scelerisque nibh. ' +
      'Suspendisse consequat, sapien sit amet pulvinar  ' +
      'tristique, augue ante dapibus nulla, eget gravida ' +
      'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
      'accumsan. Vivamus porta cursus libero vitae mattis. ' +
      'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
      'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>');

const contentState = ContentState.createFromBlockArray(contentBlocks);

const rawContentState = convertToRaw(contentState);

class Playground extends Component {

  state: any = {
    editorContent: undefined,
  };

  onEditorChange: Function = (editorContent) => {
    console.log('*****', JSON.stringify(editorContent))
    this.setState({
      editorContent,
    });
  };

  imageUploadCallBack: Function = file => new Promise(
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
          Toolbar is alwasy <sup>visible</sup>
        </div>
        <div className="playground-editorSection">
          <div className="playground-editorWrapper">
            <Editor
              toolbarClassName="playground-toolbar"
              wrapperClassName="playground-wrapper"
              editorClassName="playground-editor"
              onChange={this.onEditorChange}
              initialContentState={{"entityMap":{"0":{"type":"EMBEDDED_LINK","mutability":"MUTABLE","data":{"link":"https://www.youtube.com/embed/VbXNmIvWa1c"}}},"blocks":[{"key":"4vla1","text":"Demo of embedded links:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1gls3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"4m681","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}}
              toolbar={{
                inline: {
                  inDropdown: true,
                },
                list: {
                  inDropdown: true,
                },
                textAlign: {
                  inDropdown: true,
                },
                link: {
                  inDropdown: true,
                },
                image: {
                  uploadCallback: this.imageUploadCallBack,
                },
                history: {
                  inDropdown: true,
                },
              }}
              mention={{
                separator: ' ',
                trigger: '@',
                suggestions: [
                  { text: 'abc', value: 'abc', url: 'abc' },
                  { text: 'abcd', value: 'abcd', url: 'abcd' },
                  { text: 'abcde', value: 'abcde', url: 'abcde' },
                  { text: 'abcde', value: 'abcdef', url: 'abcde' },
                  { text: 'abcde', value: 'abcdefg', url: 'abcde' },
                  { text: 'abcde', value: 'abcdefgh', url: 'abcde' },
                  { text: 'abcde', value: 'abcdefghi', url: 'abcde' },
                  { text: 'abcde', value: 'abcde', url: 'abcde' },
                  { text: 'abcde', value: 'abcde', url: 'abcde' },
                  { text: 'abcde', value: 'abcde', url: 'abcde' },
                  { text: 'abcde', value: 'abcde', url: 'abcde' },
                  { text: 'abcde', value: 'abcde', url: 'abcde' },
                  { text: 'abcde', value: 'abcde', url: 'abcde' },
                ],
              }}
            />
          </div>
          <textarea
            className="playground-content no-focus"
            value={draftToHtml(editorContent)}
          />
          <textarea
            className="playground-content no-focus"
            value={draftToMarkdown(editorContent)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app')); // eslint-disable-line no-undef


/**
const rawContentState = ;

*/
