import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { stopPropagation } from '../../../utils/common';
import Option from '../../../components/Option';
import './styles.css';
import { CirclePicker } from 'react-color';
import Popover from '@material-ui/core/Popover';
import { Box, Grow, Paper, Popper, Tab, Tabs } from '@material-ui/core';
class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
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

  setCurrentStyleColor = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      currentStyle: 'color',
    });
  };

  setCurrentStyleBgcolor = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      currentStyle: 'bgcolor',
    });
  };

  renderModal = () => {
    const {
      config: { popupClassName, colors },
      currentState: { color, bgColor },
      translations,
      expanded
    } = this.props;
    const { currentStyle } = this.state;
    const currentSelectedColor = currentStyle === 'color' ? color : bgColor;
    return (
      <Popper
        open={!!expanded}
        anchorEl={this.state.el}
        onClick={stopPropagation}
        transition
      >
        {/* <span className="rdw-colorpicker-modal-header">
          <span
            className={classNames('rdw-colorpicker-modal-style-label', {
              'rdw-colorpicker-modal-style-label-active':
                currentStyle === 'color',
            })}
            onClick={this.setCurrentStyleColor}
          >
            {translations['components.controls.colorpicker.text']}
          </span>
          <span
            className={classNames('rdw-colorpicker-modal-style-label', {
              'rdw-colorpicker-modal-style-label-active':
                currentStyle === 'bgcolor',
            })}
            onClick={this.setCurrentStyleBgcolor}
          >
            {translations['components.controls.colorpicker.background']}
          </span>
        </span> */}
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <Tabs value={currentStyle}>
                <Tab value={'color'} label={translations['components.controls.colorpicker.text']} onClick={this.setCurrentStyleColor} />
                <Tab value={'bgcolor'} label={translations['components.controls.colorpicker.background']} onClick={this.setCurrentStyleBgcolor} />
              </Tabs>
              {/* {colors.map((c, index) => (
            <Option
              value={c}
              key={index}
              className="rdw-colorpicker-option"
              activeClassName="rdw-colorpicker-option-active"
              active={currentSelectedColor === c}
              onClick={this.onChange}
            >
              <span
                style={{ backgroundColor: c }}
                className="rdw-colorpicker-cube"
              />
            </Option>
          ))} */}
              <Box p={2}>
                <CirclePicker width={300} onChangeComplete={this.handleChangeComplete} colors={colors} />
              </Box>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };

  onOpen = (value, event) => {
    const { onExpandEvent } = this.props;
    onExpandEvent(value);
    this.setState({
      el: event.currentTarget
    })
  }

  handleChangeComplete = (color, event) => {
    this.onChange(color.hex)
  };

  render() {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-colorpicker-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
        title={
          title || translations['components.controls.colorpicker.colorpicker']
        }
      >
        <Option onClick={this.onOpen} className={classNames(className)}>
          {/* <img src={icon} alt="" /> */}
          {icon}
        </Option>
        {this.renderModal()}
      </div>
    );
  }
}

export default LayoutComponent;
