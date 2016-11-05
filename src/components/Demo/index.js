/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../util/uploadImageCallBack';
import sampleEditorContent from '../../util/sampleEditorContent';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Demo extends Component {

  state: any = {
    editorContents: [],
  };

  onEditorChange: Function = (index, editorContent) => {
    let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    this.setState({
      editorContents,
    });
  };

  render() {
    const { editorContents } = this.state;
    return (
      <div className="demo-root">
        <div className="demo-label">
          Editor with output generated in HTML.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onChange={this.onEditorChange.bind(this, 0)}
            toolbar={{
              image: {
                uploadCallback: uploadImageCallBack,
              },
            }}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={draftToHtml(editorContents[0])}
          />
        </div>
        <div className="demo-label">
          Editor with output generated in JSON.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onChange={this.onEditorChange.bind(this, 1)}
            toolbar={{
              image: {
                uploadCallback: uploadImageCallBack,
              },
            }}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={JSON.stringify(editorContents[1], null, 4)}
          />
        </div>
        <div className="demo-label">
          Editor with similar options grouped in drop-down.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper-wide"
            editorClassName="demo-editor"
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
                uploadCallback: uploadImageCallBack,
              },
              history: {
                inDropdown: true,
              },
            }}
          />
        </div>
        <div className="demo-label">
          Editor with only a sub-set of options available.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper-wide"
            editorClassName="demo-editor"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'remove', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
            }}
          />
        </div>
        <div className="demo-label">
          Editor with toolbar visible only when editor is foused.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar-absolute"
            wrapperClassName="demo-wrapper-relative"
            editorClassName="demo-editor-plain"
            rawContentState={sampleEditorContent}
            toolbarOnFocus
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'code'],
              },
            }}
          />
        </div>
      </div>
    );
  }
}
