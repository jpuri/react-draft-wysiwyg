/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  fontFamilies,
  toggleInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import { Dropdown, DropdownOption } from '../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class FontFamilyControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
  };

  state: Object = {
    currentFontFamily: undefined,
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
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
    const newState = toggleInlineStyle(
      editorState,
      'fontFamily',
      fontFamily,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    let { currentFontFamily } = this.state;
    currentFontFamily =
      currentFontFamily && currentFontFamily.substring(11, currentFontFamily.length);
    return (
      <div className="fontfamily-wrapper">
        <Dropdown
          className="fontfamily-dropdown"
          onChange={this.toggleFontFamily}
          optionWrapperClassName="fontfamily-optionwrapper"
        >
          <span className="fontfamily-placeholder">
            {currentFontFamily || 'Font-Family'}
          </span>
          {
            fontFamilies.map((family, index) =>
              <DropdownOption
                className="fontfamily-option"
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
