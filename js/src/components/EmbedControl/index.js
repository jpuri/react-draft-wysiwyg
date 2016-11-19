/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import Option from '../Option';
import Spinner from '../Spinner';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class EmbedControl extends Component {
  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  };

  state: Object = {
    embedSrc: '',
    showModal: false,
    showEmbedLoading: false,
  };

  toggleModal: Function = (): void => {
    const { showModal } = this.state;
    const newState = {};
    newState.showModal = !showModal;
    newState.embedSrc = undefined;
    this.setState(newState);
  };

  updateEmbedSrc: Function = (event: Object): void => {
    this.setState({
      embedSrc: event.target.value,
    });
  };

  addEmbedURL: Function = (url: string): void => {
    const { editorState, onChange } = this.props;
    const src = this.state.embedSrc || url;
    const entityKey = Entity.create('EMBED', 'IMMUTABLE', {src});
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      'E'
    );
    onChange(newEditorState);
    this.toggleModal();
  };

  stopPropagation: Function = (event: Object): void => {
    event.stopPropagation();
  };

  renderAddEmbedModal(): Object {
    const { embedSrc, showEmbedLoading } = this.state;
    return (
      <div
        className="embed-modal"
        onClick={this.stopPropagation}
      >
        <div className="embed-modal-header">
          <span
            className="embed-modal-header-option"
          >
            <span>URL</span>
            <span
              className="embed-modal-header-label"
            />
          </span>
        </div>
        <div className="embed-modal-url-section">
          <input
            className="embed-modal-url-input"
            placeholder="Enter url"
            onChange={this.updateEmbedSrc}
            onBlur={this.updateEmbedSrc}
            value={embedSrc}
          />
        </div>
        <span className="embed-modal-btn-section">
          <button
            className="embed-modal-btn"
            onClick={this.addEmbedURL}
            disabled={!embedSrc}
          >
            Add
          </button>
          <button
            className="embed-modal-btn"
            onClick={this.toggleModal}
          >
            Cancel
          </button>
        </span>
        {showEmbedLoading ?
          <div className="embed-modal-spinner">
            <Spinner />
          </div> :
          undefined}
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div>
        <Option
          onClick={this.toggleModal}
        >
          <img
            className={className}
            src={icon}
            role="presentation"
          />
        </Option>
        {showModal ? this.renderAddEmbedModal() : undefined}
      </div>
    );
  }
}

// todo: unit test cases
