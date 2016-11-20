import React, { PropTypes, Component } from 'react';
import { getSelectedBlock } from 'draftjs-utils';
import { Entity } from 'draft-js';
import addMention from '../../utils/AddMention';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

let config = {
  separator: ' ',
  trigger: '@',
  suggestions: undefined,
  onChange: undefined,
  getEditorState: undefined,
  mentionClassName: undefined,
  dropdownClassName: undefined,
  optionClassName: undefined,
};

function configDefined() {
  return config.suggestions && config.suggestions.length > 0 &&
    config.onChange && config.getEditorState;
}

// todo: add check for focused block
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
    addMention(editorState, onChange, suggestion, separator, trigger);
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

function findMentionEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'MENTION'
      );
    },
    callback
  );
}

const Mention = ({ entityKey }) => {
  const { text } = Entity.get(entityKey).getData();
  return (
    <span className={`mention ${config.mentionClassName}`}>{text}</span>
  );
};

Mention.propTypes = {
  entityKey: PropTypes.string.isRequired,
};

function setConfig(conf) {
  config = { ...config, ...conf };
}

function handleReturn() {
  const editorState = config.getEditorState();
  const contentBlock = getSelectedBlock(editorState);
  const text = contentBlock.getText();
  let index = text.lastIndexOf(config.separator + config.trigger);
  let preText = config.separator + config.trigger;
  if ((index === undefined || index < 0) && text[0] === config.trigger) {
    index = 0;
    preText = config.trigger;
  }
  if (index >= 0) {
    const mentionText = text.substr(index + preText.length, text.length);
    const suggestions =
      config.suggestions.filter(suggestion =>
        suggestion.value && suggestion.value.indexOf(mentionText) >= 0);
    if (suggestions && suggestions.length > 0) {
      const { onChange, separator, trigger } = config;
      addMention(editorState, onChange, suggestions[0], separator, trigger);
      return true;
    }
  }
  return false;
}

export default {
  decorators: [{
    strategy: findMentionEntities,
    component: Mention,
  }, {
    strategy: findSuggestionEntities,
    component: Suggestion,
  }],
  setConfig,
  handleReturn,
};
