/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

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

  constructor(props) {
    super(props);
    this.state = {
      blockTypes: this.getBlockTypes(props.translations),
    };
  }

  componentWillReceiveProps(properties: Object): void {
    if (this.props.translations !== properties.translations) {
      this.setState({
        blockTypes: this.getBlockTypes(properties.translations),
      });
    }
  }

  getBlockTypes = translations => [
    { label: 'Normal', className: 'heading-normal', displayName: this.props.translations['components.controls.blocktype.normal'] },
    { label: 'H1', className: 'heading-h1', displayName: this.props.translations['components.controls.blocktype.h1'] },
    { label: 'H2', className: 'heading-h2', displayName: this.props.translations['components.controls.blocktype.h2'] },
    { label: 'H3', className: 'heading-h3', displayName: this.props.translations['components.controls.blocktype.h3'] },
    { label: 'H4', className: 'heading-h4', displayName: this.props.translations['components.controls.blocktype.h4'] },
    { label: 'H5', className: 'heading-h5', displayName: this.props.translations['components.controls.blocktype.h5'] },
    { label: 'H6', className: 'heading-h6', displayName: this.props.translations['components.controls.blocktype.h6'] },
    { label: 'Blockquote', className: 'heading-blockquote', displayName: this.props.translations['components.controls.blocktype.blockquote'] },
    { label: 'Code',  className: 'heading-code', displayName: translations['components.controls.blocktype.code'] },
  ];

  renderFlat(blocks: Array<Object>): void {
    const { config: { className }, onChange, currentState: { blockType } } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', className)}>
        {
          blocks.map((block, index) =>
            (<Option
              key={index}
              value={block.label}
              active={blockType === block.label}
              onClick={onChange}
            >
              {block.displayName}
            </Option>),
          )
        }
      </div>
    );
  }

  renderInDropdown(blocks: Array<Object>): void {
    const {
      config: { className, dropdownClassName, title },
      currentState: { blockType },
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      onChange,
      translations,
    } = this.props;
    const { blockTypes } = this.state;
    const currentBlockData = blockTypes.filter(blk => blk.label === blockType);
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
          title={title || translations['components.controls.blocktype.blocktype']}
        >
          <span>{currentLabel || translations['components.controls.blocktype.blocktype']}</span>
          {
            blocks.map((block, index) =>
              (<DropdownOption
                active={blockType === block.label}
                className={block.className}
                value={block.label}
                key={index}
              >
                {block.displayName}
              </DropdownOption>))
          }
        </Dropdown>
      </div>
    );
  }

  render(): void {
    const { config } = this.props;
    const { inDropdown } = config;
    const { blockTypes } = this.state;
    const blocks = blockTypes.filter(({ label }) => config.options.includes(label));
    return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
  }
}

export default LayoutComponent;
