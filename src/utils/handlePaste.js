import { getSelectedBlock } from 'draftjs-utils';
import { Modifier, EditorState } from 'draft-js';

export const handlePastedText = (text, html, editorState, onChange) => {
  const selectedBlock = getSelectedBlock(editorState);
  if (selectedBlock && selectedBlock.type === 'code') {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    return true;
  }
  return false;
}
