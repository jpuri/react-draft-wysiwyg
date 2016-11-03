/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../util/uploadImageCallBack';
import sampleEditorContent from '../../util/sampleEditorContent';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Demo extends Component {

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
      <div className="demo-root">
        <div className="demo-label">
          Editor with output generated in HTML.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onChange={this.onEditorChange}
            toolbar={{
              image: {
                uploadCallback: uploadImageCallBack,
              },
            }}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={draftToHtml(editorContent)}
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
            onChange={this.onEditorChange}
            toolbar={{
              image: {
                uploadCallback: uploadImageCallBack,
              },
            }}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={JSON.stringify(editorContent, null, 4)}
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
            onChange={this.onEditorChange}
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
            onChange={this.onEditorChange}
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'remove', 'history'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
            }}
          />
        </div>
        <div className="demo-label">
          Editor with toolbar visible only when user starts typing.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar-absolute"
            wrapperClassName="demo-wrapper-relative"
            editorClassName="demo-editor-plain"
            onChange={this.onEditorChange}
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
