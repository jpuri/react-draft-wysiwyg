/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import draftToHtml from 'draftjs-to-html'; // eslint-disable-line import/no-extraneous-dependencies
import draftToMarkdown from 'draftjs-to-markdown'; // eslint-disable-line import/no-extraneous-dependencies
import {
  convertFromHTML,
  convertToRaw,
  ContentState,
  EditorState,
} from 'draft-js';
import { Editor } from '../src';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class TestOption extends Component {
  render() {
    return <div>testing</div>;
  }
}

class TestOption2 extends Component {
  render() {
    return <div>resting</div>;
  }
}

const contentBlocks = convertFromHTML('<p><p>Lorem ipsum ' +
      'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
      'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
      'commodo quis dolor in, sagittis scelerisque nibh. ' +
      'Suspendisse consequat, sapien sit amet pulvinar  ' +
      'tristique, augue ante dapibus nulla, eget gravida ' +
      'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
      'accumsan. Vivamus porta cursus libero vitae mattis. ' +
      'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
      'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p><img src="http://i.imgur.com/aMtBIep.png" /></p>');

const contentState = ContentState.createFromBlockArray(contentBlocks);

// const rawContentState = convertToRaw(contentState);

const rawContentState = {"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"data:image/jpeg;base64,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","height":"auto","width":"auto","alignment":"right"}},"1":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"data:image/jpeg;base64,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","height":"auto","width":"auto","alignment":"left"}}},"blocks":[{"key":"3q6ro","text":"","type":"header-six","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9mb2r","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"f5flo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4qvht","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c332t","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":1}],"data":{}},{"key":"ak6bi","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
// {"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"http://i.imgur.com/aMtBIep.png","height":"auto","width":"100%"}}},"blocks":[{"key":"9unl6","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"95kn","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"7rjes","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class Playground extends Component {

  state: any = {
    editorContent: undefined,
    contentState: rawContentState,
    editorState: EditorState.createEmpty(),
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  clearContent: Function = () => {
    this.setState({
      contentState: convertToRaw(ContentState.createFromText('')),
    });
  };

  onContentStateChange: Function = (contentState) => {
    console.log('contentState', contentState);
  };

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
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
    const { editorContent, contentState, editorState } = this.state;
    return (
      <div className="playground-root">
        <div className="playground-label">
          Toolbar is alwasy <sup>visible</sup>
        </div>
        <button onClick={this.clearContent} tabIndex={0}>Force Editor State</button>
        <div className="playground-editorSection">
          <input tabIndex={0} />
          <div className="playground-editorWrapper">
            <Editor
              tabIndex={0}
              hashtag={{}}
              initialContentState={rawContentState}
              toolbarClassName="playground-toolbar"
              wrapperClassName="playground-wrapper"
              editorClassName="playground-editor"
              toolbar={{
                history: { inDropdown: true },
                inline: { inDropdown: false },
                list: { inDropdown: true },
                link: { showOpenOptionOnHover: true },
                textAlign: { inDropdown: true },
                image: { uploadCallback: this.imageUploadCallBack },
              }}
              onEditorStateChange={this.onEditorStateChange}
              onContentStateChange={this.onEditorChange}
              placeholder="testing"
              spellCheck
              toolbarCustomButtons={[<TestOption />, <TestOption2 />]}
              onFocus={() => {console.log('focus')}}
              onBlur={() => {console.log('blur')}}
              onTab={() => {console.log('tab'); return true;}}
              localization={{ locale: 'zh', translations: {'generic.add': 'Test-Add'} }}
              mention={{
                separator: ' ',
                trigger: '@',
                caseSensitive: true,
                suggestions: [
                  { text: 'A', value: 'AB', url: 'href-a' },
                  { text: 'AB', value: 'ABC', url: 'href-ab' },
                  { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                  { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                  { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                  { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                  { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' },
                ],
              }}
            />
          </div>
          <input tabIndex={0} />
          <textarea
            className="playground-content no-focus"
            value={draftToHtml(editorContent)}
          />
          <textarea
            className="playground-content no-focus"
            value={draftToMarkdown(editorContent)}
          />
          <textarea
            className="playground-content no-focus"
            value={JSON.stringify(editorContent)}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Playground />, document.getElementById('app')); // eslint-disable-line no-undef


/**
const rawContentState = ;


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
}}*/
// {"entityMap":{},"blocks":
// [{"key":"3q6ro","text":"testing iehfciwehcwjvbjhsvsvv","type":"header-six","depth":0,"inlineStyleRanges":
// [{"offset":0,"length":29,"style":"fontsize-24"},{"offset":0,"length":29,"style":"fontfamily-Times New Roman"},{"offset":0,"length":29,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}},{"key":"6789c","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b2fnq","text":"testing","type":"unstyled","depth":0,"inlineStyleRanges":
// [{"offset":0,"length":7 ,"style":"fontsize-24"},{"offset":0,"length":7, "style":"fontfamily-Times New Roman"},{"offset":0,"length":7,"style":"color-rgb(209,72,65)"}],"entityRanges":[],"data":{}}]}
