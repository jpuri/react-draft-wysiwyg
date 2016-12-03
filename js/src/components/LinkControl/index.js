/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, RichUtils, EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';
import classNames from 'classnames';
import { getFirstIcon } from '../../utils/toolbar';
import Option from '../Option';
import { Dropdown, DropdownOption } from '../Dropdown';
import ModalHandler from '../../modal-handler/modals';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class LinkControl extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  };

  state: Object = {
    showModal: false,
    prevShowModal: false,
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
    ModalHandler.registerCallBack(this.closeModal);
  }

  componentWillReceiveProps(properties: Object): void {
    const newState = {};
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      newState.currentEntity = getSelectionEntity(properties.editorState);
    }
    this.setState(newState);
  }

  setLinkTextReference: Function = (ref: Object): void => {
    this.linkText = ref;
  };

  setLinkTitleReference: Function = (ref: Object): void => {
    this.linkTitle = ref;
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
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
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

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // insert a blank space after link
    selection = newEditorState.getSelection().merge({
      anchorOffset: selection.get('anchorOffset') + linkTitle.length,
      focusOffset: selection.get('anchorOffset') + linkTitle.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, selection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined
    );
    onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));

    this.toggleLinkModal();
  };

  updateLinkTarget: Function = (event: Object): void => {
    this.setState({
      linkTarget: event.target.value,
    });
  };

  updateLinkTitle: Function = (event: Object): void => {
    this.setState({
      linkTitle: event.target.value,
    });
  };

  toggleLinkModal: Function = (): void => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const showModal = !this.state.prevShowModal;
    const newState = {};
    newState.prevShowModal = showModal;
    newState.showModal = showModal;
    if (newState.showModal) {
      newState.entity = currentEntity;
      const entityRange = currentEntity && getEntityRange(editorState, currentEntity);
      newState.linkTarget = currentEntity && Entity.get(currentEntity).get('data').url;
      newState.linkTitle = (entityRange && entityRange.text) ||
        getSelectionText(editorState);
    }
    this.setState(newState);
  };

  closeModal: Function = (): void => {
    const { showModal } = this.state;
    this.setState({
      prevShowModal: showModal,
      showModal: false,
    });
  }

  focusLinkTitle: Function = (): void => {
    this.linkTitle.focus();
  }

  focusLinkText: Function = (): void => {
    this.linkText.focus();
  }

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  renderAddLinkModal() {
    const { config: { popupClassName } } = this.props;
    const { linkTitle, linkTarget } = this.state;
    return (
      <div
        className={classNames('rdw-link-modal', popupClassName)}
        onMouseDown={this.stopPropagation}
      >
        <span className="rdw-link-modal-label">Link Title</span>
        <input
          ref={this.setLinkTitleReference}
          className="rdw-link-modal-input"
          onChange={this.updateLinkTitle}
          onBlur={this.updateLinkTitle}
          value={linkTitle}
          onMouseDown={this.focusLinkTitle}
        />
        <span className="rdw-link-modal-label">Link Target</span>
        <input
          ref={this.setLinkTextReference}
          className="rdw-link-modal-input"
          onChange={this.updateLinkTarget}
          onBlur={this.updateLinkTarget}
          value={linkTarget}
          onMouseDown={this.focusLinkText}
        />
        <span className="rdw-link-modal-buttonsection">
          <button
            className="rdw-link-modal-btn"
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}
          >
            Add
          </button>
          <button
            className="rdw-link-modal-btn"
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
      <div className={classNames('rdw-link-wrapper', className)}>
        {options.indexOf('link') >= 0 && <Option
          value="unordered-list-item"
          className={classNames(link.className)}
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
          className={classNames(unlink.className)}
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
      <div className="rdw-link-wrapper">
        <Dropdown
          className={classNames('rdw-link-dropdown', className)}
          onChange={this.toggleInlineStyle}
        >
          <img
            src={getFirstIcon(config)}
            role="presentation"
          />
          {options.indexOf('link') >= 0 && <DropdownOption
            onClick={this.toggleLinkModal}
            className={classNames('rdw-link-dropdownoption', link.className)}
          >
            <img
              src={link.icon}
              role="presentation"
            />
          </DropdownOption>}
          {options.indexOf('unlink') >= 0 && <DropdownOption
            onClick={this.removeLink}
            disabled={!currentEntity}
            className={classNames('rdw-link-dropdownoption', unlink.className)}
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
