/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import sampleEditorContent from '../../../util/sampleEditorContent';

const Usage = () => (
  <div className="docs-section">
    <h2>Using editor component</h2>
    <div className="docs-desc">Editor can be simply imported and used as a React Component. Make sure to also include react-draft-wysiwyg.css from node_modules.</div>
    <Codemirror
      value={
        'import React, { Component } from \'react\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        'import \'../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css\';\n' +
        '\n\n' +
        'const EditorComponent = () => <Editor />'
      }
      options={{
        lineNumbers: true,
        mode: 'jsx',
        readOnly: true,
      }}
    />
  </div>
);

export default Usage;
