import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import {
  changeDepth,
  getBlockBeforeSelectedBlock,
  getSelectedBlock,
  isListBlock,
} from 'draftjs-utils';

import LayoutComponent from './Component';

export default class List extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { editorState, modalHandler } = this.props;
    this.state = {
      expanded: false,
      currentBlock: editorState ? getSelectedBlock(editorState) : undefined,
    };
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({ currentBlock: getSelectedBlock(editorState) });
    }
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent = () => {
    this.signalExpanded = !this.state.expanded;
  };

  onChange = value => {
    if (value === 'unordered') {
      this.toggleBlockType('unordered-list-item');
    } else if (value === 'ordered') {
      this.toggleBlockType('ordered-list-item');
    } else if (value === 'indent') {
      this.adjustDepth(1);
    } else {
      this.adjustDepth(-1);
    }
  };

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
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

  toggleBlockType = blockType => {
    const { onChange, editorState } = this.props;
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    if (newState) {
      onChange(newState);
    }
  };

  adjustDepth = adjustment => {
    const { onChange, editorState } = this.props;
    const newState = changeDepth(editorState, adjustment, 4);
    if (newState) {
      onChange(newState);
    }
  };

  isIndentDisabled = () => {
    const { editorState } = this.props;
    const { currentBlock } = this.state;
    const previousBlock = getBlockBeforeSelectedBlock(editorState);
    if (
      !previousBlock ||
      !isListBlock(currentBlock) ||
      previousBlock.get('type') !== currentBlock.get('type') ||
      previousBlock.get('depth') < currentBlock.get('depth')
    ) {
      return true;
    }
    return false;
  };

  isOutdentDisabled = () => {
    const { currentBlock } = this.state;
    return (
      !currentBlock ||
      !isListBlock(currentBlock) ||
      currentBlock.get('depth') <= 0
    );
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentBlock } = this.state;
    const ListComponent = config.component || LayoutComponent;
    let listType;
    if (currentBlock.get('type') === 'unordered-list-item') {
      listType = 'unordered';
    } else if (currentBlock.get('type') === 'ordered-list-item') {
      listType = 'ordered';
    }
    const indentDisabled = this.isIndentDisabled();
    const outdentDisabled = this.isOutdentDisabled();
    return (
      <ListComponent
        config={config}
        translations={translations}
        currentState={{ listType }}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.onChange}
        indentDisabled={indentDisabled}
        outdentDisabled={outdentDisabled}
      />
    );
  }
}
