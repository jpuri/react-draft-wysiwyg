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
            Using editor component.
          </div>
          <div className="docs-desc">Editor can be simply imported and used as a React Component.</div>
          <div>
            <code>
              {'import { Editor } from \'react-draft-wysiwyg\';'}<br />
              {'<Editor />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Styling Editor on page.
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
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Initializing editor content
          </div>
          <div className="docs-desc">Editor state can be initialized using property initialContentState its is instance of&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content"
            >
              RawDraftContentState.
            </a>
          </div>
          <div>
            <code>
              {'<Editor initialContentState={contentState} />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Saving editor state
          </div>
          <div className="docs-desc">Callback property onChange can be used to save editor state. Its returns an instance of&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content"
            >
              RawDraftContentState.
            </a>
            &nbsp;Editor is UNCONTROLLED component.
            Making it controlled can effect performance.
            If provided this callback is called each time after editor state changes.
          </div>
          <div>
            <code>
              {'onEditorChange: Function = (editorContent) => {'} <br />
              &nbsp;... <br />
              {'};'} <br />
              <br />
              {'<Editor onChange={this.onEditorChange} />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Control show/hide of toolbar
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
              <li>for image options it allows image upload callback</li>
            </ol>
            Below is the complete toolbar property object, user can provide any or all of these properties.
            For editor to reflect the changes in this object you need to make sure that you do not mutate it but rather create a new copy.
          </div>
          <div>
            <code>
              {'{'} <br />
              &nbsp;&nbsp;options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', <br />
              &nbsp;&nbsp;&nbsp;&nbsp;'link', 'emoji', 'image', 'remove', 'history'], <br />
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
              &nbsp;&nbsp;colorPicker: {'{ icon: color, className: undefined }'}, <br />
              &nbsp;&nbsp;link: {'{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;inDropdown: false, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;className: undefined, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;options: {['link', 'unlink']}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;link: {'{ icon: link, className: undefined }'},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;unlink: {'{ icon: unlink, className: undefined }'}, <br />
              &nbsp;&nbsp;{'}'}, <br />
              &nbsp;&nbsp;emoji: {'{ icon: emoji, className: undefined }'}, <br />
              &nbsp;&nbsp;image: {'{ icon: image, uploadCallback: undefined, className: undefined }'}, <br />
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
      </div>
    );
  }
}
