/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  fontSizes,
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import classNames from 'classnames';
import { Dropdown, DropdownOption } from '../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class FontSize extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    currentFontSize: undefined,
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontSize:
          getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontSize:
          getSelectionCustomInlineStyle(properties.editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
  }

  toggleFontSize: Function = (fontSize: number) => {
    const { editorState, onChange } = this.props;
    const fontSizeStr = fontSize && (fontSize.toString() || '');
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSizeStr,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config: { icon, className, options }, modalHandler } = this.props;
    let { currentFontSize } = this.state;
    currentFontSize = currentFontSize
      && Number(currentFontSize.substring(9, currentFontSize.length));
    return (
      <div className="rdw-fontsize-wrapper" aria-label="rdw-font-size-control">
        <Dropdown
          className={classNames('rdw-fontsize-dropdown', className)}
          onChange={this.toggleFontSize}
          modalHandler={modalHandler}
        >
          {currentFontSize ?
            <span>{currentFontSize}</span>
          :
            <img
              src={icon}
              role="presentation"
            />
          }
          {
            options.map((size, index) =>
              <DropdownOption
                className="rdw-fontsize-option"
                active={currentFontSize === size}
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
