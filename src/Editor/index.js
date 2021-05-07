import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Editor as RichTextEditor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  getDefaultKeyBinding,
  DefaultDraftBlockRenderMap
} from 'draft-js';
import {
  changeDepth,
  handleNewLine,
  blockRenderMap,
  getCustomStyleMap,
  extractInlineStyle,
  getSelectedBlocksType,
} from 'draftjs-utils';
import { htmlToState, stateToHTML } from '../utils/utils';
import { Map } from 'immutable';
import classNames from 'classnames';
import ModalHandler from '../event-handler/modals';
import FocusHandler from '../event-handler/focus';
import KeyDownHandler from '../event-handler/keyDown';
import SuggestionHandler from '../event-handler/suggestions';
import blockStyleFn from '../utils/BlockStyle';
import { mergeRecursive } from '../utils/toolbar';
import { hasProperty, filter } from '../utils/common';
import { handlePastedText } from '../utils/handlePaste';
import Controls from '../controls';
import getLinkDecorator from '../decorators/Link';
import getMentionDecorators from '../decorators/Mention';
// import getHashtagDecorator from '../decorators/HashTag';
import getBlockRenderFunc from '../renderer';
import defaultToolbar from '../config/defaultToolbar';
import localeTranslations from '../i18n';
import { Heading, Text } from '@innovaccer/design-system';
import { toolbarShape } from '../types/toolbar';
import '../../css/Draft.css';
import '../../css/src/components';

class Editor extends Component {
  constructor(props) {
    super(props);
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    const wrapperId = props.wrapperId
      ? props.wrapperId
      : Math.floor(Math.random() * 10000);
    this.wrapperId = `Editor-wrapper-${wrapperId}`;
    this.modalHandler = new ModalHandler();
    this.focusHandler = new FocusHandler();

    this.blockRendererFn = getBlockRenderFunc(
      {
        isReadOnly: true,
        isImageAlignmentEnabled: this.isImageAlignmentEnabled,
        getEditorState: this.getEditorState,
        onChange: this.onChange,
      },
      //props.customBlockRenderFunc
    );
    this.editorProps = this.filterEditorProps(props);
    this.customStyleMap = this.getStyleMap(props);
    this.compositeDecorator = this.getCompositeDecorator(toolbar);
    const editorState = this.createEditorState(this.compositeDecorator);
    extractInlineStyle(editorState);

    this.state = {
      editorState,
      toolbar,
      editorFocused: false,
      linkPopoverOpen: false,
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) this.editor.focus();
    this.modalHandler.init(this.wrapperId);
  }
  // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  componentDidUpdate(prevProps) {

