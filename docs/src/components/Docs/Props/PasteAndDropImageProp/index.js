import React from 'react';
import Codemirror from 'react-codemirror';

export default () => (
  <div>
    <h3>Pasted and Dropped Image</h3>
    <div className="docs-desc">
      Image can be pasted or dropped to editor by implementing handlePastedImage and handleDroppedImages properties. The pasted and dropped mechanism similar to uploadCallback
    </div>
    <Codemirror
      value={
        'import React from \'react\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
        'const handlePastedImage = file => {\n'+
        '  return new Promise(resolve => {\n'+
        '       // SAVE IMAGE TO BACKEND\n\n'+
        '       resolve({ data: { link: <THE_URL_FROM_BACKEND>} });\n'+
        '  })\n'+
        '}\n'+
        '\n'+
        'const handleDroppedImage = (selection, file) => {\n'+
        '  return new Promise(resolve => {\n'+
        '\n'+
        '       // SAVE IMAGE TO BACKEND\n\n'+
        '       resolve({ data: { link: <THE_URL_FROM_BACKEND>} });\n'+
        '  })\n'+
        '}\n'+
        '\n\n' +
        'const EditorWithPasteAndDroppedImage = () => (\n' +
        '  <Editor\n' +
        '    wrapperClassName="demo-wrapper"\n' +
        '    editorClassName="demo-editor"\n' +
        '    handlePastedImage={handlePastedImage} \n' +
        '    handleDroppedImages={handleDroppedImage}\n' +
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
