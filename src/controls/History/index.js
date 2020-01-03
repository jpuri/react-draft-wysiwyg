import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';

import LayoutComponent from './Component';

export default class History extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const state = {
      expanded: false,
      undoDisabled: false,
      redoDisabled: false,
    };
    const { editorState, modalHandler } = props;
    if (editorState) {
      state.undoDisabled = editorState.getUndoStack().size === 0;
      state.redoDisabled = editorState.getRedoStack().size === 0;
    }
    this.state = state;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && prevProps.editorState !== editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0,
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

  onChange = action => {
    const { editorState, onChange } = this.props;
    const newState = EditorState[action](editorState);
    if (newState) {
      onChange(newState);
    }
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

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  render() {
    const { config, translations } = this.props;
    const { undoDisabled, redoDisabled, expanded } = this.state;
    const HistoryComponent = config.component || LayoutComponent;
    return (
      <HistoryComponent
        config={config}
        translations={translations}
        currentState={{ undoDisabled, redoDisabled }}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.onChange}
      />
    );
  }
}
