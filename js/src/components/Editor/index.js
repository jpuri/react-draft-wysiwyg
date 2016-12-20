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
import ModalHandler from '../../modal-handler/modals';
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
import CounterControl from '../Counter';
import LinkDecorator from '../../decorators/Link';
import MentionDecorator from '../../decorators/Mention';
import BlockRendererFunc from '../../renderer';
import defaultToolbar from '../../config/defaultToolbar';
import defaultCounter, { customCounter } from '../../config/defaultCounter';

import createCounterPlugin from 'draft-js-counter-plugin';

import './styles.css';
import '../../../../css/Draft.css';

const counterPlugin = createCounterPlugin();

export default class WysiwygEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    // initialContentState is deprecated and will be removed in 2.0
    initialContentState: PropTypes.object,
    contentState: PropTypes.object,
    toolbarOnFocus: PropTypes.bool,
    spellCheck: PropTypes.bool,
    toolbar: PropTypes.object,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    counterClassName: PropTypes.string,
    uploadCallback: PropTypes.func,
    mention: PropTypes.object,
    textAlignment: PropTypes.string,
    readOnly: PropTypes.bool,
    tabIndex: PropTypes.number,
    placeholder: PropTypes.string,
    counter: PropTypes.bool,
    
  };
  
  static defaultProps = {
    counter: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: undefined,
      editorFocused: false,
      toolbar: mergeRecursive(defaultToolbar, props.toolbar),
      counter: mergeRecursive(defaultCounter, props.counter)
    };
  }

  componentWillMount(): void {
    let editorState;
    const decorators = [LinkDecorator];
    if (this.props.mention) {
      MentionDecorator.setConfig({
        ...this.props.mention,
        onChange: this.onChange,
        getEditorState: this.getEditorState,
        getWrapperRef: this.getWrapperRef,
      });
      decorators.push(...MentionDecorator.decorators);
    }
    const compositeDecorator = new CompositeDecorator(decorators);
    const propContentState = this.props.initialContentState || this.props.contentState;
    if (propContentState) {
      const contentState = convertFromRaw(propContentState);
      editorState = EditorState.createWithContent(contentState, compositeDecorator);
    } else {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    this.setState({
      editorState,
    });
    this.wrapperId = `rdw-wrapper${Math.floor(Math.random() * 10000)}`;
    this.modalHandler = new ModalHandler();
  }

  componentDidMount(): void {
    this.modalHandler.init(this.wrapperId);
  }
  // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  componentWillReceiveProps(props) {
    const newState = {};
    if (this.props.toolbar !== props.toolbar) {
      newState.toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    }
    if (this.props.mention !== props.mention) {
      MentionDecorator.setConfig(this.props.mention);
    }
    if (props.contentState && this.props.contentState !== props.contentState) {
      const newEditorState = this.changeEditorState(props.contentState);
      if (newEditorState) {
        newState.editorState = newEditorState;
      }
    }
    this.setState(newState);
  }

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorFocus: Function = (): void => {
    this.setState({
      editorFocused: true,
    });
  };

  setWrapperReference: Function = (ref: Object): void => {
    this.wrapper = ref;
  };

  setEditorReference: Function = (ref: Object): void => {
    this.editor = ref;
  };

  getWrapperRef = () => this.wrapper;

  getEditorState = () => this.state.editorState;

  changeEditorState = (contentState) => {
    const newContentState = convertFromRaw(contentState);
    const { editorState } = this.state;
    return EditorState.push(editorState, newContentState, 'change-block-data');
  }

  onChange: Function = (editorState: Object): void => {
    const { readOnly } = this.props;
    if (!readOnly) {
      this.setState({
        editorState,
      },
      this.afterChange());
    }
  };
  
  onCounterChange: Function = (counter: boolean): void => {
    const counterState = this.state.counter;
    counterState.enable = counter;
    this.setState({ counter: counterState });
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
    if (event.target.tagName !== 'INPUT') {
      event.preventDefault();
    }
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
      counterClassName,
      uploadCallback,
      textAlignment,
      spellCheck,
      readOnly,
      tabIndex,
      placeholder,
      customCounter
    } = this.props;
    const propsCounter = this.props.counter;
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
      counter,
    } = toolbar;
    
    let counterComponents = [];
    if (this.state.counter.enable) {
      let CharCounter;
      let CustomCounter;
      let LineCounter;
      let WordCounter;
      this.editor.setEditorState = (editorState) => {
        this.editor.onChange(editorState);
      };
      this.editor.getEditorRef = () => {
        return this.editor;
      };
      this.editor.getEditorState = () => {
        return this.state.editorState;
      };
      counterPlugin.initialize(this.editor);
      CharCounter = counterPlugin.CharCounter;
      CustomCounter = counterPlugin.CustomCounter;
      LineCounter = counterPlugin.LineCounter;
      WordCounter = counterPlugin.WordCounter;
      
      this.state.counter.order.forEach((v, i) => {
        let r;
        switch (v) {
          case 'char':
            r = (
              <CharCounter
                key={`char-${i}`}
                className={this.state.counter.counter.char.className}
                editorState={editorState}
              />
            );
            break;
          case 'word':
            r = (
              <WordCounter
                key={`word-${i}`}
                className={this.state.counter.counter.word.className}
                editorState={editorState}
              />
            );
            break;
          case 'line':
            r = (
              <LineCounter
                key={`line-${i}`}
                className={this.state.counter.counter.line.className}
                editorState={editorState}
              />
            );
            break;
          case 'custom':
            r = (
              (customCounter) ?
                <CustomCounter
                  key={`custom-${i}`}
                  className={this.state.counter.counter.custom.className}
                  editorState={editorState}
                  countFunction={customCounter}
                />
                :
                undefined
            );
            break;
          default:
            break;
        }
        if (r) {
          counterComponents.push(r);
        }
      })
    }

    return (
      <div
        id={this.wrapperId}
        className={wrapperClassName}
        onClick={this.modalHandler.closeModals}
      >
        {
          (editorFocused || !toolbarOnFocus) ?
            <div
              className={classNames('rdw-editor-toolbar', toolbarClassName)}
              onMouseDown={this.preventDefault}
            >
              {options.indexOf('inline') >= 0 && <InlineControl
                modalHandler={this.modalHandler}
                onChange={this.onChange}
                editorState={editorState}
                config={inline}
              />}
              {options.indexOf('blockType') >= 0 && <BlockControl
                modalHandler={this.modalHandler}
                onChange={this.onChange}
                editorState={editorState}
                config={blockType}
              />}
              {options.indexOf('fontSize') >= 0 && <FontSizeControl
                modalHandler={this.modalHandler}
                onChange={this.onChange}
                editorState={editorState}
                config={fontSize}
              />}
              {options.indexOf('fontFamily') >= 0 && <FontFamilyControl
                modalHandler={this.modalHandler}
                onChange={this.onChange}
                editorState={editorState}
                config={fontFamily}
              />}
              {options.indexOf('list') >= 0 && <ListControl
                modalHandler={this.modalHandler}
                onChange={this.onChange}
                editorState={editorState}
                config={list}
              />}
              {options.indexOf('textAlign') >= 0 && <TextAlignControl
                modalHandler={this.modalHandler}
                onChange={this.onChange}
                editorState={editorState}
                config={textAlign}
              />}
              {options.indexOf('colorPicker') >= 0 && <ColorPicker
                modalHandler={this.modalHandler}
                onChange={this.onChange}
                editorState={editorState}
                config={colorPicker}
              />}
              {options.indexOf('link') >= 0 && <LinkControl
                modalHandler={this.modalHandler}
                editorState={editorState}
                onChange={this.onChange}
                config={link}
              />}
              {options.indexOf('embedded') >= 0 && <EmbeddedControl
                modalHandler={this.modalHandler}
                editorState={editorState}
                onChange={this.onChange}
                config={embedded}
              />}
              {options.indexOf('emoji') >= 0 && <EmojiControl
                modalHandler={this.modalHandler}
                editorState={editorState}
                onChange={this.onChange}
                config={emoji}
              />}
              {options.indexOf('image') >= 0 && <ImageControl
                modalHandler={this.modalHandler}
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
                modalHandler={this.modalHandler}
                editorState={editorState}
                onChange={this.onChange}
                config={history}
              />}
              {options.indexOf('counter') >= 0 && <CounterControl
                counter={this.state.counter.enable}
                editorState={editorState}
                onChange={this.onCounterChange}
                config={counter}
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
            placeholder={placeholder}
          />
        </div>
        {
          (this.state.counter.enable) ?
            <div
              className={classNames('rdw-editor-counter', counterClassName)}
            >
              { counterComponents }
            </div>
            :
            undefined
        }
      </div>
    );
  }
}



// todo: evaluate draftjs-utils to move some methods here
