import { getSelectedBlock } from 'draftjs-utils';
import addMention from './addMention';

let config = {
  separator: undefined,
  trigger: undefined,
  suggestions: undefined,
  onChange: undefined,
  getEditorState: undefined,
};

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

function setConfig(conf) {
  config = { ...config, ...conf };
}

module.exports = {
  handleReturn,
  setHandleReturnConfig: setConfig,
};
