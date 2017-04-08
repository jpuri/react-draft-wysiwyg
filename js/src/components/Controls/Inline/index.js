/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { forEach } from '../../../utils/common';

import LayoutComponent from './Component';

export default class Inline extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    currentStyles: {},
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(editorState)),
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(properties.editorState)),
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  changeKeys = (style) => {
    if (style) {
      const st = {};
      forEach(style, (key, value) => {
        st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
      });
      return st;
    }
  }

  toggleInlineStyle: Function = (style: string): void => {
    const newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      newStyle
    );
    if (style === 'subscript' || style === 'superscript') {
      const removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
      const contentState = Modifier.removeInlineStyle(
        newState.getCurrentContent(),
        newState.getSelection(),
        removeStyle
      );
      newState = EditorState.push(newState, contentState, 'change-inline-style');
    }
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

  render(): Object {
    const { config, translations } = this.props;
    const { expanded, currentStyles } = this.state
    const InlineComponent = config.component || LayoutComponent;
    return (
      <InlineComponent
        config={config}
        translations={translations}
        currentState={currentStyles}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.toggleInlineStyle}
      />
    );
  }
}

// todo: move all controls to separate folder controls
// make subscript less low
