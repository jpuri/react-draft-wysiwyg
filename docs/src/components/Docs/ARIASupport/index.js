/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import sampleEditorContent from '../../../util/sampleEditorContent';

export default () => (
  <div className="docs-section">
    <h2>ARIA Support</h2>
    <div className="docs-desc">
      All ARIA props supported by DraftJS editor are available in react-draft-wysiwyg <a target="_blank" rel="noopener noreferrer" href="https://draftjs.org/docs/api-reference-editor/#aria-props">Ref</a>.
      In addition editor and all option in toolbar have other ARIA attributes also added with pre-configured values.
    </div>
  </div>
);
