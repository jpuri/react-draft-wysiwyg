/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { stopPropagation } from '../../../../utils/common';
import { getFirstIcon } from '../../../../utils/toolbar';
import Option from '../../../Option';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

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
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        showModal: false,
        linkTarget: '',
        linkTitle: '',
      });
    }
  }

  removeLink: Function = (): void => {
    const { onChange } = this.props;
    onChange('unlink');
  };

  addLink: Function = (): void => {
    const { onChange } = this.props;
    const { linkTitle, linkTarget } = this.state;
    onChange('link', linkTitle, linkTarget);
  };

  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
    });
  };

  signalExpandShowModal = () => {
    const { onExpandEvent, currentState: { link, selectionText } } = this.props;
    onExpandEvent();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTitle: (link && link.title) || selectionText,
    });
  }

  forceExpandAndShowModal: Function = (): void => {
    const { doExpand, currentState: { link, selectionText } } = this.props;
    doExpand();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTitle: (link && link.title) || selectionText,
    });
  }

  renderAddLinkModal() {
    const { config: { popupClassName }, doCollapse, translations } = this.props;
    const { linkTitle, linkTarget } = this.state;
    return (
      <div
        className={classNames('rdw-link-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="rdw-link-modal-label">
          {translations['components.controls.link.linkTitle']}
        </span>
        <input
          ref={this.setLinkTitleReference}
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
          ref={this.setLinkTextReference}
          className="rdw-link-modal-input"
          onChange={this.updateValue}
          onBlur={this.updateValue}
          name="linkTarget"
          value={linkTarget}
        />
        <span className="rdw-link-modal-buttonsection">
          <button
            className="rdw-link-modal-btn"
            onClick={this.addLink}
            disabled={!linkTarget || !linkTitle}
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
    const { options, link, unlink, className, dropdownClassName } = config;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-link-wrapper"
        aria-haspopup="true"
        aria-label="rdw-link-control"
        aria-expanded={expanded}
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
