/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';

class ImageControl extends Component {
  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    expanded: false,
  };

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  addImage: Function = (src: string, height: string, width: string, alt: string): void => {
    const { editorState, onChange, config } = this.props;
    const entityData = { src, height, width };
    if (config.alt.present) {
      entityData.alt = alt;
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', entityData)
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' ',
    );
    onChange(newEditorState);
    this.doCollapse();
  };

  render(): Object {
    const { config, translations } = this.props;
    const { expanded } = this.state;
    const ImageComponent = config.component || LayoutComponent;
    return (
      <ImageComponent
        config={config}
        translations={translations}
        onChange={this.addImage}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default ImageControl;
