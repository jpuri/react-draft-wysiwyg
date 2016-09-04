/* @flow */

import React, { Component } from 'react';
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
        <div className="home-header">
          <b>React Draft Wysiwyg</b> is Wysiwyg Editor built
          on top of ReactJS and DraftJS libraries.
        </div>
        <ul className="home-list">
          <li className="home-listItem">
            Support for inline styles: Bold, Italic, Underline, StrikeThrough, Code.
          </li>
          <li className="home-listItem">
            Support for block styles: Paragraph, H1 - H6, Blockquote.
          </li>
          <li className="home-listItem">Support for font-size, font-family.</li>
          <li className="home-listItem">Support for nested indenting.</li>
          <li className="home-listItem">Support for coloring text or background.</li>
          <li className="home-listItem">Support for adding / editing links</li>
          <li className="home-listItem">Support for adding / uploading images.</li>
          <li className="home-listItem">Support for configuring visibility of toolbar.</li>
        </ul>
      </div>
    );
  }
}
