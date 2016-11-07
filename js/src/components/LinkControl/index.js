/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, RichUtils, EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';
import { getFirstIcon } from '../../Utils/toolbar';
import Option from '../Option';
import { Dropdown, DropdownOption } from '../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class LinkControl extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
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

  hideLinkModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
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

  renderInFlatList(showModal: bool, currentEntity: Object, config: Object): Object {
    const { options, link, unlink, className } = config;
    return (
      <div className={`link-wrapper ${className}`}>
        {options.indexOf('link') >= 0 && <Option
          value="unordered-list-item"
          className={link.className}
          onClick={this.toggleLinkModal}
        >
          <img
            src={link.icon}
            role="presentation"
          />
        </Option>}
        {options.indexOf('unlink') >= 0 && <Option
          disabled={!currentEntity}
          value="ordered-list-item"
          className={unlink.className}
          onClick={this.removeLink}
        >
          <img
            src={unlink.icon}
            role="presentation"
          />
        </Option>}
        {showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  renderInDropDown(showModal: bool, currentEntity: Object, config: Object): Object {
    const { options, link, unlink, className } = config;
    return (
      <div className={`link-wrapper ${className}`} onClick={this.hideLinkModal}>
        <Dropdown
          className="link-dropdown"
          onChange={this.toggleInlineStyle}
        >
          <img
            src={getFirstIcon(config)}
            role="presentation"
          />
          {options.indexOf('link') >= 0 && <DropdownOption
            onClick={this.toggleLinkModal}
            className={`link-dropdownoption ${link.className}`}
          >
            <img
              src={link.icon}
              role="presentation"
            />
          </DropdownOption>}
          {options.indexOf('unlink') >= 0 && <DropdownOption
            onClick={this.removeLink}
            disabled={!currentEntity}
            className={`link-dropdownoption ${unlink.className}`}
          >
            <img
              src={unlink.icon}
              role="presentation"
            />
          </DropdownOption>}
        </Dropdown>
        {showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  render(): Object {
    const { config } = this.props;
    const { showModal, currentEntity } = this.state;
    if (config.inDropdown) {
      return this.renderInDropDown(showModal, currentEntity, config);
    }
    return this.renderInFlatList(showModal, currentEntity, config);
  }

}
