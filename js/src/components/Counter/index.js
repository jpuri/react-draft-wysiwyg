/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState, Modifier } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class CounterControl extends Component {
  
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };
  
  switchCounter: Function = (counter: false): void => {
    return !counter;
  };
  
  counter: Function = (): void => {
    console.log('counter');
    const { counter, onChange } = this.props;
    onChange(this.switchCounter(counter));
  };
  
  render(): Object {
    const { config: { icon, className } } = this.props;
    return (
      <div className="rdw-remove-wrapper">
        <Option
          className={classNames(className)}
          onClick={this.counter}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
      </div>
    );
  }
}

// todo: add unit test case
