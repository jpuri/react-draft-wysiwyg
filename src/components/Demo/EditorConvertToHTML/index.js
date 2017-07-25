/* @flow */

import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import '../../../../node_modules/codemirror/lib/codemirror.css';

class ConvertToRawDraftContent extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (<div className="rdw-storybook-root">
      <Editor
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
        editorState={editorState}
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
      <textarea
        readOnly
        className="rdw-storybook-textarea"
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      />
      <Codemirror
        value={
          '<RangeSlider\n  ' +
            'step={5}\n  ' +
            'value={value}\n  ' +
            'min={-100}\n  ' +
            'max={100}\n  ' +
            'onChange={this.onChange}\n  ' +
            'wrapperStyle={styles.slider}\n  ' +
            'trackStyle={styles.trackStyle}\n  ' +
            'highlightedTrackStyle={styles.highlightedTrackStyle}\n  ' +
            'handleStyle={styles.handleStyle}\n  ' +
            'hoveredHandleStyle={styles.hoveredHandleStyle}\n  ' +
            'focusedHandleStyle={styles.focusedHandleStyle}\n  ' +
            'activeHandleStyle={styles.activeHandleStyle}\n' +
          '/>'
        }
        options={{
          lineNumbers: true,
          mode: 'jsx',
          readOnly: true,
        }}
      />
    </div>);
  }
}

export default ConvertToRawDraftContent;
