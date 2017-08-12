import React from 'react';
import Codemirror from 'react-codemirror';

export default () => (
  <div>
    <div className="docs-desc top-margined">
      <b>Using custom react component for pre-built toolbar options</b>
      <div className="docs-desc top-margined">
        Custom react components can be used for exiting toolbar options. Here is an example of using <a href="https://casesandberg.github.io/react-color/">react-color</a> for color-picker:
      </div>
    </div>
    <Codemirror
      value={
        'import React from \'react\';\n' +
        'import PropTypes from \'prop-types\';\n' +
        'import { BlockPicker } from \'react-color\';\n' +
        '\n\n' +
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
        '\n\n' +
        'import React, { Component } from \'react\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
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
    <div className="docs-desc top-margined">
      Custom react component is passed these 8 properties:
      <ol>
        <li><b>config</b>: This is toolbar config object for the option.</li>
        <li><b>translations</b>: The is map of all translations available for the editor.</li>
        <li><b>onChange</b>: The callback should be called as the selected value changes, for example in case of color-picker user selects new color.</li>
        <li><b>expanded</b>: In case the option has a dropdown or popup, this value can be used to set it open. Using this value will ensure that if user click anywhere else on the page the dropdown / popup closes. This makes expanded a controlled behavior.</li>
        <li><b>onExpandEvent</b>: In case the option has a dropdown or popup, this callback should be used to signal that option should be expanded.</li>
        <li><b>doExpand</b>: This callback can used to force 'expanded' property to 'true' value.</li>
        <li><b>doCollapse</b>: This callback can used to force 'expanded' property to 'false' value.</li>
        <li><b>currentState</b>: This property will have current selected state of the option.</li>
      </ol>
    </div>
  </div>
)
