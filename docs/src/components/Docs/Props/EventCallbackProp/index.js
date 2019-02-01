import React from 'react';
import Codemirror from 'react-codemirror';

export default () => (
  <div>
    <h3>Event callbacks</h3>
    <div className="docs-desc">
      Editor supports 3 event callback properties:
      <ol>
        <li><b>onFocus</b>: this callback is called when editor is focused.</li>
        <li><b>onBlur</b>: this callback is called when editor is blurred.</li>
        <li>
          <b>onTab</b>
          : this callback is called when editor receives 'tab' keydown. Default behavior of editor on tab
          is to change depth of block if current block is of type list. If onTab callback returns true editor assumes
          that Tab has been handled by the callback and the default behavior is not executed.
        </li>
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
        '    onFocus={(event) => {}}\n' +
        '    onBlur={(event, editorState) => {}}\n' +
        '    onTab={(event) => {}}\n' +
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
