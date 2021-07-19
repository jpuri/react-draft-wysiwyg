import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Editor,
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
// import '@innovaccer/design-system/css';
import '../../css/Draft.css';
import '../../css/src/components';

class RichText extends Component {
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
      props.customBlockRenderFunc
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
      if (!onTab || !onTab(event)) {
        const editorState = changeDepth(
          this.state.editorState,
          event.shiftKey ? -1 : 1,
          4
        );
        if (editorState && editorState !== this.state.editorState) {
          this.onChange(editorState);
          event.preventDefault();
        }
      }
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
      ...this.props.customDecorators,
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
      const { onChange, onContentStateChange } = this.props;
      if (onChange) {
        onChange(convertToRaw(editorState.getCurrentContent()));
      }
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
      hasProperty(this.props, 'defaultContentState') ||
      hasProperty(this.props, 'initialContentState')
    ) {
      let contentState =
        this.props.defaultContentState || this.props.initialContentState;
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
      'locale',
      'localization',
      'toolbarOnFocus',
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
      stripPastedStyles,
    } = this.props;

    if (handlePastedTextProp) {
      return handlePastedTextProp(text, html, editorState, this.onChange);
    }
    if (!stripPastedStyles) {
      return handlePastedText(text, html, editorState, this.onChange);
    }
    return false;
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
      locale,
      localization: { locale: newLocale, translations },
      toolbarCustomButtons,
      toolbarOnFocus,
      toolbarClassName,
      editorClassName,
      wrapperClassName,
      editorStyle,
      ariaLabel,
    } = this.props;

    const controlProps = {
      linkPopoverOpen: this.state.linkPopoverOpen,
      onCloseLinkPopover: this.onCloseLinkPopover,
      modalHandler: this.modalHandler,
      editorState,
      onChange: this.onChange,
      translations: {
        ...localeTranslations[locale || newLocale],
        ...translations,
      },
    };
    const toolbarShow =
      editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus;

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
          style={{ visibility: toolbarShow ? 'visible' : 'hidden' }}
          onMouseDown={this.preventDefault}
          aria-label="Editor-toolbar"
          aria-hidden={(!editorFocused && toolbarOnFocus).toString()}
          onFocus={this.onToolbarFocus}
        >
          {toolbar.options.map((opt, index) => {
            const Control = Controls[opt];
            const config = toolbar[opt];
            return <Control key={index} {...controlProps} config={config} className="Editor-toolbar-options" />;
          })}
          {toolbarCustomButtons &&
            toolbarCustomButtons.map((button, index) =>
              React.cloneElement(button, { key: index, ...controlProps })
            )}
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
          <Editor
            preserveSelectionOnBlur={true}
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

RichText.utils = {
  EditorState,
  ContentState,
  RichUtils,
  convertFromRaw,
  convertToRaw
};

RichText.propTypes = {
  onChange: PropTypes.func,
  onEditorStateChange: PropTypes.func,
  onContentStateChange: PropTypes.func,
  // initialContentState is deprecated
  initialContentState: PropTypes.object,
  defaultContentState: PropTypes.object,
  contentState: PropTypes.object,
  editorState: PropTypes.object,
  defaultEditorState: PropTypes.object,
  toolbarOnFocus: PropTypes.bool,
  spellCheck: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  stripPastedStyles: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  toolbar: PropTypes.object,
  toolbarCustomButtons: PropTypes.array,
  toolbarClassName: PropTypes.string,
  //toolbarHidden: PropTypes.bool,
  locale: PropTypes.string,
  localization: PropTypes.object,
  editorClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  //toolbarStyle: PropTypes.object,
  editorStyle: PropTypes.object,
  //wrapperStyle: PropTypes.object,
  uploadCallback: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onTab: PropTypes.func,
  mention: PropTypes.object,
  hashtag: PropTypes.object,
  textAlignment: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  tabIndex: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  placeholder: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaLabel: PropTypes.string,
  ariaOwneeID: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaActiveDescendantID: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaAutoComplete: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaDescribedBy: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaExpanded: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  ariaHasPopup: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  customBlockRenderFunc: PropTypes.func,
  wrapperId: PropTypes.number,
  customDecorators: PropTypes.array,
  editorRef: PropTypes.func,
  handlePastedText: PropTypes.func,
};

RichText.defaultProps = {
  toolbarOnFocus: false,
  autoFocus: true,
  //toolbarHidden: false,
  stripPastedStyles: false,
  localization: { locale: 'en', translations: {} },
  customDecorators: [],
};

export default RichText;
