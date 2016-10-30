/* @flow */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

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
        <Link to={'/'} className={classNames('menu-option', { 'menu-option-active': pathname === '/react-draft-wysiwyg' })}>
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
