/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';

const EditorEmbedded = () => (
  <div className="demo-section">
    <h3>7. Editor with embedded link</h3>
    <div className="demo-section-wrapper">
      <div className="demo-editor-wrapper">
        <Editor
            toolbarClassName="demo-toolbar-absolute-high"
            wrapperClassName="demo-wrapper-relative-long"
            editorClassName="demo-editor-embedded"
            contentState={{ "entityMap":{"0":{"type":"EMBEDDED_LINK","mutability":"MUTABLE","data":{"src":"https://www.youtube.com/embed/VbXNmIvWa1c","height":"auto","width":"100%"}}},"blocks":[{"key":"4vla1","text":"Demo of embedded links, this work so awesome with DraftJS:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1gls3","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"4m681","text":"This is cool. Check by typing more here ...","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}] }}
            toolbarOnFocus
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
      </div>
      <Codemirror
        value={
          ''
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

export default EditorEmbedded;
