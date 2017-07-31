import React from 'react';
import Codemirror from 'react-codemirror';

export default () => (
  <div>
    <h3>Enabling hashtag</h3>
    <div className="docs-desc">
      Hashtag can be enabled in the editor as showed in example below. 
      separator is character that separates a mention from word preceding it, default value is space ' '. 
      trigger is character that causes mention suggestions to appear, default value is '#'.
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
        '    hashtag={{\n' +
        '      separator: \' \',\n' +
        '      trigger: \'#\',\n' +
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
