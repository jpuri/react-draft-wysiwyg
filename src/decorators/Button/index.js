import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKeyButton = character.getEntity();
      return (
        entityKeyButton !== null &&
        contentState.getEntity(entityKeyButton).getType() === 'BUTTON'
      );
    },
    callback,
  );
}

function getButtonComponent(config) {
  const showOpenOptionOnHover = config.showOpenOptionOnHover;

  return class Button extends Component {
    static propTypes = {
      entityKey: PropTypes.string.isRequired,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };

    state = {
      formatText: '',
    };

    openLink = () => {
      const { entityKey, contentState } = this.props;
      const { url } = contentState.getEntity(entityKey).getData();
      const linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
      // linkTab can be null when the window failed to open.
      if (linkTab) {
        linkTab.focus();
      }
    };

    render() {
      const { children, entityKey, contentState } = this.props;
      const { url, targetOption } = contentState.getEntity(entityKey).getData();

      return (
        <a className="rdw-button-decorator-wrapper" href={url} target={targetOption} onClick={this.openLink}>
          <span>
            {children}
          </span>
        </a>
      );
    }
  };
}

export default config => ({
  strategy: findLinkEntities,
  component: getButtonComponent(config),
});
