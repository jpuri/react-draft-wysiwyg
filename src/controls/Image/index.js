import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';

class ImageControl extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
    inDropdown: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    //modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount() {
    //const { modalHandler } = this.props;
    //modalHandler.deregisterCallBack(this.expandCollapse);
  }

  addImage = (src, height, width, alt) => {
    const { editorState, onChange, config } = this.props;
    const entityData = { src, height, width };
    if (config.alt) {
      entityData.alt = alt;
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', entityData)
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
  };

  render() {
    const { config, inDropdown } = this.props;

    return (
      <LayoutComponent
        config={config}
        inDropdown={inDropdown}
        onChange={this.addImage}
      />
    );
  }
}

export default ImageControl;
