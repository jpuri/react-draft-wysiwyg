/* @flow */

import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import sampleEditorContent from '../../../util/sampleEditorContent';

const EditorToolbarWhenFocused = () => (
  <div className="demo-section">
    <h3>6. Editor toolbar with limited options grouped in dropdown and visible only when editor is foused.</h3>
    <div className="demo-section-wrapper">
      <div className="demo-editor-wrapper">
        <Editor
            toolbarClassName="demo-toolbar-absolute"
            wrapperClassName="demo-wrapper-relative"
            editorClassName="demo-editor-plain"
            defaultEditorState={sampleEditorContent}
            toolbarOnFocus
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
              inline: {
                inDropdown: true,
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                bold: { className: 'bordered-option-classname' },
                italic: { className: 'bordered-option-classname' },
                underline: { className: 'bordered-option-classname' },
                strikethrough: { className: 'bordered-option-classname' },
                code: { className: 'bordered-option-classname' },
              },
              blockType: {
                className: 'bordered-option-classname',
              },
              fontSize: {
                className: 'bordered-option-classname',
              },
              fontFamily: {
                className: 'bordered-option-classname',
              },
            }}
          />
      </div>
      <Codemirror
        value={
          'import React from \'react\';\n' +
          'import { Editor } from \'react-draft-wysiwyg\';\n' +
          '\n\n' +
          'const contentBlocks = convertFromHTML(\'<p>Lorem ipsum \' +\n'+
          '  \'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet \' +\n'+
          '  \'maximus nec, tempus auctor diam. Nunc odio elit,  \' +\n'+
          '  \'commodo quis dolor in, sagittis scelerisque nibh. \' +\n'+
          '  \'Suspendisse consequat, sapien sit amet pulvinar  \' +\n'+
          '  \'tristique, augue ante dapibus nulla, eget gravida \' +\n'+
          '  \'turpis est sit amet nulla. Vestibulum lacinia mollis  \' +\n'+
          '  \'accumsan. Vivamus porta cursus libero vitae mattis. \' +\n'+
          '  \'In gravida bibendum orci, id faucibus felis molestie ac.  \' +\n'+
          '  \'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>\');\n'+
          '\n'+
          'const sampleEditorContent = ContentState.createFromBlockArray(contentBlocks);\n'+
          '\n'+
          'const EditorToolbarWhenFocused = () => (\n'+
          '  <Editor\n'+
          '    toolbarClassName="demo-toolbar-absolute"\n'+
          '    wrapperClassName="demo-wrapper"\n' +
          '    editorClassName="demo-editor"\n' +
          '    defaultEditorState={sampleEditorContent}\n'+
          '    toolbarOnFocus\n'+
          '    toolbar={{\n'+
          '      options: [\'inline\', \'blockType\', \'fontSize\', \'fontFamily\'],\n'+
          '      inline: {\n'+
          '        options: [\'bold\', \'italic\', \'underline\', \'strikethrough\', \'monospace\'],\n'+
          '        bold: { className: \'bordered-option-classname\' },\n'+
          '        italic: { className: \'bordered-option-classname\' },\n'+
          '        underline: { className: \'bordered-option-classname\' },\n'+
          '        strikethrough: { className: \'bordered-option-classname\' },\n'+
          '        code: { className: \'bordered-option-classname\' },\n'+
          '      },\n'+
          '      blockType: {\n'+
          '        className: \'bordered-option-classname\',\n'+
          '      },\n'+
          '      fontSize: {\n'+
          '        className: \'bordered-option-classname\',\n'+
          '      },\n'+
          '      fontFamily: {\n'+
          '        className: \'bordered-option-classname\',\n'+
          '      },\n'+
          '    }}\n'+
          '  />\n'+
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

export default EditorToolbarWhenFocused;
