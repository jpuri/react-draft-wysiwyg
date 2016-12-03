/* @flow */

import React, { Component, PropTypes } from 'react';
import { Modifier, EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
import ModalHandler from '../../modal-handler/modals';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class EmojiControl extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  };

  state: Object = {
    showModal: false,
  };

  componentWillMount(): void {
    ModalHandler.registerCallBack(this.closeModal);
  }

  emojis: Array<string> = ['😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌',
    '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊',
    '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
    '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇',
    '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶',
    '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
    '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉',
    '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷',
    '💰', '🖊', '📅', '✅', '❎', '💯'];

  addEmoji: Function = (event: Object): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `${event.target.innerHTML} `,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    this.toggleModal();
  };

  toggleModal: Function = (): void => {
    const showModal = !this.state.prevShowModal;
    this.setState({
      prevShowModal: showModal,
      showModal,
    });
  };

  closeModal: Function = (): void => {
    const { showModal } = this.state;
    this.setState({
      prevShowModal: showModal,
      showModal: false,
    });
  }

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName } } = this.props;
    return (
      <div
        className={classNames('rdw-emoji-modal', popupClassName)}
        onMouseDown={this.stopPropagation}
      >
        {
          this.emojis.map((emoji, index) => (<span
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
      <div className="rdw-emoji-wrapper">
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
        {showModal ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}

// todo: unit test cases
