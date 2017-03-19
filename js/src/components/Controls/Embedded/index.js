/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';

class Embedded extends Component {

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
  }

  addEmbeddedLink: Function = (embeddedLink, height, width): void => {
    const { editorState, onChange } = this.props;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('EMBEDDED_LINK', 'MUTABLE', { src: embeddedLink, height, width })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.closeModal();
  };

  showHideModal: Function = (): void => {
    this.setState({
      showModal: this.signalShowModal,
      embeddedLink: undefined,
    });
    this.signalShowModal = false;
  }

  closeModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  }

  render(): Object {
    const { config } = this.props;
    const { showModal } = this.state
    const EmbeddedComponent = config.component || LayoutComponent;
    return (
      <EmbeddedComponent
        config={config}
        onChange={this.addEmbeddedLink}
        expanded={showModal}
        onExpand={this.onOptionClick}
        onCollpase={this.closeModal}
      />
    );
  }
}

export default Embedded;

// todo: make default heights configurable
