/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';


import { Button, Grow, Menu, MenuList, Paper, Popper } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';

const StyledToggleButton = withStyles((theme) => ({
  root: {
    padding: theme.spacing(.5, 1),
    border: 'none',
  },
}))(ToggleButton);
export default class LayoutComponent extends Component {
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

  state: Object = {
    defaultFontSize: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = editorStyles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        defaultFontSize,
      });
    }
  }

  onOpen = (e) => {
    this.setState({
      el: e.currentTarget
    }, () => {
        this.props.onExpandEvent(e);
        this.props.doExpand(e);
    })
  }

  render() {
    const {
      config: { icon, className, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
      translations,
    } = this.props;
    let { currentState: { fontSize: currentFontSize } } = this.props;
    let { defaultFontSize } = this.state;
    defaultFontSize = Number(defaultFontSize);
    currentFontSize = currentFontSize ||
      (options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize);
    
    return (
      <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
        {/* <Dropdown
          className={classNames('rdw-fontsize-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations['components.controls.fontsize.fontsize']}
        >
          {currentFontSize ?
            <span>{currentFontSize}</span> :
            <img src={icon} alt="" />
          }
          {
            options.map((size, index) =>
            (<DropdownOption
              className="rdw-fontsize-option"
              active={currentFontSize === size}
              value={size}
              key={index}
            >
              {size}
            </DropdownOption>),
            )
          }
        </Dropdown> */}
        <StyledToggleButton onClick={this.onOpen} endIcon={<ArrowDropDownIcon />}>
          Size<ArrowDropDownIcon />
        </StyledToggleButton>
        <Popper open={!!expanded} anchorEl={this.state.el} transition >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
              <MenuList>
                {
                  options.map((size, index) =>
                  (<MenuItem
                    onClick={() => onChange(size)}
                    active={currentFontSize === size}
                    value={size}
                    key={index}>
                    {size}
                  </MenuItem>))
                }
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}
