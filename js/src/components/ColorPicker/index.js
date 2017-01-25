/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  //colors as defaultColors,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import Option from '../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const defaultColors = ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
    'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
    'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
    'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
    'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
    'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'];

export default class ColorPicker extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    currentColor: undefined,
    currentBgColor: undefined,
    showModal: false,
    currentStyle: 'color',
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentColor: getSelectionCustomInlineStyle(editorState, ['COLOR']).COLOR,
        currentBgColor: getSelectionCustomInlineStyle(editorState, ['BGCOLOR']).BGCOLOR,
      });
    }
    modalHandler.registerCallBack(this.showHideModal);
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

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.showHideModal);
  }

  onOptionClick: Function = (): void => {
    this.signalShowModal = !this.state.showModal;
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

  showHideModal: Function = (): void => {
    this.setState({
      showModal: this.signalShowModal,
    });
    this.signalShowModal = false;
  }

  toggleColor: Function = (color: string): void => {

    const { editorState, onChange } = this.props;
    const { currentStyle } = this.state;
    const newState = toggleCustomInlineStyle(
      editorState,
      currentStyle,
      `${currentStyle}-${color}`
    );
    if (newState) {
      onChange(newState);
    }
  };

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  renderModal: Function = (): Object => {
    const { config: { popupClassName, colors } } = this.props;
    const { currentColor, currentBgColor, currentStyle } = this.state;
    const currentSelectedColor = (currentStyle === 'color') ? currentColor : currentBgColor;
    return (
      <div
        className={classNames('rdw-colorpicker-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <span className="rdw-colorpicker-modal-header">
          <span
            className={classNames(
              'rdw-colorpicker-modal-style-label',
              { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'color' }
            )}
            onClick={this.setCurrentStyleColor}
          >
            Text
          </span>
          <span
            className={classNames(
              'rdw-colorpicker-modal-style-label',
              { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'bgcolor' }
            )}
            onClick={this.setCurrentStyleBgcolor}
          >
            Background
          </span>
        </span>
        <ColorPickerModalOptions
            colors={colors}
            currentSelectedColor={currentSelectedColor}
            currentStyle={currentStyle}
            onClick={this.toggleColor}
        />
      </div>
    );
  };

  render(): Object {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-colorpicker-wrapper"
        aria-haspopup="true"
        aria-expanded={showModal}
        aria-label="rdw-color-picker"
      >
        <Option
          onClick={this.onOptionClick}
          className={classNames(className)}
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

const ColorPickerModalOptions = ({ colors, currentSelectedColor, currentStyle, onClick }) => {

  let optionNodes =
      defaultColors.map((rgb, index) => {
        return <ColorPickerModalOption
            value={rgb}
            key={index}
            active={currentSelectedColor === `${currentStyle}-${rgb}`}
            onClick={onClick}
        />
      })

  if (colors) {

    optionNodes = [];

    for (var name in colors) {
      const rgb = colors[name];
      optionNodes.push(
          <ColorPickerModalOption
              rgb={rgb}
              value={name}
              key={name}
              active={currentSelectedColor === `${currentStyle}-${rgb}`}
              onClick={onClick}
          />
      )
    }

  }

  return (<span className="rdw-colorpicker-modal-options">{optionNodes}</span>)

}

const ColorPickerModalOption = ({rgb, value, name, active, onClick}) => {

  return (
    <Option
        value={value}
        key={`color-picker-option-${name}`}
        className="rdw-colorpicker-option"
        activeClassName="rdw-colorpicker-option-active"
        active={active}
        onClick={onClick}
    >
      <span
          style={{ backgroundColor: rgb }}
          className="rdw-colorpicker-cube"
      />
    </Option>
  )

}
