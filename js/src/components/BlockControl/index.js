/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectedBlocksType } from 'draftjs-utils';
import Option from '../Option';
import { RichUtils } from 'draft-js';
import classNames from 'classnames';
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

  render() {
    let {inDropdown} = this.props.config;
    return inDropdown ? this.renderInDropdown() : this.renderFlat();
  }

  renderFlat() {
    let {config} = this.props;
    let {currentStyles, currentBlockType} = this.state;
    let blockTypes = this.blocksTypes.filter(({label}) => config.options.includes(label));

    return (
      <div className={classNames('rdw-inline-wrapper', config.className)}>
      {
        blockTypes.map((block, index) =>
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

  renderInDropdown() {
    let { currentBlockType } = this.state;
    if (currentBlockType === 'unordered-list-item' || currentBlockType === 'ordered-list-item') {
      currentBlockType = 'unstyled';
    }
    const currentBlockData = this.blocksTypes.filter(blk => blk.style === currentBlockType);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].label;
    const { config: { className, dropdownClassName }, modalHandler } = this.props;
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
            this.blocksTypes.map((block, index) =>
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
}
