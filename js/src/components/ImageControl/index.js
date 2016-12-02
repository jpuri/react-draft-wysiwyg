/* @flow */

import React, { Component, PropTypes } from 'react';
import { Entity, AtomicBlockUtils } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
import Spinner from '../Spinner';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class ImageControl extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    uploadCallback: PropTypes.func,
    config: PropTypes.object,
  };

  state: Object = {
    imgSrc: '',
    showModal: false,
    dragEnter: false,
    showImageUpload: !!this.props.uploadCallback,
    showImageLoading: false,
  };

  componentWillReceiveProps(properties: Object): void {
    if (properties.uploadCallback !== this.props.uploadCallback) {
      this.setState({
        showImageUpload: !!this.props.uploadCallback,
      });
    }
  }

  onImageDrop: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
    this.uploadImage(event.dataTransfer.files[0]);
  };

  onDragEnter: Function = (event: Object): void => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  addImage: Function = (event: Object, imgSrc: string): void => {
    const { editorState, onChange } = this.props;
    const src = this.state.imgSrc || imgSrc;
    const entityKey = Entity.create('IMAGE', 'MUTABLE', { src });
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.toggleModal();
  };

  uploadImage: Function = (file: Object): void => {
    this.toggleShowImageLoading();
    const { uploadCallback } = this.props;
    uploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
        this.addImage(undefined, data.link);
      });
  };

  selectImage: Function = (event: Object): void => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  toggleModal: Function = (): void => {
    const { showModal } = this.state;
    const newState = {};
    newState.showModal = !showModal;
    newState.imgSrc = undefined;
    this.setState(newState);
  };

  updateImageSrc: Function = (event: Object): void => {
    this.setState({
      imgSrc: event.target.value,
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
      showImageUpload: false,
    });
  };

  showImageUploadOption: Function = (): void => {
    this.setState({
      showImageUpload: true,
    });
  };

  setImageURLInputReference: Function = (ref: Object): void => {
    this.imageURLInput = ref;
  };

  focusImageURLInput: Function = (event): Object => {
    this.imageURLInput.focus();
  }

  stopPropagationPreventDefault: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  stopPropagation: Function = (event: Object): void => {
    event.stopPropagation();
  };

  renderAddImageModal(): Object {
    const { imgSrc, showImageUpload, showImageLoading, dragEnter } = this.state;
    const { config: { popupClassName }, uploadCallback } = this.props;
    return (
      <div
        className={classNames('rdw-image-modal', popupClassName)}
        onClick={this.stopPropagation}
      >
        <div className="rdw-image-modal-header">
          {uploadCallback ?
            <span
              onClick={this.showImageUploadOption}
              className="rdw-image-modal-header-option"
            >
              <span>File Upload</span>
              <span
                className={classNames(
                  'rdw-image-modal-header-label',
                  { 'rdw-image-modal-header-label-highlighted': showImageUpload }
                )}
              />
            </span>
            :
            undefined
          }
          <span
            onClick={this.showImageURLOption}
            className="rdw-image-modal-header-option"
          >
            <span>URL</span>
            <span
              className={classNames(
                'rdw-image-modal-header-label',
                { 'rdw-image-modal-header-label-highlighted': !showImageUpload }
              )}
            />
          </span>
        </div>
        {
          showImageUpload && uploadCallback ?
            <div>
              <div
                onDragEnter={this.stopPropagationPreventDefault}
                onDragOver={this.stopPropagationPreventDefault}
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
                  onMouseDown={this.focusImageURLInput}
                />
              </div>
        }
        <span className="rdw-image-modal-btn-section">
          <button
            className="rdw-image-modal-btn"
            onClick={this.addImage}
            disabled={!imgSrc}
          >
            Add
          </button>
          <button
            className="rdw-image-modal-btn"
            onClick={this.toggleModal}
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
      <div className="rdw-image-wrapper">
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={this.toggleModal}
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
