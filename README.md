# React Draft Wysiwyg

A Wysiwyg editor built using ReactJS and DeaftJS libraries.
[Demo Page](https://jpuri.github.io/react-draft-wysiwyg).

![](http://i.imgur.com/tU7kJ6i.gif)

## Features
- Configurable toolbar with option to add/remove controls.
- Option to change styles and icons in the toolbar.
- Option to show toolbar only when editor is focused.
- Support for inline styles: Bold, Italic, Underline, StrikeThrough, Code, Subscript, Superscript.
- Support for block types: Paragraph, H1 - H6, Blockquote.
- Support for setting font-size and font-family.
- Support for ordered / unordered lists and indenting.
- Support for text-alignment.
- Support for coloring text or background.
- Support for adding / editing links
- Choice of more than 150 emojis.
- Support for mentions.
- Support for adding / uploading images.
- Support for Embedded links.
- Option provided to remove added styling.
- Option of undo and redo.
- Support to convert Editor Content to HTML, JSON, Markdown.

## Installing
The package can be installed from npm `react-draft-wysiwyg`

## Getting started
Editor can be used as simple React Component:
```
<Editor
  toolbarClassName="home-toolbar"
  wrapperClassName="home-wrapper"
  editorClassName="home-editor"
  onChange={this.onEditorChange}
  uploadCallback={uploadImageCallBack}
/>
```

## Docs
For more documentation check [here](https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp).

## Questions Discussions
For discussions join public channel #rd-wysiwyg in [DraftJS Slack Organization](https://draftjs.herokuapp.com/).

## Thanks
Original motivation and sponsorship for this work came from [iPaoo](http://www.ipaoo.com/). I am thankful to them for allowing the Editor to be open-sourced.

## License
MIT.
