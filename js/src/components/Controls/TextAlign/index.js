/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils';

import LayoutComponent from './Component';

export default class TextAlign extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state = {
    currentTextAlignment: undefined,
  }

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState !== this.props.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(properties.editorState).get('text-align'),
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
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

  addBlockAlignmentData:Function = (value: string) => {
    const { editorState, onChange } = this.props;
    const { currentTextAlignment } = this.state;
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  }

  render(): Object {
    const { config } = this.props;
    const { expanded, currentTextAlignment } = this.state
    const TextAlignmentComponent = config.component || LayoutComponent;
    return (
      <TextAlignmentComponent
        config={config}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        currentState={{ textAlignment: currentTextAlignment }}
        onChange={this.addBlockAlignmentData}
      />
    );
  }
}
