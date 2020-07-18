import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  setBlockData,
  getSelectedBlocksMetadata,
} from 'draftjs-utils';

import LayoutComponent from './Component';

export default class LineHeight extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { editorState, modalHandler } = props;
    const currentLineHeight = getSelectedBlocksMetadata(editorState).get('line-height');
    this.state = {
      expanded: undefined,
      currentLineHeight: editorState
        ? currentLineHeight
        : undefined,
    };
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      const currentLineHeight = getSelectedBlocksMetadata(editorState).get('line-height');
      this.setState({
        currentLineHeight: currentLineHeight
      });
    }
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent = () => {
    this.signalExpanded = !this.state.expanded;
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

  toggleLineHeight = lineHeight => {
    const { editorState, onChange } = this.props;
    const currentStyleMap = getSelectedBlocksMetadata(editorState)
    let nextStyleObject = {}
    currentStyleMap.forEach((value, key) => {
      nextStyleObject[key] = value
    })
    nextStyleObject = Object.assign({}, nextStyleObject, { 'line-height': lineHeight })
    const newState = setBlockData(editorState, nextStyleObject);
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentLineHeight } = this.state;
    const LineHeightComponent = config.component || LayoutComponent;
    const lineHeight = currentLineHeight;
    return (
      <LineHeightComponent
        config={config}
        translations={translations}
        currentState={{ lineHeight }}
        onChange={this.toggleLineHeight}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
