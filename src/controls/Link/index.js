import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';
import linkifyIt from 'linkify-it';

import LayoutComponent from './Component';

const linkify = linkifyIt();
const linkifyLink = params => {
  const links = linkify.match(params.target);
  return {
    ...params,
    target: (links && links[0] && links[0].url) || params.target,
  };
};

class Link extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onCloseLinkPopover: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    inDropdown: PropTypes.boolean,
    linkPopoverOpen: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const { editorState, linkPopoverOpen } = this.props;

    this.state = {
      expanded: linkPopoverOpen,
      selectionText: undefined,
      link: undefined,
      currentEntity: editorState ? getSelectionEntity(editorState) : undefined,
    };
  }

  componentDidUpdate(prevProps) {
    const { editorState, linkPopoverOpen } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({ currentEntity: getSelectionEntity(editorState) });
    }

    if (prevProps.linkPopoverOpen !== linkPopoverOpen && linkPopoverOpen) {
      this.setState({
        expanded: linkPopoverOpen,
      });
    }
  }

  onExpandEvent = () => {
    const isPopoverOpen = !this.state.expanded;

    this.setState({
      expanded: isPopoverOpen
    });

    if (!isPopoverOpen) {
      this.props.onCloseLinkPopover();
    }
  };

  onChange = (action, title, target, targetOption) => {
    const {
      config: { linkCallback },
    } = this.props;

    if (action === 'link') {
      const linkifyCallback = linkCallback || linkifyLink;
      const linkified = linkifyCallback({ title, target, targetOption });
      this.addLink(linkified.title, linkified.target, linkified.targetOption);
    } else {
      this.removeLink();
    }
  };

  getCurrentValues = () => {
    const { editorState } = this.props;
    const { currentEntity, link } = this.state;
    const contentState = editorState.getCurrentContent();
    const currentValues = {};
    
    if (
      currentEntity &&
      contentState.getEntity(currentEntity).get('type') === 'LINK'
    ) {
      currentValues.link = {};
      const entityRange =
        currentEntity && getEntityRange(editorState, currentEntity);
      currentValues.link.target =
        currentEntity && (contentState.getEntity(currentEntity).get('data').url);
      currentValues.link.targetOption =
        currentEntity &&
        contentState.getEntity(currentEntity).get('data').targetOption;
      currentValues.link.title = entityRange && (entityRange.text);
    }
    currentValues.selectionText = getSelectionText(editorState);
    return currentValues;
  };

  doExpand = () => {
    this.setState({
      expanded: true,
    });
  };

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  };

  doCollapse = () => {
    this.setState({
      expanded: false,
    });
  };

  removeLink = () => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();
    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      const isBackward = selection.getIsBackward();
      if (isBackward) {
        selection = selection.merge({
          anchorOffset: entityRange.end,
          focusOffset: entityRange.start,
        });
      } else {
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end,
        });
      }
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  addLink = (linkTitle, linkTarget, linkTargetOption) => {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      const isBackward = selection.getIsBackward();
      if (isBackward) {
        selection = selection.merge({
          anchorOffset: entityRange.end,
          focusOffset: entityRange.start,
        });
      } else {
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end,
        });
      }
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', {
        url: linkTarget,
        targetOption: linkTargetOption,
        targetText: linkTitle
      })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      null,
      entityKey
    );
    let newEditorState = EditorState.push(
      editorState,
      contentState,
      'insert-characters'
    );

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
      undefined
    );
    onChange(
      EditorState.push(newEditorState, contentState, 'insert-characters'),
    );
    this.props.onCloseLinkPopover();
    this.doCollapse();
  };

  render() {
    const { config, inDropdown } = this.props;
    const { expanded } = this.state;
    const { link, selectionText } = this.getCurrentValues();

    return (
      <LayoutComponent
        config={config}
        expanded={expanded}
        inDropdown={inDropdown}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        currentState={{
          link,
          selectionText,
        }}
        onChange={this.onChange}
      />
    );
  }
}

export default Link;
