/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  SelectionState,
  CompositeDecorator,
} from 'draft-js';
import {
  changeDepth,
  setFontSizes,
  handleNewLine,
  setFontFamilies,
  getCustomStyleMap,
} from 'draftjs-utils';
import classNames from 'classnames';
import ModalHandler from '../../event-handler/modals';
import FocusHandler from '../../event-handler/focus';
import KeyDownHandler from '../../event-handler/keyDown';
import SuggestionHandler from '../../event-handler/suggestions';
import blockStyleFn from '../../utils/BlockStyle';
import { mergeRecursive } from '../../utils/toolbar';
import { hasProperty } from '../../utils/common';
import Controls from '../Controls';
import LinkDecorator from '../../decorators/Link';
import getMentionDecorators from '../../decorators/Mention';
import getBlockRenderFunc from '../../renderer';
import defaultToolbar from '../../config/defaultToolbar';
import './styles.css';
import '../../../../css/Draft.css';

export default class WysiwygEditor extends Component {

  static propTypes = {
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
    spellCheck: PropTypes.bool,
    stripPastedStyles: PropTypes.bool,
    toolbar: PropTypes.object,
    toolbarCustomButtons: PropTypes.array,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    toolbarStyle: PropTypes.object,
    editorStyle: PropTypes.object,
    wrapperStyle: PropTypes.object,
    uploadCallback: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    mention: PropTypes.object,
    textAlignment: PropTypes.string,
    readOnly: PropTypes.bool,
    tabIndex: PropTypes.number,
    placeholder: PropTypes.string,
    ariaLabel: PropTypes.string,
    ariaOwneeID: PropTypes.string,
    ariaActiveDescendantID: PropTypes.string,
    ariaAutoComplete: PropTypes.string,
    ariaDescribedBy: PropTypes.string,
    ariaExpanded: PropTypes.string,
    ariaHasPopup: PropTypes.string,
  };

  static defaultProps = {
    toolbarOnFocus: false,
    stripPastedStyles: false,
  }

  constructor(props) {
    super(props);
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    setFontFamilies(toolbar.fontFamily && toolbar.fontFamily.options);
    setFontSizes(toolbar.fontSize && toolbar.fontSize.options);
    this.state = {
      editorState: undefined,
      editorFocused: false,
      toolbar,
      customStyleMap: getCustomStyleMap(),
    };
    this.wrapperId = `rdw-wrapper${Math.floor(Math.random() * 10000)}`;
    this.modalHandler = new ModalHandler();
    this.focusHandler = new FocusHandler();
    this.blockRendererFn = getBlockRenderFunc({ isReadOnly: this.isReadOnly });
  }

  componentWillMount(): void {
    this.compositeDecorator = this.getCompositeDecorator();
    const editorState = this.createEditorState(this.compositeDecorator);
    this.setState({
      editorState,
    });
  }

