/* @flow */

import React, { Component, PropTypes } from 'react';
import { Modifier, EditorState } from 'draft-js';
import Option from '../Option';
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

  emojis: Array<string> = ['😀', '😁', '😂', '😃', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '🤗', '🤔', '😣', '😫', '😴', '😌',
    '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '👦', '👧', '👨', '👩', '👶',
    '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙎', '🙅', '🙆', '💁', '🙋', '🙇', '💆', '🚶', '🏃', '💃', '👯', '🕴', '🗣',
    '👤', '👥', '🏇', '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '🚵', '🏎', '🏍', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇',
    '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👋', '👏', '🙌', '🙏', '👂', '👣', '👀', '👁', '💋', '💘', '💟', '💣', '💥', '🐵', '🐶',
    '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🌰', '🍞', '🍔', '🍟', '🍤', '🍨', '🍪', '🎂', '🍰', '🍵', '🍶', '🍾', '🍷', '🍸',
    '🍺', '🍻', '🍽', '🍴', '🌍', '🚌', '🚑', '🚒', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '💧', '🎄', '🎈', '🎉',
    '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎤', '🎧', '📻', '🎷', '🎸', '🎹', '📱', '💻', '🖥', '🖨', '📀', '🔍',
    '🕯', '📔', '💰', '💵', '💶', '💷', '📪', '🖊', '📅', '📊', '🔒', '🔓', '🔐', '🔑', '🔨', '🛠', '💉', '💊', '⛔', '⬆', '⬇', '⬅', '🔆',
    '✅', '❎', '💯', '🆗', '🚩', '🎌', '🏴', '🏳'];

  addEmoji: Function = (event: Object): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      `${event.target.innerHTML} `,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'), true);
    this.toggleModal();
  };

  toggleModal: Function = (): void => {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
    });
  };

  stopPropagation: Function = (event: Object): void => {
    event.stopPropagation();
  };

  renderEmojiModal(): Object {
    const { config: { popupClassName } } = this.props;
    return (
      <div
        className={`emoji-modal ${popupClassName}`}
        onClick={this.stopPropagation}
      >
        {
          this.emojis.map((emoji, index) => (<span
            key={index}
            className="emoji-icon"
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
      <div className="emoji-wrapper">
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
        {showModal ? this.renderEmojiModal() : undefined}
      </div>
    );
  }
}

// todo: unit test cases
