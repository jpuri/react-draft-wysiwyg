import React from 'react';
import Codemirror from 'react-codemirror';

export default () => (
  <div>
    <h3>Editor ref</h3>
    <div className="docs-desc">
      Reference of underlying DraftJS editor can be obtained using editorRef property.
      This can be used to raise events on editor like focus editor.
    </div>
    <Codemirror
      value={
        'const setEditorReference = (ref) => {\n' +
        '  this.editorReferece = ref;\n' +
        '  ref.focus();\n' +
        '}\n' +
        '\n\n' +
        'const EditorWithRef = () => (\n' +
        '  <Editor\n' +
        '    editorRef={setEditorReference}\n' +
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
