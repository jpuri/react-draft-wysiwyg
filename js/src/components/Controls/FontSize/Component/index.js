/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from '../../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class LayoutComponent extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
  };

  state: Object = {
    defaultFontSize: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const styles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = styles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setState({
        defaultFontSize,
      });
    }
  }

  render() {
    const {
      config: { icon, className, dropdownClassName, options },
      translations,
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
    } = this.props;
    let { currentState: { fontSize : currentFontSize} } = this.props;
    let { defaultFontSize } = this.state;
    defaultFontSize = Number(defaultFontSize);
    currentFontSize = currentFontSize ||
      (options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize);
    return (
      <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
        <Dropdown
          className={classNames('rdw-fontsize-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          {currentFontSize ?
            <span>{currentFontSize}</span>
          :
            <img
              src={icon}
              alt=""
            />
          }
          {
            options.map((size, index) =>
              <DropdownOption
                className="rdw-fontsize-option"
                active={currentFontSize === size}
                value={size}
                key={index}
              >
                {size}
              </DropdownOption>
            )
          }
        </Dropdown>
      </div>
    );
  }
}
