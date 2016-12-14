/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState, Modifier } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';

import createCounterPlugin from 'draft-js-counter-plugin';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const counterPlugin = createCounterPlugin();

export default class CounterControl extends Component {
  
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };
  
  render(): Object {
    const { config: { icon, className } } = this.props;
    return (
      <div className="rdw-remove-wrapper">
        <Option
          className={classNames(className)}
          onClick={console.log('click')}
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

class CharCounter extends Component {
  static propTypes = {
    limit: PropTypes.i,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };
  
  render(): Object {
    const { CharCounter } = counterPlugin;
    return (CharCounter);
  }
}

// todo: add unit test case
