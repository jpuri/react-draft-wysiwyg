import React from 'react';
import Codemirror from 'react-codemirror';

export const EditorStateLink = () => <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content"
  >
    EditorState
  </a>;

export const RawEditorStateLink = () => <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content"
  >
    RawDraftContentState
  </a>;

export default () => (
  <div>
    <h3>Editor state</h3>
    <div className="docs-desc">
      Editor can be implemented as controlled component using&nbsp;
      <EditorStateLink />
      &nbsp;or un-controlled component using&nbsp;
      <EditorStateLink />
      &nbsp;or&nbsp;
      <RawEditorStateLink />.
    </div>
    <ol>
      <li><b>defaultEditorState</b>: Property to initialize editor state once when its created. Object of type&nbsp;<EditorStateLink />.</li>
      <li><b>editorState</b>: Property to update editor state in controlled way.</li>
      <li><b>onEditorStateChange</b>: Function is called each time there is change in state of editor, function argument passed is object of type&nbsp;<EditorStateLink />.</li>
      <li><b>defaultContentState</b>: Property to initialize editor state once when its created. Object of type&nbsp;<RawEditorStateLink />.</li>
      <li><b>contentState</b>: Property to update editor state in controlled way.</li>
      <li><b>onChange</b>: Function is called each time there is change in state of editor, function argument passed is object of type&nbsp;<RawEditorStateLink />.</li>
      <li><b>onContentStateChange</b>: Function is called each time there is change in state of editor, function argument passed is object of type&nbsp;<RawEditorStateLink />.</li>
    </ol>
    <div className="docs-desc top-margined">
      <b>Controlled editor using <EditorStateLink />.</b>
    </div>
    <Codemirror
      value={
        'import React, { Component } from \'react\';\n' +
        'import { EditorState } from \'draft-js\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
        'class ControlledEditor extends Component {\n' +
        '  constructor(props) {\n' +
        '    super(props);\n' +
        '    this.state = {\n' +
        '      editorState: EditorState.createEmpty(),\n' +
        '    };\n' +
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
        '      <Editor\n' +
        '        editorState={editorState}\n' +
        '        wrapperClassName="demo-wrapper"\n' +
        '        editorClassName="demo-editor"\n' +
        '        onEditorStateChange={this.onEditorStateChange}\n' +
        '      />\n' +
        '    )\n' +
        '  }\n' +
        '}\n'
      }
      options={{
        lineNumbers: true,
        mode: 'jsx',
        readOnly: true,
      }}
    />
    <div className="docs-desc top-margined">
      <b>Uncontrolled editor using <EditorStateLink />.</b>
    </div>
    <Codemirror
      value={
        'import React, { Component } from \'react\';\n' +
        'import { EditorState } from \'draft-js\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
        'class UncontrolledEditor extends Component {\n' +
        '  constructor(props) {\n' +
        '    super(props);\n' +
        '    this.state = {\n' +
        '      editorState: EditorState.createEmpty(),\n' +
        '    };\n' +
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
        '      <Editor\n' +
        '        initialEditorState={editorState}\n' +
        '        wrapperClassName="demo-wrapper"\n' +
        '        editorClassName="demo-editor"\n' +
        '        onEditorStateChange={this.onEditorStateChange}\n' +
        '      />\n' +
        '    )\n' +
        '  }\n' +
        '}\n'
      }
      options={{
        lineNumbers: true,
        mode: 'jsx',
        readOnly: true,
      }}
    />
    <div className="docs-desc top-margined">
      <b>Uncontrolled editor using <RawEditorStateLink />.</b>
    </div>
    <Codemirror
      value={
        'import React, { Component } from \'react\';\n' +
        'import { EditorState } from \'draft-js\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
        'class UncontrolledEditor extends Component {\n' +
        '  constructor(props) {\n' +
        '    super(props);\n' +
        '    this.state = {\n' +
        '      contentState: {} // ContentState JSON\n' +
        '    };\n' +
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
        '      <Editor\n' +
        '        initialContentState={contentState}\n' +
        '        wrapperClassName="demo-wrapper"\n' +
        '        editorClassName="demo-editor"\n' +
        '        onContentStateChange={this.onContentStateChange}\n' +
        '      />\n' +
        '    )\n' +
        '  }\n' +
        '}\n'
      }
      options={{
        lineNumbers: true,
        mode: 'jsx',
        readOnly: true,
      }}
    />
    <div className="docs-desc top-margined">
      Its not recommended to use <RawEditorStateLink /> to achieve controlled behavior by editor.
      Conversion of contentState to instance of editorState impact performance.
    </div>
  </div>
)
