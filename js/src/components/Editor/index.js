/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import {
  changeDepth,
  handleNewLine,
  customStyleMap,
} from 'draftjs-utils';
import { Map } from 'immutable';
import classNames from 'classnames';
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
import EmbeddedControl from '../EmbeddedControl';
import EmojiControl from '../EmojiControl';
import ImageControl from '../ImageControl';
import HistoryControl from '../HistoryControl';
import LinkDecorator from '../../decorators/Link';
import MentionDecorator from '../../decorators/Mention';
import BlockRendererFunc from '../../renderer';
import defaultToolbar from '../../config/defaultToolbar';
import './styles.css';
import '../../../../css/Draft.css';

export default class WysiwygEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    initialContentState: PropTypes.object,
    toolbarOnFocus: PropTypes.bool,
    spellCheck: PropTypes.bool,
    toolbar: PropTypes.object,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    uploadCallback: PropTypes.func,
    mention: PropTypes.object,
    textAlignment: PropTypes.string,
    readOnly: PropTypes.boolean,
    tabIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: undefined,
      editorFocused: false,
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

  onChange: Function = (editorState: Object): void => {
    this.setState({
      editorState,
    },
    this.afterChange());
  };

  onEditorFocus: Function = (): void => {
    this.setState({
      editorFocused: true,
    });
  };

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false,
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

  afterChange: Function = (): void => {
    setTimeout(() => {
      if (this.props.onChange) {
        let editorContent = convertToRaw(this.state.editorState.getCurrentContent());
        editorContent = this.enrichData(editorContent);
        this.props.onChange(editorContent);
      }
    });
  };

  enrichData: Function = (editorContent: RawDraftContentState): RawDraftContentState => {
    const newEditorContent = editorContent;
    if (this.props.textAlignment) {
      editorContent.blocks.forEach((block) => {
        if (!block.data['text-align']) {
          block.data['text-align'] = this.props.textAlignment; // eslint-disable-line no-param-reassign
        }
      });
    }
    return newEditorContent;
  }

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
      this.onChange(newState);
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

  onTab: Function = (event): boolean => {
    event.preventDefault();
    const editorState = changeDepth(this.state.editorState, event.shiftKey ? -1 : 1, 4);
    if (editorState) {
      this.onChange(editorState);
      return true;
    }
    return false;
  };

  preventDefault: Function = (event: Object) => {
    event.preventDefault();
  }

  render() {
    const {
      editorState,
      editorFocused,
      toolbar,
     } = this.state;
    const {
      toolbarOnFocus,
      toolbarClassName,
      editorClassName,
      wrapperClassName,
      uploadCallback,
      textAlignment,
      spellCheck,
      readOnly,
      tabIndex,
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
      embedded,
      emoji,
      image,
      remove,
      history,
    } = toolbar;

    return (
      <div className={wrapperClassName}>
        {
          (editorFocused || !toolbarOnFocus) ?
            <div
              className={classNames('rdw-editor-toolbar', toolbarClassName)}
              onMouseDown={this.preventDefault}
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
              {options.indexOf('embedded') >= 0 && <EmbeddedControl
                editorState={editorState}
                onChange={this.onChange}
                config={embedded}
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
          className={classNames('rdw-editor-main', editorClassName)}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
        >
          <Editor
            ref={this.setEditorReference}
            onTab={this.onTab}
            tabIndex={tabIndex}
            readOnly={readOnly}
            readOnly={readOnly}
            spellCheck={spellCheck}
            editorState={editorState}
            onChange={this.onChange}
            textAlignment={textAlignment}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            handleReturn={this.handleReturn}
            blockRendererFn={BlockRendererFunc}
            blockRenderMap={this.customBlockRenderMap}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

// todo: evaluate draftjs-utils to move some methods here
