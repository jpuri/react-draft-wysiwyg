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
  config: Object
): void {
  const { text, value } = suggestion;
  const entityKey = Entity.create('MENTION', 'MUTABLE', {
    text,
    value,
  });
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  const mentionIndex = selectedBlockText.lastIndexOf(config.separator + config.trigger) || 0;

  // insert mention
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: mentionIndex + 1,
    focusOffset: selectedBlockText.length,
  });
  let newEditorState = EditorState.acceptSelection(editorState, updatedSelection);
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${text}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey,
  );

  // insert a blank space after mention
  updatedSelection = newEditorState.getSelection().merge({
    anchorOffset: selectedBlockText.length + 1,
    focusOffset: selectedBlockText.length + 1,
  });
  newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);
  contentState = Modifier.insertText(
    contentState,
    updatedSelection,
    ' ',
  );
  onChange(EditorState.push(newEditorState, contentState, 'insert-characters'), true);
}
