/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';

class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar: Function = (): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    return (
      <div className="demo-custom-option" onClick={this.addStar}>⭐</div>
    );
  }
}

const EditorCustomToolbarOption = () => (
  <div className="demo-section">
    <h3>4. Editor with new custom toolbar option - insert star</h3>
    <div className="demo-section-wrapper">
      <div className="demo-editor-wrapper">
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarCustomButtons={[<CustomOption />]}
        />
      </div>
      <Codemirror
        value={
          'class CustomOption extends Component {\n' +
          '  static propTypes = {\n' +
          '    onChange: PropTypes.func,\n' +
          '    editorState: PropTypes.object,\n' +
          '  };\n' +
          '\n' +
          '  addStar: Function = (): void => {\n' +
          '    const { editorState, onChange } = this.props;\n' +
          '    const contentState = Modifier.replaceText(\n' +
          '      editorState.getCurrentContent(),\n' +
          '      editorState.getSelection(),\n' +
          '      \'⭐\',\n' +
          '      editorState.getCurrentInlineStyle(),\n' +
          '    );\n' +
          '    onChange(EditorState.push(editorState, contentState, \'insert-characters\'));\n' +
          '  };\n' +
          '\n' +
          '  render() {\n' +
          '    return (\n' +
          '      <div onClick={this.addStar}>⭐</div>\n' +
          '    );\n' +
          '  }\n' +
          '}\n' +
          '\n' +
          'const EditorCustomToolbarOption = () => (\n' +
          '  <Editor\n' +
          '    wrapperClassName="demo-wrapper"\n' +
          '    editorClassName="demo-editor"\n' +
          '    toolbarCustomButtons={[<CustomOption />]}\n' +
          '  />\n' +
          ');'
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

export default EditorCustomToolbarOption;
