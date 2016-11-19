/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  colors,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import Option from '../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class ColorPicker extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  state: Object = {
    currentColor: undefined,
    currentBgColor: undefined,
    showModal: false,
    currentStyle: 'color',
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentColor: getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR,
        currentBgColor: getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR,
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    const newState = {};
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      newState.currentColor
        = getSelectionCustomInlineStyle(properties.editorState, ['COLOR']).COLOR;
      newState.currentBgColor
        = getSelectionCustomInlineStyle(properties.editorState, ['BGCOLOR']).BGCOLOR;
    }
    this.setState(newState);
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

  toggleColor: Function = (color: string): void => {
    const { editorState, onChange } = this.props;
    const { currentStyle } = this.state;
    const newState = toggleCustomInlineStyle(
      editorState,
      currentStyle,
      `${currentStyle}-${color}`
    );
    if (newState) {
      onChange(newState, true);
    }
  };

  toggleModal: Function = (): void => {
    const showModal = !this.state.showModal;
    this.setState({
      showModal,
    });
  };

  stopPropagation: Function = (event: Object): void => {
    event.stopPropagation();
  };

  renderModal: Function = (): Object => {
    const { config: { popupClassName } } = this.props;
    const { currentColor, currentBgColor, currentStyle } = this.state;
    const currentSelectedColor = (currentStyle === 'color') ? currentColor : currentBgColor;
    return (
      <div
        className={`colorpicker-modal ${popupClassName}`}
        onClick={this.stopPropagation}
      >
        <span className="colorpicker-modal-header">
          <span
            className={classNames(
              'colorpicker-modal-style-label',
              { 'colorpicker-modal-style-label-active': currentStyle === 'color' }
            )}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames(
              'colorpicker-modal-style-label',
              { 'colorpicker-modal-style-label-active': currentStyle === 'bgcolor' }
            )}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <span className="colorpicker-modal-options">
          {
            colors.map((color, index) =>
              <Option
                value={color}
                key={index}
                className="colorpicker-option"
                activeClassName="colorpicker-option-active"
                active={currentSelectedColor === `${currentStyle}-${color}`}
                onClick={this.toggleColor}
              >
                <span
                  style={{ backgroundColor: color }}
                  className="colorpicker-cube"
                />
              </Option>)
          }
        </span>
      </div>
    );
  };

  render(): Object {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div className="colorpicker-wrapper">
        <Option
          onClick={this.toggleModal}
          className={className}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
        {showModal ? this.renderModal() : undefined}
      </div>
    );
  }
}
