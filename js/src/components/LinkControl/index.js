/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, RichUtils, EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';
import Option from '../Option';
import link from '../../../../images/link.svg';
import unlink from '../../../../images/unlink.svg';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class LinkControl extends Component {

  static propTypes = {
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state: Object = {
    showModal: false,
    linkTarget: '',
    linkTitle: '',
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState),
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    const newState = {};
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      newState.currentEntity = getSelectionEntity(properties.editorState);
    }
    if (properties.hideModal && this.state.showModal) {
      newState.showModal = false;
    }
    this.setState(newState);
  }

  toggleLinkModal: Function = (): void => {
    const { editorState } = this.props;
    const { showModal, currentEntity } = this.state;
    const newState = {};
    newState.showModal = !showModal;
    if (newState.showModal) {
      newState.entity = currentEntity;
      const entityRange = currentEntity && getEntityRange(editorState, currentEntity);
      newState.linkTarget = currentEntity && Entity.get(currentEntity).get('data').url;
      newState.linkTitle = (entityRange && entityRange.text) ||
        getSelectionText(editorState);
    }
    this.setState(newState);
  };

  updateLinkTitle: Function = (event: Object): void => {
    this.setState({
      linkTitle: event.target.value,
    });
  };

  updateLinkTarget: Function = (event: Object): void => {
    this.setState({
      linkTarget: event.target.value,
    });
  };

  addLink: Function = (): void => {
    const { editorState, onChange } = this.props;
    const { linkTitle, linkTarget, currentEntity } = this.state;
    let selection = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
    }
    const entityKey = Entity.create('LINK', 'MUTABLE', {
      title: linkTitle,
      url: linkTarget,
    });
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'), true);
    this.toggleLinkModal();
  };

  removeLink: Function = (): void => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();
    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
      onChange(RichUtils.toggleLink(editorState, selection, null), true);
    }
  };

  stopPropagation: Function = (event) => {
    event.stopPropagation();
  };

  renderAddLinkModal() {
    const { linkTitle, linkTarget } = this.state;
    return (
      <div
        className="link-modal"
        onClick={this.stopPropagation}
      >
        <span className="link-modal-label">Link Title</span>
        <input
          className="link-modal-input"
          onChange={this.updateLinkTitle}
          onBlur={this.updateLinkTitle}
          value={linkTitle}
        />
        <span className="link-modal-label">Link Target</span>
        <input
          className="link-modal-input"
          onChange={this.updateLinkTarget}
          onBlur={this.updateLinkTarget}
          value={linkTarget}
        />
        <span className="link-modal-buttonsection">
          <button
            className="link-modal-btn"
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}
          >
            Add
          </button>
          <button
            className="link-modal-btn"
            onClick={this.toggleLinkModal}
          >
            Cancel
          </button>
        </span>
      </div>
    );
  }

  render(): Object {
    const { showModal, currentEntity } = this.state;
    return (
      <div className="link-wrapper">
        <Option
          value="unordered-list-item"
          onClick={this.toggleLinkModal}
        >
          <img
            src={link}
            role="presentation"
            className="link-icon"
          />
        </Option>
        <Option
          disabled={!currentEntity}
          value="ordered-list-item"
          onClick={this.removeLink}
        >
          <img
            src={unlink}
            role="presentation"
            className="link-icon"
          />
        </Option>
        {showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }
}
