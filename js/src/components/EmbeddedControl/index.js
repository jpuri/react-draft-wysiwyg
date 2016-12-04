/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
import ModalHandler from '../../modal-handler/modals';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class EmbeddedControl extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  };

  state: Object = {
    embeddedLink: '',
    showModal: false,
    prevShowModal: false,
    height: 'auto',
    width: '100%',
  };

  componentWillMount(): void {
    ModalHandler.registerCallBack(this.closeModal);
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
    const entityKey = Entity.create('EMBEDDED_LINK', 'MUTABLE', { link: embeddedLink, height, width });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.toggleModal();
  };

  closeModal: Function = (): void => {
    const { showModal } = this.state;
    this.setState({
      prevShowModal: showModal,
      showModal: false,
    });
  }

  toggleModal: Function = (): void => {
    const showModal = !this.state.prevShowModal;
    const newState = {};
    newState.prevShowModal = showModal;
    newState.showModal = showModal;
    newState.embeddedLink = undefined;
    this.setState(newState);
  };

  focusURLInput: Function = (): Object => {
    this.urlInput.focus();
  }

  focusHeightInput: Function = (): Object => {
    this.heightInput.focus();
  }

  focusWidthInput: Function = (): Object => {
    this.widthInput.focus();
  }

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
        onMouseDown={this.stopPropagation}
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
            onMouseDown={this.focusURLInput}
          />
          <div className="rdw-embedded-modal-size">
            <input
              ref={this.setHeightInputReference}
              onChange={this.updateHeight}
              onBlur={this.updateHeight}
              onMouseDown={this.focusHeightInput}
              value={height}
              className="rdw-embedded-modal-size-input"
              placeholder="Height"
            />
            <input
              ref={this.setWidthInputReference}
              onChange={this.updateWidth}
              onBlur={this.updateWidth}
              onMouseDown={this.focusWidthInput}
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
            onClick={this.toggleModal}
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
      <div className="rdw-embedded-wrapper">
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={this.toggleModal}
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
