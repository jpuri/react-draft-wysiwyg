/* @flow */

import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Menu extends Component {

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
      <div className="menu-root">
        <Link to={'/'} className="menu-option">
          Home
        </Link>
        <Link to={'/demo1'} className="menu-option">
          Demo 1
        </Link>
        <Link to={'/demo2'} className="menu-option">
          Demo 2
        </Link>
        <Link to={'/demo3'} className="menu-option">
          Demo 3
        </Link>
        <Link to={'/demo4'} className="menu-option">
          Demo 4
        </Link>
      </div>
    );
  }
}
