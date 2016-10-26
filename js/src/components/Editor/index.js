/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
} from 'draft-js';
import {
  handleNewLine,
  customStyleMap,
} from 'draftjs-utils';
import { Map } from 'immutable';
import blockStyleFn from '../../Utils/BlockStyle';
import InlineControl from '../InlineControl';
import BlockControl from '../BlockControl';
import FontSizeControl from '../FontSizeControl';
import FontFamilyControl from '../FontFamilyControl';
import ListControl from '../ListControl';
import TextAlignControl from '../TextAlignControl';
import ColorPicker from '../ColorPicker';
import LinkControl from '../LinkControl';
import ImageControl from '../ImageControl';
import HistoryControl from '../HistoryControl';
import LinkDecorator from '../../Decorators/Link';
import ImageBlockRenderer from '../../Renderer/Image';
import draft from '../../../../css/Draft.css'; // eslint-disable-line no-unused-vars
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class WysiwygEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    contentState: PropTypes.object,
    toolbarAlwaysVisible: PropTypes.bool,
    toolbarConfig: PropTypes.object,
    uploadImageCallBack: PropTypes.func,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    toolbarAlwaysVisible: true,
  };

  state: Object = {
    editorState: undefined,
    toolBarMouseDown: false,
    editorFocused: false,
    editorMouseDown: false,
  };

  componentWillMount(): void {
    let editorState;
    const decorator = new CompositeDecorator([LinkDecorator]);
    if (this.props.contentState) {
      editorState = EditorState.createWithContent(this.props.contentState, decorator);
    } else {
      editorState = EditorState.createEmpty(decorator);
    }
    this.setState({
      editorState,
    });
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
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.onChange(editorState);
      return true;
    }
    return false;
  };

  render() {
    const {
      editorState,
      editorFocused,
      editorMouseDown,
      toolBarMouseDown,
     } = this.state;

    const {
      toolbarAlwaysVisible,
      toolbarConfig,
      uploadImageCallBack,
      toolbarClassName,
      editorClassName,
      wrapperClassName,
    } = this.props;

    const hasFocus = editorFocused || toolBarMouseDown || editorMouseDown;

    return (
      <div className={`editor-wrapper ${wrapperClassName}`}>
        {
          (hasFocus || toolbarAlwaysVisible) ?
            <div
              className={`editor-toolbar ${toolbarClassName}`}
              onMouseDown={this.onToolbarMouseDown}
              onMouseUp={this.onToolbarMouseUp}
              onClick={this.focusEditor}
            >
              {toolbarConfig.get('inline').get('visible') && <InlineControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbarConfig && toolbarConfig.get('inline')}
              />}
              {toolbarConfig.get('blockType').get('visible') && <BlockControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbarConfig && toolbarConfig.get('blockType')}
              />}
              {toolbarConfig.get('fontSize').get('visible') && <FontSizeControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbarConfig && toolbarConfig.get('fontSize')}
              />}
              {toolbarConfig.get('fontFamily').get('visible') && <FontFamilyControl
                onChange={this.onChange}
                editorState={editorState}
              />}
              {toolbarConfig.get('list').get('visible') && <ListControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbarConfig && toolbarConfig.get('list')}
              />}
              {toolbarConfig.get('textAlign').get('visible') && <TextAlignControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbarConfig && toolbarConfig.get('textAlign')}
              />}
              {toolbarConfig.get('colorPicker').get('visible') && <ColorPicker
                onChange={this.onChange}
                editorState={editorState}
                config={toolbarConfig && toolbarConfig.get('colorPicker')}
              />}
              {toolbarConfig.get('link').get('visible') && <LinkControl
                editorState={editorState}
                onChange={this.onChange}
                config={toolbarConfig && toolbarConfig.get('link')}
              />}
              {toolbarConfig.get('image').get('visible') && <ImageControl
                editorState={editorState}
                onChange={this.onChange}
                uploadImageCallBack={uploadImageCallBack}
                config={toolbarConfig && toolbarConfig.get('image')}
              />}
              {toolbarConfig.get('history').get('visible') && <HistoryControl
                editorState={editorState}
                onChange={this.onChange}
                config={toolbarConfig && toolbarConfig.get('history')}
              />}
            </div>
          :
          undefined
        }
        <div
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
