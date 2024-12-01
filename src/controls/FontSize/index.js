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

  constructor(props) {
    super(props);
    const { editorState } = props;
    this.state = {
      expanded: false,
      currentFontSize: editorState
        ? getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE
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
        currentFontSize: getSelectionCustomInlineStyle(editorState, [
          'FONTSIZE',
        ]).FONTSIZE,
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

  toggleFontSize = fontSize => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(editorState, 'fontSize', fontSize);
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentFontSize } = this.state;
    const FontSizeComponent = config.component || LayoutComponent;
    const fontSize = currentFontSize && Number(currentFontSize.substring(9));
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
