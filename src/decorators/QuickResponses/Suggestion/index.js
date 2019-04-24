import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addQuickResponse from '../addQuickResponse';
import KeyDownHandler from '../../../event-handler/keyDown';
import SuggestionHandler from '../../../event-handler/suggestions';
import './styles.css';

class Suggestion {
  constructor(config) {
    const {
      separator,
      trigger,
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      dropdownClassName,
      optionClassName,
      modalHandler,
      renderTemplate,
      templateUsageCount,
    } = config;
    this.config = {
      separator,
      trigger,
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      dropdownClassName,
      optionClassName,
      modalHandler,
      renderTemplate,
      templateUsageCount,
    };
  }

  findSuggestionEntities = (contentBlock, callback) => {
    if (this.config.getEditorState()) {
      const { separator, trigger, getSuggestions, getEditorState } = this.config;
      const selection = getEditorState().getSelection();
      if (selection.get('anchorKey') === contentBlock.get('key') &&
        selection.get('anchorKey') === selection.get('focusKey')) {
        let text = contentBlock.getText();
        text = text.substr(
          0,
          selection.get('focusOffset') === text.length - 1
            ? text.length
            : selection.get('focusOffset') + 1,
        );
        let index = text.lastIndexOf(separator + trigger);
        let preText = separator + trigger;
        if ((index === undefined || index < 0) && text[0] === trigger) {
          index = 0;
          preText = trigger;
        }
        if (index >= 0) {
          const quickResponseText = text.substr(index + preText.length, text.length);

          const suggestionPresent = quickResponseText[0] !== separator && getSuggestions().some((suggestion) => {
            if (suggestion.text) {
              if (this.config.caseSensitive) {
                return suggestion.text.indexOf(quickResponseText) >= 0;
              }
              return suggestion.text.toLowerCase()
                .indexOf(quickResponseText && quickResponseText.toLowerCase()) >= 0;
            }
            return false;
          });
          if (suggestionPresent) {
            callback(index + preText.length - 1, text.length);
          }
        }
      }
    }
  }

  getSuggestionComponent = getSuggestionComponent.bind(this);

  getSuggestionDecorator = () => ({
    strategy: this.findSuggestionEntities,
    component: this.getSuggestionComponent(),
  });
}

function getSuggestionComponent() {
  const { config } = this;
  return class SuggestionComponent extends Component {
    static propTypes = {
      children: PropTypes.array,
    };

    state: Object = {
      style: { left: 15 },
      activeOption: -1,
      showSuggestions: true,
    };

    componentDidMount() {
      const editorRect = config.getWrapperRef().getBoundingClientRect();
      const suggestionRect = this.suggestion.getBoundingClientRect();
      const dropdownRect = this.dropdown.getBoundingClientRect();
      let left;
      let right;
      let bottom;
      if (editorRect.width < (suggestionRect.left - editorRect.left) + dropdownRect.width) {
        right = 15;
      } else {
        left = 15;
      }
      if (editorRect.bottom < dropdownRect.bottom) {
        bottom = 0;
      }
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        style: { left, right, bottom },
      });
      KeyDownHandler.registerCallBack(this.onEditorKeyDown);
      SuggestionHandler.open();
      config.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown);
      this.filterSuggestions(this.props);
    }

    componentWillReceiveProps(props) {
      if (this.props.children !== props.children) {
        this.filterSuggestions(props);
        this.setState({
          showSuggestions: true,
        });
      }
    }

    componentWillUnmount() {
      KeyDownHandler.deregisterCallBack(this.onEditorKeyDown);
      SuggestionHandler.close();
      config.modalHandler.removeSuggestionCallback();
    }

    onEditorKeyDown = (event) => {
      const { activeOption } = this.state;
      const newState = {};
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (activeOption === this.filteredSuggestions.length - 1) {
          newState.activeOption = 0;
        } else {
          newState.activeOption = activeOption + 1;
        }
      } else if (event.key === 'ArrowUp') {
        if (activeOption <= 0) {
          newState.activeOption = this.filteredSuggestions.length - 1;
        } else {
          newState.activeOption = activeOption - 1;
        }
      } else if (event.key === 'Escape') {
        newState.showSuggestions = false;
        SuggestionHandler.close();
      } else if (event.key === 'Enter') {
        this.addQuickResponse(event.target.value);
      }
      this.setState(newState);
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

    setSuggestionReference: Function = (ref: Object): void => {
      this.suggestion = ref;
    };

    setDropdownReference: Function = (ref: Object): void => {
      this.dropdown = ref;
    };

    closeSuggestionDropdown: Function = (): void => {
      this.setState({
        showSuggestions: false,
      });
    }

    filteredSuggestions = [];

    filterSuggestions = (props) => {
      const quickResponseText = props.children[0].props.text.substr(1);
      const suggestions = config.getSuggestions();
      this.filteredSuggestions =
        suggestions && suggestions.filter((suggestion) => {
          if (!quickResponseText) {
            return true;
          }   
          return suggestion.text.toLowerCase().indexOf(quickResponseText && quickResponseText.toLowerCase()) !== -1;
        });
    }

    addQuickResponse = (index = null) => {
      const activeIndex = (index && typeof index === 'string' ? index : this.state.activeOption);
      const suggestion = this.filteredSuggestions[activeIndex];
      const { renderTemplate } = config;

      // Quick response render.
      if (renderTemplate && typeof renderTemplate === 'function') {
        this.renderTemplate({ suggestion, index: activeIndex });
      } else {
        this.addSuggestion({ suggestion, index: activeIndex });
      }
    }

    addSuggestion: Function = (payload: {suggestion: *, index: number}): void => {
      const { suggestion } = payload;
      const editorState = config.getEditorState();
      const { onChange, separator, trigger, templateUsageCount } = config;

      addQuickResponse(editorState, onChange, separator, trigger, suggestion);

      if (templateUsageCount && typeof templateUsageCount === 'function') {
        templateUsageCount();
      }
    }

    renderTemplate: Function = (payload: {suggestion: *, index: number}): void => {
      const { index, suggestion } = payload;
      const { renderTemplate } = config;
      const suggestionCopy = Object.assign({}, suggestion);
      renderTemplate({ content: suggestion.value, subject: suggestion.subject })
        .then((response) => {
          suggestionCopy.value = response.data.rendered_content;
          this.addSuggestion({ suggestion: suggestionCopy, index });
        })
        .catch((exception) => {
          console.warn('renderTemplate exception', exception);
          this.addSuggestion({ suggestion, index });
        });
    }

    render() {
      const { children } = this.props;
      const { activeOption, showSuggestions } = this.state;
      const { dropdownClassName, optionClassName } = config;
      return (
        <span
          className="rdw-suggestion-wrapper"
          ref={this.setSuggestionReference}
          onClick={config.modalHandler.onSuggestionClick}
          aria-haspopup="true"
          aria-label="rdw-suggestion-popup"
        >
          <span>{children}</span>
          {showSuggestions &&
            <span
              className={classNames('rdw-quick-response-suggestion-dropdown', dropdownClassName)}
              suppressContentEditableWarning
              contentEditable="false"
              style={this.state.style}
              ref={this.setDropdownReference}
            >
              {this.filteredSuggestions.map((suggestion, index) =>
                (<button
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
                    optionClassName,
                    { 'rdw-suggestion-option-active': (index === activeOption) },
                  )}
                >
                  {suggestion.text}
                </button>))}
            </span>}
        </span>
      );
    }
  };
}

module.exports = Suggestion;
