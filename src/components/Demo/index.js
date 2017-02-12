/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { Editor } from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../util/uploadImageCallBack';
import sampleEditorContent from '../../util/sampleEditorContent';
import bold from '../../../images/demo/bold.gif';
import italic from '../../../images/demo/italic.gif';
import underline from '../../../images/demo/underline.gif';
import strikethrough from '../../../images/demo/strikethrough.gif';
import subscript from '../../../images/demo/subscript.gif';
import superscript from '../../../images/demo/superscript.gif';
import eraser from '../../../images/demo/erase.gif';
import left from '../../../images/demo/left-align.gif';
import right from '../../../images/demo/right-align.gif';
import center from '../../../images/demo/center-align.gif';
import justify from '../../../images/demo/justify.gif';
import ordered from '../../../images/demo/ordered.gif';
import unordered from '../../../images/demo/unordered.gif';
import indent from '../../../images/demo/indent.gif';
import outdent from '../../../images/demo/outdent.gif';
import link from '../../../images/demo/link.gif';
import unlink from '../../../images/demo/unlink.gif';
import image from '../../../images/demo/image.gif';
import undo from '../../../images/demo/undo.gif';
import redo from '../../../images/demo/redo.gif';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Demo extends Component {

  state: any = {
    editorContents: [],
  };

  onEditorStateChange: Function = (index, editorContent) => {
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
            hashtag={{}}
            editorState={editorContents[0]}
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange.bind(this, 0)}
            toolbar={{image: { uploadCallback: uploadImageCallBack }}}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={editorContents[0] && draftToHtml(convertToRaw(editorContents[0].getCurrentContent()))}
          />
        </div>
        <div className="demo-label">
          Editor with output generated in JSON.
        </div>
        <div className="demo-editorSection">
          <Editor
            hashtag={{}}
            editorState={editorContents[1]}
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange.bind(this, 1)}
            toolbar={{image: { uploadCallback: uploadImageCallBack }}}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={editorContents[1] && JSON.stringify(convertToRaw(editorContents[1].getCurrentContent()), null, 4)}
          />
        </div>
        <div className="demo-label">
          Editor with output generated in Markdown.
        </div>
        <div className="demo-editorSection">
          <Editor
            hashtag={{}}
            editorState={editorContents[2]}
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange.bind(this, 2)}
            toolbar={{image: { uploadCallback: uploadImageCallBack }}}
          />
          <textarea
            disabled
            className="demo-content no-focus"
            value={editorContents[2] && draftToMarkdown(convertToRaw(editorContents[2].getCurrentContent()))}
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
              history: { inDropdown: true },
              image: { uploadCallback: uploadImageCallBack }
            }}
          />
        </div>
        <div className="demo-label">
          Editor with similar options grouped in drop-down and order of options reversed.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper-wide"
            editorClassName="demo-editor"
            toolbar={{
              options: ['history', 'remove', 'image', 'emoji', 'embedded', 'link', 'colorPicker', 'textAlign', 'list', 'fontFamily', 'fontSize', 'blockType', 'inline'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback: uploadImageCallBack }
            }}
          />
        </div>
        <div className="demo-label">
          Editor with only a sub-set of options available.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper-medium"
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
            defaultEditorState={sampleEditorContent}
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
        <div className="demo-label-high">
          Editor with embedded links.
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar-absolute-high"
            wrapperClassName="demo-wrapper-relative-long"
            editorClassName="demo-editor-embedded"
            contentState={{ "entityMap":{"0":{"type":"EMBEDDED_LINK","mutability":"MUTABLE","data":{"src":"https://www.youtube.com/embed/VbXNmIvWa1c","height":"auto","width":"100%"}}},"blocks":[{"key":"4vla1","text":"Demo of embedded links, this work so awesome with DraftJS:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1gls3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"4m681","text":"This is cool. Check by typing more here ...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}] }}
            toolbarOnFocus
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>
        <div className="demo-label">
          Editor with mentions.
        </div>
        <div className="demo-subLabel">Try out by entering @ and hashtag by entering #.</div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            mention={{
              separator: ' ',
              trigger: '@',
              suggestions: [
                { text: 'APPLE', value: 'apple', url: 'apple' },
                { text: 'BANANA', value: 'banana', url: 'banana' },
                { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                { text: 'DURIAN', value: 'durian', url: 'durian' },
                { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                { text: 'FIG', value: 'fig', url: 'fig' },
                { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
              ],
            }}
            hashtag={{}}
          />
        </div>
        <div className="demo-label">
          Editor toolbar with custom icons and styling.
          <image src={bold} height="20px" width="20px" />
        </div>
        <div className="demo-editorSection">
          <Editor
            toolbarClassName="demo-toolbar-custom"
            wrapperClassName="demo-wrapper-wide"
            editorClassName="demo-editor-custom"
            toolbar={{
              inline: {
                bold: { icon: bold, className: 'demo-option-custom' },
                italic: { icon: italic, className: 'demo-option-custom' },
                underline: { icon: underline, className: 'demo-option-custom' },
                strikethrough: { icon: strikethrough, className: 'demo-option-custom' },
                monospace: { className: 'demo-option-custom' },
                superscript: { icon: superscript, className: 'demo-option-custom' },
                subscript: { icon: subscript, className: 'demo-option-custom' },
              },
              blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
              fontSize: { className: 'demo-option-custom-medium' },
              list: {
                unordered: { icon: unordered, className: 'demo-option-custom' },
                ordered: { icon: ordered, className: 'demo-option-custom' },
                indent: { icon: indent, className: 'demo-option-custom' },
                outdent: { icon: outdent, className: 'demo-option-custom' },
              },
              textAlign: {
                left: { icon: left, className: 'demo-option-custom' },
                center: { icon: center, className: 'demo-option-custom' },
                right: { icon: right, className: 'demo-option-custom' },
                justify: { icon: justify, className: 'demo-option-custom' },
              },
              fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
              colorPicker: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
              link: {
                popupClassName: 'demo-popup-custom',
                link: { icon: link, className: 'demo-option-custom' },
                unlink: { icon: unlink, className: 'demo-option-custom' },
              },
              emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
              embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
              image: { icon: image, className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },
              remove: { icon: eraser, className: 'demo-option-custom' },
              history: {
                undo: { icon: undo, className: 'demo-option-custom' },
                redo: { icon: redo, className: 'demo-option-custom' },
              },
            }}
          />
        </div>
      </div>
    );
  }
}