    if (prevProps === this.props) return;
    const newState = {};
    const { editorState, contentState } = this.props;
    if (!this.state.toolbar) {
      const toolbar = mergeRecursive(defaultToolbar, toolbar);
      newState.toolbar = toolbar;
    }
    if (
      hasProperty(this.props, 'editorState') &&
      editorState !== prevProps.editorState
    ) {
      if (editorState) {
        newState.editorState = EditorState.set(editorState, {
          decorator: this.compositeDecorator,
        });
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    } else if (
      hasProperty(this.props, 'contentState') &&
      contentState !== prevProps.contentState
    ) {
      if (contentState) {
        const newEditorState = this.changeEditorState(contentState);
        if (newEditorState) {
          newState.editorState = newEditorState;
        }
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    }
    if (
      prevProps.editorState !== editorState ||
      prevProps.contentState !== contentState
    ) {
      extractInlineStyle(newState.editorState);
    }
    if (Object.keys(newState).length) this.setState(newState);
    this.editorProps = this.filterEditorProps(this.props);
    this.customStyleMap = this.getStyleMap(this.props);
  }

  onEditorBlur = () => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorFocus = event => {
    const { onFocus } = this.props;
    this.setState({
      editorFocused: true,
    });
    const editFocused = this.focusHandler.isEditorFocused();
    if (onFocus && editFocused) {
      onFocus(event);
    }
  };

  onEditorMouseDown = () => {
    this.focusHandler.onEditorMouseDown();
  };

  keyBindingFn = event => {
    if (event.key === 'Tab') {
      const { onTab } = this.props;
      // if (!onTab || !onTab(event)) {
      const editorState = changeDepth(
        this.state.editorState,
        event.shiftKey ? -1 : 1,
        4
      );
      if (editorState && editorState !== this.state.editorState) {
        this.onChange(editorState);
        event.preventDefault();
      }
      // }
      if (onTab) onTab(event, editorState)
      return null;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (SuggestionHandler.isOpen()) {
        event.preventDefault();
      }
    }
    return getDefaultKeyBinding(event);
  };

  onToolbarFocus = event => {
    const { onFocus } = this.props;
    if (onFocus && this.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  onWrapperBlur = event => {
    const { onBlur } = this.props;

    if (onBlur && this.focusHandler.isEditorBlur(event)) {
      onBlur(event, this.getEditorState());
    }
  };

  onChange = (editorState, type) => {
    const { readOnly, onEditorStateChange } = this.props;
    if (
      !readOnly &&
      !(
        getSelectedBlocksType(editorState) === 'atomic' &&
        editorState.getSelection().isCollapsed
      )
    ) {
      if (onEditorStateChange) {
        onEditorStateChange(editorState, this.props.wrapperId);
      }
      if (!hasProperty(this.props, 'editorState')) {
        this.setState({ editorState }, this.afterChange(editorState));
      } else {
        this.afterChange(editorState);
      }
    }
  };

  setWrapperReference = ref => {
    this.wrapper = ref;
  };

  setEditorReference = ref => {
    if (this.props.editorRef) {
      this.props.editorRef(ref);
    }
    this.editor = ref;
  };

  onCloseLinkPopover = () => {
    this.setState({
      linkPopoverOpen: false,
    });
  };

  onEditLink = () => {
    this.setState({
      ...this.state,
      linkPopoverOpen: true,
    });
  };

  getCompositeDecorator = toolbar => {
    const decorators = [
      //...this.props.customDecorators,
      getLinkDecorator({
        focusHandler: this.focusHandler,
        getEditorState: this.getEditorState,
        onChange: this.onChange,
        onEditLink: this.onEditLink,
      }),
    ];
    if (this.props.mention) {
      decorators.push(
        ...getMentionDecorators({
          ...this.props.mention,
          onChange: this.onChange,
          getEditorState: this.getEditorState,
          getSuggestions: this.getSuggestions,
          getWrapperRef: this.getWrapperRef,
          modalHandler: this.modalHandler,
        })
      );
    }
    // if (this.props.hashtag) {
    //   decorators.push(getHashtagDecorator(this.props.hashtag));
    // }

    return new CompositeDecorator(decorators);
  };

  getWrapperRef = () => this.wrapper;

  getEditorState = () => this.state ? this.state.editorState : null;

  getSuggestions = () => this.props.mention && this.props.mention.suggestions;

  afterChange = editorState => {

    setTimeout(() => {
      const { onContentStateChange } = this.props;
      // if (onChange) {
      //   onChange(convertToRaw(editorState.getCurrentContent()));
      // }
      if (onContentStateChange) {
        onContentStateChange(convertToRaw(editorState.getCurrentContent()));
      }
    });
  };

  isReadOnly = () => this.props.readOnly;

  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled;

  createEditorState = compositeDecorator => {
    let editorState;
    if (hasProperty(this.props, 'editorState')) {
      if (this.props.editorState) {
        editorState = EditorState.set(this.props.editorState, {
          decorator: compositeDecorator,
        });
      }
    } else if (hasProperty(this.props, 'defaultEditorState')) {
      if (this.props.defaultEditorState) {
        editorState = EditorState.set(this.props.defaultEditorState, {
          decorator: compositeDecorator,
        });
      }
    } else if (hasProperty(this.props, 'contentState')) {
      if (this.props.contentState) {
        const contentState = convertFromRaw(this.props.contentState);
        editorState = EditorState.createWithContent(
          contentState,
          compositeDecorator
        );
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    } else if (
      hasProperty(this.props, 'defaultContentState')
    ) {
      let contentState =
        this.props.defaultContentState;
      if (contentState) {
        contentState = convertFromRaw(contentState);
        editorState = EditorState.createWithContent(
          contentState,
          compositeDecorator
        );
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  };

  filterEditorProps = props =>
    filter(props, [
      'onChange',
      'onEditorStateChange',
      'onContentStateChange',
      'initialContentState',
      'defaultContentState',
      'contentState',
      'editorState',
      'defaultEditorState',
      // 'locale',
      // 'localization',
      //'toolbarOnFocus',
      'toolbar',
      'toolbarCustomButtons',
      'toolbarClassName',
      'editorClassName',
      //'toolbarHidden',
      'wrapperClassName',
      //'toolbarStyle',
      'editorStyle',
      //'wrapperStyle',
      'uploadCallback',
      'onFocus',
      'onBlur',
      'onTab',
      'mention',
      'hashtag',
      'ariaLabel',
      // 'placeholder',
      'customBlockRenderFunc',
      'customDecorators',
      'handlePastedText',
      'customStyleMap',
    ]);

  getStyleMap = props => ({ ...getCustomStyleMap(), ...props.customStyleMap });

  changeEditorState = contentState => {
    const newContentState = convertFromRaw(contentState);
    let { editorState } = this.state;
    editorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    editorState = EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  focusEditor = () => {
    setTimeout(() => {
      this.editor.focus();
    });
  };

  handleKeyCommand = command => {
    const {
      editorState,
      toolbar: { textDecoration },
    } = this.state;
    if (textDecoration && textDecoration.options.indexOf(command) >= 0) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
    }
    return false;
  };

  handleReturn = event => {
    if (SuggestionHandler.isOpen()) {
      return true;
    }
    const { editorState } = this.state;
    const newEditorState = handleNewLine(editorState, event);
    if (newEditorState) {
      this.onChange(newEditorState);
      return true;
    }
    return false;
  };

  handlePastedTextFn = (text, html) => {
    const { editorState } = this.state;
    const {
      handlePastedText: handlePastedTextProp,
    } = this.props;

    if (handlePastedTextProp) {
      return handlePastedTextProp(text, html, editorState, this.onChange);
    }
    return handlePastedText(text, html, editorState, this.onChange);
  };

  preventDefault = event => {
    if (
      event.target.tagName === 'INPUT' ||
      event.target.tagName === 'LABEL' ||
      event.target.tagName === 'TEXTAREA'
    ) {
      this.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  blockRenderMap = DefaultDraftBlockRenderMap.merge(
    Map({
      'header-one': {
        wrapper: <Heading size="xxl">{this.props.children}</Heading>
      },
      'header-two': {
        wrapper: <Heading size="xl">{this.props.children}</Heading>
      },
      'header-three': {
        wrapper: <Heading size="l">{this.props.children}</Heading>
      },
      'header-four': {
        wrapper: <Heading size="m">{this.props.children}</Heading>
      },
      'unstyled': {
        element: 'span',
        wrapper: <Text>{this.props.children}</Text>
      }
    })
  );

  render() {
    const { editorState, editorFocused, toolbar } = this.state;

    const {
      // locale,
      // localization: { locale: newLocale, translations },
      //toolbarCustomButtons,,
      toolbarClassName,
      editorClassName,
      wrapperClassName,
      editorStyle,
      ariaLabel,
      mention,
    } = this.props;

    const controlProps = {
      linkPopoverOpen: this.state.linkPopoverOpen,
      onCloseLinkPopover: this.onCloseLinkPopover,
      modalHandler: this.modalHandler,
      editorState,
      onChange: this.onChange,
      // translations: {
      //   ...localeTranslations[locale || newLocale],
      //   ...translations,
      // },
    };

    const ToolbarClass = classNames({
      ['Editor-toolbar']: true,
    }, toolbarClassName);

    const WrapperClass = classNames({
      ['Editor-wrapper']: true,
    }, wrapperClassName);

    const EditorClass = classNames({
      ['Editor']: true,
    }, editorClassName);

    return (
      <div
        id={this.wrapperId}
        className={WrapperClass}
        onClick={this.modalHandler.onEditorClick}
        onBlur={this.onWrapperBlur}
      >
        <div
          className={ToolbarClass}
          onMouseDown={this.preventDefault}
          aria-label="Editor-toolbar"
          onFocus={this.onToolbarFocus}
        >
          {toolbar.options.map((opt, index) => {
            const Control = Controls[opt];
            const config = toolbar[opt];
            return (
              <Control
                key={index}
                {...controlProps}
                config={config}
                mention={mention}
                className="Editor-toolbar-options"
              />
            );
          })}
        </div>
        <div
          ref={this.setWrapperReference}
          className={EditorClass}
          style={editorStyle}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}
        >
          <RichTextEditor
            ref={this.setEditorReference}
            keyBindingFn={this.keyBindingFn}
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={blockStyleFn}
            customStyleMap={this.getStyleMap(this.props)}
            handleReturn={this.handleReturn}
            handlePastedText={this.handlePastedTextFn}
            blockRendererFn={this.blockRendererFn}
            handleKeyCommand={this.handleKeyCommand}
            ariaLabel={ariaLabel}
            blockRenderMap={this.blockRenderMap}
            {...this.editorProps}
          />
        </div>
      </div>
    );
  }
}

Editor.utils = {
  EditorState,
  ContentState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  htmlToState,
  stateToHTML
};

Editor.propTypes = {
  /**
   * Used to enable mention in the editor
   * 
   * | Name | Description | Default |
   * | --- | --- | --- |
   * | seperator | Character that separates a mention from word preceding it | '  ' |
   * | trigger | Character that causes mention suggestions to appear, | '@' |
   * | suggestion | Properties: label, value, icon | |
   * | chipOptions | [Design System Chip Props](https://innovaccer.github.io/design-system/?path=/docs/atoms-chip--all) | |
   * | dropdownOptions | Properties: dropdownClassName, customOptionRenderer = (suggestion, active, index) => React.ReactNode | |
   */
  mention: PropTypes.shape({
    separator: PropTypes.string,
    trigger: PropTypes.string,
    chipOptions: PropTypes.object,
    dropdownOptions: PropTypes.shape({
      dropdownClassName: PropTypes.string,
      customOptionRenderer: PropTypes.func
    }),
    suggestions: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      icon: PropTypes.string
    })
  }),
  /**
   * The EditorState object is a complete snapshot of the state of the editor, including contents, cursor, and undo/redo history.
   * 
   * All changes to content and selection within the editor will create new EditorState objects.
   * 
   * [Read More about Editor State](https://draftjs.org/docs/api-reference-editor-state)
   * 
   * **Works in case of controlled `Editor`**
   */
  editorState: PropTypes.object,
  /**
   * Callback function called each time there is change in state of editor
   * 
   * onChange: (editorState: EditorState) => void;
   */
  onEditorStateChange: PropTypes.func,
  /**
   * Property to initialize editor state once when its created.
   * 
   * **Works in case of uncontrolled `Editor`**
   */
  defaultEditorState: PropTypes.object,
  /**
   * Callback function called each time there is change in state of editor
   * 
   * onChange: (contentState: ContentState) => void;
   */
  onContentStateChange: PropTypes.func,
  /**
   *  Property to initialize content state once when its created.
   * 
   * **Works in case of uncontrolled `Editor`**
   */
  defaultContentState: PropTypes.object,
  /**
   * ContentState is an object with the entire contents of an editor: text, block and inline styles, and entity ranges.
   *
   * [Read More about Content State](https://draftjs.org/docs/api-reference-content-state)
   */
  contentState: PropTypes.object,
  /**
   * Checks for misspellings in a text.
   */
  spellCheck: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  /**
   * <pre style="font-family: monospace; font-size: 13px; background: #f8f8f8">
   * Customizes pre-built option in the toolbar
   * 
   * ToolbarShape: {
   *   textDecoration: {
   *     max: number; // default: 3
   *     bold: { label: string, title: string },
   *     italic: { label: string, title: string },
   *     underline: { label: string, title: string },
   *     strikethrough: { label: string, title: string },
   *   },
   *   colorPicker: {
   *     colors: string[];
   *   },
   *   insert: {
   *     max: number, // default: 2
   *     link: { isVisible: boolean, title: string },
   *     image: {
   *       isVisible: boolean,
   *       title: string,
   *       alt: string,
   *       defaultSize: { height: string, width: string },
   *       uploadCallback: 
   *         (file) => Promise<{ data: { link: <THE_URL>}}>
   *     }
   *   }
   * }
   * </pre>
   * 
   * | Name | Description | Default |
   * | --- | --- | --- |
   * | max | Max controls visible on toolbar, rest are visible inside dropdown | |
   * | label | Label of control in dropdown |  |
   * | title | Tooltip of control on toolbar | |
   * | colors | Array of colors to be shown in color-picker | |
   * | isVisible | Determines if control is visible | true |
   * | alt | Used to enable alt field for images | |
   * | defaultSize | Used to pass default size (height and width) of image | height: '100px', width: '300px' |
   * | uploadCallback | Returns a promise that resolves to give image src.  | |
   */
  toolbar: toolbarShape,
  /**
   * Class applied around the editor
   */
  editorClassName: PropTypes.string,
  /**
   * Class applied around both the editor and the toolbar
   */
  wrapperClassName: PropTypes.string,
  /**
   * Class applied around the toolbar
   */
  toolbarClassName: PropTypes.string,
  /**
   * Style object applied around the editor
   */
  editorStyle: PropTypes.object,
  /**
   * Callback called when editor is focused.
   * 
   * onFocus = (event) => void;
   */
  onFocus: PropTypes.func,
  /**
   * Callback called when editor is blurred.
   * 
   * onFocus = (event, editorState) => void;
   */
  onBlur: PropTypes.func,
  /**
   * Callback called when editor receives 'tab' keydown
   * 
   * onTab = (event, editorState) => void;
   */
  onTab: PropTypes.func,
  /**
   * Specify whether text alignment should be forced in a direction
   * regardless of input characters.
   */
  textAlignment: PropTypes.oneOf(['left', 'right', 'center']), // eslint-disable-line react/no-unused-prop-types
  /**
   * Set whether the `Editor` component should be editable.
   */
  readOnly: PropTypes.bool,
  /**
   * Determines if element should automatically get focus when the page loads
   */
  autoFocus: PropTypes.bool,
  /**
   * Text to display when `Editor` is empty
   */
  placeholder: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  /**
   * Attribute used to define a string that labels the current element.
   * 
   * Used in cases where a text label is not visible on the screen. 
   */
  ariaLabel: PropTypes.string,
  //ariaOwneeID: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  // customBlockRenderFunc: PropTypes.func,
  /**
   * Custom id added to wrapper around the editor. 
   */
  wrapperId: PropTypes.number,
  // customDecorators: PropTypes.array,
  /**
   * Reference of Editor can be obtained using editorRef property.
   * 
   * This can be used to raise events on editor like focus editor.
   * 
   * editorRef = (ref) => void;
   */
  editorRef: PropTypes.func,
  handlePastedText: PropTypes.func,
};

Editor.defaultProps = {
  autoFocus: true,
  // stripPastedStyles: false,
  //customDecorators: [],
};

export default Editor;
