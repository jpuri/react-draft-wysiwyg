import { mentionDecorator, setMentionConfig } from './Mention';
import { suggestionDecorator, setSuggestionConfig } from './Suggestion';
import { handleReturn, setHandleReturnConfig } from './handleReturn';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

let config = {
  separator: ' ',
  trigger: '@',
  suggestions: undefined,
  onChange: undefined,
  getEditorState: undefined,
  getContainerRef: undefined,
  mentionClassName: undefined,
  dropdownClassName: undefined,
  optionClassName: undefined,
};

function setConfig(conf) {
  config = { ...config, ...conf };
  setMentionConfig({ mentionClassName: config.mentionClassName });
  setSuggestionConfig({
    separator: config.separator,
    trigger: config.trigger,
    suggestions: config.suggestions,
    onChange: config.onChange,
    getEditorState: config.getEditorState,
    getContainerRef: config.getContainerRef,
    dropdownClassName: config.dropdownClassName,
    optionClassName: config.optionClassName,
  });
  setHandleReturnConfig({
    separator: config.separator,
    trigger: config.trigger,
    suggestions: config.suggestions,
    onChange: config.onChange,
    getEditorState: config.getEditorState,
  });
}

export default {
  decorators: [mentionDecorator, suggestionDecorator],
  setConfig,
  handleReturn,
};
