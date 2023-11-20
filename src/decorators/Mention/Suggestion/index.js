import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addMention from '../addMention';
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
    };
  }

  findMentionAttemptText = (contentBlock, callback) => {
    if (this.config.getEditorState()) {
      const {
        separator,
        trigger,
        getEditorState,
      } = this.config;
      const selection = getEditorState().getSelection();
      if (
        selection.get('anchorKey') === contentBlock.get('key') &&
        selection.get('anchorKey') === selection.get('focusKey')
      ) {
        let text = contentBlock.getText();
        text = text.substr(
          0,
          selection.get('focusOffset') === text.length - 1
            ? text.length
            : selection.get('focusOffset') + 1
        );
        let index = text.lastIndexOf(separator + trigger);
        if (index >= 0 || text.startsWith(trigger)) {
          callback(index === 0 ? 0 : index + 1, text.length);
        }
      }
    }
  };

  getCurrentSuggestionsList = async (mentionText) => {
    const suggestionList = await Promise.resolve(this.config.getSuggestions(mentionText))
    return suggestionList
  };

  getSuggestionDecorator = () => ({
    strategy: this.findMentionAttemptText,
    component: SuggestionComponent,
    props: {
      config: this.config,
      getCurrentSuggestionsList: this.getCurrentSuggestionsList
    }
  });
}

class SuggestionComponent extends Component {
  static propTypes = {
    children: PropTypes.array,
  };

  state = {
    style: { left: 15 },
    activeOption: -1,
    showSuggestions: true,
    filteredSuggestions: []
  };

  componentDidMount() {
    const editorRect = this.props.config.getWrapperRef().getBoundingClientRect();
    const suggestionRect = this.suggestion.getBoundingClientRect();
    const dropdownRect = this.dropdown.getBoundingClientRect();
    let left;
    let right;
    let bottom;
    if (
      editorRect.width <
      suggestionRect.left - editorRect.left + dropdownRect.width
    ) {
      right = 15;
    } else {
      left = 15;
    }
    if (editorRect.bottom < dropdownRect.bottom) {
      bottom = 0;
    }
    KeyDownHandler.registerCallBack(this.onEditorKeyDown);
    SuggestionHandler.open();
    this.props.config.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown);
    this.filterSuggestions(this.props).then((_filteredSuggestions) => {
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        style: { left, right, bottom },
        // eslint-disable-line react/no-did-mount-set-state
        filteredSuggestions: _filteredSuggestions
      });
    });
  }

  componentDidUpdate(props) {
    const { children } = this.props;
    if (children !== props.children) {
      this.filterSuggestions(props).then((_filteredSuggestions) => {
        this.setState({
          showSuggestions: true,
          filteredSuggestions: _filteredSuggestions
        });
      })
    }
  }

  componentWillUnmount() {
    KeyDownHandler.deregisterCallBack(this.onEditorKeyDown);
    SuggestionHandler.close();
    this.props.config.modalHandler.removeSuggestionCallback();
  }

  onEditorKeyDown = event => {
    const { activeOption, filteredSuggestions } = this.state;
    const newState = {};
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (activeOption === filteredSuggestions.length - 1) {
        newState.activeOption = 0;
      } else {
        newState.activeOption = activeOption + 1;
      }
    } else if (event.key === 'ArrowUp') {
      if (activeOption <= 0) {
        newState.activeOption = filteredSuggestions.length - 1;
      } else {
        newState.activeOption = activeOption - 1;
      }
    } else if (event.key === 'Escape') {
      newState.showSuggestions = false;
      SuggestionHandler.close();
    } else if (event.key === 'Enter') {
      this.addMention();
    }
    this.setState(newState);
  };

  onOptionMouseEnter = event => {
    const index = event.target.getAttribute('data-index');
    this.setState({
      activeOption: index,
    });
  };

  onOptionMouseLeave = () => {
    this.setState({
      activeOption: -1,
    });
  };

  setSuggestionReference = ref => {
    this.suggestion = ref;
  };

  setDropdownReference = ref => {
    this.dropdown = ref;
  };

  closeSuggestionDropdown = () => {
    this.setState({
      showSuggestions: false,
    });
  };

  filterSuggestions = async (props) => {
    const mentionText = props.children[0].props.text.substr(1);
    const suggestions = await this.props.getCurrentSuggestionsList(mentionText);
    return suggestions &&
      suggestions.filter(suggestion => {
        if (!mentionText || mentionText.length === 0) {
          return true;
        }
        if (this.props.config.caseSensitive) {
          return suggestion.value.indexOf(mentionText) >= 0;
        }
        return (
          suggestion.value
            .toLowerCase()
            .indexOf(mentionText && mentionText.toLowerCase()) >= 0
        );
      });
  };

  addMention = () => {
    const { activeOption, filteredSuggestions } = this.state;
    const editorState = this.props.config.getEditorState();
    const { onChange, separator, trigger } = this.props.config;
    const selectedMention = filteredSuggestions?.[activeOption];
    if (selectedMention) {
      addMention(editorState, onChange, separator, trigger, selectedMention);
    }
  };

  render() {
    const { children } = this.props;
    const { activeOption, showSuggestions } = this.state;
    const { dropdownClassName, optionClassName } = this.props.config;
    return (
      <span
        className="rdw-suggestion-wrapper"
        ref={this.setSuggestionReference}
        onClick={this.props.config.modalHandler.onSuggestionClick}
        aria-haspopup="true"
        aria-label="rdw-suggestion-popup"
      >
        <span>{children}</span>
        {showSuggestions && (
          <span
            className={classNames(
              'rdw-suggestion-dropdown',
              dropdownClassName
            )}
            contentEditable="false"
            suppressContentEditableWarning
            style={this.state.style}
            ref={this.setDropdownReference}
          >
            {this.state.filteredSuggestions?.map?.((suggestion, index) => (
              <span
                key={index}
                spellCheck={false}
                onClick={this.addMention}
                data-index={index}
                onMouseEnter={this.onOptionMouseEnter}
                onMouseLeave={this.onOptionMouseLeave}
                className={classNames(
                  'rdw-suggestion-option',
                  optionClassName,
                  { 'rdw-suggestion-option-active': index === activeOption }
                )}
              >
                {suggestion.text}
              </span>
            ))}
          </span>
        )}
      </span>
    );
  }
};


export default Suggestion;
