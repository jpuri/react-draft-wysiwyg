/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectedBlocksType } from 'draftjs-utils';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
import { Dropdown, DropdownOption } from '../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class BlockControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
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
    { label: 'Normal', style: 'unstyled' },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
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
            {block.label}
          </Option>
        )
      }
      </div>
    );
  }

  renderInDropdown(blocks: Array<Object>): void {
    let { currentBlockType } = this.state;
    if (currentBlockType === 'unordered-list-item' || currentBlockType === 'ordered-list-item') {
      currentBlockType = 'unstyled';
    }
    const currentBlockData = this.blocksTypes.filter(blk => blk.style === currentBlockType);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].label;
    const { config: { className, dropdownClassName }, modalHandler } = this.props;
    if (!blocks.find(({style}) => style=== 'unstyled')) {
      blocks.unshift(this.blocksTypes[0]); // add Normal style
    }
    return (
      <div className="rdw-block-wrapper">
        <Dropdown
          className={classNames('rdw-block-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={this.toggleBlockType}
          modalHandler={modalHandler}
        >
          <span>{currentLabel}</span>
          {
            blocks.map((block, index) =>
              <DropdownOption
                active={currentBlockType === block.style}
                value={block.style}
                key={index}
              >
                {block.label}
              </DropdownOption>)
          }
        </Dropdown>
      </div>
    );
  }

  render(): void {
    const { inDropdown } = this.props.config;
    const { config } = this.props;
    const blocks = this.blocksTypes.filter(({ label }) => config.options.includes(label));
    return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
  }
}
