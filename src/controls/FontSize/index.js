/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';

import LayoutComponent from './Component';

export default class FontSize extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    expanded: undefined,
    currentFontSize: 'fontsize-12',
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentFontSize: 'fontsize-12'
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentDidMount() {
    this.toggleFontSize(12);
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

  toggleFontSize: Function = (fontSize: number) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSize,
    );
    if (newState) {
      onChange(newState);
    }
    this.setState({ currentFontSize: `fontsize-${fontSize}` });
  };

  setToDefault = () => {
    this.setState({ currentFontSize: `fontsize-12` })
  }

  render(): Object {
    const { config, translations, editorState } = this.props;
    const { expanded, currentFontSize } = this.state;
    const FontSizeComponent = config.component || LayoutComponent;
    let fontSize = currentFontSize && Number(currentFontSize.substring(9));
    if (editorState && editorState.getCurrentContent()) {
      const contentState = editorState.getCurrentContent();
      if (contentState && !contentState.hasText() && fontSize !== 12) {
        fontSize = 12;
        this.setToDefault();
      }
    }
    return (
      <FontSizeComponent
        config={config}
        translations={translations}
        currentState={{ fontSize }}
        onChange={this.toggleFontSize}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
