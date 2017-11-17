/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils, Modifier, EditorState } from 'draft-js';
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';

import LayoutComponent from './Component';

class FileControl extends Component {
  static propTypes: Object = {
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
    currentEntity: undefined
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

  onChange = (action, title, target, targetOption) => {
    if (action === 'link') {
      this.addLink(title, target, targetOption);
    } else {
      this.removeLink();
    }
  }

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

  removeLink: Function = (): void => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();
    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  addLink: Function = (linkTitle, linkTarget, linkTargetOption): void => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', { url: linkTarget, target: linkTargetOption })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // insert a blank space after link
    selection = newEditorState.getSelection().merge({
      anchorOffset: selection.get('anchorOffset') + linkTitle.length,
      focusOffset: selection.get('anchorOffset') + linkTitle.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, selection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined,
    );
    onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
    this.doCollapse();
  };

  addFile: Function = (src: string, height: string, width: string, alt: string, fileType: string): void => {
    console.warn("addFile", src, height, width, alt, fileType);
    const { editorState, onChange, config } = this.props;
    const entityData = { src, height, width };

    // Add an image
    if(fileType.indexOf("image/") > -1) {
      if (config.alt.present) {
        entityData.alt = alt;
      }
      const entityKey = editorState
        .getCurrentContent()
        .createEntity('IMAGE', 'MUTABLE', entityData)
        .getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
          editorState,
          entityKey,
          ' ',
        );
        onChange(newEditorState);
    } else { // Add a file as link
      this.addLink(alt, src, "_blank");
    }


    this.doCollapse();
  };

  render(): Object {
    const { config, translations } = this.props;
    const { expanded } = this.state;
    const FileComponent = config.component || LayoutComponent;
    return (
      <FileComponent
        config={config}
        translations={translations}
        onChange={this.addFile}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}

export default FileControl;
