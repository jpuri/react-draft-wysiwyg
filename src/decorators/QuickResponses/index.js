import QuickResponse from './QuickResponse';
import Suggestion from './Suggestion';

const getDecorators = config => [
  (new QuickResponse(config.quickResponseClassName)).getQuickResponseDecorator(),
  (new Suggestion(config)).getSuggestionDecorator(),
];

module.exports = getDecorators;
