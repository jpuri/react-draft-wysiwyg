import React from 'react';
import Codemirror from 'react-codemirror';
import { EditorStateLink } from '../../EditorStateProp';

export default () => (
  <div>
    <div className="docs-desc top-margined">
      <b>Adding new option to the toolbar</b>
      <div className="docs-desc top-margined">
        Its possible to add new option to the toolbar using property 'toolbarCustomButtons', example:
      </div>
    </div>
    <Codemirror
      value={
        'import React, { Component } from \'react\';\n' +
        'import PropTypes from \'prop-types\';\n' +
        'import { EditorState, Modifier } from \'draft-js\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
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
    <div className="docs-desc top-margined">
      New toolbar component is passed following properties:
      <ol>
        <li><b>onChange</b>: The function can be used to update editor state.</li>
        <li><b>editorState</b>: The current editor state. It is an instance of <EditorStateLink /></li>
        <li><b>translations</b>: This is the map of all the translations in the editor.</li>
        <li>
          <b>modalHandler</b>
          : In case the custom option has a dropdown or a popup. This can be used to control their opening and closing.
          Using this property will ensure that all popups close when mouse is click anywhere else on the page.
          Example <a href="https://github.com/jpuri/react-draft-wysiwyg/blob/master/src/controls/ColorPicker/index.js#L16">here</a>.
        </li>
      </ol>
    </div>
  </div>
)
