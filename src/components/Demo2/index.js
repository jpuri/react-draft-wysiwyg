/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import {
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { Editor } from 'react-draft-wyiswyg';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Demo2 extends Component {

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
    return (
      <div className="demo2-root">
        <div className="demo2-label">
          Editable area not distinguishable.
        </div>
        <div className="demo2-editorSection">
          <div className="demo2-editorWrapper">
            <Editor
              toolbarClassName="demo2-toolbar"
              wrapperClassName="demo2-wrapper"
              editorClassName="demo2-editor"
              onChange={this.onEditorChange}
              contentState={contentState}
              textAlignControlInDropdown
              inlineControlInDropdown
              listControlInDropdown
            />
          </div>
          <textarea
            className="demo2-content no-focus"
            value={draftToHtml(editorContent)}
          />
        </div>
      </div>
    );
  }
}
