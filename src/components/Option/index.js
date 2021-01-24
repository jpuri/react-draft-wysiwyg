/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { withStyles } from '@material-ui/core/styles';

const StyledToggleButton = withStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    border: 'none',
  },
}))(ToggleButton);

export default class Option extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any,
    value: PropTypes.string,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    activeClassName: '',
  }

  onClick: Function = (event) => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value, event);
    }
  };

  render() {
    const { children, className, activeClassName, active, disabled, title } = this.props;
    return (
      <StyledToggleButton
        disabled={disabled}
        value="left"
        selected={active}
        onClick={this.onClick}
        aria-selected={active}
      >
        {children}
      </StyledToggleButton>
    );
  }
}
