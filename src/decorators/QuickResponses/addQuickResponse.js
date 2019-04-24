import {
  EditorState,
  Modifier,
} from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';

export default function addQuickResponse(
  editorState: EditorState,
  onChange: Function,
  separator: string,
  trigger: string,
  suggestion: Object,
): void {
  const { value } = suggestion;
  const entityKey = editorState
    .getCurrentContent()
    .createEntity('QUICK_RESPONSE', 'MUTABLE', { text: `${value}`, value })
    .getLastCreatedEntityKey();
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  const lastIndexOfTrigger = selectedBlockText.lastIndexOf(trigger);
  const index = lastIndexOfTrigger === -1 ? 0 : lastIndexOfTrigger;
  let focusOffset;
  let spaceAlreadyPresent = false;
  if (selectedBlockText.length === index + 1) {
    focusOffset = selectedBlockText.length;
  } else {
    focusOffset = editorState.getSelection().focusOffset;
  }
  if (selectedBlockText[focusOffset] === ' ') {
    spaceAlreadyPresent = true;
  }
  let updatedSelection = editorState.getSelection().merge({
    anchorOffset: index,
    focusOffset,
  });
  let newEditorState = EditorState.acceptSelection(editorState, updatedSelection);
  let contentState = Modifier.replaceText(
    newEditorState.getCurrentContent(),
    updatedSelection,
    `${value}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey,
  );
  newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');

  if (!spaceAlreadyPresent) {
    // insert a blank space after Quick Response
    updatedSelection = newEditorState.getSelection().merge({
      anchorOffset: index + value.length,
      focusOffset: index + value.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, updatedSelection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      updatedSelection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined,
    );
  }
  onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
}
