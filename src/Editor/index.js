/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  AtomicBlockUtils,
  Modifier,
} from 'draft-js';
import {
  changeDepth,
  handleNewLine,
  blockRenderMap,
  getCustomStyleMap,
  extractInlineStyle,
  getEntityRange,
  getSelectedBlocksType,
} from 'draftjs-utils';
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
import getQuickResponseDecorators from '../decorators/QuickResponses';
import getHashtagDecorator from '../decorators/HashTag';
import getBlockRenderFunc from '../renderer';
import defaultToolbar from '../config/defaultToolbar';
import localeTranslations from '../i18n';
import './styles.css';
import '../../css/Draft.css';

const MAX_FILE_SIZE = 20097152; // 20097152 ~20mb.

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
    spellCheck: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    stripPastedStyles: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    toolbar: PropTypes.object,
    toolbarCustomButtons: PropTypes.array,
    toolbarClassName: PropTypes.string,
    toolbarHidden: PropTypes.bool,
    locale: PropTypes.string,
    localization: PropTypes.object,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    toolbarStyle: PropTypes.object,
    editorStyle: PropTypes.object,
    wrapperStyle: PropTypes.object,
    uploadCallback: PropTypes.func,
    onHandleRichTextChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onTab: PropTypes.func,
    mention: PropTypes.object,
    quickResponse: PropTypes.object,
    templateUsageCount: PropTypes.func,
    renderTemplate: PropTypes.func,
    hashtag: PropTypes.object,
    textAlignment: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    readOnly: PropTypes.bool,
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

  static defaultProps = {
    toolbarOnFocus: false,
    toolbarHidden: false,
    stripPastedStyles: false,
    localization: { locale: 'en', translations: {} },
    customDecorators: []
  };

  constructor(props) {
    super(props);
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    this.state = {
      editorState: undefined,
      editorFocused: false,
      fieldClass: '',
      toolbar,
    };
    const wrapperId = props.wrapperId
      ? props.wrapperId
      : Math.floor(Math.random() * 10000);
    this.wrapperId = `rdw-wrapper-${wrapperId}`;
    this.modalHandler = new ModalHandler();
    this.focusHandler = new FocusHandler();
    this.blockRendererFn = getBlockRenderFunc(
      {
        isReadOnly: this.isReadOnly,
        isImageAlignmentEnabled: this.isImageAlignmentEnabled,
        getEditorState: this.getEditorState,
        onChange: this.onChange
      },
      props.customBlockRenderFunc
    );
    this.editorProps = this.filterEditorProps(props);
    this.customStyleMap = getCustomStyleMap();
  }

  componentWillMount(): void {
    this.compositeDecorator = this.getCompositeDecorator();
    const editorState = this.createEditorState(this.compositeDecorator);
    extractInlineStyle(editorState);
    this.setState({
      editorState
    });
  }

  componentDidMount(): void {
    this.modalHandler.init(this.wrapperId);
    document.addEventListener('dragover', this._fileDragEnter, false);
    document.addEventListener('dragleave', this._fileDragLeave, false);
    document.addEventListener('drop', this._fileDragDrop, false);
  }

  componentWillUnmount(): void {
    document.removeEventListener('dragover', this._fileDragEnter, false);
    document.removeEventListener('dragleave', this._fileDragLeave, false);
    document.removeEventListener('drop', this._fileDragDrop, false);
  }

  // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  componentWillReceiveProps(props) {
    const newState = {};
    if (this.props.toolbar !== props.toolbar) {
      const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
      newState.toolbar = toolbar;
    }
    if (
      hasProperty(props, 'editorState') &&
      this.props.editorState !== props.editorState
    ) {
      if (props.editorState) {
        newState.editorState = EditorState.set(props.editorState, {
          decorator: this.compositeDecorator
        });
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    } else if (
      hasProperty(props, "contentState") &&
      this.props.contentState !== props.contentState
    ) {
      if (props.contentState) {
        const newEditorState = this.changeEditorState(props.contentState);
        if (newEditorState) {
          newState.editorState = newEditorState;
        }
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    }
    if (
      props.editorState !== this.props.editorState ||
      props.contentState !== this.props.contentState
    ) {
      extractInlineStyle(newState.editorState);
    }
    this.setState(newState);
    this.editorProps = this.filterEditorProps(props);
    this.customStyleMap = getCustomStyleMap();
  }

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false
    });
  };

  onEditorFocus: Function = (event): void => {
    const { onFocus } = this.props;
    this.setState({
      editorFocused: true
    });
    const editFocused = this.focusHandler.isEditorFocused();
    if (onFocus && editFocused) {
      onFocus(event);
    }
  };

  onEditorMouseDown: Function = (): void => {
    this.focusHandler.onEditorMouseDown();
  };

  onTab: Function = (event): boolean => {
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
      onBlur(event, this.getEditorState());
    }
  };

  onChange: Function = (editorState: Object): void => {
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

  setWrapperReference: Function = (ref: Object): void => {
    this.wrapper = ref;
  };

  setEditorReference: Function = (ref: Object): void => {
    if (this.props.editorRef) {
      this.props.editorRef(ref);
    }
    this.editor = ref;
  };

  _fileDragEnter = (e: EventT) => {
    if(e.dataTransfer) {
      if(e.dataTransfer.items) {
        for(const item of e.dataTransfer.items) {
          if (this.props.toolbar && this.props.toolbar.file && this.props.toolbar.file.uploadEnabled && this.props.toolbar.file.inputAccept && !item.type.match(this.props.toolbar.file.inputAccept.split(","))) {
            this.setState({fieldClass: 'file-drag-enter-not-allowed'});
          } else {
            if(this.state.fieldClass === '') {
              this.setState({fieldClass: 'file-drag-enter'});
            }
          }
        }
        if(this.state.fieldClass === '') {
          this.setState({ fieldClass: 'file-drag-enter'} );
        }
      } else {
        for(const file of e.dataTransfer.files) {
          if (this.props.toolbar && this.props.toolbar.file && this.props.toolbar.file.uploadEnabled && this.props.toolbar.file.inputAccept && !file.type.match(this.props.toolbar.file.inputAccept.split(","))) {
            this.setState({ fieldClass: 'file-drag-enter-not-allowed'} );
          } else {
            if(this.state.fieldClass === '') {
              this.setState({ fieldClass: 'file-drag-enter'} );
            }
          }
        }
      }
    }

    e.stopPropagation();
    e.preventDefault();
  }

  _fileDragLeave = (e: EventT) => {
    e.stopPropagation();
    e.preventDefault();
    if(this.state.fieldClass !== '') {
      this.setState({ fieldClass: '' })
    }
  }

  _fileDragDrop = (e: EventT) => {
    e.stopPropagation();
    e.preventDefault();

    if (this.state.fieldClass !== '') {
      this.setState({ fieldClass: '' });
    }
  }

  getCompositeDecorator = (): void => {
    const decorators = [
      ...this.props.customDecorators,
      getLinkDecorator({
        showOpenOptionOnHover: this.state.toolbar.link.showOpenOptionOnHover
      })
    ];
    if (this.props.mention) {
      decorators.push(
        ...getMentionDecorators({
          ...this.props.mention,
          onChange: this.onChange,
          getEditorState: this.getEditorState,
          getSuggestions: this.getSuggestions,
          getWrapperRef: this.getWrapperRef,
          modalHandler: this.modalHandler
        })
      );
    }
    if (this.props.quickResponse) {
      decorators.push(...getQuickResponseDecorators({
        ...this.props.quickResponse,
        onChange: this.onChange,
        getEditorState: this.getEditorState,
        renderTemplate: this.props.renderTemplate,
        templateUsageCount: this.props.templateUsageCount,
        getSuggestions: this.getQuickResponseSuggestions,
        getWrapperRef: this.getWrapperRef,
        modalHandler: this.modalHandler,
      }));
    }
    if (this.props.hashtag) {
      decorators.push(getHashtagDecorator(this.props.hashtag));
    }
    return new CompositeDecorator(decorators);
  };

  getWrapperRef = () => this.wrapper;

  getEditorState = () => this.state.editorState;

  getSuggestions = () => this.props.mention && this.props.mention.suggestions;

  getQuickResponseSuggestions = () => this.props.quickResponse &&
    this.props.quickResponse.suggestions;

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

  isReadOnly = () => this.props.readOnly;

  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled;

  createEditorState = compositeDecorator => {
    let editorState;
    if (hasProperty(this.props, "editorState")) {
      if (this.props.editorState) {
        editorState = EditorState.set(this.props.editorState, {
          decorator: compositeDecorator
        });
      }
    } else if (hasProperty(this.props, "defaultEditorState")) {
      if (this.props.defaultEditorState) {
        editorState = EditorState.set(this.props.defaultEditorState, {
          decorator: compositeDecorator
        });
      }
    } else if (hasProperty(this.props, "contentState")) {
      if (this.props.contentState) {
        const contentState = convertFromRaw(this.props.contentState);
        editorState = EditorState.createWithContent(
          contentState,
          compositeDecorator
        );
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    } else if (
      hasProperty(this.props, "defaultContentState") ||
      hasProperty(this.props, "initialContentState")
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
      "onChange",
      "onEditorStateChange",
      "onContentStateChange",
      "initialContentState",
      "defaultContentState",
      "contentState",
      "editorState",
      "defaultEditorState",
      "locale",
      "localization",
      "toolbarOnFocus",
      "toolbar",
      "toolbarCustomButtons",
      "toolbarClassName",
      "editorClassName",
      "toolbarHidden",
      "wrapperClassName",
      "toolbarStyle",
      "editorStyle",
      "wrapperStyle",
      "uploadCallback",
      "onFocus",
      "onBlur",
      "onTab",
      "mention",
      "hashtag",
      "ariaLabel",
      "customBlockRenderFunc",
      "customDecorators",
      "handlePastedText",
      "quickResponse",
      "templateUsageCount",
      "renderTemplate",
      "onHandleRichTextChange"
    ]);

  changeEditorState = contentState => {
    const newContentState = convertFromRaw(contentState);
    let { editorState } = this.state;
    editorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters"
    );
    editorState = EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  focusEditor: Function = (): void => {
    setTimeout(() => {
      this.editor.focus();
    });
  };

  handleKeyCommand: Function = (command: Object): boolean => {
    const { editorState, toolbar: { inline } } = this.state;
    if (inline && inline.options.indexOf(command) >= 0) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
    }
    return false;
  };

  handleReturn: Function = (event: Object): boolean => {
    let returnValue = 'not-handled';
    if (SuggestionHandler.isOpen()) {
      returnValue = 'handled';
    }
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.onChange(editorState);
      returnValue = 'handled';
    }
    if (returnValue !== 'handled' && this.editorProps.handleReturn && typeof this.editorProps.handleReturn === 'function') {
      const handleReturnValue = this.editorProps.handleReturn(event);
      if (handleReturnValue === 'handled') {
        returnValue = handleReturnValue
      }
    }
    return returnValue;
  };

  handlePastedText = (text, html) => {
    const { editorState } = this.state;

    // Support onHandleRichTextChange callback parent if added to the component.
    if (this.props.onHandleRichTextChange && typeof this.props.onHandleRichTextChange === 'function') {
      this.props.onHandleRichTextChange({text: text, html: html});
    }

    if (this.props.handlePastedText) {
      return this.props.handlePastedText(
        text,
        html,
        editorState,
        this.onChange
      );
    }
    if (!this.props.stripPastedStyles) {
      return handlePastedText(text, html, editorState, this.onChange);
    }
    return false;
  };

  preventDefault: Function = (event: Object) => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "LABEL") {
      this.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  handleDroppedFiles = (selection: *, files: Array<Blob>) =>  {
    const { uploadCallback } = this.props;

    if(this.props.toolbar && this.props.toolbar.file && this.props.toolbar.file.uploadEnabled && this.props.toolbar.file.uploadCallback) {

      for(const file of files) {
        if(this.props.toolbar.file.inputAccept && !file.type.match(this.props.toolbar.file.inputAccept.split(","))) {
          console.warn('Error file type not allowed', file.type);
          return;
        }

        this.props.toolbar.file.uploadCallback(file)
          .then(({ data }) => {
            this.addFile(data.link, file.height, file.width, file.name, file.type)
          })
          .catch((exception: *) => {
            console.warn('exception', exception)
          })
      }
    }
  }

  handlePastedFiles = (files: Array<Blob>) => {
    const { uploadCallback } = this.props;

    if(this.props.toolbar && this.props.toolbar.file && this.props.toolbar.file.uploadEnabled && this.props.toolbar.file.uploadCallback) {
      for(const file of files) {
        if(this.props.toolbar.file.inputAccept && !file.type.match(this.props.toolbar.file.inputAccept.split(","))) {
          console.warn('Error file type not allowed', file.type);
          return;
        }
        this.props.toolbar.file.uploadCallback(file)
          .then(({ data }) => {
            this.addFile(data.link, file.height, file.width, file.name, file.type)

          })
          .catch((exception: *) => {
            console.warn('exception', exception)
          })
      }
    }
  }

  addFile = (src: string, height: string, width: string, alt: string, fileType: string): void => {
    const { onChange, config, onHandleRichTextChange } = this.props;
    const { editorState } = this.state;

    // Add an image
    if (fileType.indexOf('image/') > -1) {
      const entityData = { src, height, width, alt };
      const entityKey = editorState
        .getCurrentContent()
        .createEntity('IMAGE', 'MUTABLE', entityData)
        .getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' ',
      );
      this.onChange(newEditorState);
    } else { // Add a file as link
      this.addLink(alt, src, '_blank');
    }
    if (onHandleRichTextChange && typeof onHandleRichTextChange === 'function') {
      onHandleRichTextChange()
    }
  };

  addLink: Function = (linkTitle, linkTarget, linkTargetOption): void => {
    const { currentEntity, editorState } = this.state;
    let selection = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      });
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', { url: linkTarget, target: linkTargetOption })
      .getLastCreatedEntityKey();

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    );

    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters');

    // insert a blank space after link
    selection = newEditorState.getSelection().merge({
      anchorOffset: selection.get('anchorOffset') + linkTitle.length,
      focusOffset: selection.get('anchorOffset') + linkTitle.length,
    });
    newEditorState = EditorState.acceptSelection(newEditorState, selection);
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined,
    );
    this.onChange(EditorState.push(newEditorState, contentState, 'insert-characters'));
  };

  _fileDragEnter = (e: EventT) => {
    if (e.dataTransfer) {
      if (e.dataTransfer.items) {
        for(const item of e.dataTransfer.items) {
          if (this.props.toolbar && this.props.toolbar.file && this.props.toolbar.file.uploadEnabled && this.props.toolbar.file.inputAccept && !item.type.match(this.props.toolbar.file.inputAccept.split(','))) {
            this.setState({ fieldClass: 'file-drag-enter-not-allowed' });
          } else if(this.state.fieldClass === '') {
            this.setState({ fieldClass: 'file-drag-enter' });
          }
        }
        if (this.state.fieldClass === '') {
          this.setState({ fieldClass: 'file-drag-enter' });
        }
      } else {
        for (const file of e.dataTransfer.files) {
          if (this.props.toolbar && this.props.toolbar.file && this.props.toolbar.file.uploadEnabled && this.props.toolbar.file.inputAccept && !file.type.match(this.props.toolbar.file.inputAccept.split(','))) {
            this.setState({fieldClass: 'file-drag-enter-not-allowed'});
          } else if (this.state.fieldClass === '') {
            this.setState( {fieldClass: 'file-drag-enter' });
          }
        }
      }
    }

    e.stopPropagation();
    e.preventDefault();
  }

  _fileDragLeave = (e: EventT) => {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.fieldClass !== '') {
      this.setState({ fieldClass: ' '});
    }
  }

  _fileDragDrop = (e: EventT) => {
    e.stopPropagation();
    e.preventDefault();

    if (this.state.fieldClass !== '') {
      this.setState({ fieldClass: '' });
    }
  }

  render() {
    const {
      editorState,
      editorFocused,
      toolbar,
      fieldClass,
    } = this.state;
    const {
      locale,
      localization: { locale: newLocale, translations },
      toolbarCustomButtons,
      toolbarOnFocus,
      toolbarClassName,
      toolbarHidden,
      editorClassName,
      wrapperClassName,
      toolbarStyle,
      editorStyle,
      wrapperStyle,
      uploadCallback,
      quickResponse,
      templateUsageCount,
      renderTemplate,
      ariaLabel,
      onHandleRichTextChange,
    } = this.props;

    const controlProps = {
      modalHandler: this.modalHandler,
      editorState,
      onChange: this.onChange,
      onHandleRichTextChange: (onHandleRichTextChange && typeof onHandleRichTextChange === 'function' ? onHandleRichTextChange : null),
      translations: { ...localeTranslations[locale || newLocale], ...translations },
    };
    const toolbarShow =
      editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus;
    return (
      <div
        id={this.wrapperId}
        className={classNames(wrapperClassName, 'rdw-editor-wrapper')}
        style={wrapperStyle}
        onClick={this.modalHandler.onEditorClick}
        onBlur={this.onWrapperBlur}
        aria-label="rdw-wrapper"
      >
        {!toolbarHidden && (
          <div
            className={classNames('rdw-editor-toolbar', toolbarClassName)}
            style={{ visibility: toolbarShow ? 'visible' : 'hidden', ...toolbarStyle }}
            onMouseDown={this.preventDefault}
            aria-label="rdw-toolbar"
            aria-hidden={(!editorFocused && toolbarOnFocus).toString()}
            onFocus={this.onToolbarFocus}
          >
            {toolbar.options.map((opt, index) => {
              const Control = Controls[opt];
              const config = toolbar[opt];

              if ((opt === 'image' || opt === 'file') && uploadCallback) {
                config.uploadCallback = uploadCallback;
              }

              if (opt === 'quickResponse' && quickResponse) {
                config.quickResponse = quickResponse;
                if (templateUsageCount && typeof templateUsageCount === 'function') {
                  config.templateUsageCount = templateUsageCount;
                }
                if (renderTemplate && typeof renderTemplate === 'function') {
                  config.renderTemplate = renderTemplate;
                }
              }
              return <Control key={index} {...controlProps} config={config} />;
            })}
            {toolbarCustomButtons && toolbarCustomButtons.map((button, index) =>
              React.cloneElement(button, { key: index, ...controlProps }))}
          </div>
        )}
        <div
          ref={this.setWrapperReference}
          className={`${classNames(editorClassName, 'rdw-editor-main')} ${fieldClass}`}
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
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={blockStyleFn}
            customStyleMap={getCustomStyleMap()}
            handlePastedText={this.handlePastedText}
            blockRendererFn={this.blockRendererFn}
            handleKeyCommand={this.handleKeyCommand}
            ariaLabel={ariaLabel || 'rdw-editor'}
            blockRenderMap={blockRenderMap}
            handlePastedFiles={this.handlePastedFiles}
            handleDroppedFiles={this.handleDroppedFiles}
            {...this.editorProps}
            handleReturn={this.handleReturn}
          />
        </div>
      </div>
    );
  }
}
// todo: evaluate draftjs-utils to move some methods here
// todo: move color near font-family
