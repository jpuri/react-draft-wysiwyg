/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import sampleEditorContent from '../../../util/sampleEditorContent';

const EditorWithMentionHashtag = () => (
  <div className="demo-section">
    <h3>8. Editor with mentions and hashtag. Type @ for mentions and # for hashtag.</h3>
    <div className="demo-section-wrapper">
      <div className="demo-editor-wrapper">
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          mention={{
            separator: ' ',
            trigger: '@',
            suggestions: [
              { text: 'APPLE', value: 'apple', url: 'apple' },
              { text: 'BANANA', value: 'banana', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
          hashtag={{}}
        />
      </div>
      <Codemirror
        value={
          'const EditorWithMentionHashtag = () => (\n' +
          '  <div>\n' +
          '    <Editor\n' +
          '      wrapperClassName="demo-wrapper"\n' +
          '      editorClassName="demo-editor"\n' +
          '      mention={{\n' +
          '        separator: \' \',\n' +
          '        trigger: \'@\',\n' +
          '        suggestions: [\n' +
          '          { text: \'APPLE\', value: \'apple\', url: \'apple\' },\n' +
          '          { text: \'BANANA\', value: \'banana\', url: \'banana\' },\n' +
          '          { text: \'CHERRY\', value: \'cherry\', url: \'cherry\' },\n' +
          '          { text: \'DURIAN\', value: \'durian\', url: \'durian\' },\n' +
          '          { text: \'EGGFRUIT\', value: \'eggfruit\', url: \'eggfruit\' },\n' +
          '          { text: \'FIG\', value: \'fig\', url: \'fig\' },\n' +
          '          { text: \'GRAPEFRUIT\', value: \'grapefruit\', url: \'grapefruit\' },\n' +
          '          { text: \'HONEYDEW\', value: \'honeydew\', url: \'honeydew\' },\n' +
          '        ],\n' +
          '      }}\n' +
          '      hashtag={{}}\n' +
          '    />\n' +
          ')'
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

export default EditorWithMentionHashtag;
