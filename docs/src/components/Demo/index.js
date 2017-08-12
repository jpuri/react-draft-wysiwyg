/* @flow */

import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { Editor } from 'react-draft-wysiwyg';
import EditorConvertToHTML from './EditorConvertToHTML';
import EditorConvertToJSON from './EditorConvertToJSON';
import EditorConvertToMarkdown from './EditorConvertToMarkdown';
import EditorCustomToolbarOption from './EditorCustomToolbarOption';
import EditorCustomizedToolbarOption from './EditorCustomizedToolbarOption';
import EditorToolbarWhenFocused from './EditorToolbarWhenFocused';
import EditorI18n from './EditorI18n';
import EditorWithMentionHashtag from './EditorWithMentionHashtag';
import EditorStyledToolbar from './EditorStyledToolbar';
import EditorImage from './EditorImage';

import '../../../node_modules/codemirror/lib/codemirror.css';
import './styles.css';

require('codemirror/mode/jsx/jsx');

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
        <EditorConvertToHTML />
        <EditorConvertToJSON />
        <EditorConvertToMarkdown />
        <EditorCustomToolbarOption />
        <EditorCustomizedToolbarOption />
        <EditorToolbarWhenFocused />
        <EditorI18n />
        <EditorWithMentionHashtag />
        <EditorStyledToolbar />
        <EditorImage />
        <div className="demo-section">
          Some more examples can be found <a href="https://github.com/jpuri/react-draft-wysiwyg/tree/master/stories">here</a>.
        </div>
      </div>
    );
  }
}
