/* @flow */

import React, { Component, PropTypes } from 'react';
import Menu from '../Menu';
import github from '../../../images/github.png';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

  render() {
    return (
      <div className="app-root">
        <div>
          <span className="header">
            <span className="header-text">
              <span className="header-title">React Draft Wysiwyg</span>
              <span className="header-subtitle">A Wysiwyg Based on ReactJS and DraftJS</span>
            </span>
            <a target="_blank" href="https://github.com/jpuri/react-draft-wysiwyg" rel="noopener noreferrer">
              <img className="github" src={github} alt="Fork me on GitHub" />
            </a>
          </span>
        </div>
        <div className="flex-layout">
          <Menu pathname={this.props.location.pathname} />
          {this.props.children}
        </div>
        <span className="footer">
          Made with ❤ by <a target="_blank" href="https://twitter.com/jyopur" className="author-link" rel="noopener noreferrer"> Jyoti</a>
        </span>
      </div>
    );
  }
}
