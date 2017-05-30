import { assert } from 'chai';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import {
  getAllBlocks,
  getSelectedBlock,
  removeSelectedBlocksStyle,
  getSelectedBlocksType,
  clearEditorContent,
  getSelectedBlocksList,
  getSelectionText,
  insertNewUnstyledBlock,
  addLineBreakRemovingSelection,
} from '../block';

describe('BlockUtils test suite', () => {
  it('should add new unstyles block when insertNewUnstyledBlock is called', () => {
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    editorState = insertNewUnstyledBlock(editorState);
    assert.equal(getAllBlocks(editorState).size, 2);
  });
});

describe('getSelectedBlocksList, getSelectedBlocksMap, getSelectedBlock, getAllBlocks test suite',
() => {
  it('should correctly return list of selected blocks', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><ul><li>test</li></ul><h1>aaaaaaaaaa3</h1><h1>aaaaaaaaaa</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[2].get('key'),
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    const selectedBlockList = getSelectedBlocksList(editorState);
    const selectedBlockMap = getSelectedBlocksList(editorState);

    assert.equal(selectedBlockList.size, 2);
    assert.equal(selectedBlockMap.count(), 2);
    assert.equal(getAllBlocks(editorState).size, 4);
    assert.equal(getSelectedBlock(editorState).get('key'), contentBlocks[1].get('key'));
    assert.equal(selectedBlockList.get(0).get('text'), 'test');
    assert.equal(selectedBlockList.get(1).get('text'), 'aaaaaaaaaa3');
  });
});

describe('getSelectedBlocksType test suite', () => {
  it('should return correct block-type', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><h1>aaaaaaaaaa3</h1><h1>aaaaaaaaaa</h1><ul><li>test</li></ul>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[2].get('key'),
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    assert.equal(getSelectedBlocksType(editorState), 'header-one');
  });
  it('should return undefined in blocks in selection have different types', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><h1>aaaaaaaaaa3</h1><h1>aaaaaaaaaa</h1><ul><li>test</li></ul>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[3].get('key'),
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    assert.isUndefined(getSelectedBlocksType(editorState));
  });
});

describe('removeSelectedBlocksStyle test suite', () => {
  it('should remove style of selected blocks', () => {
    const { contentBlocks } = convertFromHTML(
      '<ul><li>test</li><li>li-1</li></ul><h1>header</h1>',
    );
    // Following hack was needed to create a block of 0 length.
    // As convertFromHTML, does not allow to create block of length 0.
    const blankBlock = contentBlocks[1].merge({
      text: '',
    });
    contentBlocks[1] = blankBlock;
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
    editorState = removeSelectedBlocksStyle(editorState);
    assert.equal(getSelectedBlocksType(editorState), 'unstyled');
  });
});

describe('insertNewUnstyledBlock test suite', () => {
  it('should insert an unstyled block', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>testing1</h1><h1>testing2</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 8,
      focusOffset: 8,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    assert.equal(getAllBlocks(editorState).size, 2);
    editorState = insertNewUnstyledBlock(editorState);
    assert.equal(getAllBlocks(editorState).size, 3);
  });
});

describe('getSelectionText test suite', () => {
  it('should get text for current selection', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>testing1</h1><h1>testing2</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 0,
      focusOffset: 8,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    assert.equal(getSelectionText(editorState), 'testing1testing2');
  });
  it('should not include text for blocsk not selected', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>testing1</h1><h1>testing2</h1><h1>testing3</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[0].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 0,
      focusOffset: 8,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    assert.equal(getSelectionText(editorState), 'testing1testing2');
  });
});

describe('addLineBreakRemovingSelection test suite', () => {
  it('should insert a line break and remove selected text', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>testing1</h1><h1>testing2</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorKey: contentBlocks[1].get('key'),
      focusKey: contentBlocks[1].get('key'),
      anchorOffset: 3,
      focusOffset: 5,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    editorState = addLineBreakRemovingSelection(editorState);
    assert.equal(getAllBlocks(editorState).get(1).get('text'), 'tes\nng2');
  });
});

describe('clearEditorContent test suite', () => {
  it('should clear editor content', () => {
    const { contentBlocks } = convertFromHTML(
      '<h1>aaaaaaaaaa</h1><h1>aaaaaaaaaa</h1>',
    );
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    editorState = clearEditorContent(editorState);
    assert.equal(editorState.getCurrentContent().getPlainText().length, 0);
  });
});
