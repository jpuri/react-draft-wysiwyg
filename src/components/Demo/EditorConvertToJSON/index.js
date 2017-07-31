/* @flow */

import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    }
  }

  onContentStateChange: Function = (contentState) => {
    this.setState({
      contentState,
    });
  };

  render() {
    const { contentState } = this.state;
    return (
      <div className="demo-section">
        <h3>2. Uncontrolled editor component with conversion of content from and to JSON (RawDraftContentState)</h3>
        <div className="demo-section-wrapper">
          <div className="demo-editor-wrapper">
            <Editor
              defaultContentState={content}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onContentStateChange={this.onContentStateChange}
            />
            <textarea
              disabled
              className="demo-content no-focus"
              value={JSON.stringify(contentState, null, 4)}
            />
          </div>
          <Codemirror
            value={
              'import React, { Component } from \'react\';\n' +
              'import { convertFromRaw } from \'draft-js\';\n' +
              'import { Editor } from \'react-draft-wysiwyg\';\n' +
              '\n\n' +
              'const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};\n' +
              '\n' +
              'class EditorConvertToJSON extends Component {\n' +
              '  constructor(props) {\n' +
              '    super(props);\n' +
              '    const contentState = convertFromRaw(content);\n' +
              '    this.state = {\n' +
              '      contentState,\n' +
              '    }\n' +
              '  }\n' +
              '\n' +
              '  onContentStateChange: Function = (contentState) => {\n' +
              '    this.setState({\n' +
              '      contentState,\n' +
              '    });\n' +
              '  };\n' +
              '\n' +
              '  render() {\n' +
              '    const { contentState } = this.state;\n' +
              '    return (\n' +
              '      <div>\n' +
              '        <Editor\n' +
              '          wrapperClassName="demo-wrapper"\n' +
              '          editorClassName="demo-editor"\n' +
              '          onContentStateChange={this.onContentStateChange}\n' +
              '        />\n' +
              '        <textarea\n' +
              '          disabled\n' +
              '          value={JSON.stringify(contentState, null, 4)}\n' +
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

export default EditorConvertToJSON;
