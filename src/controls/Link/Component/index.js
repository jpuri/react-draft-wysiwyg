/* @flow */

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

  state: Object = {
    showModal: false,
    linkUrl: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
    linkRelOption: '',
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        showModal: false,
        linkUrl: '',
        linkTitle: '',
        linkTargetOption: this.props.config.defaultTargetOption,
        linkRelOption: '',
      });
    }
  }

  removeLink: Function = (): void => {
    const { onChange } = this.props;
    onChange('unlink');
  };

  addLink: Function = (): void => {
    const { onChange } = this.props;
    const { linkTitle, linkUrl, linkTargetOption, linkRelOption } = this.state;
    const linkAttributes = { target: linkTargetOption };
    if (linkRelOption) {
      linkAttributes.rel = linkRelOption;
    }
    onChange('link', linkTitle, linkUrl, linkAttributes);
  };

  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  updateTarget: Function = (event: Object): void => {
    this.setState({
      linkTargetOption: event.target.checked ? '_blank' : '_self',
    });
  };

  updateRel: Function = (event: Object): void => {
    this.setState({
      linkRelOption: event.target.checked ? 'nofollow' : '',
    });
  };

  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };

  signalExpandShowModal = () => {
    const { onExpandEvent, currentState: { link, selectionText } } = this.props;
    const { linkTargetOption, linkRelOption } = this.state;
    onExpandEvent();
    this.setState({
      showModal: true,
      linkRelOption: (link && link.rel) || linkRelOption,
      linkUrl: link && link.url,
      linkTargetOption: (link && link.target) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  }

  forceExpandAndShowModal: Function = (): void => {
    const { doExpand, currentState: { link, selectionText } } = this.props;
    const { linkTargetOption, linkRelOption } = this.state;
    doExpand();
    this.setState({
      showModal: true,
      linkRelOption: (link && link.rel) || linkRelOption,
      linkUrl: link && link.url,
      linkTargetOption: (link && link.target) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  }

  renderAddLinkModal() {
    const { config: { popupClassName }, doCollapse, translations } = this.props;
    const { linkTitle, linkUrl, linkTargetOption, linkRelOption } = this.state;
    return (
      <div
        className={classNames('rdw-link-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="rdw-link-modal-label">
          {translations['components.controls.link.linkTitle']}
        </span>
        <input
          className="rdw-link-modal-input"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTitle"
          value={linkTitle}
        />
        <span className="rdw-link-modal-label">
          {translations['components.controls.link.linkTarget']}
        </span>
        <input
          className="rdw-link-modal-input"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkUrl"
          value={linkUrl}
        />
        <span className="rdw-link-modal-target-option">
          <input
            id="link-target-option"
            type="checkbox"
            defaultChecked={linkTargetOption === '_blank'}
            value="_blank"
            onChange={this.updateTarget}
          />
          <label
            htmlFor="link-target-option"
          >{translations['components.controls.link.linkTargetOption']}</label>
        </span>
        <span className="rdw-link-modal-rel-option">
          <input
            id="link-rel-option"
            type="checkbox"
            defaultChecked={linkRelOption === 'nofollow'}
            value="nofollow"
            onChange={this.updateRel}
          />
          <label
              htmlFor="link-rel-option"
          >{translations['components.controls.link.linkRelOption']}</label>
        </span>
        <span className="rdw-link-modal-buttonsection">
          <button
            className="rdw-link-modal-btn"
            onClick={this.addLink}
            disabled={!linkUrl || !linkTitle}
          >
            {translations['generic.add']}
          </button>
          <button
            className="rdw-link-modal-btn"
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
      </div>
    );
  }

  renderInFlatList(): Object {
    const {
      config: { options, link, unlink, className },
      currentState,
      expanded,
      translations,
    } = this.props;
    const { showModal } = this.state;
    return (
      <div className={classNames('rdw-link-wrapper', className)} aria-label="rdw-link-control">
        {options.indexOf('link') >= 0 && <Option
          value="unordered-list-item"
          className={classNames(link.className)}
          onClick={this.signalExpandShowModal}
          aria-haspopup="true"
          aria-expanded={showModal}
          title={link.title || translations['components.controls.link.link']}
        >
          <img
            src={link.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('unlink') >= 0 && <Option
          disabled={!currentState.link}
          value="ordered-list-item"
          className={classNames(unlink.className)}
          onClick={this.removeLink}
          title={unlink.title || translations['components.controls.link.unlink']}
        >
          <img
            src={unlink.icon}
            alt=""
          />
        </Option>}
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  renderInDropDown(): Object {
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
    const { options, link, unlink, className, dropdownClassName, title } = config;
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
          <img
            src={getFirstIcon(config)}
            alt=""
          />
          {options.indexOf('link') >= 0 && <DropdownOption
            onClick={this.forceExpandAndShowModal}
            className={classNames('rdw-link-dropdownoption', link.className)}
            title={link.title || translations['components.controls.link.link']}
          >
            <img
              src={link.icon}
              alt=""
            />
          </DropdownOption>}
          {options.indexOf('unlink') >= 0 && <DropdownOption
            onClick={this.removeLink}
            disabled={!currentState.link}
            className={classNames('rdw-link-dropdownoption', unlink.className)}
            title={unlink.title || translations['components.controls.link.unlink']}
          >
            <img
              src={unlink.icon}
              alt=""
            />
          </DropdownOption>}
        </Dropdown>
        {expanded && showModal ? this.renderAddLinkModal() : undefined}
      </div>
    );
  }

  render(): Object {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

export default LayoutComponent;
