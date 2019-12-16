/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils } from 'draft-js';
import { forEach } from '../../utils/common';

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

  UNSAFE_componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(editorState)),
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  UNSAFE_componentWillReceiveProps(properties: Object): void {
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

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  toggleInlineStyle: Function = (style: string): void => {
    const newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      newStyle,
    );
    if (style === 'subscript' || style === 'superscript') {
      const { currentStyles } = this.state;
      const excludedStyle = style === 'subscript' ? 'superscript' : 'subscript';
      if (currentStyles[excludedStyle]) {
        newState = RichUtils.toggleInlineStyle(
          newState,
          excludedStyle.toUpperCase()
        );
      }
    }
    if (newState) {
      onChange(newState);
    }
  };

  changeKeys = (style) => {
    if (style) {
      const st = {};
      forEach(style, (key, value) => {
        st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
      });
      return st;
    }
    return undefined;
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

  render(): Object {
    const { config, translations } = this.props;
    const { expanded, currentStyles } = this.state;
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
// make subscript less low
