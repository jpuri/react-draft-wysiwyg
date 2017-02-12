import {
  EditorState,
  Entity,
  Modifier,
} from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';

export default function addMention(
  editorState: EditorState,
  onChange: Function,
  separator: string,
  trigger: string,
  suggestion: Object,
): void {
  const { text, value, url } = suggestion;
  const entityKey = Entity.create('MENTION', 'IMMUTABLE', {
    text: `${trigger}${value}`,
    value,
    url,
  });
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  const mentionIndex = (selectedBlockText.lastIndexOf(separator + trigger) || 0) + 1;
  let focusOffset;
  if (selectedBlockText.length === mentionIndex - 1) {
    focusOffset = selectedBlockText.length;
  } else {
    const searchString = selectedBlockText.substr(mentionIndex, selectedBlockText.length);
    focusOffset = searchString.indexOf(separator) - 1;
  }
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex,
    focusOffset,
  });
  let newEditorState = EditorState.acceptSelection(editorState, updatedSelection);
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${trigger}${value}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey,
  );
  newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');

  // insert a blank space after mention
  updatedSelection = newEditorState.getSelection().merge({
    anchorOffset: mentionIndex + text.length + trigger.length,
    focusOffset: mentionIndex + text.length + trigger.length,
  });
  newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);
  contentState = Modifier.insertText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    ' ',
    newEditorState.getCurrentInlineStyle(),
    undefined
  );
  onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
}
