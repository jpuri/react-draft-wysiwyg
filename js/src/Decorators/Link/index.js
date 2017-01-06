import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';
import styles from './styles.css'; // eslint-disable-line no-unused-vars
import openlink from '../../../../images/openlink.svg';

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

class Link extends Component {

  static propTypes = {
    entityKey: PropTypes.string.isRequired,
    children: PropTypes.array
  };

  state: Object = {
    showPopOver: false,
  };

  openLink: Function = () => {
    const { entityKey } = this.props;
    const { url } = Entity.get(entityKey).getData();
    const linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
    linkTab.focus();
  };

  toggleShowPopOver: Function = () => {
    const showPopOver = !this.state.showPopOver;
    this.setState({
      showPopOver,
    });
  };

  render() {

    const { children, entityKey } = this.props;
    const { url, title, target } = Entity.get(entityKey).getData();
    const { showPopOver } = this.state;

    return (
      <span
        className="rdw-link-decorator-wrapper"
        onMouseEnter={this.toggleShowPopOver}
        onMouseLeave={this.toggleShowPopOver}
      >
        <a href={url} target={target || '_blank'}>{title}</a>
        {showPopOver ?
          <img
            src={openlink}
            role="presentation"
            onClick={this.openLink}
            className="rdw-link-decorator-icon"
          />
          : undefined
        }
      </span>
    );
  }
}

export default {
  strategy: findLinkEntities,
  component: Link,
};
