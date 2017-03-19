/* @flow */

import React, { Component, PropTypes } from 'react';
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
    currentValue: PropTypes.string,
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
      config: { icon, className },
      modalHandler,
      onChange,
      expanded,
      doCollapse,
      doExpand,
      onExpandEvent,
    } = this.props;
    let { config: { options }, currentValue } = this.props;
    let { defaultFontSize } = this.state;
    if (defaultFontSize && options && options.indexOf(defaultFontSize) < 0) {
      options.push(Number(defaultFontSize));
      options.sort();
    }
    currentValue = currentValue
      && Number(currentValue.substring(9, currentValue.length)) || defaultFontSize;
    return (
      <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
        <Dropdown
          className={classNames('rdw-fontsize-dropdown', className)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          {currentValue ?
            <span>{currentValue}</span>
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
                active={currentValue === size}
                value={`fontsize-${size}`}
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
