# Rich Text Editor

## Installing

The package can be installed from npm `@innovaccer/rich-text-editor`

```
$ npm install @innovaccer/rich-text-editor
```

## Getting started

Editor can be used as simple React Component:

```js
import { Editor } from "@innovaccer/rich-text-editor";
import '@innovaccer/rich-text-editor/dist/rich-text-editor.css';
<Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={this.onEditorStateChange}
/>;
```
