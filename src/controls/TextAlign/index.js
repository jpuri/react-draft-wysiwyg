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
    translations: PropTypes.object,
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

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

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
    const currentIndent = getSelectedBlocksMetadata(editorState).get('margin-left');
    const indentStep = {
      '0': '2em',
      '2em': '4em',
      '4em': '6em',
      '6em': '8em',
      '8em': '10em',
      '10em': '12em',
      '12em': '14em',
      '14em': '16em',
      '16em': '16em',
    };
    const outdentStep = {
      '16em': '14em',
      '14em': '12em',
      '12em': '10em',
      '10em': '8em',
      '8em': '6em',
      '6em': '4em',
      '4em': '2em',
      '2em': '0',
      '0': '0',
    };
    if (value === 'indent') {
      const nextStep = indentStep[currentIndent];
      const nextIndent = nextStep || '2em';
      onChange(setBlockData(editorState, { 'margin-left': nextIndent }));
    } else if (value === 'outdent') {
      const nextStep = outdentStep[currentIndent];
      const nextIndent = nextStep || '0';
      onChange(setBlockData(editorState, { 'margin-left': nextIndent }));
    } else if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  }

  render(): Object {
    const { config, translations } = this.props;
    const { expanded, currentTextAlignment } = this.state;
    const TextAlignmentComponent = config.component || LayoutComponent;
    return (
      <TextAlignmentComponent
        config={config}
        translations={translations}
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
