/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import Option from '../Option';
import undo from '../../../images/undo.svg';
import redo from '../../../images/redo.svg';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class HistoryControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
  };

  state: Object = {
    undoDisabled: false,
    redoDisabled: false,
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0,
      });
    }
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

  undo: Function = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.undo(editorState);
    if (newState) {
      onChange(newState, true);
    }
  };

  redo: Function = () => {
    const { editorState, onChange } = this.props;
    const newState = EditorState.redo(editorState);
    if (newState) {
      onChange(newState, true);
    }
  };

  render(): Object {
    const {
      undoDisabled,
      redoDisabled,
    } = this.state;
    return (
      <div className="history-wrapper">
        <Option
          value="unordered-list-item"
          onClick={this.undo}
          disabled={undoDisabled}
        >
          <img
            src={undo}
            role="presentation"
            className="history-icon"
          />
        </Option>
        <Option
          value="ordered-list-item"
          onClick={this.redo}
          disabled={redoDisabled}
        >
          <img
            src={redo}
            role="presentation"
            className="history-icon"
          />
        </Option>
      </div>
    );
  }
}
