/* @flow */

import React, { Component, PropTypes } from 'react';
import { Modifier, EditorState } from 'draft-js';

import LayoutComponent from './Component';

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

  addEmoji: Function = (emoji: string): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      emoji,
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

  render(): Object {
    const { config } = this.props;
    const { showModal } = this.state
    const EmojiComponent = config.component || LayoutComponent;
    return (
      <EmojiComponent
        config={config}
        onChange={this.addEmoji}
        expanded={showModal}
        onExpand={this.onOptionClick}
        onCollpase={this.closeModal}
      />
    );
  }
}

// todo: unit test cases
