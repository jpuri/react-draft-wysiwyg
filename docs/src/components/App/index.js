/* @flow */

import React, { Component } from 'react';
import Menu from '../Menu';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class App extends Component {

  static propTypes = {
    children: React.PropTypes.object.isRequired,
  };

  render() {
    return (<div className="app-root">
      <div>
        <span className="app-header">React Draft Wysiwyg</span>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=jpuri&repo=react-draft-wysiwyg&type=star&count=true&size=large"
          frameBorder="0"
          scrolling="0"
          className="gitLink"
        />
      </div>
      <div className="flex-layout">
        <Menu />
        {this.props.children}
      </div>
      <span className="app-footer">
        Made with ❤ by <a target="_blank" href="https://twitter.com/jyopur" className="app-href"> Jyoti</a>.
        With support from  <a target="_blank" href="http://www.ipaoo.com/" className="app-href">ipaoo</a>.
      </span>
    </div>);
  }
}
