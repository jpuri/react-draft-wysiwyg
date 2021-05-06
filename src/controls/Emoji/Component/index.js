/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';
import { Grow, Paper } from '@material-ui/core';

class LayoutComponent extends Component {
  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName, emojis }, expanded } = this.props;
    return (
      <Grow in={expanded}>
        <Paper 
          elevation={4}
          className={classNames('rdw-emoji-modal', popupClassName)}
          onClick={stopPropagation}
        >
          {
            emojis.map((emoji, index) => (<span
              key={index}
              className="rdw-emoji-icon"
              alt=""
              onClick={this.onChange}
            >{emoji}</span>))
          }
        </Paper>
      </Grow>
    );
  }

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-emoji-wrapper"
        aria-haspopup="true"
        aria-label="rdw-emoji-control"
        aria-expanded={expanded}
        title={title || translations['components.controls.emoji.emoji']}
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.emoji.emoji']}
        >
          {/* <img
            src={icon}
            alt=""
          /> */}
          {
            icon
          }
        </Option>
        {this.renderEmojiModal()}
      </div>
    );
  }
}

export default LayoutComponent;
