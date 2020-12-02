import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addMention from '../addMention';
import KeyDownHandler from '../../../event-handler/keyDown';
import SuggestionHandler from '../../../event-handler/suggestions';
import { Icon, Text } from '@innovaccer/design-system'

class Suggestion {
  constructor(config) {
    const {
      separator = ' ',
      trigger = '@',
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      optionClassName,
      modalHandler,
      dropdownOptions
    } = config;
    this.config = {
      separator,
      trigger,
      getSuggestions,
      onChange,
      getEditorState,
      getWrapperRef,
      caseSensitive,
      dropdownOptions,
      optionClassName,
      modalHandler,
    };
  }

  findSuggestionEntities = (contentBlock, callback) => {
    if (this.config.getEditorState()) {
      const {
        separator,
        trigger,
        getSuggestions,
        getEditorState,
      } = this.config;;
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
        let preText = separator + trigger;
        if ((index === undefined || index < 0) && text[0] === trigger) {
          index = 0;
          preText = trigger;
        }
        if (index >= 0) {
          const mentionText = text.substr(index + preText.length, text.length);
          const suggestionPresent = getSuggestions().some(suggestion => {
            if (suggestion.value) {
              if (this.config.caseSensitive) {
                return suggestion.value.indexOf(mentionText) >= 0;
              }
              return (
                suggestion.value
                  .toLowerCase()
                  .indexOf(mentionText && mentionText.toLowerCase()) >= 0
              );
            }
            return false;
          });
          if (suggestionPresent) {
            callback(index === 0 ? 0 : index + 1, text.length);
          }
        }
      }
    }
  };

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

    state = {
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
      this.setState({
        // eslint-disable-line react/no-did-mount-set-state
        style: { left, right, bottom },
      });
      KeyDownHandler.registerCallBack(this.onEditorKeyDown);
      SuggestionHandler.open();
      config.modalHandler.setSuggestionCallback(this.closeSuggestionDropdown);
      this.filterSuggestions(this.props);
    }

    componentDidUpdate(props) {
      const { children } = this.props;
      if (children !== props.children) {
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

    onEditorKeyDown = event => {
      const { activeOption } = this.state;
      const newState = {};

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (activeOption === this.filteredSuggestions.length - 1) {
          newState.activeOption = 0;
        } else {
          newState.activeOption = Number(activeOption) + 1;
        }
      } else if (event.key === 'ArrowUp') {
        if (activeOption <= 0) {
          newState.activeOption = this.filteredSuggestions.length - 1;
        } else {
          newState.activeOption = Number(activeOption) - 1;
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

    filteredSuggestions = [];

    filterSuggestions = props => {
      const mentionText = props.children[0].props.text.substr(1);
      const suggestions = config.getSuggestions();
      this.filteredSuggestions =
        suggestions &&
        suggestions.filter(suggestion => {
          if (!mentionText || mentionText.length === 0) {
            return true;
          }
          if (config.caseSensitive) {
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
      const { activeOption } = this.state;
      const editorState = config.getEditorState();
      const { onChange, separator, trigger } = config;
      const selectedMention = this.filteredSuggestions[activeOption];
      if (selectedMention) {
        addMention(editorState, onChange, separator, trigger, selectedMention);
      }
    };

    getOptionClass = (index) => {
      const { activeOption } = this.state;

      const OptionClass = classNames({
        ['Editor-dropdown-option']: true,
        ['Editor-dropdown-option--highlight']: index === activeOption
      });

      return OptionClass;
    };

    renderOption = (suggestion, index) => {
      const { dropdownOptions = {} } = config;
      const { customOptionRenderer } = dropdownOptions;
      const { icon, label } = suggestion;

      if (customOptionRenderer) {
        const optionRenderer = customOptionRenderer(suggestion, this.state.activeOption, index);
        const CustomOption = React.cloneElement(optionRenderer, {
          key: index,
          spellCheck: false,
          onClick: this.addMention,
          'data-index': index,
          onMouseEnter: this.onOptionMouseEnter,
          onMouseLeave: this.onOptionMouseLeave,
        });
        return CustomOption;
      }

      return (
        <span
          key={index}
          spellCheck={false}
          onClick={this.addMention}
          data-index={index}
          onMouseEnter={this.onOptionMouseEnter}
          onMouseLeave={this.onOptionMouseLeave}
          className={this.getOptionClass(index)}
        >
          {icon && <Icon name={icon} className="mr-4" />}
          <Text>{label}</Text>
        </span>
      );
    };

    render() {
      const { children } = this.props;
      const { showSuggestions } = this.state;
      const { dropdownOptions = {} } = config;
      const { dropdownClassName } = dropdownOptions;

      const DropdownClass = classNames({
        ['Popover']: true,
        [`${dropdownClassName}`]: dropdownClassName !== undefined,
        ['Editor-mention-dropdown']: true,
      });

      return (
        <span
          className="Editor-mention-suggestion"
          ref={this.setSuggestionReference}
          onClick={config.modalHandler.onSuggestionClick}
          aria-haspopup="true"
        >
          <span>{children}</span>
          {showSuggestions && (
            <span
              className={DropdownClass}
              contentEditable="false"
              suppressContentEditableWarning
              style={this.state.style}
              ref={this.setDropdownReference}
            >
              {this.filteredSuggestions.map((suggestion, index) =>
                this.renderOption(suggestion, index)
              )}
            </span>
          )}
        </span>
      );
    }
  };
}

export default Suggestion;
