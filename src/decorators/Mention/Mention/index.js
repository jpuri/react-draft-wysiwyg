import React from "react";
import PropTypes from "prop-types";
import { Modifier, EditorState } from 'draft-js';
import { getEntityRange } from 'draftjs-utils';
import { Chip } from '@innovaccer/design-system';

class Mention {
  constructor(config) {
    this.config = config;
    this.chipOptions = config.chipOptions;
  }

  first = (array) => {
    return (array != null && array.length)
      ? array[0]
      : undefined
  };

  getMentionComponent = () => {
    const MentionComponent = ({ entityKey, children, contentState }) => {
      const { value } = contentState.getEntity(entityKey).getData();

      const chipOptions = {
        type: 'input',
        name: value,
        clearButton: false,
        ...this.chipOptions,
        label: children,
        className: 'Editor-mention-chip'
      };

      const onDeleteLink = () => {
        const { config } = this;
        const editorState = config.getEditorState();
        const updatedContentState = editorState.getCurrentContent();
        let selection = editorState.getSelection();

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
            focusOffset: entityRange.end + 1,
          });
        }

        let newContentState = Modifier.setBlockType(
          updatedContentState,
          selection,
          'unstyled'
        );

        newContentState = Modifier.removeRange(newContentState, selection, 'backward');
        config.onChange(EditorState.push(config.getEditorState(), newContentState, 'remove-range'));
      };

      return (
        <Chip {...chipOptions} onClose={onDeleteLink} />
      );
    };

    MentionComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object
    };
    return MentionComponent;
  };

  getMentionDecorator = () => ({
    strategy: this.findMentionEntities,
    component: this.getMentionComponent()
  });
}

Mention.prototype.findMentionEntities = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "MENTION"
    );
  }, callback);
};

export default Mention;
