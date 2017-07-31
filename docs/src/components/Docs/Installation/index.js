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
  </div>
);

export default Installation;
