import { getSelectedBlock } from 'draftjs-utils';
import { Modifier, EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { OrderedMap } from 'immutable';

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
  } else if (html) {
    const contentBlock = htmlToDraft(html);
    let blockMap = new OrderedMap({});
    contentBlock.contentBlocks.forEach(block => {
      blockMap = blockMap.set(block.get('key'), block);
    });
    let contentState = editorState.getCurrentContent();
    contentBlock.entityMap.forEach((value, key) => {
      contentState = contentState.mergeEntityData(key, value);
    });
    contentState = Modifier.replaceWithFragment(
      contentState,
      editorState.getSelection(),
      blockMap,
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    return true;
  }
  return false;
}
