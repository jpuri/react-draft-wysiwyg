/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from '../../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class LayoutComponent extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentValue: PropTypes.string,
    translations: PropTypes.object,
  };

  state: Object = {
    defaultFontFamily: undefined,
  };

  componentDidMount(): void {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const styles = window.getComputedStyle(editorElm[0]);
      const defaultFontFamily = styles.getPropertyValue('font-family');
      this.setState({
        defaultFontFamily,
      });
    }
  }

  render() {
    const { defaultFontFamily } = this.state;
    const {
      config: { icon, className, dropdownClassName, options },
      translations,
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
    } = this.props;
    let { currentValue } = this.props;
    currentValue =
      currentValue && currentValue.substring(11, currentValue.length) ||
      (options && defaultFontFamily && options.some(opt => opt.toLowerCase() === defaultFontFamily.toLowerCase()) && defaultFontFamily);
    return (
      <div className="rdw-fontfamily-wrapper" aria-label="rdw-font-family-control">
        <Dropdown
          className={classNames('rdw-fontfamily-dropdown', className)}
          optionWrapperClassName={classNames('rdw-fontfamily-optionwrapper', dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          <span className="rdw-fontfamily-placeholder">
            {currentValue || translations['components.controls.fontfamily.fontfamily']}
          </span>
          {
            options.map((family, index) =>
              <DropdownOption
                active={currentValue === family}
                value={`fontfamily-${family}`}
                key={index}
              >
                {family}
              </DropdownOption>)
          }
        </Dropdown>
      </div>
    );
  }
}

export default LayoutComponent;
