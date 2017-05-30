# DraftJS Utils

An collection of useful utility functions for [DraftJS](https://github.com/facebook/draft-js).

I have been using DraftJS in few of my projects. DraftJS is very nice library for creating editors. I wrote a couple of utility functions for myself which I can re-use across my projects. They are well tested. I am open-sourcing them so that others can also leverage.
Many of the functions described use [ImmutableJS](https://facebook.github.io/immutable-js/).

## Installing

`npm install draftjs-utils`

## Methods
| | Method Name | Parameters | Return Type | Description |
| -------- | -------- | -------- | -------- | -------- |
| 1 | getSelectedBlocksMap | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [OrderedMap](https://facebook.github.io/immutable-js/docs/#/OrderedMap) |The function will return an Immutable OrderedMap of currently selected Blocks. The key is key of Block and value is [ContentBlock](https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content). |
| 2 | getSelectedBlocksList | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [List](https://facebook.github.io/immutable-js/docs/#/List) | The function will return an Immutable List of currently selected Blocks. The data type of returned objects is [ContentBlock](https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content). |
| 3 | getSelectedBlock | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [ContentBlock](https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content) | The function will return first of currently selected Blocks, this is more useful when we expect user to select only one Block. The data type of returned object is [ContentBlock](https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content). |
| 4 | getAllBlocks | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [List](https://facebook.github.io/immutable-js/docs/#/List) | The function will return all the Blocks of the editor. The data type of returned objects is [ContentBlock](https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content). |
| 5 | getSelectedBlocksType | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | string | The function will return the type of currently selected Blocks. The type is a simple string. It will return `undefined` if not all selected Blocks have same type.|
| 6 | removeSelectedBlocksStyle | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | The function will reset the type of selected Blocks to `unstyled`.|
| 7 | getSelectionText | [EditorState](https://facebook.githubgetSelectionInlineStyle.io/draft-js/docs/api-reference-editor-state.html#content) | string | The function will return plain text of current selection.|
| 8 | addLineBreakRemovingSelection | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | The function will replace currently selected text with a `\n`.|
| 9 | insertNewUnstyledBlock | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) |[EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | The function will add a new unstyled Block and copy current selection to it.|
| 10 | clearEditorContent | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | The function will clear all content from the Editor.|
| 11 | getSelectionInlineStyle | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | object | The function will return inline style applicable to current selection. The function will return only those styles that are applicable to whole selection.|
| 12 | setBlockData | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content), object | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | The function will add block level meta-data.|
| 13 | getSelectedBlocksMetadata | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [Map](https://facebook.github.io/immutable-js/docs/#/Map) | The function will return map of block data of current block.|
| 14 | getSelectionEntity | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [Entity](https://facebook.github.io/draft-js/docs/api-reference-entity.html#content) | The function will return the Entity of current selection. Entity can not span multiple Blocks, method will check only first selected Block.|
| 15 | getEntityRange | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content), entityKey | object | The function will return the range of given Entity in currently selected Block. Entity can not span multiple Blocks, method will check only first selected Block.|
| 16 | handleNewLine | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) |[EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content), Event | The function will handle newline event in editor gracefully, it will insert `\n` for soft-new lines and remove selected text if any. |
| 17 | isListBlock | [ContentBlock](https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content) |  boolean | The function will return true is type of block is 'unordered-list-item' or 'ordered-list-item'.|
| 18 | changeDepth | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) , adjustment, maxDepth | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | Change the depth of selected Blocks by adjustment if its less than maxdepth.|
| 19 | getSelectionCustomInlineStyle | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) , Array<String> (of styles) | object | Function will return Map of custom inline styles applicable to current selection.|
| 20 | toggleCustomInlineStyle | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) , string (styleType), string(styleValue) | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | Toggle application of custom inline style to current selection.|
| 21 | removeAllInlineStyles | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | [EditorState](https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content) | The function will remove all inline styles of current selection.|

## License
MIT.
