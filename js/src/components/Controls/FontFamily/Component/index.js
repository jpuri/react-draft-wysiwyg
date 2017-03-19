/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

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
    const {
      config: { className, dropdownClassName },
      onChange,
      expanded,
      doExpand,
      doCollapse,
      onExpandEvent,
    } = this.props;
    let { config: { options }, currentValue } = this.props;
    let { defaultFontFamily } = this.state;
    if (defaultFontFamily && options && options.indexOf(defaultFontFamily) < 0) {
      options.push(defaultFontFamily);
      options.sort();
    }
    currentValue =
      currentValue && currentValue.substring(11, currentValue.length) || defaultFontFamily;
    return (
      <div className="rdw-fontfamily-wrapper" aria-label="rdw-font-family-control">
        <Dropdown
          className={classNames('rdw-fontfamily-dropdown', className)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          optionWrapperClassName={classNames('rdw-fontfamily-optionwrapper', dropdownClassName)}
        >
          <span className="rdw-fontfamily-placeholder">
            {currentValue || <FormattedMessage id="components.controls.fontfamily.fontfamily" />}
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
