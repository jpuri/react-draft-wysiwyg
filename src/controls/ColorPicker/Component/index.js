import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import { Icon, Popover } from '@innovaccer/design-system';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    className: PropTypes.className
  };

  state = {
    currentStyle: 'color',
  };

  componentDidUpdate(prevProps) {
    const { expanded } = this.props;
    if (expanded && !prevProps.expanded) {
      this.setState({
        currentStyle: 'color',
      });
    }
  }

  onChange = color => {
    const { onChange } = this.props;
    const { currentStyle } = this.state;
    onChange(currentStyle, color);
  };

  // setCurrentStyleColor = () => {
  //   this.setState({
  //     currentStyle: 'color',
  //   });
  // };

  // setCurrentStyleBgcolor = () => {
  //   this.setState({
  //     currentStyle: 'bgcolor',
  //   });
  // };

  renderModal = () => {
    const {
      config: { colors },
      currentState: { color, bgColor },
    } = this.props;

    const { currentStyle } = this.state;
    const currentSelectedColor = currentStyle === 'color' ? color : bgColor;

    return (
      <div
        className={'Editor-colorPicker'}
        onClick={stopPropagation}
      >
        {colors.map((c, index) => (
          <div className="Editor-colorPicker-circleWrapper">
            <div
              key={index}
              style={{ backgroundColor: c }}
              className="Editor-colorPicker-circle"
              aria-selected={currentSelectedColor === c}
              onClick={() => this.onChange(c)}
            />
            {currentSelectedColor === c && (
              <Icon
                name="check"
                appearance="white"
                className={'Editor-colorPicker-selectedCircle'}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  render() {
    const {
      expanded,
      onExpandEvent,
      className
    } = this.props;

    const trigger = (
      <Option
        onClick={onExpandEvent}
        active={expanded}
        activeClassName="bg-secondary"
      >
        <Icon name="text_format" size={20} />
      </Option>
    );

    return (
      <div
        className={className}
        aria-haspopup="true"
        aria-expanded={expanded}
      >
        <Popover
          trigger={trigger}
          position="bottom-start"
          open={expanded}
          onToggle={onExpandEvent}
        >
          {this.renderModal()}
        </Popover>
      </div>
    );
  }
}

export default LayoutComponent;
