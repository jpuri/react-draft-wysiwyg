import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';
import classNames from 'classnames';
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

const Mention = ({ children, entityKey }) => {
  const { url, value } = Entity.get(entityKey).getData();
  return (
    <a href={url || value} className="rdw-mention-link">
      <span className={classNames('rdw-mention', config.mentionClassName)}>{children}</span>
    </a>
  );
};

Mention.propTypes = {
  entityKey: PropTypes.string,
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
