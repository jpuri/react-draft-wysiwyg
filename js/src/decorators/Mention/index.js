import { mentionDecorator, setMentionConfig } from './Mention';
import { suggestionDecorator, setSuggestionConfig } from './Suggestion';
import { handleReturn, setHandleReturnConfig } from './handleReturn';

let config = {
  separator: ' ',
  trigger: '@',
  suggestions: undefined,
  onChange: undefined,
  getEditorState: undefined,
  getWrapperRef: undefined,
  mentionClassName: undefined,
  dropdownClassName: undefined,
  optionClassName: undefined,
  modalHandler: undefined,
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
    getWrapperRef: config.getWrapperRef,
    dropdownClassName: config.dropdownClassName,
    optionClassName: config.optionClassName,
    modalHandler: config.modalHandler,
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
