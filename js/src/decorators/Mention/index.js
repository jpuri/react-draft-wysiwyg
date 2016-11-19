import React, { PropTypes, Component } from 'react';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const separator = ' ';
const trigger = '@';
const suggestions = ['abc', 'abcd', 'abcde'];

// todo: add check for focused block
function findMentionEntities(contentBlock, callback) {
  const text = contentBlock.getText();
  const index = text.lastIndexOf(separator + trigger);
  if (index >= 0) {
    const mentionText = text.substr(index + 2, text.length);
    const suggestionPresent =
      suggestions.some(suggestion => suggestion.indexOf(mentionText) >= 0);
    if (suggestionPresent) {
      callback(index + 1, text.length);
    }
  }
}

class Mention extends Component {

  static propTypes = {
    children: PropTypes.array,
  };

  render() {
    const { children } = this.props;
    console.log('children', children[0].props.text)
    const mentionText = children[0].props.text.substr(1);
    const filteredSuggestions =
      suggestions.filter(suggestion => suggestion.indexOf(mentionText) >= 0);
    return (
      <span className="link-decorator-wrapper">
        <span className="link-decorator-link">{children}</span>
        <span className="mention-suggestion-wrapper" contentEditable="false">
          {filteredSuggestions.map(suggestion => <span className="mention-suggestion">{suggestion}</span>)}
        </span>
      </span>
    );
  }
}

export default {
  strategy: findMentionEntities,
  component: Mention,
};
