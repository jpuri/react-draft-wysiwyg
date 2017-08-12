/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import sampleEditorContent from '../../../util/sampleEditorContent';

const Installation = () => (
  <div className="docs-section">
    <h2>Using editor component</h2>
    <div className="docs-desc">Package can be installed from node package manager using npm or yarn commands.</div>
    <Codemirror
      value={
        'npm install -S react-draft-wysiwyg\n' +
        'yarn add react-draft-wysiwyg'
      }
      options={{
        lineNumbers: true,
        readOnly: true,
      }}
    />
    <div className="docs-desc top-margined">
      <div>Peer dependencies and the required versions.</div>
      <ol>
        <li>draft-js: 0.10.x</li>
        <li>immutable: 3.x, 4.x</li>
        <li>react: 0.13.x, 0.14.x, ^15.0.0-0, 15.x.x</li>
        <li>react-dom: 0.13.x, 0.14.x, ^15.0.0-0, 15.x.x</li>
      </ol>
    </div>
  </div>
);

export default Installation;
