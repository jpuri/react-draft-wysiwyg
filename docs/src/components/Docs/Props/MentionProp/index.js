import React from 'react';
import Codemirror from 'react-codemirror';

export default () => (
  <div>
    <h3>Enabling mentions</h3>
    <div className="docs-desc">
      Mentions can be enabled in the editor as showed in example below. 
      separator is character that separates a mention from word preceding it, default value is space ' '. 
      trigger is character that causes mention suggestions to appear, default value is '@'.
      Each suggestion has 3 peoperties:
      <ol>
        <li><b>text</b>: this is value that is displayed in the editor.</li>
        <li><b>value</b>: the filtering of suggestions is done using this value.</li>
        <li><b>url</b>: mention is added as link to editor using this 'url' in href. This is optional and if not present 'value' is used instead of this.</li>
      </ol>
    </div>
    <Codemirror
      value={
        'import React from \'react\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
        'const EditorWithMentionHashtag = () => (\n' +
        '  <Editor\n' +
        '    wrapperClassName="demo-wrapper"\n' +
        '    editorClassName="demo-editor"\n' +
        '    mention={{\n' +
        '      separator: \' \',\n' +
        '      trigger: \'@\',\n' +
        '      suggestions: [\n' +
        '        { text: \'APPLE\', value: \'apple\', url: \'apple\' },\n' +
        '        { text: \'BANANA\', value: \'banana\', url: \'banana\' },\n' +
        '        { text: \'CHERRY\', value: \'cherry\', url: \'cherry\' },\n' +
        '        { text: \'DURIAN\', value: \'durian\', url: \'durian\' },\n' +
        '        { text: \'EGGFRUIT\', value: \'eggfruit\', url: \'eggfruit\' },\n' +
        '        { text: \'FIG\', value: \'fig\', url: \'fig\' },\n' +
        '        { text: \'GRAPEFRUIT\', value: \'grapefruit\', url: \'grapefruit\' },\n' +
        '        { text: \'HONEYDEW\', value: \'honeydew\', url: \'honeydew\' },\n' +
        '      ],\n' +
        '    }}\n' +
        '  />\n' +
        ')'
      }
      options={{
        lineNumbers: true,
        mode: 'jsx',
        readOnly: true,
      }}
    />
  </div>
);
