import React, { Component } from 'react';
import PropTypes from 'prop-types';
import openlink from '../../../images/openlink.svg';
import './styles.css';

function findButtonEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'BUTTON'
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

    state: Object = {
      showPopOver: false,
    };

    openLink: Function = () => {
      const { entityKey, contentState } = this.props;
      const { url } = contentState.getEntity(entityKey).getData();
      const linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
      // linkTab can be null when the window failed to open.
      if (linkTab) {
        linkTab.focus();
      }
    };

    toggleShowPopOver: Function = () => {
      const showPopOver = !this.state.showPopOver;
      this.setState({
        showPopOver,
      });
    };

    render() {
      const { children, entityKey, contentState } = this.props;
      const { url, targetOption } = contentState.getEntity(entityKey).getData();
      const { showPopOver } = this.state;
      return (
        <span
          className="rdw-button-decorator-wrapper"
          onMouseEnter={this.toggleShowPopOver}
          onMouseLeave={this.toggleShowPopOver}
        >
          <a href={url} target={targetOption}>{children}</a>
          {showPopOver && showOpenOptionOnHover ?
            <img
              src={openlink}
              alt=""
              onClick={this.openLink}
              className="rdw-button-decorator-icon"
            />
            : undefined
          }
        </span>
      );
    }
  };
}

export default config => ({
  strategy: findButtonEntities,
  component: getButtonComponent(config),
});