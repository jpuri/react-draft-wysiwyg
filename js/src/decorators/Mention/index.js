import Mention from './Mention';
import Suggestion from './Suggestion';

const getDecorators = (config) => {
  return [
    (new Mention(config.mentionClassName)).getMentionDecorator(),
    (new Suggestion(config)).getSuggestionDecorator()
  ]
};

module.exports = getDecorators;
