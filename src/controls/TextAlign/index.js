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
      currentTextIndent: undefined,
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
        currentTextIndent: getSelectedBlocksMetadata(editorState).get(
          'text-indent'
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
    const currentIndent = getSelectedBlocksMetadata(editorState).get('text-indent');
    const indentStep = {
      '0': '2em',
      '2em': '4em',
      '4em': '6em',
      '6em': '8em',
      '8em': '10em',
      '10em': '12em',
      '12em': '14em',
      '14em': '16em',
      '16em': '16em',
    };
    const outdentStep = {
      '16em': '14em',
      '14em': '12em',
      '12em': '10em',
      '10em': '8em',
      '8em': '6em',
      '6em': '4em',
      '4em': '2em',
      '2em': '0',
      '0': '0',
    };
    const currentStyleMap = getSelectedBlocksMetadata(editorState)
    let nextStyleObject = {}
    currentStyleMap.forEach((value, key) => {
      nextStyleObject[key] = value
    })
    if (value === 'indent') {
      const nextStep = indentStep[currentIndent];
      const nextIndent = nextStep || '2em';
      nextStyleObject = Object.assign({}, nextStyleObject, { 'text-indent': nextIndent })
      // onChange(setBlockData(editorState, { 'text-indent': nextIndent }));
    } else if (value === 'outdent') {
      const nextStep = outdentStep[currentIndent];
      const nextIndent = nextStep || '0';
      nextStyleObject = Object.assign({}, nextStyleObject, { 'text-indent': nextIndent })
      // onChange(setBlockData(editorState, { 'text-indent': nextIndent }));
    } else if (currentTextAlignment !== value) {
      nextStyleObject = Object.assign({}, nextStyleObject, { 'text-align': value })
      // onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      nextStyleObject = Object.assign({}, nextStyleObject, { 'text-align': undefined })
      // onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
    onChange(setBlockData(editorState, nextStyleObject));
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
