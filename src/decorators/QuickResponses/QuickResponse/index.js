import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';

class QuickResponse {
  constructor(className) {
    this.className = className;
  }
  getQuickResponseComponent = () => {
    const className = this.className;
    const QuickResponseComponent = ({ entityKey, children, contentState }) => {
      const { url, value } = contentState.getEntity(entityKey).getData();
      return (
        <a href={url || value} className={classNames('rdw-quick-reponse-link', className)}>
          {children}
        </a>
      );
    };
    QuickResponseComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };
    return QuickResponseComponent;
  };
  getQuickResponseDecorator = () => ({
    strategy: this.findQuickResponseEntities,
    component: this.getQuickResponseComponent(),
  });
}

QuickResponse.prototype.findQuickResponseEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'QUICK_RESPONSE'
      );
    },
    callback,
  );
};

module.exports = QuickResponse;
