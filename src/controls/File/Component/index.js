/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Option from '../../../components/Option';
import Spinner from '../../../components/Spinner';
import './styles.css';

class LayoutComponent extends Component {
  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    fileURL: '',
    dragEnter: false,
    uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
    showLoading: false,
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
    alt: '',
    fileType: ''
  };

  componentWillReceiveProps(props: Object): void {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        fileURL: '',
        dragEnter: false,
        uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
        showLoading: false,
        height: this.props.config.defaultSize.height,
        width: this.props.config.defaultSize.width,
        alt: '',
        fileType: ''
      });
    } else if (props.config.uploadCallback !== this.props.config.uploadCallback ||
      props.config.uploadEnabled !== this.props.config.uploadEnabled) {
      this.setState({
        uploadHighlighted: props.config.uploadEnabled && !!props.config.uploadCallback,
      });
    }
  }

  onDragEnter: Function = (event: Object): void => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  onFileDrop: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dragEnter: false,
    });

    // Check if property name is files or items
    // IE uses 'files' instead of 'items'
    let data;
    let dataIsItems;
    if (event.dataTransfer.items) {
      data = event.dataTransfer.items;
      dataIsItems = true;
    } else {
      data = event.dataTransfer.files;
      dataIsItems = false;
    }
    for (let i = 0; i < data.length; i += 1) {
      // && data[i].type.match('^image/')
      if ((!dataIsItems || data[i].kind === 'file')) {
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.uploadFile(file);
      }
    }
  };

  showFileUploadOption: Function = (): void => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  addFileFromState: Function = (): void => {
    const { fileURL, alt, fileType } = this.state;
    let { height, width } = this.state;
    const { onChange } = this.props;
    if (!isNaN(height)) {
      height += 'px';
    }
    if (!isNaN(width)) {
      width += 'px';
    }
    onChange(fileURL, height, width, alt, fileType);
  };

  showFileURLOption: Function = (): void => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  toggleShowFileLoading: Function = (): void => {
    const showLoading = !this.state.showLoading;
    this.setState({
      showLoading,
    });
  };

  updateValue: Function = (event: Object): void => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  selectFile: Function = (event: Object): void => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadFile(event.target.files[0]);
    }
  };

  uploadFile: Function = (file: Object): void => {
    this.toggleShowFileLoading();
    const { uploadCallback } = this.props.config;
    uploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showLoading: false,
          dragEnter: false,
          fileURL: data.link,
          fileType: file.type,
          alt: file.name
        });
        this.fileUpload = false;
      }).catch(() => {
        this.setState({
          showLoading: false,
          dragEnter: false,
        });
      });
  };

  fileUploadClick = (event) => {
    this.fileUpload = true;
    event.stopPropagation();
  }

  stopPropagation: Function = (event: Object): void => {
    if (!this.fileUpload) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  renderAddModal(): Object {
    const {
      fileURL,
      uploadHighlighted,
      showLoading,
      dragEnter,
      height,
      width,
      alt,
      fileType,
    } = this.state;
    const {
      config: {
        popupClassName,
        uploadCallback,
        uploadEnabled,
        urlEnabled,
        inputAccept,
        alt: altConf,
      },
      doCollapse,
      translations,
    } = this.props;
    return (
      <div
        className={classNames('rdw-file-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <div className="rdw-file-modal-header">
          {uploadEnabled && uploadCallback &&
            <span
              onClick={this.showFileUploadOption}
              className="rdw-file-modal-header-option"
            >
              {translations['components.controls.file.fileUpload']}
              <span
                className={classNames(
                  'rdw-file-modal-header-label',
                  { 'rdw-file-modal-header-label-highlighted': uploadHighlighted },
                )}
              />
            </span>}
          { urlEnabled &&
            <span
              onClick={this.showFileURLOption}
              className="rdw-file-modal-header-option"
            >
              {translations['components.controls.file.byURL']}
              <span
                className={classNames(
                  'rdw-file-modal-header-label',
                  { 'rdw-file-modal-header-label-highlighted': !uploadHighlighted },
                )}
              />
            </span>}
        </div>
        {
          uploadHighlighted ?
            <div onClick={this.fileUploadClick}>
              <div
                onDragEnter={this.onDragEnter}
                onDragOver={this.stopPropagation}
                onDrop={this.onFileDrop}
                className={classNames(
                  'rdw-file-modal-upload-option',
                  { 'rdw-file-modal-upload-option-highlighted': dragEnter })}
              >
                <label
                  htmlFor="file"
                  className="rdw-file-modal-upload-option-label"
                >
                  {fileURL || translations['components.controls.file.dropFileText']}
                </label>
              </div>
              <input
                type="file"
                id="file"
                accept={inputAccept}
                onChange={this.selectFile}
                className="rdw-file-modal-upload-option-input"
              />
            </div> :
            <div className="rdw-file-modal-url-section">
              <input
                className="rdw-file-modal-url-input"
                placeholder={translations['components.controls.file.enterlink']}
                name="fileURL"
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={fileURL}
              />
              <span className="rdw-file-mandatory-sign">*</span>
            </div>
        }
        {altConf.present &&
        <div className="rdw-file-modal-size">
          <span className="rdw-file-modal-alt-lbl">Title Text</span>
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={alt}
            name="alt"
            className="rdw-file-modal-alt-input"
            placeholder="title"
          />
          <span className="rdw-file-mandatory-sign">{altConf.mandatory && '*'}</span>
        </div>}
        <div className="rdw-file-modal-size">
          &#8597;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={height}
            name="height"
            className="rdw-file-modal-size-input"
            placeholder="Height"
          />
          <span className="rdw-file-mandatory-sign">*</span>
          &nbsp;&#8596;&nbsp;
          <input
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={width}
            name="width"
            className="rdw-file-modal-size-input"
            placeholder="Width"
          />
          <span className="rdw-file-mandatory-sign">*</span>
        </div>
        <span className="rdw-file-modal-btn-section">
          <button
            className="rdw-file-modal-btn"
            onClick={this.addFileFromState}
            disabled={!fileURL || !height || !width || (altConf.mandatory && !alt)}
          >
            {translations['generic.add']}
          </button>
          <button
            className="rdw-file-modal-btn"
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
        {showLoading ?
          <div className="rdw-file-modal-spinner">
            <Spinner />
          </div> :
          undefined}
      </div>
    );
  }

  render(): Object {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-file-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-file-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
          title={title || translations['components.controls.file.file']}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.renderAddModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
