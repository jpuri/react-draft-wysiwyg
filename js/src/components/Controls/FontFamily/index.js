/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { Dropdown, DropdownOption } from '../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class FontFamily extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    currentFontFamily: undefined,
    defaultFontFamily: undefined,
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
  }

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

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontFamily:
          getSelectionCustomInlineStyle(properties.editorState, ['FONTFAMILY']).FONTFAMILY,
      });
    }
  }

  toggleFontFamily: Function = (fontFamily: string) => {
    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      fontFamily,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    let { currentFontFamily, defaultFontFamily } = this.state;
    const { config: { className, dropdownClassName }, modalHandler } = this.props;
    let { config: { options } } = this.props;
    if (defaultFontFamily) {
      options.push(defaultFontFamily);
      options.sort();
    }
    currentFontFamily =
      currentFontFamily && currentFontFamily.substring(11, currentFontFamily.length) || defaultFontFamily;
    return (
      <div className="rdw-fontfamily-wrapper" aria-label="rdw-font-family-control">
        <Dropdown
          className={classNames('rdw-fontfamily-dropdown', className)}
          onChange={this.toggleFontFamily}
          modalHandler={modalHandler}
          optionWrapperClassName={classNames('rdw-fontfamily-optionwrapper', dropdownClassName)}
        >
          <span className="rdw-fontfamily-placeholder">
            {currentFontFamily || <FormattedMessage id="components.controls.fontfamily.fontfamily" />}
          </span>
          {
            options.map((family, index) =>
              <DropdownOption
                active={currentFontFamily === family}
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
