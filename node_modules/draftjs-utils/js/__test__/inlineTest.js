import { assert } from 'chai';
import {
  Entity,
  RichUtils,
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import {
  colors,
  fontSizes,
  fontFamilies,
  getCustomStyleMap,
  toggleCustomInlineStyle,
  customInlineStylesMap,
  getSelectionInlineStyle,
  getSelectionCustomInlineStyle,
  getSelectionEntity,
  getEntityRange,
} from '../inline';
import { forEach, size } from '../common';

describe('getSelectionInlineStyle test suite', () => {
  it('should correctly get inline styles', () => {
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li></ul>');
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
    editorState = RichUtils.toggleInlineStyle(
      editorState,
      'BOLD',
    );
    assert.equal(getSelectionInlineStyle(editorState).BOLD, true);
    editorState = RichUtils.toggleInlineStyle(
      editorState,
      'STRIKETHROUGH',
    );
    assert.equal(getSelectionInlineStyle(editorState).STRIKETHROUGH, true);
    editorState = RichUtils.toggleInlineStyle(
      editorState,
      'CODE',
    );
    assert.equal(getSelectionInlineStyle(editorState).CODE, true);
  });
});

describe('getSelectionEntity, getEntityRange test suite', () => {
  it('should return entity of selection', () => {
    const { contentBlocks } = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: 'www.testing.com' });
    editorState = RichUtils.toggleLink(editorState, updatedSelection, entityKey);
    assert.equal(getSelectionEntity(editorState), entityKey);
    const entityRange = getEntityRange(editorState, entityKey);
    assert.equal(entityRange.start, 0);
    assert.equal(entityRange.end, 10);
    assert.equal(entityRange.text, 'aaaaaaaaaa');
  });

  it('should return undefined if entity is not applicable to whole seelction', () => {
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1>');
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    let updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 5,
    });
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: 'www.testing.com' });
    editorState = RichUtils.toggleLink(editorState, updatedSelection, entityKey);
    updatedSelection = editorState.getSelection().merge({
      anchorOffset: 0,
      focusOffset: 10,
    });
    editorState = EditorState.acceptSelection(
      editorState,
      updatedSelection,
    );
    assert.isUndefined(getSelectionEntity(editorState));
    const entityRange = getEntityRange(editorState, entityKey);
    assert.equal(entityRange.start, 0);
    assert.equal(entityRange.end, 5);
    assert.equal(entityRange.text, 'aaaaa');
  });
});

describe('Inline: custom styles test suite', () => {
  it('should initialize colors', () => {
    assert.isNotTrue(colors instanceof Array);
  });
  it('should not initialize fontSizes', () => {
    assert.isNotTrue(fontSizes instanceof Array);
  });
  it('should initialize fontFamilies', () => {
    assert.isNotTrue(fontFamilies instanceof Array);
  });
  it('should initialize customInlineStylesMap with a map of inline styles', () => {
    assert.isTrue(customInlineStylesMap instanceof Object);
    forEach(customInlineStylesMap.color, (key, value) => {
      assert.isDefined(value.color);
    });
    forEach(customInlineStylesMap.bgcolor, (key, value) => {
      assert.isDefined(value.backgroundColor);
    });
  });
  it('should initializa customStyleMap with colors, bg-colors, fontsizes and fontFamilies', () => {
    assert.isTrue(getCustomStyleMap instanceof Function);
    assert.equal(
      size(getCustomStyleMap()), 2,
    );
  });
});

describe('getSelectionInlineStyle, toggleCustomInlineStyle test suite', () => {
  it('should correctly get color of selection', () => {
    const contentBlocks = convertFromHTML('<h1>aaaaaaaaaa</h1><ul><li>test</li></ul>');
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
    editorState = toggleCustomInlineStyle(editorState, 'color', 'rgb(97,189,109)');
    assert.equal(getSelectionCustomInlineStyle(
      editorState,
      ['COLOR']).COLOR, 'color-rgb(97,189,109)',
    );
    editorState = toggleCustomInlineStyle(editorState, 'bgcolor', 'rgb(97,189,109)');
    assert.equal(getSelectionCustomInlineStyle(
      editorState,
      ['BGCOLOR']).BGCOLOR, 'bgcolor-rgb(97,189,109)',
    );
  });
});
