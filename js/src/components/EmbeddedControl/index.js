/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
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
    const link =  this.state.embeddedLink || embeddedLink;
    console.log(event, embeddedLink, this.state.embeddedLink);
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

  stopPropagation: Function = (event: Object): void => {
    event.stopPropagation();
  };

  rendeEmbeddedLinkModal(): Object {
    const { embeddedLink } = this.state;
    const { config: { popupClassName } } = this.props;
    return (
      <div
        className={`embedded-modal ${popupClassName}`}
        onClick={this.stopPropagation}
      >
        <div className="embedded-modal-header">
          <span className="embedded-modal-header-option">
            <span>Embedded Link</span>
            <span className="embedded-modal-header-label" />
          </span>
        </div>
        <div className="embedded-modal-link-section">
          <input
            className="embedded-modal-link-input"
            placeholder="Enter link"
            onChange={this.updateEmbeddedLink}
            onBlur={this.updateEmbeddedLink}
            value={embeddedLink}
          />
        </div>
        <span className="embedded-modal-btn-section">
          <button
            className="embedded-modal-btn"
            onClick={this.addEmbeddedLink}
            disabled={!embeddedLink}
          >
            Add
          </button>
          <button
            className="embedded-modal-btn"
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
      <div className="embedded-wrapper">
        <Option
          className={className}
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
