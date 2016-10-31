/* @flow */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Menu extends Component {

  static propTypes = {
    pathname: PropTypes.object,
  };

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
    const { pathname } = this.props;
    return (
      <div className="menu-root">
        <Link to={'/'} className={classNames('menu-option', { 'menu-option-active': pathname === '/' })}>
          Home
        </Link>
        <Link to={'/demo1'} className={classNames('menu-option', { 'menu-option-active': pathname === '/demo1' })}>
          Demo
        </Link>
        <Link to={'/demo2'} className={classNames('menu-option', { 'menu-option-active': pathname === '/demo2' })}>
          Docs
        </Link>
        <Link to={'/demo3'} className={classNames('menu-option', { 'menu-option-active': pathname === '/demo3' })}>
          Author
        </Link>
      </div>
    );
  }
}
