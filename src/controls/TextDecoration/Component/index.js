import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import { Icon, Tooltip, Text, Checkbox } from '@innovaccer/design-system';

export default class TextDecoration extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
    className: PropTypes.string,
  };

  renderInDropdown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentState,
      onChange,
    } = this.props;

    const len = config.options.length - config.max;

    return (
      <Dropdown
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        triggerClassName="Editor-textDecoration-moreIcon"
        menu={true}
      >
        <Icon name="more_horizon" size={20} />
        {
          config.options.slice(config.max, config.options.length)
            .map((style, index) => {
              const active = currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE);
              const { icon, title, label } = config[style];

              return (
                <DropdownOption
                  key={index}
                  value={style}
                  active={active}
                  isCheckbox={len > 1}
                >
                  {len > 1 ? (
                    <Checkbox
                      checked={active}
                      label={label}
                    />
                  ) : (
                      <>
                        <Icon
                          size={20}
                          name={icon}
                          className="mr-4"
                          appearance={active ? 'white' : 'default'}
                        />
                        <Text appearance={active ? 'white' : 'default'}>{label}</Text>
                      </>
                    )}
                </DropdownOption>
              );
            })
        }
      </Dropdown>
    );
  }

  render(): Object {
    const { config, currentState, onChange, className } = this.props;
    const hiddenOptions = config.options.length - config.max;
    const visibleOptions = config.max;

    const ComponentClass = classNames({
      ['Editor-textDecoration']: true,
    }, className);

    return (
      <div className={ComponentClass}>
        {
          config.options.slice(0, visibleOptions)
            .map((style, index) => {
              const active = currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE);
              const { title, icon } = config[style];

              return (
                <Tooltip tooltip={title}>
                  <Option
                    key={index}
                    value={style}
                    onClick={onChange}
                    active={active}
                    className="mr-2"
                  >
                    <Icon
                      name={icon}
                      size={20}
                      appearance={active ? 'info' : 'default'}
                    />
                  </Option>
                </Tooltip>
              )
            })
        }
        {hiddenOptions > 0 && this.renderInDropdown()}
      </div>
    );
  }
}
