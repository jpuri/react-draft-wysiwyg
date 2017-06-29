/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';
import './styles.css';

export default class Menu extends Component {

  static propTypes = {
    pathname: PropTypes.string,
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
        <Link to={'/demo'} className={classNames('menu-option', { 'menu-option-active': pathname === '/demo' })}>
          Demo
        </Link>
        <Link to={'/docs'} className={classNames('menu-option', { 'menu-option-active': pathname === '/docs' })}>
          Docs
        </Link>
        <Link to={'/author'} className={classNames('menu-option', { 'menu-option-active': pathname === '/author' })}>
          Author
        </Link>
      </div>
    );
  }
}
