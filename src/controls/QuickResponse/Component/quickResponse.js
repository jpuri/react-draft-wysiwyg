/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modifier, EditorState } from 'draft-js';
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
    renderTemplateAsyncStatus: 'succeeded',
    countTemplateAsyncStatus: 'succeeded',
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        showModal: false,
        activeOption: -1,
        renderTemplateAsyncStatus: 'succeeded',
        countTemplateAsyncStatus: 'succeeded',
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

  addValue: Function = (payload: {value: string, index: number}): void => {
    const { index, value } = payload;
    const { editorState, onChange } = this.props;
    const { templateUsageCount } = this.props.config;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('QUICK_RESPONSE', 'MUTABLE', { text: `${value}`, value })
      .getLastCreatedEntityKey();
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      value,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    this.props.doCollapse();
    if (templateUsageCount) {
      templateUsageCount({ index, value });
    }
  }

  addQuickResponse: Function = (index: number = null): void => {
    const activeIndex = (index && typeof index === 'string' ? index : this.state.activeOption);
    const { quickResponse, renderTemplate } = this.props.config;

    const value = quickResponse.suggestions[activeIndex].value;
    const subject = quickResponse.suggestions[activeIndex].subject;

    if (renderTemplate) {
      this.renderTemplate({ value, index: activeIndex, subject });
    } else {
      this.addValue({ value, index: activeIndex });
    }
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

  handleKeyPress = (e: *) => {
    if (e.which === 40) {
      e.preventDefault();
      console.log("down arrow triggered");
   
    } else if (e.which === 38) {
      e.preventDefault();
      console.log("up arrow triggered");
     
    }
  }

  renderTemplate: Function = (payload: {value: string, index: number, subject: ?string}): void => {
    const { index, value, subject } = payload;
    const { renderTemplate } = this.props.config;
    this.setState({ renderTemplateAsyncStatus: 'loading' });
    renderTemplate({ content: value, subject })
      .then((response) => {
        console.warn('response', response);
        this.setState({ renderTemplateAsyncStatus: 'succeeded' });
        this.addValue({ value: response.data.rendered_content, index });
      })
      .catch((exception) => {
        console.warn('renderTemplate exception', exception);
        this.setState({ renderTemplateAsyncStatus: 'failed' });
        this.addValue({ value, index });
      });
  }

  renderAddQuickResponseModal() {
    const { config: { popupClassName, quickResponse }, translations } = this.props;

    return (
      <div
        className={classNames('rdw-quick-response-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <span className="rdw-quick-response-modal-label">
          {translations['components.controls.quickresponse.title']}
        </span>
        <div className="rdw-quick-response-modal-suggestions">
          {this.state.renderTemplateAsyncStatus === 'loading' ? <span className="quick-response-loading">Loading...</span> : null}
          {this.state.renderTemplateAsyncStatus === 'failed' ? <span className="quick-response-failed">Failed...</span> : null}
          {this.state.renderTemplateAsyncStatus !== 'loading' && quickResponse && quickResponse.suggestions.length > 0 ?
            quickResponse.suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                spellCheck={false}
                onKeyDown={this.handleKeyPress}
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
      <div className={classNames('rdw-quick-response-wrapper', className)} aria-label="rdw-quick-response-control">
        <Option
          value="unordered-list-item"
          className={classNames(quickResponses.className)}
          onClick={this.signalExpandShowModal}
          aria-haspopup="true"
          aria-expanded={showModal}
          title={quickResponses.title || translations['components.controls.quickresponse.title']}
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
        className="rdw-quick-response-wrapper"
        aria-haspopup="true"
        aria-label="rdw-quick-response-control"
        aria-expanded={expanded}
        title={title}
      >
        <Dropdown
          className={classNames('rdw-quick-response-dropdown', className)}
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
