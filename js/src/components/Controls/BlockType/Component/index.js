/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Option from '../../../Option';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class LayoutComponent extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  blocksTypes: Array<Object> = [
    { label: 'Normal', displayName: this.props.translations['components.controls.blocktype.normal'] },
    { label: 'H1', displayName: this.props.translations['components.controls.blocktype.h1'] },
    { label: 'H2', displayName: this.props.translations['components.controls.blocktype.h2'] },
    { label: 'H3', displayName: this.props.translations['components.controls.blocktype.h3'] },
    { label: 'H4', displayName: this.props.translations['components.controls.blocktype.h4'] },
    { label: 'H5', displayName: this.props.translations['components.controls.blocktype.h5'] },
    { label: 'H6', displayName: this.props.translations['components.controls.blocktype.h6'] },
    { label: 'Blockquote', displayName: this.props.translations['components.controls.blocktype.blockquote'] },
  ];

  renderFlat(): void {
    const { config: { className }, onChange, currentState: { blockType } } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', className)}>
        {
        this.blocksTypes.map((block, index) =>
          <Option
            key={index}
            value={block.label}
            active={blockType === block.label}
            onClick={onChange}
          >
            {block.displayName}
          </Option>
        )
      }
      </div>
    );
  }

  renderInDropdown(): void {
    const {
      config: { className, dropdownClassName },
      currentState: { blockType },
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      onChange,
      translations,
    } = this.props;
    const currentBlockData = this.blocksTypes.filter(blk => blk.label === blockType);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
    return (
      <div className="rdw-block-wrapper" aria-label="rdw-block-control">
        <Dropdown
          className={classNames('rdw-block-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          <span>{currentLabel || translations['components.controls.blocktype.blocktype']}</span>
          {
            this.blocksTypes.map((block, index) =>
              <DropdownOption
                active={blockType === block.label}
                value={block.label}
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

export default LayoutComponent;
