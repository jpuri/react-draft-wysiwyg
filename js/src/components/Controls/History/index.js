/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';

import LayoutComponent from './Component';

export default class History extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    expanded: false,
    undoDisabled: false,
    redoDisabled: false,
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0,
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        undoDisabled: properties.editorState.getUndoStack().size === 0,
        redoDisabled: properties.editorState.getRedoStack().size === 0,
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  undo: Function = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.undo(editorState);
    if (newState) {
      onChange(newState);
    }
  };

  redo: Function = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.redo(editorState);
    if (newState) {
      onChange(newState);
    }
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  onExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  onCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  render(): Object {
    const { config } = this.props;
    const { undoDisabled, redoDisabled, expanded } = this.state
    const HistoryComponent = config.component || LayoutComponent;
    return (
      <HistoryComponent
        config={config}
        undoDisabled={undoDisabled}
        redoDisabled={redoDisabled}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.onExpand}
        doCollapse={this.onCollapse}
        onUndo={this.undo}
        onRedo={this.redo}
      />
    );
  }
}
