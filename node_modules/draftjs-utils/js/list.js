/* @flow */

import {
  ContentState,
  EditorState,
  ContentBlock,
} from 'draft-js';
import { getSelectedBlocksMap } from './block';

/**
* Function to check if a block is of type list.
*/
export function isListBlock(block: ContentBlock): boolean {
  if (block) {
    const blockType = block.getType();
    return (
      blockType === 'unordered-list-item' ||
      blockType === 'ordered-list-item'
    );
  }
  return false;
}

/**
* Function to change depth of block(s).
*/
function changeBlocksDepth(
  editorState: EditorState,
  adjustment: number,
  maxDepth: number,
  ): ContentState {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  let blockMap = contentState.getBlockMap();
  const blocks = getSelectedBlocksMap(editorState).map((block) => {
    let depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block.set('depth', depth);
  });
  blockMap = blockMap.merge(blocks);
  return contentState.merge({
    blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  });
}

/**
* Function will check various conditions for changing depth and will accordingly
* either call function changeBlocksDepth or just return the call.
*/
export function changeDepth(
  editorState: EditorState,
  adjustment: number,
  maxDepth: number,
): EditorState {
  const selection = editorState.getSelection();
  let key;
  if (selection.getIsBackward()) {
    key = selection.getFocusKey();
  } else {
    key = selection.getAnchorKey();
  }
  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(key);
  const type = block.getType();
  if (type !== 'unordered-list-item' && type !== 'ordered-list-item') {
    return editorState;
  }
  const blockAbove = content.getBlockBefore(key);
  if (!blockAbove) {
    return editorState;
  }
  const typeAbove = blockAbove.getType();
  if (typeAbove !== type) {
    return editorState;
  }
  const depth = block.getDepth();
  if (adjustment === 1 && depth === maxDepth) {
    return editorState;
  }
  const adjustedMaxDepth = Math.min(blockAbove.getDepth() + 1, maxDepth);
  const withAdjustment = changeBlocksDepth(
    editorState,
    adjustment,
    adjustedMaxDepth,
  );
  return EditorState.push(
    editorState,
    withAdjustment,
    'adjust-depth',
  );
}
