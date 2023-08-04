import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';

import LayoutComponent from './Component';

class ImageControl extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    const { modalHandler } = this.props;

    if (this.registerCallBack) {
      modalHandler.registerCallBack(this.expandCollapse);
    }
    this.registerCallBack = true;
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent = () => {
    this.signalExpanded = !this.state.expanded;
    this.setState({
      expanded: this.signalExpanded,
    });
  };

  expandCollapse = () => {
    this.signalExpanded = false;
  };

  doExpand = () => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse = () => {
    this.setState({
      expanded: false,
    });
  };

  addImage = (src, height, width, alt) => {
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
      ' '
    );
    onChange(newEditorState);
    this.doCollapse();
  };

  render() {
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
