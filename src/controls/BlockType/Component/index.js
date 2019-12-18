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

  UNSAFE_componentWillReceiveProps(properties: Object): void {
    if (this.props.translations !== properties.translations) {
      this.setState({
        blockTypes: this.getBlockTypes(properties.translations),
      });
    }
  }

  getBlockTypes = translations => [
    { label: 'Normal', displayName: translations['components.controls.blocktype.normal'] },
    { label: 'H1', displayName: translations['components.controls.blocktype.h1'] },
    { label: 'H2', displayName: translations['components.controls.blocktype.h2'] },
    { label: 'H3', displayName: translations['components.controls.blocktype.h3'] },
    { label: 'H4', displayName: translations['components.controls.blocktype.h4'] },
    { label: 'H5', displayName: translations['components.controls.blocktype.h5'] },
    { label: 'H6', displayName: translations['components.controls.blocktype.h6'] },
    { label: 'Blockquote', displayName: translations['components.controls.blocktype.blockquote'] },
    { label: 'Code', displayName: translations['components.controls.blocktype.code'] },
  ];

  getBlockOptions = (config, blockLabel) => {
    let options = {
      icon: null,
      blockClassName: ''
    };
    const blockConfig = config[blockLabel] || config[blockLabel.toLowerCase()];
    if (blockConfig) {
      options.icon = blockConfig.icon;
      options.blockClassName = blockConfig.className;
    }
    return options;
  };

  renderFlat(blocks: Array<Object>): void {
    const { config: { className, ...config }, onChange, currentState: { blockType } } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', className)}>
        {
          blocks.map((block, index) => {
              const {blockClassName, icon} = this.getBlockOptions(config, block.label);
              return (
                <Option
                  key={index}
                  value={block.label}
                  active={blockType === block.label}
                  onClick={onChange}
                  className={blockClassName}
                >
                  {icon ? (<img alt="" src={icon} title={block.displayName}/>) : block.displayName}
                </Option>
              )            
          })
        }
      </div>
    );
  }

  renderInDropdown(blocks: Array<Object>): void {
    const {
      config: { className, dropdownClassName, title, ...config },
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
    const firstBlock = blockTypes[0];
    const firstBlockIcon = this.getBlockOptions(config, firstBlock.label).icon;
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
          {
            firstBlockIcon ? <img src={firstBlockIcon} alt=""/> : <span> {firstBlock.displayName} </span>
          }          
          {
            blocks.map((block, index) => {
              const {blockClassName, icon} = this.getBlockOptions(config, block.label);
              return (
                <DropdownOption
                  active={blockType === block.label}
                  value={block.label}
                  key={index}
                  className={blockClassName}
                >
                  {icon ? (<img alt="" src={icon} title={block.displayName}/>) : block.displayName}
                </DropdownOption>
              )
            })
          }
        </Dropdown>
      </div>
    );
  }

  render(): void {
    const { config } = this.props;
    const { inDropdown } = config;
    const { blockTypes } = this.state;
    const blocks = blockTypes.filter(({ label }) => config.options.indexOf(label) > -1);
    return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
  }
}

export default LayoutComponent;
