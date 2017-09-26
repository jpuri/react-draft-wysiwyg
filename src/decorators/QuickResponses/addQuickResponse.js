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
  const { value, url } = suggestion;
  const entityKey = editorState
    .getCurrentContent()
    .createEntity('QUICK_RESPONSE', 'IMMUTABLE', { text: `${trigger}${value}`, value, url })
    .getLastCreatedEntityKey();
  const selectedBlock = getSelectedBlock(editorState);
  const selectedBlockText = selectedBlock.getText();
  const index = (selectedBlockText.lastIndexOf(separator + trigger) || 0) + 1;
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
    `${trigger}${value}`,
    newEditorState.getCurrentInlineStyle(),
    entityKey,
  );
  newEditorState = EditorState.push(newEditorState, contentState, 'insert-characters');

  if (!spaceAlreadyPresent) {
    // insert a blank space after Quick Response
    updatedSelection = newEditorState.getSelection().merge({
      anchorOffset: index + value.length + trigger.length,
      focusOffset: index + value.length + trigger.length,
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
