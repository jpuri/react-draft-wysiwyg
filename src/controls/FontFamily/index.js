import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';

import LayoutComponent from './Component';

export default class FontFamily extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { editorState } = props;
    this.state = {
      expanded: undefined,
      currentFontFamily: editorState
        ? getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY
        : undefined,
    };
  }

  componentDidMount() {
    const { modalHandler } = this.props;

    if (this.registerCallBack) {
      modalHandler.registerCallBack(this.expandCollapse);
    }
    this.registerCallBack = true;
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(editorState, [
          'FONTFAMILY',
        ]).FONTFAMILY,
      });
    }
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent = () => {
    this.signalExpanded = !this.state.expanded;
    this.setState({
      expanded: this.signalExpanded,
    });
  };

  expandCollapse = () => {
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

  toggleFontFamily = fontFamily => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      fontFamily
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentFontFamily } = this.state;
    const FontFamilyComponent = config.component || LayoutComponent;
    const fontFamily = currentFontFamily && currentFontFamily.substring(11);
    return (
      <FontFamilyComponent
        translations={translations}
        config={config}
        currentState={{ fontFamily }}
        onChange={this.toggleFontFamily}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
