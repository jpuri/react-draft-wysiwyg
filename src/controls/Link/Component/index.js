import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state = {
    showModal: false,
    linkTarget: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
    linkTargetValid: false,
    linkTitleValid: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.expanded && !this.props.expanded) {
      this.setState({
        showModal: false,
        linkTarget: '',
        linkTitle: '',
        linkTargetOption: this.props.config.defaultTargetOption,
        linkTargetValid: false,
        linkTitleValid: false,
      });
    }
  }

  validateValue = (name, value) => {
    if (name === 'linkTarget') {
      const { linkValidator } = this.props.config;
      return !!value && (!linkValidator ? true : linkValidator(value));
    }
    return !!value
  }

  isValid = () => {
    const { linkTitleValid, linkTargetValid } = this.state;
    return linkTitleValid && linkTargetValid;
  }

  removeLink = () => {
    const { onChange } = this.props;
    onChange('unlink');
  };

  addLink = () => {
    if (!this.isValid()) return;
    const { onChange } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    onChange('link', linkTitle, linkTarget, linkTargetOption);
  };

  updateValue = event => {
    const { name, value } = event.target;
    this.setState({
      [`${name}`]: value,
      [`${name}Valid`]: this.validateValue(name, value),
    });
  };

  updateTargetOption = event => {
    this.setState({
      linkTargetOption: event.target.checked ? '_blank' : '_self',
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  signalExpandShowModal = () => {
    const {
      onExpandEvent,
      currentState: { link, selectionText },
    } = this.props;
    const { linkTargetOption } = this.state;
    const linkTarget = (link && link.target) || '';
    const linkTitle = (link && link.title) || selectionText;
    onExpandEvent();
    this.setState({
      showModal: true,
      linkTarget,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle,
      linkTargetValid: this.validateValue('linkTarget', linkTarget),
      linkTitleValid: this.validateValue('linkTitle', linkTitle),
    });
  };

  forceExpandAndShowModal = () => {
    const {
      doExpand,
      currentState: { link, selectionText },
    } = this.props;
    const { linkTargetOption } = this.state;
    const linkTarget = (link && link.target);
    const linkTitle = (link && link.title) || selectionText;
    doExpand();
    this.setState({
      showModal: true,
      linkTarget,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle,
      linkTargetValid: this.validateValue('linkTarget', linkTarget),
      linkTitleValid: this.validateValue('linkTitle', linkTitle),
    });
  };

  renderAddLinkModal() {
    const {
      config: { popupClassName },
      doCollapse,
      translations,
    } = this.props;
    const {
      linkTitle,
      linkTarget,
      linkTargetOption,
      linkTitleValid,
      linkTargetValid,
    } = this.state;
    return (
      <div
        className={classNames('rdw-link-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <label className="rdw-link-modal-label" htmlFor="linkTitle">
          {translations['components.controls.link.linkTitle']}
        </label>
        <input
          id="linkTitle"
          className={classNames({
            'rdw-link-modal-input': true,
            valid: linkTitleValid,
            invalid: !linkTitleValid,
          })}
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTitle"
          value={linkTitle}
        />
        <label className="rdw-link-modal-label" htmlFor="linkTarget">
          {translations['components.controls.link.linkTarget']}
        </label>
        <input
          id="linkTarget"
          className={classNames({
            'rdw-link-modal-input': true,
            valid: linkTargetValid,
            invalid: !linkTargetValid,
          })}
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTarget"
          value={linkTarget}
        />
        <label
          className="rdw-link-modal-target-option"
          htmlFor="openLinkInNewWindow"
        >
          <input
            id="openLinkInNewWindow"
            type="checkbox"
            defaultChecked={linkTargetOption === '_blank'}
            value="_blank"
            onChange={this.updateTargetOption}
          />
          <span>
            {translations['components.controls.link.linkTargetOption']}
          </span>
        </label>
        <span className="rdw-link-modal-buttonsection">
          <button
            className="rdw-link-modal-btn"
            onClick={this.addLink}
            disabled={!this.isValid()}
          >
            {translations['generic.add']}
          </button>
          <button className="rdw-link-modal-btn" onClick={doCollapse}>
            {translations['generic.cancel']}
          </button>
        </span>
      </div>
    );
  }

  renderInFlatList() {
    const {
      config: { options, link, unlink, className },
      currentState,
      expanded,
      translations,
    } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className={classNames('rdw-link-wrapper', className)}
        aria-label="rdw-link-control"
      >
        {options.indexOf('link') >= 0 && (
          <Option
            value="unordered-list-item"
            className={classNames(link.className)}
            onClick={this.signalExpandShowModal}
            aria-haspopup="true"
            aria-expanded={showModal}
            title={link.title || translations['components.controls.link.link']}
          >
            <img src={link.icon} alt="" />
          </Option>
        )}
        {options.indexOf('unlink') >= 0 && (
          <Option
            disabled={!currentState.link}
            value="ordered-list-item"
            className={classNames(unlink.className)}
            onClick={this.removeLink}
            title={
              unlink.title || translations['components.controls.link.unlink']
            }
          >
            <img src={unlink.icon} alt="" />
          </Option>
        )}
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  renderInDropDown() {
    const {
      expanded,
      onExpandEvent,
      doCollapse,
      doExpand,
      onChange,
      config,
      currentState,
      translations,
    } = this.props;
    const {
      options,
      link,
      unlink,
      className,
      dropdownClassName,
      title,
    } = config;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-link-wrapper"
        aria-haspopup="true"
        aria-label="rdw-link-control"
        aria-expanded={expanded}
        title={title}
      >
        <Dropdown
          className={classNames('rdw-link-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded && !showModal}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          <img src={getFirstIcon(config)} alt="" />
          {options.indexOf('link') >= 0 && (
            <DropdownOption
              onClick={this.forceExpandAndShowModal}
              className={classNames('rdw-link-dropdownoption', link.className)}
              title={
                link.title || translations['components.controls.link.link']
              }
            >
              <img src={link.icon} alt="" />
            </DropdownOption>
          )}
          {options.indexOf('unlink') >= 0 && (
            <DropdownOption
              onClick={this.removeLink}
              disabled={!currentState.link}
              className={classNames(
                'rdw-link-dropdownoption',
                unlink.className
              )}
              title={
                unlink.title || translations['components.controls.link.unlink']
              }
            >
              <img src={unlink.icon} alt="" />
            </DropdownOption>
          )}
        </Dropdown>
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  render() {
    const {
      config: { inDropdown },
    } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

export default LayoutComponent;
