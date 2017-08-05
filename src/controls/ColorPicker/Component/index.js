/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    currentStyle: 'color',
  };

  componentWillReceiveProps(props) {
    if (!this.props.expanded && props.expanded) {
      this.setState({
        currentStyle: 'color',
      });
    }
  }

  onChange: Function = (color: string): void => {
    const { onChange } = this.props;
    const { currentStyle } = this.state;
    onChange(currentStyle, color);
  }

  setCurrentStyleColor: Function = (): void => {
    this.setState({
      currentStyle: 'color',
    });
  };

  setCurrentStyleBgcolor: Function = (): void => {
    this.setState({
      currentStyle: 'bgcolor',
    });
  };

  renderModal: Function = (): Object => {
    const {
      config: { popupClassName, colors },
      currentState: { color, bgColor },
      translations,
    } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = (currentStyle === 'color') ? color : bgColor;
    return (
      <div
        className={classNames('rdw-colorpicker-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="rdw-colorpicker-modal-header">
          <span
            className={classNames(
              'rdw-colorpicker-modal-style-label',
              { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'color' },
            )}
            onClick={this.setCurrentStyleColor}
          >
            {translations['components.controls.colorpicker.text']}
          </span>
          <span
            className={classNames(
              'rdw-colorpicker-modal-style-label',
              { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'bgcolor' },
            )}
            onClick={this.setCurrentStyleBgcolor}
          >
            {translations['components.controls.colorpicker.background']}
          </span>
        </span>
        <span className="rdw-colorpicker-modal-options">
          {
            colors.map((c, index) =>
              (<Option
                value={c}
                key={index}
                className="rdw-colorpicker-option"
                activeClassName="rdw-colorpicker-option-active"
                active={currentSelectedColor === c}
                onClick={this.onChange}
              >
                <span
                  style={{ backgroundColor: c }}
                  className="rdw-colorpicker-cube"
                />
              </Option>))
          }
        </span>
      </div>
    );
  };

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-colorpicker-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
        title={title || translations['components.controls.colorpicker.colorpicker']}
      >
        <Option
          onClick={onExpandEvent}
          className={classNames(className)}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
