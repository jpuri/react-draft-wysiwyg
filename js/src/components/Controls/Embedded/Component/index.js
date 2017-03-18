/* @flow */

import React, { Component, PropTypes } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';

import Option from '../../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class LayoutComponent extends Component {

  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpand: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
  };

  state: Object = {
    isExpanded: false,
    embeddedLink: '',
    height: 'auto',
    width: '100%',
  };

  componentWillReceiveProps(props) {
    if (!this.props.expanded && props.expanded) {
      this.setState({
        isExpanded: true,
      });
    }
  }

  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  onChange: Function = (event: Object): void => {
    const { onChange } = this.props;
    const { embeddedLink, height, width } = this.state;
    onChange(embeddedLink, height, width);
  };

  collapseModal: Function = (): void => {
    this.setState({
      isExpanded: false,
    });
  };

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  rendeEmbeddedLinkModal(): Object {
    const { embeddedLink, height, width } = this.state;
    const { config: { popupClassName }, intl: { formatMessage } } = this.props;
    return (
      <div
        className={classNames('rdw-embedded-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <div className="rdw-embedded-modal-header">
          <span className="rdw-embedded-modal-header-option">
            <FormattedMessage id="components.controls.embedded.embeddedlink" />
            <span className="rdw-embedded-modal-header-label" />
          </span>
        </div>
        <div className="rdw-embedded-modal-link-section">
          <input
            className="rdw-embedded-modal-link-input"
            placeholder={formatMessage({ id: 'components.controls.embedded.enterlink' })}
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={embeddedLink}
            name="embeddedLink"
          />
          <div className="rdw-embedded-modal-size">
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              name="height"
              className="rdw-embedded-modal-size-input"
              placeholder="Height"
            />
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={width}
              name="width"
              className="rdw-embedded-modal-size-input"
              placeholder="Width"
            />
          </div>
        </div>
        <span className="rdw-embedded-modal-btn-section">
          <button
            className="rdw-embedded-modal-btn"
            onClick={this.onChange}
            disabled={!embeddedLink || !height || !width}
          >
            <FormattedMessage id="generic.add" />
          </button>
          <button
            className="rdw-embedded-modal-btn"
            onClick={this.collapseModal}
          >
            <FormattedMessage id="generic.cancel" />
          </button>
        </span>
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className }, expanded, onExpand } = this.props;
    const { isExpanded } = this.state;
    return (
      <div
        className="rdw-embedded-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded && isExpanded}
        aria-label="rdw-embedded-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpand}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded && isExpanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default injectIntl(LayoutComponent);
