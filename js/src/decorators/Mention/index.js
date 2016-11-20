import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

let config = {
  separator: ' ',
  trigger: '@',
  suggestions: undefined,
  addMention: undefined,
  mentionClassName: undefined,
};

function configDefined() {
  return config.suggestions && config.suggestions.length > 0 && config.addMention;
}

// todo: add check for focused block
function findSuggestionEntities(contentBlock, callback) {
  if (configDefined()) {
    const text = contentBlock.getText();
    let index = text.lastIndexOf(config.separator + config.trigger);
    if ((index === undefined || index < 0) && text[0] === config.trigger) {
      index = 0;
    }
    if (index >= 0) {
      const mentionText = index === 0 ? '' : text.substr(index + 2, text.length);
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
    config.addMention(
      suggestion,
      { separator: config.separator, trigger: config.trigger }
    );
  }

  render() {
    const { children } = this.props;
    const mentionText = children[0].props.text.substr(1);
    const filteredSuggestions =
      config.suggestions &&
      config.suggestions.filter(suggestion =>
        suggestion.value && suggestion.value.indexOf(mentionText) >= 0);
    return (
      <span className="suggestion-wrapper">
        <span>{children}</span>
        <span className="suggestion-dropdown" contentEditable="false">
          {filteredSuggestions.map((suggestion, index) =>
            <span
              key={index}
              onClick={this.addMention.bind(undefined, suggestion)}
              className="suggestion-option"
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

export default {
  decorators: [{
    strategy: findMentionEntities,
    component: Mention,
  }, {
    strategy: findSuggestionEntities,
    component: Suggestion,
  }],
  setConfig,
};
