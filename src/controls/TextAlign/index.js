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

  constructor(props) {
    super(props);
    const { modalHandler } = this.props;
    this.state = {
      currentTextAlignment: undefined,
    };
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState !== prevProps.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(editorState).get(
          'text-align'
        ),
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

  addBlockAlignmentData = value => {
    const { editorState, onChange } = this.props;
    const { currentTextAlignment } = this.state;
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  };

  render() {
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
