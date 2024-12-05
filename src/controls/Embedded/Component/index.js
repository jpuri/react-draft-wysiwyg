import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
    doCollapse: PropTypes.func,
  };

  state = {
    embeddedLink: '',
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
    embeddedLinkValid: false,
    heightValid: !!this.props.config.defaultSize.height,
    widthValid: !!this.props.config.defaultSize.width,
  };

  componentDidUpdate(prevProps) {
    const { expanded, config } = this.props;
    if (!expanded && prevProps.expanded) {
      const { height, width } = config.defaultSize;
      this.setState({
        embeddedLink: '',
        height,
        width,
        embeddedLinkValid: false,
        heightValid: !!height,
        widthValid: !!width,
      });
    }
  }

  validateValue = (name, value) => {
    if (name === 'embeddedLink') {
      const { embedValidator } = this.props.config;
      return !!value && (!embedValidator ? true : embedValidator(value));
    }
    return !!value;
  }

  isValid = () => {
    const {
      embeddedLinkValid,
      heightValid,
      widthValid,
    } = this.state;
    return embeddedLinkValid && heightValid && widthValid;
  }

  onChange = () => {
    if (!this.isValid()) return;
    const { onChange } = this.props;
    const { embeddedLink, height, width } = this.state;
    onChange(embeddedLink, height, width);
  };

  updateValue = event => {
    const { name, value } = event.target;
    this.setState({
      [`${name}`]: value,
      [`${name}Valid`]: this.validateValue(name, value),
    });
  };

  rendeEmbeddedLinkModal() {
    const {
      embeddedLink,
      height,
      width,
      embeddedLinkValid,
      heightValid,
      widthValid,
    } = this.state;
    const {
      config: { popupClassName },
      doCollapse,
      translations,
    } = this.props;
    return (
      <div
        className={classNames('rdw-embedded-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <div className="rdw-embedded-modal-header">
          <span className="rdw-embedded-modal-header-option">
            {translations['components.controls.embedded.embeddedlink']}
            <span className="rdw-embedded-modal-header-label" />
          </span>
        </div>
        <div className="rdw-embedded-modal-link-section">
          <span className="rdw-embedded-modal-link-input-wrapper">
            <input
              className={classNames({
                'rdw-embedded-modal-link-input': true,
                valid: embeddedLinkValid,
                invalid: !embeddedLinkValid,
              })}
              placeholder={
                translations['components.controls.embedded.enterlink']
              }
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={embeddedLink}
              name="embeddedLink"
            />
            <span className="rdw-image-mandatory-sign">*</span>
          </span>
          <div className="rdw-embedded-modal-size">
            <span>
              <input
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={height}
                name="height"
                className={classNames({
                  'rdw-embedded-modal-size-input': true,
                  valid: heightValid,
                  invalid: !heightValid,
                })}
                placeholder="Height"
              />
              <span className="rdw-image-mandatory-sign">*</span>
            </span>
            <span>
              <input
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={width}
                name="width"
                className={classNames({
                  'rdw-embedded-modal-size-input': true,
                  valid: widthValid,
                  invalid: !widthValid,
                })}
                placeholder="Width"
              />
              <span className="rdw-image-mandatory-sign">*</span>
            </span>
          </div>
        </div>
        <span className="rdw-embedded-modal-btn-section">
          <button
            type="button"
            className="rdw-embedded-modal-btn"
            onClick={this.onChange}
            disabled={!this.isValid()}
          >
            {translations['generic.add']}
          </button>
          <button
            type="button"
            className="rdw-embedded-modal-btn"
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
      </div>
    );
  }

  render() {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-embedded-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-embedded-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.embedded.embedded']}
        >
          <img src={icon} alt="" />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
