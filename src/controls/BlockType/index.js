import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSelectedBlocksType } from 'draftjs-utils';
import { RichUtils } from 'draft-js';

import LayoutComponent from './Component';

class BlockType extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { editorState } = props;
    this.state = {
      expanded: false,
      currentBlockType: editorState
        ? getSelectedBlocksType(editorState)
        : 'unstyled',
    };
  }

  componentDidMount() {
    const { modalHandler } = this.props;

    if (this.registerCallBack) {
      modalHandler.registerCallBack(this.expandCollapse);
    }
    this.registerCallBack = true;
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(editorState),
      });
    }
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

  blocksTypes = [
    { label: 'Normal', style: 'unstyled' },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'Code', style: 'code' },
  ];

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

  toggleBlockType = blockType => {
    const blockTypeValue = this.blocksTypes.find(bt => bt.label === blockType)
      .style;
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleBlockType(editorState, blockTypeValue);
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentBlockType } = this.state;
    const BlockTypeComponent = config.component || LayoutComponent;
    const blockType = this.blocksTypes.find(
      bt => bt.style === currentBlockType
    );
    return (
      <BlockTypeComponent
        config={config}
        translations={translations}
        currentState={{ blockType: blockType && blockType.label }}
        onChange={this.toggleBlockType}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default BlockType;
