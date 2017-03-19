/* @flow */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { stopPropagation } from '../../../../utils/common';
import Option from '../../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class LayoutComponent extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    onExpand: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentColor: PropTypes.string,
    currentBgColor: PropTypes.string,
  };

  state: Object = {
    currentStyle: 'color',
  };

  setCurrentStyleBgcolor: Function = (): void => {
    this.setState({
      currentStyle: 'bgcolor',
    });
  };

  setCurrentStyleColor: Function = (): void => {
    this.setState({
      currentStyle: 'color',
    });
  };

  onChange: Function = (color: string): void => {
    const { onChange } = this.props;
    const { currentStyle } = this.state;
    onChange(currentStyle, color);
  }

  renderModal: Function = (): Object => {
    const { config: { popupClassName, colors }, currentColor, currentBgColor } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = (currentStyle === 'color') ? currentColor : currentBgColor;
    return (
      <div
        className={classNames('rdw-colorpicker-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="rdw-colorpicker-modal-header">
          <span
            className={classNames(
              'rdw-colorpicker-modal-style-label',
              { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'color' }
            )}
            onClick={this.setCurrentStyleColor}
          >
            <FormattedMessage id="components.controls.colorpicker.text" />
          </span>
          <span
            className={classNames(
              'rdw-colorpicker-modal-style-label',
              { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'bgcolor' }
            )}
            onClick={this.setCurrentStyleBgcolor}
          >
            <FormattedMessage id="components.controls.colorpicker.background" />
          </span>
        </span>
        <span className="rdw-colorpicker-modal-options">
          {
            colors.map((color, index) =>
              <Option
                value={color}
                key={index}
                className="rdw-colorpicker-option"
                activeClassName="rdw-colorpicker-option-active"
                active={currentSelectedColor === `${currentStyle}-${color}`}
                onClick={this.onChange}
              >
                <span
                  style={{ backgroundColor: color }}
                  className="rdw-colorpicker-cube"
                />
              </Option>)
          }
        </span>
      </div>
    );
  };

  render(): Object {
    const { config: { icon, className }, expanded, onExpand } = this.props;
    return (
      <div
        className="rdw-colorpicker-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
      >
        <Option
          onClick={onExpand}
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