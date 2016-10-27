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
import blockStyleFn from '../../utils/blockStyle';
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
import LinkDecorator from '../../decorators/Link';
import ImageBlockRenderer from '../../renderer/Image';
import defaultToolbar from '../../config/defaultToolbar';
import draft from '../../../../css/Draft.css'; // eslint-disable-line no-unused-vars
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class WysiwygEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    contentState: PropTypes.object,
    toolbarAlwaysVisible: PropTypes.bool,
    toolbar: PropTypes.object,
    toolbarClassName: PropTypes.string,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    toolbarAlwaysVisible: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: undefined,
      toolBarMouseDown: false,
      editorFocused: false,
      editorMouseDown: false,
      toolbar: defaultToolbar.mergeDeep(props.toolbar),
    };
  }

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

  componentWillReceiveProps(props) {
    if (this.props.toolbar !== props.toolbar) {
      this.setState({
        toolbar: defaultToolbar.mergeDeep(props.toolbar),
      });
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
      toolbar,
     } = this.state;
    const {
      toolbarAlwaysVisible,
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
              {toolbar.get('options').first('inline') && <InlineControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbar && toolbar.get('inline')}
              />}
              {toolbar.get('options').first('blockType') && <BlockControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbar && toolbar.get('blockType')}
              />}
              {toolbar.get('options').first('fontSize') && <FontSizeControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbar && toolbar.get('fontSize')}
              />}
              {toolbar.get('options').first('fontFamily') && <FontFamilyControl
                onChange={this.onChange}
                editorState={editorState}
              />}
              {toolbar.get('options').first('list') && <ListControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbar && toolbar.get('list')}
              />}
              {toolbar.get('options').first('textAlign') && <TextAlignControl
                onChange={this.onChange}
                editorState={editorState}
                config={toolbar && toolbar.get('textAlign')}
              />}
              {toolbar.get('options').first('colorPicker') && <ColorPicker
                onChange={this.onChange}
                editorState={editorState}
                config={toolbar && toolbar.get('colorPicker')}
              />}
              {toolbar.get('options').first('link') && <LinkControl
                editorState={editorState}
                onChange={this.onChange}
                config={toolbar && toolbar.get('link')}
              />}
              {toolbar.get('options').first('image') && <ImageControl
                editorState={editorState}
                onChange={this.onChange}
                config={toolbar && toolbar.get('image')}
              />}
              {toolbar.get('options').first('history') && <HistoryControl
                editorState={editorState}
                onChange={this.onChange}
                config={toolbar && toolbar.get('history')}
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
