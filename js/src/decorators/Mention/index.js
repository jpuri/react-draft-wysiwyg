import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

let config = {
  separator: ' ',
  trigger: '@',
  suggestions: undefined,
  addMention: undefined,
  mentionStyle: undefined,
};

function configDefined() {
  return config.suggestions && config.suggestions.length > 0 && config.addMention;
}

// todo: add check for focused block
// todo: add check when its first character in the block
function findSuggestionEntities(contentBlock, callback) {
  if (configDefined()) {
    const text = contentBlock.getText();
    const index = text.lastIndexOf(config.separator + config.trigger);
    if (index >= 0) {
      const mentionText = text.substr(index + 2, text.length);
      const suggestionPresent =
        config.suggestions.some(suggestion => suggestion.indexOf(mentionText) >= 0);
      if (suggestionPresent) {
        callback(index + 1, text.length);
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
      { text: suggestion, value: suggestion },
      { separator: config.separator, trigger: config.trigger }
    );
  }

  render() {
    const { children } = this.props;
    const mentionText = children[0].props.text.substr(1);
    const filteredSuggestions =
      config.suggestions &&
      config.suggestions.filter(suggestion => suggestion.indexOf(mentionText) >= 0);
    return (
      <span className="link-decorator-wrapper">
        <span className="link-decorator-link">{children}</span>
        <span className="mention-suggestion-wrapper" contentEditable="false">
          {filteredSuggestions.map(suggestion => <span onClick={this.addMention.bind(undefined, suggestion)} className="mention-suggestion">{suggestion}</span>)}
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
    <span className={`mention ${config.mentionStyle}`}>{text}</span>
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
