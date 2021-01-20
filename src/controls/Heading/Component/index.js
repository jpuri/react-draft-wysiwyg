import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import { Icon, Heading } from '@innovaccer/design-system';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      blockTypes: this.getBlockTypes(),
    };
  }

  getBlockTypes = () => [
    {
      label: 'H1',
      size: 'xxl',
      displayName: 'Heading 1',
    },
    {
      label: 'H2',
      size: 'xl',
      displayName: 'Heading 2',
    },
    {
      label: 'H3',
      size: 'l',
      displayName: 'Heading 3',
    },
    {
      label: 'H4',
      size: 'm',
      displayName: 'Heading 4',
    },
  ];

  renderInDropdown(blocks) {
    const {
      config: { icon },
      currentState: { blockType },
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      onChange,
      className
    } = this.props;

    return (
      <div className={className} aria-label="Editor-block-control">
        <Dropdown
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          triggerClassName={'Editor-heading-trigger'}
        >
          <Icon name={icon} size={20} />
          {blocks.map((block, index) => (
            <DropdownOption
              active={blockType === block.label}
              value={block.label}
              key={index}
            >
              <Heading
                size={block.size}
                className="Editor-heading-option"
                appearance={blockType === block.label ? 'white' : 'default'}
              >
                {block.displayName}
              </Heading>
            </DropdownOption>
          ))}
        </Dropdown>
      </div>
    );
  }

  render() {
    const { config } = this.props;
    const { blockTypes } = this.state;
    const blocks = blockTypes.filter(
      ({ label }) => config.options.indexOf(label) > -1
    );

    return this.renderInDropdown(blocks);
  }
}

export default LayoutComponent;
