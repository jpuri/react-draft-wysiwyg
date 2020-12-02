import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  Text,
  Icon,
  Link as DesignSystemLink
} from '@innovaccer/design-system';
import { Modifier, EditorState } from 'draft-js';
import { getEntityRange } from 'draftjs-utils';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback,
  );
}

function getLinkComponent(config) {

  return class Link extends Component {
    static propTypes = {
      entityKey: PropTypes.string.isRequired,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };

    state: Object = {
      open: false,
    };

    onDeleteLink = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const editorState = config.getEditorState();
      let selection = editorState.getSelection();
      const { contentState, entityKey } = this.props;

      const entityRange = getEntityRange(editorState, entityKey);
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
      let newContentState = Modifier.setBlockType(
        contentState,
        selection,
        'unstyled'
      );

      newContentState = Modifier.removeRange(newContentState, selection, 'backward');
      config.onChange(EditorState.push(config.getEditorState(), newContentState, 'remove-range'));
    }

    onEditLink = (e) => {
      e.preventDefault();
      e.stopPropagation();

      config.onEditLink();

      this.setState({
        open: false
      })
    };

    onToggle = (updatedOpen) => {
      this.setState({
        open: updatedOpen
      });
    };

    render() {
      const { children, entityKey, contentState } = this.props;
      const { url } = contentState.getEntity(entityKey).getData();
      const { open } = this.state;

      const trigger = (
        <span
          contentEditable="false"
          suppressContentEditableWarning
        >
          <Text appearance="link">{children}</Text>
        </span>
      );

      return (
        <Popover
          trigger={trigger}
          appendToBody={true}
          open={open}
          onToggle={this.onToggle}
        >
          <div
            contentEditable="false"
            suppressContentEditableWarning
            className="d-flex pl-5 py-5 pr-4 align-items-center"
          >
            <DesignSystemLink
              href={url}
              target="_new"
              className="Editor-link"
            >
              {url}
            </DesignSystemLink>
            <span className="Editor-seperator" />
            <span className="Editor-linkButtons" onClick={this.onEditLink}>
              <Icon name="edit" size={20} />
            </span>
            <span className="Editor-seperator" />
            <span className="Editor-linkButtons" onClick={this.onDeleteLink}>
              <Icon name="delete" size={20} />
            </span>
          </div>
        </Popover>
      );
    }
  };
}

export default config => ({
  strategy: findLinkEntities,
  component: getLinkComponent(config),
});
