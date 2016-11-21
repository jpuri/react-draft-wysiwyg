/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import { Editor } from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../util/uploadImageCallBack';
import sampleEditorContent from '../../util/sampleEditorContent';
import bold from '../../../images/bold.svg';
import italic from '../../../images/italic.svg';
import underline from '../../../images/underline.svg';
import strikethrough from '../../../images/strikethrough.svg';
import subscript from '../../../images/subscript.svg';
import superscript from '../../../images/superscript.svg';
import eraser from '../../../images/eraser.svg';
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
          Editor with output generated in Markdown.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onChange={this.onEditorChange.bind(this, 2)}
            toolbar={{
              image: {
                uploadCallback: uploadImageCallBack,
              },
            }}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={draftToMarkdown(editorContents[2])}
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
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              image: {
                uploadCallback: uploadImageCallBack,
              },
              history: { inDropdown: true },
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
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                bold: { className: 'bordered-option-classname' },
                italic: { className: 'bordered-option-classname' },
                underline: { className: 'bordered-option-classname' },
                strikethrough: { className: 'bordered-option-classname' },
                code: { className: 'bordered-option-classname' },
              },
              blockType: {
                className: 'bordered-option-classname',
              },
              fontSize: {
                className: 'bordered-option-classname',
              },
              fontFamily: {
                className: 'bordered-option-classname',
              },
            }}
          />
        </div>
        <div className="demo-label">
          Editor toolbar with custom icons.
          <image src={bold} height="20px" width="20px" />
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar-custom"
            wrapperClassName="demo-wrapper-wide"
            editorClassName="demo-editor-custom"
            toolbar={{
              options: ['inline', 'remove'],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
                bold: { icon: bold },
                italic: { icon: italic },
                underline: { icon: underline },
                strikethrough: { icon: strikethrough },
                superscript: { icon: superscript },
                subscript: { icon: subscript },
              },
              remove: { icon: eraser },
            }}
          />
        </div>
      </div>
    );
  }
}
