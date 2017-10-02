/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';

import LayoutComponent from './Component/quickResponse';

class QuickResponse extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    expanded: false,
    link: undefined,
    selectionText: undefined,
  };

  componentWillMount(): void {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState),
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties: Object): void {
    const newState = {};
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      newState.currentEntity = getSelectionEntity(properties.editorState);
    }
    this.setState(newState);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  getCurrentValues = () => {
    const { editorState } = this.props;
    const { currentEntity } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};
    if (currentEntity && (contentState.getEntity(currentEntity).get('type') === 'LINK')) {
      currentValues.link = {};
      const entityRange = currentEntity && getEntityRange(editorState, currentEntity);
      currentValues.link.target = currentEntity && contentState.getEntity(currentEntity).get('data').url;
      currentValues.link.targetOption = currentEntity && contentState.getEntity(currentEntity).get('data').target;
      currentValues.link.title = (entityRange && entityRange.text);
    }
    currentValues.selectionText = getSelectionText(editorState);
    return currentValues;
  }

  setWrapperReference: Function = (ref: Object): void => {
    this.wrapper = ref;
  };

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  render(): Object {
    const { config, translations, onChange } = this.props;
    const { expanded } = this.state;
    const { link, selectionText } = this.getCurrentValues();
    const LinkComponent = config.component || LayoutComponent;
    return (
      <LinkComponent
        ref={this.setWrapperReference}
        config={config}
        translations={translations}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        editorState={this.props.editorState}
        currentState={{
          link,
          selectionText,
        }}
        onChange={onChange}
      />
    );
  }
}

export default QuickResponse;

// todo refct
// 1. better action names here
// 2. align update signatue
// 3. align current value signature
