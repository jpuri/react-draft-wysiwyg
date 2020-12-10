import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import {
  getEntityRange,
  getSelectionEntity,
} from 'draftjs-utils';
import Option from '../../components/Option';
import { Tooltip, Icon } from '@innovaccer/design-system';

class Mention extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
    inDropdown: PropTypes.boolean,
  };

  constructor(props) {
    super(props);
    const { editorState } = this.props;

    this.state = {
      selectionText: undefined,
      link: undefined,
      currentEntity: editorState ? getSelectionEntity(editorState) : undefined,
    };
  }

  componentDidUpdate(prevProps) {
    const { editorState } = this.props;
    if (editorState && editorState !== prevProps.editorState) {
      this.setState({ currentEntity: getSelectionEntity(editorState) });
    }
  }

  addLink = () => {
    const { editorState, onChange, mention } = this.props;
    const { trigger = '@' } = mention;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection();

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      const isBackward = selection.getIsBackward();
      if (isBackward) {
        selection = selection.merge({
          anchorOffset: entityRange.end,
          focusOffset: entityRange.start,
        });
      } else {
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end,
        });
      }
    }

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${trigger}`,
      editorState.getCurrentInlineStyle(),
      undefined
    );
    let newEditorState = EditorState.push(
      editorState,
      contentState,
      'insert-characters'
    );

    onChange(
      EditorState.push(newEditorState, contentState, 'insert-characters'),
    );
  };

  render() {
    const {
      config: { icon, title },
      inDropdown,
    } = this.props;

    return (
      <Tooltip tooltip={title}>
        <Option
          value="unordered-list-item"
          onClick={this.addLink}
          className="mr-2"
        >
          <Icon
            name={icon}
            size={20}
          />
        </Option>
      </Tooltip>
    );
  }
}

export default Mention;
