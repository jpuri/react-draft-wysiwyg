import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { assert } from 'chai';
import { getSelectedBlock } from '../block';
import { isListBlock, changeDepth } from '../list';

describe('isListBlock test suite', () => {
  it('should return true for ordered lists', () => {
    const block = {
      getType: () => 'ordered-list-item',
    };
    assert.isTrue(isListBlock(block));
  });

  it('should return true for unordered lists', () => {
    const block = {
      getType: () => 'unordered-list-item',
    };
    assert.isTrue(isListBlock(block));
  });

  it('should return false for any other block type lists', () => {
    const block = {
      getType: () => 'header-one',
    };
    assert.isNotTrue(isListBlock(block));
  });

  it('should return false even is no block is passed', () => {
    assert.isNotTrue(isListBlock(undefined));
  });
});

describe('changeDepth test suite', () => {
  it('should not change depth if block is not a list', () => {
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    editorState = changeDepth(editorState, 1, 4);
    assert.equal(getSelectedBlock(editorState).getDepth(), 0);
  });

  it('should not change depth if previous block is not a lost', () => {
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li></ul>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[1].get('key'),
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    editorState = changeDepth(editorState, 1, 4);
    assert.equal(getSelectedBlock(editorState).getDepth(), 0);
    assert.equal(contentBlocks[0].getDepth(), 0);
  });

  it('should not change depth if previous block list of same type', () => {
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li><li>test</li></ul>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[2].get('key'),
      focusKey: contentBlocks[2].get('key'),
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    editorState = changeDepth(editorState, 1, 4);
    assert.equal(getSelectedBlock(editorState).getDepth(), 1);
    assert.equal(contentBlocks[0].getDepth(), 0);
  });
});
