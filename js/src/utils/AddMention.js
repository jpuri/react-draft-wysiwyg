import {
  EditorState,
  Entity,
  Modifier,
} from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';

export default function addMention(
  editorState: EditorState,
  onChange: Function,
  suggestion: Object,
  separator: string,
  trigger: string,
): void {
  const { text, value, url } = suggestion;
  const entityKey = Entity.create('MENTION', 'MUTABLE', {
    text: `${trigger}${text}`,
    value,
    url,
  });
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  const mentionIndex = (selectedBlockText.lastIndexOf(separator + trigger) || 0) + 1;

  // insert mention
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex,
    focusOffset: selectedBlockText.length - mentionIndex,
  });
  let newEditorState = EditorState.acceptSelection(editorState, updatedSelection);
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${text}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey,
  );
  newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');

  // insert a blank space after mention
  updatedSelection = newEditorState.getSelection().merge({
    anchorOffset: mentionIndex + text.length,
    focusOffset: mentionIndex + text.length,
  });
  newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);
  contentState = Modifier.insertText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    ' ',
    newEditorState.getCurrentInlineStyle(),
    undefined
  );
  onChange(EditorState.push(newEditorState, contentState, 'insert-characters'), true);
}
