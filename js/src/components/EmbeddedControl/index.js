/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
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
  };

  addEmbeddedLink: Function = (event: Object, embeddedLink: string): void => {
    const { editorState, onChange } = this.props;
    const link = this.state.embeddedLink || embeddedLink;
    const entityKey = Entity.create('EMBEDDED_LINK', 'MUTABLE', { link });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.toggleModal();
  };

  toggleModal: Function = (): void => {
    const { showModal } = this.state;
    const newState = {};
    newState.showModal = !showModal;
    newState.embeddedLink = undefined;
    this.setState(newState);
  };

  updateEmbeddedLink: Function = (event: Object): void => {
    this.setState({
      embeddedLink: event.target.value,
    });
  };

  setURLInputReference: Function = (ref: Object): void => {
    this.urlInput = ref;
  };

  focusURLInput: Function = (event): Object => {
    this.urlInput.focus();
  }

  stopPropagation: Function = (event: Object): void => {
    event.stopPropagation();
  };

  rendeEmbeddedLinkModal(): Object {
    const { embeddedLink } = this.state;
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
            onMouseDown={this.focusURLInput}
          />
        </div>
        <span className="rdw-embedded-modal-btn-section">
          <button
            className="rdw-embedded-modal-btn"
            onClick={this.addEmbeddedLink}
            disabled={!embeddedLink}
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
