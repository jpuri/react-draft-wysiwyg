import Mention from './Mention';
import Suggestion from './Suggestion';

const getDecorators = config => [
  (new Mention(config.mentionClassName)).getMentionDecorator(),
  (new Suggestion(config)).getSuggestionDecorator(),
];

module.exports = getDecorators;
