/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Embedded extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    embeddedLink: '',
    showModal: false,
    height: 'auto',
    width: '100%',
  };

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.showHideModal);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.showHideModal);
  }

  onOptionClick: Function = (): void => {
    this.signalShowModal = !this.state.showModal;
  }

  setURLInputReference: Function = (ref: Object): void => {
    this.urlInput = ref;
  };

  setHeightInputReference: Function = (ref: Object): void => {
    this.heightInput = ref;
  };

  setWidthInputReference: Function = (ref: Object): void => {
    this.widthInput = ref;
  };

  updateEmbeddedLink: Function = (event: Object): void => {
    this.setState({
      embeddedLink: event.target.value,
    });
  };

  updateHeight: Function = (event: Object): void => {
    this.setState({
      height: event.target.value,
    });
  };

  updateWidth: Function = (event: Object): void => {
    this.setState({
      width: event.target.value,
    });
  };

  addEmbeddedLink: Function = (): void => {
    const { editorState, onChange } = this.props;
    const { embeddedLink, height, width } = this.state;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('EMBEDDED_LINK', 'MUTABLE', { src: embeddedLink, height, width })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.closeModal();
  };

  showHideModal: Function = (): void => {
    this.setState({
      showModal: this.signalShowModal,
      embeddedLink: undefined,
    });
    this.signalShowModal = false;
  }

  closeModal: Function = (): void => {
    this.setState({
      showModal: false,
      embeddedLink: undefined,
    });
  };

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  rendeEmbeddedLinkModal(): Object {
    const { embeddedLink, height, width } = this.state;
    const { config: { popupClassName } } = this.props;
    return (
      <div
        className={classNames('rdw-embedded-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <div className="rdw-embedded-modal-header">
          <span className="rdw-embedded-modal-header-option">
            <span>Embedded Link</span>
            <span className="rdw-embedded-modal-header-label" />
          </span>
        </div>
        <div className="rdw-embedded-modal-link-section">
          <input
            ref={this.setURLInputReference}
            className="rdw-embedded-modal-link-input"
            placeholder="Enter link"
            onChange={this.updateEmbeddedLink}
            onBlur={this.updateEmbeddedLink}
            value={embeddedLink}
          />
          <div className="rdw-embedded-modal-size">
            <input
              ref={this.setHeightInputReference}
              onChange={this.updateHeight}
              onBlur={this.updateHeight}
              value={height}
              className="rdw-embedded-modal-size-input"
              placeholder="Height"
            />
            <input
              ref={this.setWidthInputReference}
              onChange={this.updateWidth}
              onBlur={this.updateWidth}
              value={width}
              className="rdw-embedded-modal-size-input"
              placeholder="Width"
            />
          </div>
        </div>
        <span className="rdw-embedded-modal-btn-section">
          <button
            className="rdw-embedded-modal-btn"
            onClick={this.addEmbeddedLink}
            disabled={!embeddedLink || !height || !width}
          >
            Add
          </button>
          <button
            className="rdw-embedded-modal-btn"
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </span>
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-embedded-wrapper"
        aria-haspopup="true"
        aria-expanded={showModal}
        aria-label="rdw-embedded-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={this.onOptionClick}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
        {showModal ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}
