/* @flow */

import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Codemirror from 'react-codemirror';

class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
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
        <h3>1. Controlled editor component with conversion of content from and to HTML</h3>
        <div className="demo-section-wrapper">
          <div className="demo-editor-wrapper">
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <textarea
              disabled
              className="demo-content no-focus"
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
          </div>
          <Codemirror
            value={
              'import React, { Component } from \'react\';\n' +
              'import { EditorState, convertToRaw } from \'draft-js\';\n' +
              'import { Editor } from \'react-draft-wysiwyg\';\n' +
              'import draftToHtml from \'draftjs-to-html\';\n' +
              'import htmlToDraft from \'html-to-draftjs\';\n' +
              '\n\n' +
              'class EditorConvertToHTML extends Component {\n' +
              '  state = {\n' +
              '    editorState: EditorState.createEmpty(),\n' +
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
              '          editorState={editorState}\n' +
              '          wrapperClassName="demo-wrapper"\n' +
              '          editorClassName="demo-editor"\n' +
              '          onEditorStateChange={this.onEditorStateChange}\n' +
              '        />\n' +
              '        <textarea\n' +
              '          disabled\n' +
              '          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}\n' +
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

export default EditorConvertToHTML;
