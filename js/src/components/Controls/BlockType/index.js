/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectedBlocksType } from 'draftjs-utils';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class BlockType extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    currentBlockType: 'unstyled',
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(editorState),
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(properties.editorState),
      });
    }
  }

  blocksTypes: Array<Object> = [
    { label: 'Normal', displayName: this.props.translations['components.controls.blocktype.normal'], style: 'unstyled' },
    { label: 'H1', displayName: this.props.translations['components.controls.blocktype.h1'], style: 'header-one' },
    { label: 'H2', displayName: this.props.translations['components.controls.blocktype.h2'], style: 'header-two' },
    { label: 'H3', displayName: this.props.translations['components.controls.blocktype.h3'], style: 'header-three' },
    { label: 'H4', displayName: this.props.translations['components.controls.blocktype.h4'], style: 'header-four' },
    { label: 'H5', displayName: this.props.translations['components.controls.blocktype.h5'], style: 'header-five' },
    { label: 'H6', displayName: this.props.translations['components.controls.blocktype.h6'], style: 'header-six' },
    { label: 'Blockquote', displayName: this.props.translations['components.controls.blocktype.blockquote'], style: 'blockquote' },
  ];

  toggleBlockType: Function = (blockType: string) => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleBlockType(
      editorState,
      blockType
    );
    if (newState) {
      onChange(newState);
    }
  };

  renderFlat(blocks: Array<Object>): void {
    const { config: { className } } = this.props;
    const { currentBlockType } = this.state;

    return (
      <div className={classNames('rdw-inline-wrapper', className)}>
        {
        blocks.map((block, index) =>
          <Option
            key={index}
            value={block.style}
            active={currentBlockType === block.style}
            onClick={this.toggleBlockType}
          >
            {block.displayName}
          </Option>
        )
      }
      </div>
    );
  }

  renderInDropdown(blocks: Array<Object>): void {
    const { currentBlockType } = this.state;
    const currentBlockData = blocks.filter(blk => blk.style === currentBlockType);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
    const { config: { className, dropdownClassName }, modalHandler, translations } = this.props;
    return (
      <div className="rdw-block-wrapper" aria-label="rdw-block-control">
        <Dropdown
          className={classNames('rdw-block-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={this.toggleBlockType}
          modalHandler={modalHandler}
        >
          <span>{currentLabel || translations['components.controls.blocktype.blocktype']}</span>
          {
            blocks.map((block, index) =>
              <DropdownOption
                active={currentBlockType === block.style}
                value={block.style}
                key={index}
              >
                {block.displayName}
              </DropdownOption>)
          }
        </Dropdown>
      </div>
    );
  }

  render(): void {
    const { config } = this.props;
    const { inDropdown } = config;
    const blocks = this.blocksTypes.filter(({ label }) => config.options.includes(label));
    return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
  }
}

export default BlockType;
