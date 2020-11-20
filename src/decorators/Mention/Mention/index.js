import React from "react";
import PropTypes from "prop-types";
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
        ...this.chipOptions,
        clearButton: false,
        label: children,
        className: 'Editor-mention-chip'
      };

      return (
          <Chip {...chipOptions} />
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
