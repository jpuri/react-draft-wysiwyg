/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import ColorPic from './ColorPic';

const EditorCustomizedToolbarOption = () => (
  <div className="demo-section">
    <h3>5. Customizing current coolbar option. Custom component <a href="https://casesandberg.github.io/react-color/">react-color</a> used for color-picker.</h3>
    <div className="demo-section-wrapper">
      <div className="demo-editor-wrapper">
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbar={{
            colorPicker: { component: ColorPic },
          }}
        />
      </div>
      <Codemirror
        value={
          'class ColorPic extends Component {\n' +
          '  static propTypes = {\n' +
          '    expanded: PropTypes.bool,\n' +
          '    onExpandEvent: PropTypes.func,\n' +
          '    onChange: PropTypes.func,\n' +
          '    currentState: PropTypes.object,\n' +
          '  };\n' +
          '\n' +
          '  stopPropagation = (event) => {\n' +
          '    event.stopPropagation();\n' +
          '  };\n' +
          '\n' +
          '  onChange = (color) => {\n' +
          '    const { onChange } = this.props;\n' +
          '    onChange(\'color\', color.hex);\n' +
          '  }\n' +
          '\n' +
          '  renderModal = () => {\n' +
          '    const { color } = this.props.currentState;\n' +
          '    return (\n' +
          '      <div\n' +
          '        onClick={this.stopPropagation}\n' +
          '      >\n' +
          '        <BlockPicker color={color} onChangeComplete={this.onChange} />\n' +
          '      </div>\n' +
          '    );\n' +
          '  };\n' +
          '\n' +
          '  render() {\n' +
          '    const { expanded, onExpandEvent } = this.props;\n' +
          '    return (\n' +
          '      <div\n' +
          '        aria-haspopup="true"\n' +
          '        aria-expanded={expanded}\n' +
          '        aria-label="rdw-color-picker"\n' +
          '      >\n' +
          '        <div\n' +
          '          onClick={onExpandEvent}\n' +
          '        >\n' +
          '          <img\n' +
          '            src={icon}\n' +
          '            alt=""\n' +
          '          />\n' +
          '        </div>\n' +
          '        {expanded ? this.renderModal() : undefined}\n' +
          '      </div>\n' +
          '    );\n' +
          '  }\n' +
          '}\n' +
          '\n' +
          'const EditorCustomizedToolbarOption = () => (\n' +
          '  <Editor\n' +
          '    wrapperClassName="demo-wrapper"\n' +
          '    editorClassName="demo-editor"\n' +
          '    toolbar={{\n' +
          '      colorPicker: { component: ColorPic },\n' +
          '    }}\n' +
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

export default EditorCustomizedToolbarOption;
