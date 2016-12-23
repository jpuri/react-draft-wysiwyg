import React, { Component } from 'react';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Demo2 extends Component {

  state: any = {
    editorContent: undefined,
  };

  onEditorChange: Function = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  render() {
    return (
      <div className="docs-root">
        <div className="docs-section">
          <div className="docs-label">
            Installing
          </div>
          <div className="docs-desc">Package can be installed from node package manager using npm or yarn commands.</div>
          <div>
            <code>
              npm install -S react-draft-wysiwyg<br />
              yarn add react-draft-wysiwyg
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Using editor component
          </div>
          <div className="docs-desc">Editor can be simply imported and used as a React Component. Make sure to also include react-draft-wysiwyg.css from npm distributable.</div>
          <div>
            <code>
              {'import { Editor } from \'react-draft-wysiwyg\';'}<br />
              {'import \'react-draft-wysiwyg.css\';'}<br />
              {'<Editor />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Styling Editor
          </div>
          <div className="docs-desc">
            The editor by default will have uses DraftJS editor as it is without
            any styling and it will occupy 100% width of container.
            Some styling to add border to editor and set width will be nice.
            3 className parameters are available for that:
            <ol>
              <li>wrapperClassName</li>
              <li>editorClassName</li>
              <li>toolbarClassName</li>
            </ol>
          </div>
          <div>
            <code>
              {'<Editor'}<br />
              &nbsp;&nbsp; wrapperClassName="wrapper-class" <br />
              &nbsp;&nbsp; editorClassName="editor-class" <br />
              &nbsp;&nbsp; toolbarClassName="toolbar-class" <br />
              {'/>'}<br />
              .editor-class {'{'}<br />
              &nbsp;&nbsp; height: 400px; <br />
              &nbsp;&nbsp; border: 1px solid #F1F1F1; <br />
              &nbsp;&nbsp; padding: 5px; <br />
              &nbsp;&nbsp; border-radius: 2px; <br />
              {'}'}
              .toolbar-class {'{'}<br />
              &nbsp;&nbsp; width: 100%; <br />
              {'}'}
              .wrapper-class {'{'}<br />
              &nbsp;&nbsp; {'// any required styling'} <br />
              {'}'}
            </code>
          </div>
          <div className="docs-desc top-margined">
            Toolbar can be styles using toolbar property, detailed below. <br />
            For more detailed styling, css classes in react-draft-wysiwyg.css can be overriden.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Controlled / Un-Controlled editor component
          </div>
          <div className="docs-sub-label">
            Using <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content"
            >
              EditorState
            </a>
          </div>
          <div className="docs-desc">
            To use editor as controlled component properties editorState and onEditorStateChange can be used.
            editorState is instance of&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content"
            >
              EditorState
            </a>
            , onEditorStateChange is callback that receives as argument an instance of&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content"
            >
              EditorState
            </a>.
          </div>
          <div>
            <code>
              {'onEditorStateChange = (editorState) => {'}<br />
              &nbsp;&nbsp;{'this.setState({'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'editorState,'}<br />
              &nbsp;&nbsp;{'});'}<br />
              {'}'}<br />
              {'render() {'}<br />
              &nbsp;&nbsp;{'const { editorState } = this.state;'}<br />
              &nbsp;&nbsp;{'return (<Editor'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'editorState={editorState}'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'onEditorStateChange={this.onEditorStateChange}'}<br />
              &nbsp;&nbsp;{'/>)'}<br />
              {'}'}<br />
            </code>
          </div>
          <div className="docs-desc top-margined">
            To use editor as un-controlled component property defaultEditorState can be used. defaultEditorState is also an instance of&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-editor-state.html#content"
            >
              EditorState
            </a>
          </div>
          <div>
            <code>
              {'<Editor defaultEditorState={defaultEditorState} />'}
            </code>
          </div>
          <div className="docs-sub-label">
            Using <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content"
            >
              RawDraftContentState.
            </a>
          </div>
          <div className="docs-desc">
            Properties contentState can be used to initialize / reset editor content. ContentState is instance of&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content"
            >
              RawDraftContentState
            </a>.
            onChange is callback that receives as argument an instance of&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content"
            >
              RawDraftContentState
            </a>
            &nbsp;whenever there is change in editor state.<br />
            Any change in contentState will change editor content. But its not recommended to use contentState to achieve controlled behavior by editor.
          </div>
          <div>
            <code>
              {'onContentStateChange = (contentState) => {'}<br />
              &nbsp;&nbsp;{'this.setState({'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'contentState,'}<br />
              &nbsp;&nbsp;{'});'}<br />
              {'}'}<br />
              {'render() {'}<br />
              &nbsp;&nbsp;{'const { contentState } = this.state;'}<br />
              &nbsp;&nbsp;{'return (<Editor'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'contentState={contentState}'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'onContentStateChange={this.onChange}'}<br />
              &nbsp;&nbsp;{'/>)'}<br />
              {'}'}<br />
            </code>
          </div>
          <div className="docs-desc top-margined">
            *** Using onChange has performance over-head due to EditorState conversion to RawDraftContentState on each change.
          </div>
          <div className="docs-desc top-margined">
            PLEASE NOTE: properties initialContentState, defaultContentState, onContentStateChange have been deprecated and they will be removed in Release 2.0.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Control show / hide of toolbar
          </div>
          <div className="docs-desc">
            By default toolbar is always visible.
            To make it visible only when editor is focused property toolbarOnFocus can be used.
          </div>
          <div>
            <code>
              {'<Editor toolbarOnFocus />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Customizing toolbar
          </div>
          <div className="docs-desc">
            Toolbar in the editor is highly customisable property toolbar can be used for it. It allows configuring:
            <ol>
              <li>which if the set of of options is available in the toolbar: inline, blockType, fontSize, fontFamily, list, textAlign, colorPicker, link, emoji, image, remove, history</li>
              <li>for grouped options: inline, list, textAlign, history which sub-options are available</li>
              <li>which images are used for options</li>
              <li>CSS classes that are applied to the options and option group</li>
              <li>showing option groups in drop-down</li>
            </ol>
            Below is the complete toolbar property object, user can provide any or all of these properties.
            For editor to reflect the changes in this object you need to make sure that you do not mutate it but rather create a new copy.
          </div>
          <div>
            <code>
              {'{'} <br />
              &nbsp;&nbsp;options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', <br />
              &nbsp;&nbsp;&nbsp;&nbsp;'link', 'embedded', 'emoji', 'image', 'remove', 'history'], <br />
              &nbsp;&nbsp;inline: {'{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;inDropdown: false, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;className: undefined, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript'], <br />
              &nbsp;&nbsp;&nbsp;&nbsp;bold: {'{ icon: bold, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;italic: {'{ icon: italic, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;underline: {'{ icon: underline, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;strikethrough: {'{ icon: strikethrough, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;code: {'{ icon: code, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;superscript: {'{ icon: superscript, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;subscript: {'{ icon: subscript, className: undefined }'}, <br />
              &nbsp;&nbsp;{'}'}, <br />
              &nbsp;&nbsp;blockType: {'{ className: undefined, dropdownClassName: undefined }'}, <br />
              &nbsp;&nbsp;fontSize: {'{ icon: fontSize, className: undefined }'}, <br />
              &nbsp;&nbsp;fontFamily: {'{ className: undefined, dropdownClassName: undefined }'}, <br />
              &nbsp;&nbsp;list: {'{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;inDropdown: false, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;className: undefined, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options: {['unordered', 'ordered', 'indent', 'outdent']}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;unordered: {'{ icon: unordered, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;ordered: {'{ icon: ordered, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;indent: {'{ icon: indent, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;outdent: {'{ icon: outdent, className: undefined }'}, <br />
              &nbsp;&nbsp;{'}'}, <br />
              &nbsp;&nbsp;textAlign: {'{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;inDropdown: false, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;className: undefined, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options: {['left', 'center', 'right', 'justify']}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;left: {'{ icon: left, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;center: {'{ icon: center, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;right: {'{ icon: right, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;justify: {'{ icon: justify, className: undefined }'}, <br />
              &nbsp;&nbsp;{'}'}, <br />
              &nbsp;&nbsp;colorPicker: {'{ icon: color, className: undefined, popClassName: undefined }'}, <br />
              &nbsp;&nbsp;link: {'{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;inDropdown: false, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;className: undefined, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;popClassName: undefined, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options: {['link', 'unlink']}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;link: {'{ icon: link, className: undefined }'},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;unlink: {'{ icon: unlink, className: undefined }'}, <br />
              &nbsp;&nbsp;{'}'}, <br />
              &nbsp;&nbsp;embedded: {'{ icon: image, className: undefined, popClassName: undefined }'}, <br />
              &nbsp;&nbsp;emoji: {'{ icon: emoji, className: undefined, popClassName: undefined }'}, <br />
              &nbsp;&nbsp;image: {'{ icon: image, className: undefined, popClassName: undefined }'}, <br />
              &nbsp;&nbsp;remove: {'{ icon: eraser, className: undefined }'}, <br />
              &nbsp;&nbsp;history: {'{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;inDropdown: false, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;className: undefined, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options: {['undo', 'redo']}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;undo: {'{ icon: undo, className: undefined }'}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;redo: {'{ icon: redo, className: undefined }'}, <br />
              &nbsp;&nbsp;{'}'}, <br />
              {'}'} <br />
              <br />
              {'<Editor toolbar={toolbar} />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Uploading Image
          </div>
          <div className="docs-desc">
            If property uploadCallback is passed image control shows the option to upload image.
            The callback should return a promise. When resolved this promise should provide an object with a link property whose value is image source(url).
          </div>
          <div>
            <code>
              {'export default function uploadImageCallBack(file) {'}<br />
              &nbsp;&nbsp;return new Promise(<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'(resolve, reject) => {'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'resolve({ link: "http://dummy_image_src.com" });'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
              &nbsp;&nbsp;);<br />
              {'}'}<br />
              {'<Editor uploadCallback={this.uploadCallback} />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Enabling mentions
          </div>
          <div className="docs-desc">
            Mentions can be enabled by passing mention property to the editor.
          </div>
          <div>
            <code>
              {'<Editor'}<br />
              &nbsp;&nbsp;{'wrapperClassName="wrapper-class"'} <br />
              &nbsp;&nbsp;{'editorClassName="editor-class"'} <br />
              &nbsp;&nbsp;{'toolbarClassName="toolbar-class"'} <br />
              &nbsp;&nbsp;{'mention={{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;separator: {"' '"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;trigger: {"'@'"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"mentionClassName: 'mention-className'"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"dropdownClassName: 'dropdown-className'"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"optionClassName: 'option-className'"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;suggestions: [ <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'apple', value: 'apple', url: 'apple' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'banana', value: 'banana', url: 'banana' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'cherry', value: 'cherry', url: 'cherry' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'durian', value: 'durian', url: 'durian' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'eggfruit', value: 'eggfruit', url: 'eggfruit' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'fig', value: 'fig', url: 'fig' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'grapefruit', value: 'grapefruit', url: 'grapefruit' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"{ text: 'honeydew', value: 'honeydew', url: 'honeydew' }"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;], <br />
              &nbsp;&nbsp;{'}}'} <br />
              {'/>'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Embedded links
          </div>
          <div className="docs-desc">
            Embedded link can be added to the editor using embedded control, it shows-up in the editor in fixed dimentions. <br />
            I definitely plan to improve it in future.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            RTL and Text Alignment
          </div>
          <div className="docs-desc">
            DraftJS library has out of box sopport for RTL, it decides text-direction using bidi algorithm. It works at block-level. <br /><br />
            Property 'textAlignment' can be used to force text-alignment in a particular direction. It can have values 'left', 'right' and 'center'.
            It will over-ride the results of bidi-algorigthm. This property will be applicable to all blocks.
            Toobar option of text-alignment will override 'textAlignment' property also at block level.
          </div>
          <div>
            <code>
              {'<Editor textAlignment="left" />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Spell check
          </div>
          <div className="docs-desc">
            Default browser spell-check can be enabled in the editor using property spellCheck, it can have value true, false. false by default.
          </div>
          <div>
            <code>
              {'<Editor spellCheck />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Read Only
          </div>
          <div className="docs-desc">
            Using this property editor can be turned read only, it can have value true, false. false by default.
          </div>
          <div>
            <code>
              {'<Editor readOnly />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            TabIndex
          </div>
          <div className="docs-desc">
            TabIndex can also be passed as property.
          </div>
          <div>
            <code>
              {'<Editor tabIndex={1} />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            PlaceHolder
          </div>
          <div className="docs-desc">
            PlaceHolder can also be passed as property.
          </div>
          <div>
            <code>
              {'<Editor placeholder="Enter text..." />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            DOM Event Callbacks
          </div>
          <div className="docs-desc">
            Editor provides onFocus and onBlur callbacks.
          </div>
          <div>
            <code>
              {'<Editor onFocus={myFocusCallback}  onBlur={myBlurCallback} />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Generating HTML / Markdown
          </div>
          <div className="docs-desc">
            Two add-on libraries have been made for this purpose: draftjs-to-html, draftjs-tomarkdown. These are also available for download from npm. <br />
            Raw editor content can be converted to HTML or markdown simply by calling methods draftToHtml, draftToMarkdown respectively.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            WAI-ARIA Support
          </div>
          <div className="docs-desc">
            All ARIA props supported by DraftJS editor are available in react-draft-wysiwyg <a target="_blank" rel="noopener noreferrer" href="https://facebook.github.io/draft-js/docs/api-reference-editor.html#aria-props">Ref</a>.
            In addition editor and all option in toolbar have other ARIA attributes also added with pre-configured values.
          </div>
        </div>
        <div className="docs-text">
          For code examples you can check <a href="https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/index.js">here</a>.
        </div>
      </div>
    );
  }
}
