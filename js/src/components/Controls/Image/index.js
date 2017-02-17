/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../../Option';
import Spinner from '../../Spinner';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class ImageControl extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state: Object = {
    imgSrc: '',
    showModal: false,
    dragEnter: false,
    uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
    showImageLoading: false,
    height: 'auto',
    width: '100%',
  };

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.showHideModal);
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.config.uploadCallback !== this.props.config.uploadCallback ||
      properties.config.uploadEnabled !== this.props.config.uploadEnabled) {
      this.setState({
        uploadHighlighted: properties.config.uploadEnabled && !!properties.config.uploadCallback,
      });
    }
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.showHideModal);
  }

  onImageDrop: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dragEnter: false,
    });
    this.uploadImage(event.dataTransfer.files[0]);
  };

  onDragEnter: Function = (event: Object): void => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  onOptionClick: Function = (): void => {
    this.signalShowModal = !this.state.showModal;
  };

  setImageURLInputReference: Function = (ref: Object): void => {
    this.imageURLInput = ref;
  };

  setHeightInputReference: Function = (ref: Object): void => {
    this.heightInput = ref;
  };

  setWidthInputReference: Function = (ref: Object): void => {
    this.widthInput = ref;
  };

  updateImageSrc: Function = (event: Object): void => {
    this.setState({
      imgSrc: event.target.value,
    });
  };

  updateHeight: Function = (event: Object): void => {
    this.setState({
      height: event.target.value,
    });
  };

  updateWidth: Function = (event: Object): void => {
    this.setState({
      width: event.target.value,
    });
  };

  toggleShowImageLoading: Function = (): void => {
    const showImageLoading = !this.state.showImageLoading;
    this.setState({
      showImageLoading,
    });
  };

  showImageURLOption: Function = (): void => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  showImageUploadOption: Function = (): void => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  hideModal: Function = (): void => {
    this.setState({
      showModal: false,
      imgSrc: undefined,
    });
  };

  showHideModal: Function = (): void => {
    this.setState({
      showModal: this.signalShowModal,
      imgSrc: undefined,
      uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
    });
    this.signalShowModal = false;
  }

  selectImage: Function = (event: Object): void => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  uploadImage: Function = (file: Object): void => {
    this.toggleShowImageLoading();
    const { uploadCallback } = this.props.config;
    uploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
        this.addImageFromSrcLink(data.link);
      });
  };

  addImageFromState: Function = (): void => {
    this.addImage(this.state.imgSrc);
  };

  addImageFromSrcLink: Function = (src: string): void => {
    this.addImage(src);
  };

  addImage: Function = (imgSrc: string): void => {
    const { editorState, onChange } = this.props;
    const src = imgSrc || this.state.imgSrc;
    const { height, width } = this.state;
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('IMAGE', 'MUTABLE', { src, height, width })
      .getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.hideModal();
  };

  fileUploadClick = () => {
    this.fileUpload = true;
    this.signalShowModal = true;
  }

  stopPropagation: Function = (event: Object): void => {
    if (!this.fileUpload) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  renderAddImageModal(): Object {
    const { imgSrc, uploadHighlighted, showImageLoading, dragEnter, height, width } = this.state;
    const { config: { popupClassName, uploadCallback, uploadEnabled, urlEnabled } } = this.props;
    return (
      <div
        className={classNames('rdw-image-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <div className="rdw-image-modal-header">
          {uploadEnabled && uploadCallback &&
            <span
              onClick={this.showImageUploadOption}
              className="rdw-image-modal-header-option"
            >
              <span>File Upload</span>
              <span
                className={classNames(
                  'rdw-image-modal-header-label',
                  { 'rdw-image-modal-header-label-highlighted': uploadHighlighted }
                )}
              />
            </span>}
          { urlEnabled &&
            <span
              onClick={this.showImageURLOption}
              className="rdw-image-modal-header-option"
            >
              <span>URL</span>
              <span
                className={classNames(
                  'rdw-image-modal-header-label',
                  { 'rdw-image-modal-header-label-highlighted': !uploadHighlighted }
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
                onDrop={this.onImageDrop}
                className={classNames(
                'rdw-image-modal-upload-option',
                { 'rdw-image-modal-upload-option-highlighted': dragEnter })}
              >
                <label
                  htmlFor="file"
                  className="rdw-image-modal-upload-option-label"
                >
                  Drop the file or click to upload
                </label>
              </div>
              <input
                type="file"
                id="file"
                onChange={this.selectImage}
                className="rdw-image-modal-upload-option-input"
              />
            </div> :
              <div className="rdw-image-modal-url-section">
                <input
                  ref={this.setImageURLInputReference}
                  className="rdw-image-modal-url-input"
                  placeholder="Enter url"
                  onChange={this.updateImageSrc}
                  onBlur={this.updateImageSrc}
                  value={imgSrc}
                />
              </div>
        }
        <div className="rdw-embedded-modal-size">
          <input
            ref={this.setHeightInputReference}
            onChange={this.updateHeight}
            onBlur={this.updateHeight}
            value={height}
            className="rdw-embedded-modal-size-input"
            placeholder="Height"
          />
          <input
            ref={this.setWidthInputReference}
            onChange={this.updateWidth}
            onBlur={this.updateWidth}
            value={width}
            className="rdw-embedded-modal-size-input"
            placeholder="Width"
          />
        </div>
        <span className="rdw-image-modal-btn-section">
          <button
            className="rdw-image-modal-btn"
            onClick={this.addImageFromState}
            disabled={!imgSrc || !height || !width}
          >
            Add
          </button>
          <button
            className="rdw-image-modal-btn"
            onClick={this.hideModal}
          >
            Cancel
          </button>
        </span>
        {showImageLoading ?
          <div className="rdw-image-modal-spinner">
            <Spinner />
          </div> :
          undefined}
      </div>
    );
  }

  render(): Object {
    const { config: { icon, className } } = this.props;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-image-wrapper"
        aria-haspopup="true"
        aria-expanded={showModal}
        aria-label="rdw-image-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={this.onOptionClick}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
        {showModal ? this.renderAddImageModal() : undefined}
      </div>
    );
  }
}
