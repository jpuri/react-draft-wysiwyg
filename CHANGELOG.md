# Changelog

## 22/11/2016 (1.0.0)
Initial stable release

## 29/11/2016 (1.1.1)
- #62: Toolbar behaves weird at times if toolbarOnFocus is set.
- #73: Making spell check configurable.
- #74: Allow user to use RTL.
- #69: Prefix 'rdw-' to all class names.
- #70: Avoid 'undefined' class name.
- #65: Cannot set bold/italics/underline without any text highlighted.

## 29/11/2016 (1.1.2)
- #35: use of tab for indenting is broken
- #30: As user types after link the new text should not be linkified.
- #92: Inputs in toolbar can not be focused.

## 1/12/2016 (1.1.3)
- #94: Support ReadOnly mode.
- #84: Developer to be able to update editor editor content.

## 5/12/2016 (1.2.0)
- #80: It should be possible for user to set size of embedded media.
- #75: Issue in image, embedded link.
- #66: Multiple toolbar modals open causes bugs.
- #31: Popups in toolbar should close when user clicks anywhere else on the page.
- #20: It should be possible for user to provide image size also.

## 7/12/2016 (1.2.1)
- #109: Link control behaving weird to events.
- #105: Adding placeholder support.
- #59: Mentions should get deleted on whole by single backspace.
- #61: Unlink should not get highlighted for mentions.

## 7/12/2016 (1.3.0)
- #56: Improvements in mention dropdown.

## 7/12/2016 (1.3.1)
- #115: uncaught TypeError: t.suggestionCallback is not a function.

## 10/12/2016 (1.3.2)
- #120: Toolbar modals closing prematurely.

## 14/12/2016 (1.3.3)
- #126: Rehydrating editor state with mention gives error.

## 25/12/2016
- #142: Selection state broken when using contentState and onContentStateChange props.
- #140: Request: customizable blockTypes.

## 22/01/2017
- #181: Ability to add custom block renderer.
- #183: Default toolbar order by config.

## 25/01/2017
- #176: image upload issue: drag and drop

## 10/02/2017
- #127: Support for hashtags.

## 09/07/2017 (1.10.2)
- #348: Reduce bindle size by making ImmutableJS external dependency.

## 14/07/2017 (1.10.5)
- #393: Lots of toolbar icons not working when multiple editors are rendered.

## 19/07/2017 (1.10.6)
- #247: When you drag and drop an image in the image uploader from another browser it crashes.
- #389: Hiding toolbar should not destroy the component.
- Fixing broken mentions.

## 20/07/2017 (1.10.7)
- #380: add support for alt field.
- #325: internalization of titles.

## 18/08/2017 (1.10.8)
- Support for code block.

## 10/09/2017 (1.10.8)
- #429: Copy paste issue in code block.
- #440: Limit pre and blockquote styles to only within the wysiwyg.
- Translations for Italian locale.

## 19/09/2017 (1.10.10)
- #451: Indent, outdent enabled only for lists.

## 20/09/2017 (1.10.11)
- #437: Disabling the toolbar buttons is not disabling the corresponding keyboard shortcut

## 23/09/2017 (1.10.12)
- #444: Images not copied when copying content from microsoft word.
- Translations for de and nl locales.

## 7/12/2017 (1.12.0)
- Adding custom component for rendering of mentions and hashtags.
- Using targetOption property to save target of link.

## 18/12/2017 (1.12.1)
- Changes in German Translations.
- Using linkify-it to linkify link targets.

## 25/12/2017 (1.12.2)
- #502, In some scenario, editor does not extract inline style when editorState is changed 

## 1/1/2018 (1.12.3)
# Adding UMD module bundling.