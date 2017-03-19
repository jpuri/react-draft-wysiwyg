/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';

class ImageControl extends Component {

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

  showHideModal: Function = (): void => {
    this.setState({
      showModal: this.signalShowModal,
    });
    this.signalShowModal = false;
  }

  closeModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };

  addImage: Function = (src: string, height: string, width: string): void => {
    const { editorState, onChange } = this.props;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', { src, height, width })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.closeModal();
  };

  render(): Object {
    const { config } = this.props;
    const { showModal } = this.state
    const ImageComponent = config.component || LayoutComponent;
    return (
      <ImageComponent
        config={config}
        onChange={this.addImage}
        expanded={showModal}
        onExpand={this.onOptionClick}
        onCollpase={this.closeModal}
      />
    );
  }
}

export default ImageControl;
