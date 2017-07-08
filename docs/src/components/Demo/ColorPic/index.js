/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BlockPicker } from 'react-color';

import icon from '../../../icons/palette.svg';
import './styles.css';

class ColorPic extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color.hex);
  }

  renderModal = () => {
    const { color } = this.props.currentState;
    return (
      <div
        className="demo-color-modal"
        onClick={this.stopPropagation}
      >
        <BlockPicker color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        className="demo-color-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
      >
        <div
          onClick={onExpandEvent}
          className="demo-icon-wrapper"
        >
          <img
            className="demo-icon"
            src={icon}
            alt=""
          />
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default ColorPic;
