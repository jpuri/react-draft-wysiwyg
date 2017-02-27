/* @flow */

import React, { Component, PropTypes } from 'react';
import { Modifier, EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Emoji extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    showModal: false,
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
  };

  addEmoji: Function = (event: Object): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `${event.target.innerHTML} `,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    this.hideModal();
  };

  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };

  showHideModal: Function = (): void => {
    this.setState({
      showModal: this.signalShowModal,
    });
    this.signalShowModal = false;
  }

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName, emojis } } = this.props;
    return (
      <div
        className={classNames('rdw-emoji-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        {
          emojis.map((emoji, index) => (<span
            key={index}
            className="rdw-emoji-icon"
            role="presentation"
            onClick={this.addEmoji}
          >{emoji}</span>))
        }
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-emoji-wrapper"
        aria-haspopup="true"
        aria-label="rdw-emoji-control"
        aria-expanded={showModal}
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
        {showModal ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}

// todo: unit test cases
