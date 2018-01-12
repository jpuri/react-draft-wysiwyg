import { getSelectedBlock } from 'draftjs-utils';

import { List, Repeat } from 'immutable';
import { Modifier, CharacterMetadata, BlockMapBuilder, EditorState, ContentBlock, genKey } from 'draft-js';

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
    const currentContentState = editorState.getCurrentContent();
    const currentSelectionState = editorState.getSelection();
    const afterRemovalContentState = Modifier.removeRange(
      currentContentState,
      currentSelectionState,
      'backward',
    );
    const targetSelection = afterRemovalContentState.getSelectionAfter();
    const blockKeyForTarget = targetSelection.get('focusKey');
    const block = currentContentState.getBlockForKey(blockKeyForTarget);
    let insertionTargetSelection;
    let insertionTargetBlock;
    const isEmptyBlock = block.getLength() === 0 && block.getEntityAt(0) === null;
    const selectedFromStart = currentSelectionState.getStartOffset() === 0;
    if (isEmptyBlock || selectedFromStart) {
      insertionTargetSelection = targetSelection;
      insertionTargetBlock = afterRemovalContentState;
    } else {
      insertionTargetBlock = Modifier.splitBlock(afterRemovalContentState, targetSelection);

      insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
    }
    const entityKey = currentContentState.createEntity('sticker', 'IMMUTABLE', selectedBlock.data);
    const charDataOfSticker = CharacterMetadata.create({ entity: entityKey });

    const { type } = selectedBlock;

    const fragmentArray = [
      new ContentBlock({
        key: genKey(),
        type,
        text: '',
        characterList: List(Repeat(charDataOfSticker, 1)), // eslint-disable-line new-cap
      }),

      new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: '',
        characterList: List(), // eslint-disable-line new-cap
      }),
    ];

    const fragment = BlockMapBuilder.createFromArray(fragmentArray);
    const newContentStateAfterSplit = Modifier
      .setBlockType(insertionTargetBlock, insertionTargetSelection, type);

    const contentStateWithSticker = Modifier.replaceWithFragment(
      newContentStateAfterSplit,
      insertionTargetSelection,
      fragment,
    );

    const newState = EditorState.push(
      editorState,
      contentStateWithSticker,
      'insert-sticker',
    );
    const afterInsert = EditorState
      .forceSelection(newState, contentStateWithSticker.getSelectionAfter());

    return onChange(afterInsert);
  }
  return false;
};

