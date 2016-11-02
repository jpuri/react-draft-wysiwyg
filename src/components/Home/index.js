/* @flow */

import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../util/uploadImageCallBack';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Home extends Component {

  state: any = {
    status: false,
  };

  changeState: any = () => {
    const status = !this.state.status;
    this.setState({
      status,
    });
  };

  render() {
    return (
      <div className="root">
        <Editor
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onChange={this.onEditorChange}
          toolbar={{
            image: {
              uploadCallback: uploadImageCallBack,
            },
          }}
        />
        <div className="quote">
          <span className="quote-text">This is incredibly well done!</span>
          <span className="quote-author">Simon Sturmer (<a target="_blank" href="https://kodefox.com" rel="noopener noreferrer">KodeFox</a>)</span>
        </div>
        <div className="home-label">
          Features
        </div>
        <ul className="feature-list">
          <li className="home-listItem">Configurable toolbar with option to add/remove controls.</li>
          <li className="home-listItem">Option to show toolbar only when editor is focused.</li>
          <li className="home-listItem">Support for inline styles: Bold, Italic, Underline, StrikeThrough, Code, Subscript, Superscript.</li>
          <li className="home-listItem">Support for block types: Paragraph, H1 - H6, Blockquote.</li>
          <li className="home-listItem">Support for setting font-size and font-family.</li>
          <li className="home-listItem">Support for ordered / unordered lists and indenting.</li>
          <li className="home-listItem">Support for text-alignment.</li>
          <li className="home-listItem">Support for coloring text or background.</li>
          <li className="home-listItem">Support for adding / editing links</li>
          <li className="home-listItem">Support for adding / uploading images.</li>
          <li className="home-listItem">Option provided to remove added styling.</li>
          <li className="home-listItem">Option of undo and redo.</li>
        </ul>
      </div>
    );
  }
}
