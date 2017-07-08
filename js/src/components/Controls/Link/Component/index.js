/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../../utils/common';
import { getFirstIcon } from '../../../../utils/toolbar';
import Option from '../../../Option';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import './styles.css';

const validLinkPattern = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i);

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
    linkTarget: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
    validations: { linkTitleValid: false, linkTargetValid: false },
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        showModal: false,
        linkTarget: '',
        linkTitle: '',
        linkTargetOption: this.props.config.defaultTargetOption,
        validations: { linkTitleValid: false, linkTargetValid: false },
      });
    }
  }

  validateLink: Function = (linkProp, value): void => {
    const { config: { allowRelative } } = this.props;
    switch (linkProp) {
      case "linkTitle":
        return !!value
      case "linkTarget":
        if (!allowRelative) {
          return (!!value && validLinkPattern.test(value));
        } else {
          return !!value;
        }
      default:
        return true;
    }
  }

  removeLink: Function = (): void => {
    const { onChange } = this.props;
    onChange('unlink');
  };

  addLink: Function = (): void => {
    const { config: { allowRelative }, onChange } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;

    if (!allowRelative && !/^https?:\/\//i.test(linkTarget)) {
      onChange('link', linkTitle, `https://${linkTarget}`, linkTargetOption);
    } else {
      onChange('link', linkTitle, linkTarget, linkTargetOption);
    }
  };

  updateValue: Function = (event: Object): void => {
    const { linkTitle, linkTarget } = this.state;
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [`${name}`]: value,
      validations: {
        ...this.state.validations,
        [`${name}Valid`]: this.validateLink(name, value),
      }
    })
  };

  updateTarget: Function = (event: Object): void => {
    this.setState({
      linkTargetOption: event.target.checked ? '_blank' : '_self',
    });
  };

  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };

  signalExpandShowModal = () => {
    const { onExpandEvent, currentState: { link, selectionText } } = this.props;
    const { linkTargetOption } = this.state;
    const linkTitle = (link && link.title) || selectionText;
    const linkTarget = link && link.target;
    onExpandEvent();
    this.setState({
      showModal: true,
      linkTarget: linkTarget,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: linkTitle,
      validations: {
        linkTitleValid: this.validateLink("linkTitle", linkTitle),
        linkTargetValid: this.validateLink("linkTarget", linkTarget),
      },
    });
  }

  forceExpandAndShowModal: Function = (): void => {
    const { doExpand, currentState: { link, selectionText } } = this.props;
    const { linkTargetOption } = this.state;
    const linkTitle = (link && link.title) || selectionText;
    const linkTarget = link && link.target;
    doExpand();
    this.setState({
      showModal: true,
      linkTarget: linkTarget,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: linkTitle,
      validations: {
        linkTitleValid: this.validateLink("linkTitle", linkTitle),
        linkTargetValid: this.validateLink("linkTarget", linkTarget),
      },
    });
  }

  renderAddLinkModal() {
    const { config: { popupClassName }, doCollapse, translations } = this.props;
    const { linkTitle, linkTarget, linkTargetOption, validations: { linkTitleValid, linkTargetValid }  } = this.state;
    const linkIsValid = (linkTitleValid && linkTargetValid);

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
          className={classNames({'rdw-link-modal-input': true, valid: linkTitleValid, invalid: !linkTitleValid})}
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTitle"
          value={linkTitle}
        />
        <span className="rdw-link-modal-label">
          {translations['components.controls.link.linkTarget']}
        </span>
        <input
          className={classNames({'rdw-link-modal-input': true, valid: linkTargetValid, invalid: !linkTargetValid})}
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTarget"
          value={linkTarget}
        />
        <span className="rdw-link-modal-target-option">
          <input
            type="checkbox"
            defaultChecked={linkTargetOption === '_blank'}
            value="_blank"
            onChange={this.updateTarget}
          />
          <span>{translations['components.controls.link.linkTargetOption']}</span>
        </span>
        <span className="rdw-link-modal-buttonsection">
          <button
            className="rdw-link-modal-btn"
            onClick={this.addLink}
            disabled={!linkIsValid}
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
          title={link.title}
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
          title={unlink.title}
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
            title={link.title}
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
            title={unlink.title}
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
