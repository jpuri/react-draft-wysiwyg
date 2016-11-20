import React, { PropTypes, Component } from 'react';
import addMention from '../addMention';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

let config = {
  separator: undefined,
  trigger: undefined,
  suggestions: undefined,
  onChange: undefined,
  getEditorState: undefined,
  dropdownClassName: undefined,
  optionClassName: undefined,
};

function configDefined() {
  return config.suggestions && config.suggestions.length > 0 &&
    config.onChange && config.getEditorState;
}

function findSuggestionEntities(contentBlock, callback) {
  if (configDefined()) {
    const text = contentBlock.getText();
    let index = text.lastIndexOf(config.separator + config.trigger);
    let preText = config.separator + config.trigger;
    if ((index === undefined || index < 0) && text[0] === config.trigger) {
      index = 0;
      preText = config.trigger;
    }
    if (index >= 0) {
      const mentionText = text.substr(index + preText.length, text.length);
      const suggestionPresent =
        config.suggestions.some(suggestion =>
          suggestion.value && suggestion.value.indexOf(mentionText) >= 0);
      if (suggestionPresent) {
        callback(index === 0 ? 0 : index + 1, text.length);
      }
    }
  }
}

class Suggestion extends Component {

  static propTypes = {
    children: PropTypes.array,
  };

  addMention = (suggestion) => {
    const editorState = config.getEditorState();
    const { onChange, separator, trigger } = config;
    addMention(editorState, onChange, separator, trigger, suggestion);
  }

  render() {
    const { children } = this.props;
    const { suggestions, dropdownClassName, optionClassName } = config;
    const mentionText = children[0].props.text.substr(1);
    const filteredSuggestions =
      suggestions && suggestions.filter(suggestion =>
        suggestion.value && suggestion.value.indexOf(mentionText) >= 0);
    return (
      <span className="suggestion-wrapper">
        <span>{children}</span>
        <span className={`suggestion-dropdown ${dropdownClassName}`} contentEditable="false">
          {filteredSuggestions.map((suggestion, index) =>
            <span
              key={index}
              spellCheck={false}
              onClick={this.addMention.bind(undefined, suggestion)}
              className={`suggestion-option ${optionClassName}`}
            >
              {suggestion.text}
            </span>)}
        </span>
      </span>
    );
  }
}

function setConfig(conf) {
  config = { ...config, ...conf };
}

module.exports = {
  suggestionDecorator: {
    strategy: findSuggestionEntities,
    component: Suggestion,
  },
  setSuggestionConfig: setConfig,
};
