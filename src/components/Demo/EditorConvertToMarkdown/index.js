/* @flow */

import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import draftToMarkdown from 'draftjs-to-markdown';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToMarkdown extends Component {
  state = {
    editorState: undefined,
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="demo-section">
        <h3>3. Uncontrolled editor component with conversion of content to Markdown</h3>
        <div className="demo-section-wrapper">
          <div className="demo-editor-wrapper">
            <Editor
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <textarea
              disabled
              className="demo-content no-focus"
              value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>
          <Codemirror
            value={
              'class EditorConvertToMarkdown extends Component {\n' +
              '  state = {\n' +
              '    editorState: undefined,\n' +
              '  }\n' +
              '\n' +
              '  onEditorStateChange: Function = (editorState) => {\n' +
              '    this.setState({\n' +
              '      editorState,\n' +
              '    });\n' +
              '  };\n' +
              '\n' +
              '  render() {\n' +
              '    const { editorState } = this.state;\n' +
              '    return (\n' +
              '      <div>\n' +
              '        <Editor\n' +
              '          wrapperClassName="demo-wrapper"\n' +
              '          editorClassName="demo-editor"\n' +
              '          onEditorStateChange={this.onEditorStateChange}\n' +
              '        />\n' +
              '        <textarea\n' +
              '          disabled\n' +
              '           value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}\n' +
              '        />\n' +
              '      </div>\n' +
              '    );\n' +
              '  }\n' +
              '}'
            }
            options={{
              lineNumbers: true,
              mode: 'jsx',
              readOnly: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default EditorConvertToMarkdown;
