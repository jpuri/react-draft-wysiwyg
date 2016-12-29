import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class Mention {
  constructor(className) {
    this.className = className;
  }
  getMentionComponent = () => {
    const className = this.className;
    return class MentionComponent extends Component {
      static PropTypes = {
        entityKey: PropTypes.number,
        children: PropTypes.object,
      }
      render() {
        const { entityKey, children } = this.props;
        const { url, value } = Entity.get(entityKey).getData();
        return (
          <a href={url || value} className="rdw-mention-link">
            <span className={classNames('rdw-mention', className)}>{children}</span>
          </a>
        );
      }
    };
  };
  getMentionDecorator = () => {
    return {
      strategy: this.findMentionEntities,
      component: this.getMentionComponent(),
    }
  };
}

Mention.prototype.findMentionEntities = (contentBlock, callback) => {
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

module.exports = Mention;
