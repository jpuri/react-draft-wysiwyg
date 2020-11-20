import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { forEach } from '../../utils/common';

import LayoutComponent from './Component';

export default class Inline extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { editorState, modalHandler } = this.props;
    this.state = {
      currentStyles: editorState
        ? this.changeKeys(getSelectionInlineStyle(editorState))
        : {},
    };

    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(editorState)),
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

  toggleInlineStyle = style => {
    const newStyle = style.toUpperCase();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(editorState, newStyle);

    if (newState) {
      onChange(newState);
    }
  };

  changeKeys = style => {
    if (style) {
      const st = {};
      forEach(style, (key, value) => {
        st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
      });
      return st;
    }
    return undefined;
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

  render() {
    const { config, className } = this.props;
    const { expanded, currentStyles } = this.state;
    const InlineComponent = config.component || LayoutComponent;

    return (
      <InlineComponent
        config={config}
        currentState={currentStyles}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.toggleInlineStyle}
        className={className}
      />
    );
  }
}
