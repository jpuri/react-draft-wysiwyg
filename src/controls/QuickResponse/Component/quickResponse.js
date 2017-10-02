/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modifier, EditorState } from 'draft-js';
import addQuickResponse from '../../../decorators/QuickResponses/addQuickResponse';
import { stopPropagation } from '../../../utils/common';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../../components/Option';
import { Dropdown } from '../../../components/Dropdown';
import './styles.css';

class QuickResponseComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    editorState: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    showModal: false,
    activeOption: -1,
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        showModal: false,
        activeOption: -1,
      });
    }
  }

  onOptionMouseEnter = (event) => {
    const index = event.target.getAttribute('data-index');
    this.setState({
      activeOption: index,
    });
  }

  onOptionMouseLeave = () => {
    this.setState({
      activeOption: -1,
    });
  }

  addQuickResponse: Function = (index: number = null): void => {
    const activeIndex = (index && typeof index === 'string' ? index : this.state.activeOption);
    const quickResponse = this.props.config.quickResponse;
    const { editorState, onChange } = this.props;
    const value = quickResponse.suggestions[activeIndex].value;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('QUICK_RESPONSE', 'IMMUTABLE', { text: `${value}`, value })
      .getLastCreatedEntityKey();
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      quickResponse.suggestions[activeIndex].value,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    this.props.doCollapse();
  };

  forceExpandAndShowModal: Function = (): void => {
    const { doExpand } = this.props;
    doExpand();
    this.setState({
      showModal: true,
      activeOption: -1,
    });
  }

  signalExpandShowModal = () => {
    const { onExpandEvent } = this.props;
    onExpandEvent();
    this.setState({
      showModal: true,
      activeOption: -1,
    });
  }

  renderAddQuickResponseModal() {
    const { config: { popupClassName, quickResponse }, translations } = this.props;

    return (
      <div
        className={classNames('rdw-link-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="rdw-link-modal-label">
          {translations['components.controls.quickresponse.title']}
        </span>
        {quickResponse && quickResponse.suggestions.length > 0 ?
          quickResponse.suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              spellCheck={false}
              onClick={this.addQuickResponse}
              data-index={index}
              value={index}
              onMouseEnter={this.onOptionMouseEnter}
              onMouseLeave={this.onOptionMouseLeave}
              className={classNames(
                'rdw-suggestion-option btn',
                { 'rdw-suggestion-option-active': (index === 0) },
              )}
            >
              {suggestion.text}
            </button>))
          :
          translations['components.controls.quickresponse.empty']
        }
      </div>
    );
  }

  renderInFlatList(): Object {
    const {
      config: { className, quickResponses },
      expanded,
      translations,
    } = this.props;
    const { showModal } = this.state;
    return (
      <div className={classNames('rdw-link-wrapper', className)} aria-label="rdw-link-control">
        <Option
          value="unordered-list-item"
          className={classNames(quickResponses.className)}
          onClick={this.signalExpandShowModal}
          aria-haspopup="true"
          aria-expanded={showModal}
          title={quickResponses.title || translations['components.controls.link.link']}
        >
          <img
            src={quickResponses.icon}
            alt=""
          />
        </Option>
        {expanded && showModal ? this.renderAddQuickResponseModal() : undefined}
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
      translations,
    } = this.props;
    const { className, dropdownClassName, title } = config;
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
        </Dropdown>
        {expanded && showModal ? this.renderAddQuickResponseModal() : undefined}
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

export default QuickResponseComponent;
