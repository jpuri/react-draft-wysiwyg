import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

let config = {
  mentionClassName: undefined,
};

function findMentionEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'MENTION'
      );
    },
    callback
  );
}

const Mention = ({ children }) => <span className={`mention ${config.mentionClassName}`}>{children}</span>;

Mention.propTypes = {
  children: PropTypes.array,
};

function setConfig(conf) {
  config = { ...config, ...conf };
}

module.exports = {
  mentionDecorator: {
    strategy: findMentionEntities,
    component: Mention,
  },
  setMentionConfig: setConfig,
};
