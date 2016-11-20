/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import {
  handleNewLine,
  customStyleMap,
} from 'draftjs-utils';
import { Map } from 'immutable';
import blockStyleFn from '../../utils/BlockStyle';
import { mergeRecursive } from '../../utils/toolbar';
import InlineControl from '../InlineControl';
import BlockControl from '../BlockControl';
import FontSizeControl from '../FontSizeControl';
import FontFamilyControl from '../FontFamilyControl';
import ListControl from '../ListControl';
import TextAlignControl from '../TextAlignControl';
import ColorPicker from '../ColorPicker';
import RemoveControl from '../RemoveControl';
import LinkControl from '../LinkControl';
import EmojiControl from '../EmojiControl';
import ImageControl from '../ImageControl';
import HistoryControl from '../HistoryControl';
import LinkDecorator from '../../decorators/Link';
import MentionDecorator from '../../decorators/Mention';
import ImageBlockRenderer from '../../renderer/Image';
import defaultToolbar from '../../config/defaultToolbar';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class WysiwygEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    initialContentState: PropTypes.object,
    toolbarOnFocus: PropTypes.bool,
    toolbar: PropTypes.object,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    uploadCallback: PropTypes.func,
    mention: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: undefined,
      toolBarMouseDown: false,
      editorFocused: false,
      editorMouseDown: false,
      toolbar: mergeRecursive(defaultToolbar, props.toolbar),
    };
  }

  componentWillMount(): void {
    let editorState;
    const decorators = [LinkDecorator];
    if (this.props.mention) {
      MentionDecorator.setConfig({
        ...this.props.mention,
        onChange: this.onChange,
        getEditorState: () => this.state.editorState,
        getWrapperRef: () => this.wrapper,
      });
      decorators.push(...MentionDecorator.decorators);
    }
    const compositeDecorator = new CompositeDecorator(decorators);
    if (this.props.initialContentState) {
      const contentState = convertFromRaw(this.props.initialContentState);
      editorState = EditorState.createWithContent(contentState, compositeDecorator);
    } else {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    this.setState({
      editorState,
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.toolbar !== props.toolbar) {
      this.setState({
        toolbar: mergeRecursive(defaultToolbar, props.toolbar),
      });
    }
    if (this.props.mention !== props.mention) {
      MentionDecorator.setConfig(this.props.mention);
    }
  }

  onChange: Function = (editorState: Object, focusEditor: boolean): void => {
    this.setState({
      editorState,
    }, this.afterChange(focusEditor));
  };

  onToolbarMouseDown: Function = (): void => {
    this.setState({
      toolBarMouseDown: true,
    });
  };

  onToolbarMouseUp: Function = (): void => {
    this.setState({
      toolBarMouseDown: false,
      editorFocused: true,
    });
  };

  onEditorFocus: Function = (): void => {
    this.setState({
      toolBarMouseDown: false,
      editorFocused: true,
    });
  };

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorMouseDown: Function = (): void => {
    this.setState({
      editorMouseDown: true,
    });
  };

  onEditorMouseUp: Function = (): void => {
    this.setState({
      editorMouseDown: false,
    });
  };

  setEditorReference: Function = (ref: Object): void => {
    this.editor = ref;
  };

  setWrapperReference: Function = (ref: Object): void => {
    this.wrapper = ref;
  };

  focusEditor: Function = (): void => {
    setTimeout(() => {
      this.editor.focus();
    });
  };

  afterChange: Function = (focusEditor: Boolean): void => {
    setTimeout(() => {
      if (focusEditor) {
        this.focusEditor();
      }
      if (this.props.onChange) {
        const editorContent = convertToRaw(this.state.editorState.getCurrentContent());
        this.props.onChange(editorContent);
      }
    });
  };

  customBlockRenderMap: Map = DefaultDraftBlockRenderMap
    .merge(new Map({
      unstyled: {
        element: 'p',
      },
    }));

  handleKeyCommand: Function = (command: Object): boolean => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState, this.focusEditor);
      return true;
    }
    return false;
  };

  handleReturn: Function = (event: Object): boolean => {
    let returnValue = false;
    if (this.props.mention) {
      returnValue = MentionDecorator.handleReturn();
    }
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.onChange(editorState);
      returnValue = true;
    }
    return returnValue;
  };

  render() {
    const {
      editorState,
      editorFocused,
      editorMouseDown,
      toolBarMouseDown,
      toolbar,
     } = this.state;
    const {
      toolbarOnFocus,
      toolbarClassName,
      editorClassName,
      wrapperClassName,
      uploadCallback,
    } = this.props;
    const {
      options,
      inline,
      blockType,
      fontSize,
      fontFamily,
      list,
      textAlign,
      colorPicker,
      link,
      emoji,
      image,
      remove,
      history,
    } = toolbar;

    const hasFocus = editorFocused || toolBarMouseDown || editorMouseDown;
    return (
      <div className={`editor-wrapper ${wrapperClassName}`}>
        {
          (hasFocus || !toolbarOnFocus) ?
            <div
              className={`editor-toolbar ${toolbarClassName}`}
              onMouseDown={this.onToolbarMouseDown}
              onMouseUp={this.onToolbarMouseUp}
              onClick={this.focusEditor}
            >
              {options.indexOf('inline') >= 0 && <InlineControl
                onChange={this.onChange}
                editorState={editorState}
                config={inline}
              />}
              {options.indexOf('blockType') >= 0 && <BlockControl
                onChange={this.onChange}
                editorState={editorState}
                config={blockType}
              />}
              {options.indexOf('fontSize') >= 0 && <FontSizeControl
                onChange={this.onChange}
                editorState={editorState}
                config={fontSize}
              />}
              {options.indexOf('fontFamily') >= 0 && <FontFamilyControl
                onChange={this.onChange}
                editorState={editorState}
                config={fontFamily}
              />}
              {options.indexOf('list') >= 0 && <ListControl
                onChange={this.onChange}
                editorState={editorState}
                config={list}
              />}
              {options.indexOf('textAlign') >= 0 && <TextAlignControl
                onChange={this.onChange}
                editorState={editorState}
                config={textAlign}
              />}
              {options.indexOf('colorPicker') >= 0 && <ColorPicker
                onChange={this.onChange}
                editorState={editorState}
                config={colorPicker}
              />}
              {options.indexOf('link') >= 0 && <LinkControl
                editorState={editorState}
                onChange={this.onChange}
                config={link}
              />}
              {options.indexOf('emoji') >= 0 && <EmojiControl
                editorState={editorState}
                onChange={this.onChange}
                config={emoji}
              />}
              {options.indexOf('image') >= 0 && <ImageControl
                editorState={editorState}
                onChange={this.onChange}
                uploadCallback={uploadCallback}
                config={image}
              />}
              {options.indexOf('remove') >= 0 && <RemoveControl
                editorState={editorState}
                onChange={this.onChange}
                config={remove}
              />}
              {options.indexOf('history') >= 0 && <HistoryControl
                editorState={editorState}
                onChange={this.onChange}
                config={history}
              />}
            </div>
          :
          undefined
        }
        <div
          ref={this.setWrapperReference}
          className={`editor-main ${editorClassName}`}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onMouseUp={this.onEditorMouseUp}
          onMouseDown={this.onEditorMouseDown}
        >
          <Editor
            ref={this.setEditorReference}
            spellCheck
            onTab={this.onTab}
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            handleReturn={this.handleReturn}
            blockRendererFn={ImageBlockRenderer}
            blockRenderMap={this.customBlockRenderMap}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

// todo: rename code to monospace
// todo: evaluate draftjs-utils to move some methods here