  componentDidMount(): void {
    this.modalHandler.init(this.wrapperId);
  }
  // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  componentWillReceiveProps(props) {
    const newState = {};
    if (this.props.toolbar !== props.toolbar) {
      const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
      setFontFamilies(toolbar.fontFamily && toolbar.fontFamily.options);
      setFontSizes(toolbar.fontSize && toolbar.fontSize.options);
      newState.toolbar = toolbar;
      newState.customStyleMap = getCustomStyleMap();
    }
    if (hasProperty(props, 'editorState') && this.props.editorState !== props.editorState) {
      if (props.editorState) {
        newState.editorState = EditorState.set(
          props.editorState,
          { decorator: this.compositeDecorator }
        );
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    } else if (hasProperty(props, 'contentState') && this.props.contentState !== props.contentState) {
      if (props.contentState) {
        const newEditorState = this.changeEditorState(props.contentState);
        if (newEditorState) {
          newState.editorState = newEditorState;
        }
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    }
    this.setState(newState);
  }

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorFocus: Function = (event): void => {
    const { onFocus } = this.props;
    this.setState({
      editorFocused: true,
    });
    if (onFocus && this.focusHandler.isEditorFocused()) {
      onFocus(event);
    }
  };

  onEditorMouseDown: Function = (): void => {
    this.focusHandler.onEditorMouseDown();
  }

  onTab: Function = (event): boolean => {
    const editorState = changeDepth(this.state.editorState, event.shiftKey ? -1 : 1, 4);
    if (editorState) {
      this.onChange(editorState);
      event.preventDefault();
    }
  };

  onUpDownArrow: Function = (event): boolean => {
    if (SuggestionHandler.isOpen()) {
      event.preventDefault();
    }
  };

  onToolbarFocus: Function = (event): void => {
    const { onFocus } = this.props;
    if (onFocus && this.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  onWrapperBlur: Function = (event: Object) => {
    const { onBlur } = this.props;
    if (onBlur && this.focusHandler.isEditorBlur(event)) {
      onBlur(event);
    }
  };

  onChange: Function = (editorState: Object): void => {
    const { readOnly, onEditorStateChange } = this.props;
    if (!readOnly) {
      if (onEditorStateChange) {
        onEditorStateChange(editorState);
      }
      if (!hasProperty(this.props, 'editorState')) {
        this.setState({ editorState }, this.afterChange(editorState));
      } else {
        this.afterChange(editorState);
      }
    }
  };

  afterChange: Function = (editorState): void => {
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

  setWrapperReference: Function = (ref: Object): void => {
    this.wrapper = ref;
  };

  setEditorReference: Function = (ref: Object): void => {
    this.editor = ref;
  };

  getCompositeDecorator = ():void => {
    const decorators = [LinkDecorator];
    if (this.props.mention) {
      decorators.push(...getMentionDecorators({
        ...this.props.mention,
        onChange: this.onChange,
        getEditorState: this.getEditorState,
        getSuggestions: this.getSuggestions,
        getWrapperRef: this.getWrapperRef,
        modalHandler: this.modalHandler,
      }));
    }
    return new CompositeDecorator(decorators);
  }

  getWrapperRef = () => this.wrapper;

  getEditorState = () => this.state.editorState;

  getSuggestions = () => this.props.mention && this.props.mention.suggestions;

  isReadOnly = () => this.props.readOnly;

  createEditorState = (compositeDecorator) => {
    let editorState;
    if (hasProperty(this.props, 'editorState')) {
      if (this.props.editorState) {
        editorState = EditorState.set(this.props.editorState, { decorator: compositeDecorator });
      }
    } else if (hasProperty(this.props, 'defaultEditorState')) {
      if (this.props.defaultEditorState) {
        editorState = EditorState.set(
          this.props.defaultEditorState,
          { decorator: compositeDecorator }
        );
      }
    } else if (hasProperty(this.props, 'contentState')) {
      if (this.props.contentState) {
        const contentState = convertFromRaw(this.props.contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    } else if (hasProperty(this.props, 'defaultContentState')
      || hasProperty(this.props, 'initialContentState')) {
      let contentState = this.props.defaultContentState || this.props.initialContentState;
      if (contentState) {
        contentState = convertFromRaw(contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  }

  changeEditorState = (contentState) => {
    const newContentState = convertFromRaw(contentState);
    let { editorState } = this.state;
    editorState = EditorState.push(editorState, newContentState, 'insert-characters');
    editorState = EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  focusEditor: Function = (): void => {
    setTimeout(() => {
      this.editor.focus();
    });
  };

  handleKeyCommand: Function = (command: Object): boolean => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  handleReturn: Function = (event: Object): boolean => {
    if (SuggestionHandler.isOpen()) {
      return true;
    }
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.onChange(editorState);
      return true;
    }
    return false;
  };

  preventDefault: Function = (event: Object) => {
    if (event.target.tagName === 'INPUT') {
      this.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  render() {
    const {
      editorState,
      editorFocused,
      toolbar,
      customStyleMap,
     } = this.state;
    const {
      toolbarCustomButtons,
      toolbarOnFocus,
      toolbarClassName,
      editorClassName,
      wrapperClassName,
      toolbarStyle,
      editorStyle,
      wrapperStyle,
      uploadCallback,
      textAlignment,
      spellCheck,
      readOnly,
      stripPastedStyles,
      tabIndex,
      placeholder,
      ariaLabel,
      ariaOwneeID,
      ariaActiveDescendantID,
      ariaAutoComplete,
      ariaDescribedBy,
      ariaExpanded,
      ariaHasPopup,
    } = this.props;

    return (
      <div
        id={this.wrapperId}
        className={classNames('rdw-editor-wrapper', wrapperClassName)}
        style={wrapperStyle}
        onClick={this.modalHandler.onEditorClick}
        onBlur={this.onWrapperBlur}
        aria-label="rdw-wrapper"
        tabIndex={0}
      >
        {
          (editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus) ?
            <div
              className={classNames('rdw-editor-toolbar', toolbarClassName)}
              style={toolbarStyle}
              onMouseDown={this.preventDefault}
              aria-label="rdw-toolbar"
              aria-hidden={(!editorFocused && toolbarOnFocus).toString()}
              onFocus={this.onToolbarFocus}
            >
              {toolbar.options.map((opt,i)=>{
                const Control = Controls[opt];
                return <Control key={i}
                    modalHandler={this.modalHandler}
                    editorState={editorState}
                    onChange={this.onChange}
                    uploadCallback={uploadCallback}
                    config={toolbar[opt]}
                />
              })}
              {toolbarCustomButtons.map((button, idx) => {
                return React.cloneElement(button, {
                  modalHandler: this.modalHandler,
                  editorState,
                  onChange: this.onChange,
                  key: idx,
                });
              })}
            </div>
          :
          undefined
        }
        <div
          ref={this.setWrapperReference}
          className={classNames('rdw-editor-main', editorClassName)}
          style={editorStyle}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}
        >
          <Editor
            ref={this.setEditorReference}
            onTab={this.onTab}
            onUpArrow={this.onUpDownArrow}
            onDownArrow={this.onUpDownArrow}
            tabIndex={tabIndex}
            readOnly={readOnly}
            stripPastedStyles={stripPastedStyles}
            spellCheck={spellCheck}
            editorState={editorState}
            onChange={this.onChange}
            textAlignment={textAlignment}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            handleReturn={this.handleReturn}
            blockRendererFn={this.blockRendererFn}
            handleKeyCommand={this.handleKeyCommand}
            ariaLabel={ariaLabel || 'rdw-editor'}
            ariaOwneeID={ariaOwneeID}
            ariaActiveDescendantID={ariaActiveDescendantID}
            ariaAutoComplete={ariaAutoComplete}
            ariaDescribedBy={ariaDescribedBy}
            ariaExpanded={ariaExpanded}
            ariaHasPopup={ariaHasPopup}
            ariaReadonly={readOnly}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  }
}
// todo: evaluate draftjs-utils to move some methods here
// todo: move color near font-family
