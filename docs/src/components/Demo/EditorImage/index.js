/* @flow */

import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import uploadImageCallBack from '../../../util/uploadImageCallBack';

const EditorImage = () => (
  <div className="demo-section">
    <h3>10. Editor with image upload option, mandatory alt field and image preview enabled.</h3>
    <div className="demo-section-wrapper">
      <div className="demo-editor-wrapper">
        <Editor
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'link', 'embedded', 'image', 'history'],
              inline: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }, previewImage: true },
            }}
          />
      </div>
      <Codemirror
        value={
          'import React from \'react\';\n' +
          'import { Editor } from \'react-draft-wysiwyg\';\n' +
          '\n\n' +
          'function uploadImageCallBack(file) {\n' +
          '  return new Promise(\n' +
          '    (resolve, reject) => {\n' +
          '      const xhr = new XMLHttpRequest();\n' +
          '      xhr.open(\'POST\', \'https://api.imgur.com/3/image\');\n' +
          '      xhr.setRequestHeader(\'Authorization\', \'Client-ID XXXXX\');\n' +
          '      const data = new FormData();\n' +
          '      data.append(\'image\', file);\n' +
          '      xhr.send(data);\n' +
          '      xhr.addEventListener(\'load\', () => {\n' +
          '        const response = JSON.parse(xhr.responseText);\n' +
          '        resolve(response);\n' +
          '      });\n' +
          '      xhr.addEventListener(\'error\', () => {\n' +
          '        const error = JSON.parse(xhr.responseText);\n' +
          '        reject(error);\n' +
          '      });\n' +
          '    }\n' +
          '  );\n' +
          '}\n' +
          '\n' +
          'const EditorImage = () => (\n' +
          '  <Editor\n' +
          '    wrapperClassName="demo-wrapper"\n' +
          '    editorClassName="demo-editor"\n' +
          '    toolbar={{\n' +
          '      inline: { inDropdown: true },\n' +
          '      list: { inDropdown: true },\n' +
          '      textAlign: { inDropdown: true },\n' +
          '      link: { inDropdown: true },\n' +
          '      history: { inDropdown: true },\n' +
          '      image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },\n' +
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

export default EditorImage;
