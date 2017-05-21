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
            3 className abd 3 style parameters are available for that:
            <ol>
              <li>wrapperClassName</li>
              <li>editorClassName</li>
              <li>toolbarClassName</li>
              <li>wrapperStyle</li>
              <li>editorStyle</li>
              <li>toolbarStyle</li>
            </ol>
          </div>
          <div>
            <code>
              {'<Editor'}<br />
              &nbsp;&nbsp; wrapperClassName="wrapper-class" <br />
              &nbsp;&nbsp; editorClassName="editor-class" <br />
              &nbsp;&nbsp; toolbarClassName="toolbar-class" <br />
              &nbsp;&nbsp; wrapperStyle={'{wrapperStyle}'} <br />
              &nbsp;&nbsp; editorStyle={'{editorStyle}'} <br />
              &nbsp;&nbsp; toolbarStyle={'{toolbarStyle}'} <br />
              {'/>'}<br />
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
          <div className="docs-desc top-margined">
            To hide the toolbar property toolbarHidden can be used.
          </div>
          <div>
            <code>
              {'<Editor toolbarHidden />'}
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Customizing toolbar
          </div>
          <div className="docs-desc">
            Toolbar in the editor is highly customisable property toolbar can be used for it. It allows:
            <ol>
              <li>Which of the set of options is available in the toolbar and in which order: inline, blockType, fontSize, fontFamily, list, textAlign, colorPicker, link, emoji, image, remove, history. This can be controlled by property options.</li>
              <li>For grouped options: inline, blockType, font-family, font-size, list, textAlign, history which sub-options are available.</li>
              <li>Grouping the options in drop-down.</li>
              <li>Overriding available options for font-family, in case you use a custom font-families you need to make sure that font is uploaded on the page.</li>
              <li>Overriding available options for font-sizes, again make sure font size is available in the browser.</li>
              <li>Overriding available options for colors, any valid color value string can be used.</li>
              <li>Overriding available options for emojis, unicode emojis can be used.</li>
              <li>Setting default size property for image and embeds.</li>
              <li>Using custom icons in the toolbar.</li>
              <li>Applying custom styles to the toolbar options using CSS classes.</li>
              <li>Using a custom react component for a toolbar button / popup.</li>
            </ol>
            <a href="https://github.com/jpuri/react-draft-wysiwyg/blob/master/js/src/config/defaultToolbar.js">Here</a> is the complete toolbar property object, user can provide any or all of these properties.
            For editor to reflect the changes in this object you need to make sure that you do not mutate it but rather create a new copy.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Using custom react component for toolbar options.
          </div>
          <div className="docs-desc">
            Custom react components can be used for exiting toolbar options. For an example check <a href="https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/ColorPic/index.js">here</a>.
            Custom components are passed following 5 properties:
          </div>
          <div>
            <code>
              {'<ColorPickerComponent'}<br />
              &nbsp;&nbsp;{'config={config}'}<br />
              &nbsp;&nbsp;{'translations={translations}'}<br />
              &nbsp;&nbsp;{'onChange={this.toggleColor}'}<br />
              &nbsp;&nbsp;{'expanded={expanded}'}<br />
              &nbsp;&nbsp;{'onExpandEvent={this.onExpandEvent}'}<br />
              &nbsp;&nbsp;{'doExpand={this.doExpand}'}<br />
              &nbsp;&nbsp;{'doCollapse={this.doCollapse}'}<br />
              &nbsp;&nbsp;{'currentState={{ color: currentColor, bgColor: currentBgColor }}'}<br />
              {'/>'}<br />
            </code>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Adding custom options to toolbar.
          </div>
          <div className="docs-desc">
            Property toolbarCustomButtons can be used to add custom options to the toolbar.
            It takes an array of react components and adds the options in toolbar. Properties editorState and onChange are added to the components.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Internationalizing toolbar.
          </div>
          <div className="docs-desc">
            Toolbar labels can be internationalized using property localization. Localization has 2 parameters: locale and translations. <br/>
            User can either provide locale or a JavaScript object for translations. Currently supported locales are: English('en'), French('fr'), Chinese('zh') and Russian('ru').<br/>
            For an example of translations check <a href="https://github.com/jpuri/react-draft-wysiwyg/blob/master/js/src/i18n/en.js">here</a>.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Custom block rendering.
          </div>
          <div className="docs-desc">
            Property customBlockRenderFunc can be used to pass function for custom rendering of blocks, <a  target="_blank" rel="noopener noreferrer" href="https://facebook.github.io/draft-js/docs/advanced-topics-block-components.html#custom-block-components">ref.</a>
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Custom decorators.
          </div>
          <div className="docs-desc">
            Property customDecorators can be used to pass an array of custom decorators.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            Image
          </div>
          <div className="docs-sub-label">
            Uploading Image
          </div>
          <div className="docs-desc">
            If callback function uploadCallback is passed in toolbar configuration property, image control shows the option to upload image.
            The callback should return a promise.
          </div>
          <div>
            <code>
              {'export default function uploadCallback(file) {'}<br />
              &nbsp;&nbsp;return new Promise(<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'(resolve, reject) => {'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'resolve({ data: { link: "http://dummy_image_src.com" } });'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
              &nbsp;&nbsp;);<br />
              {'}'}<br />
              {'<Editor toolbar={{ image: { uploadCallback: this.uploadCallback }}}} />'}
            </code>
          </div>
          <div className="docs-desc top-margined">
            PLEASE NOTE: Property uploadCallback of editor component has been deprecated and will be removed in release 2.0. Its  now recommended to pass uploadCallback inside toolbar property.
          </div>
          <div className="docs-sub-label">
            Set DefaultSize for images
          </div>
          <div className="docs-desc">
            Default image size is (height: auto, width: 100%). This can be overridden using property defaultSize in toolbar configurations.
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
              &nbsp;&nbsp;&nbsp;&nbsp;caseSensitive: false, <br />
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
            Enabling hashtags
          </div>
          <div className="docs-desc">
            Hashtags can be enabled by passing hashtag property to the editor.
          </div>
          <div>
            <code>
              {'<Editor'}<br />
              &nbsp;&nbsp;{'wrapperClassName="wrapper-class"'} <br />
              &nbsp;&nbsp;{'editorClassName="editor-class"'} <br />
              &nbsp;&nbsp;{'toolbarClassName="toolbar-class"'} <br />
              &nbsp;&nbsp;{'hashtag={{'} <br />
              &nbsp;&nbsp;&nbsp;&nbsp;separator: {"' '"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;trigger: {"'#'"}, <br />
              &nbsp;&nbsp;&nbsp;&nbsp;className: {"'hashtag-className'"},<br />
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
            DraftJS Properties
          </div>
          <div className="docs-desc">
            Properties like spellCheck, readOnly, tabIndex, placeholder, stripPastedStyles, etc are passed over to the DraftJS editor component.
          </div>
        </div>
        <div className="docs-section">
          <div className="docs-label">
            DOM Event Callbacks
          </div>
          <div className="docs-desc">
            Editor provides onFocus, onBlur and onTab callbacks.<br />
            Default behavior of editor on tab is to change depth of block if current block is of type list.
            If onTab callback returns true editor assumes that Tab has been handled by the callback and the default behavior is not executed.
          </div>
          <div>
            <code>
              {'<Editor onFocus={myFocusCallback} onBlur={myBlurCallback} onTab={myTabCallback} />'}
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
            HTML to Editor Content conversion
          </div>
          <div className="docs-desc">
            Add-on library html-to-draftjs provides the option to convert HTML generated by react-draft-wysiwyg back to draftJS ContentState which can be used to initialize the Editor.<br />
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
