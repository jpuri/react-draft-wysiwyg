/* @flow */

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { stopPropagation } from "../../../utils/common";
import Option from "../../../components/Option";
import Spinner from "../../../components/Spinner";
import "./styles.css";

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state = {
    dragEnter: false,
    showLoading: false,
  };

  selectAttachment = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadFile(event.target.files[0]);
    }
  };

  onFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

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
      if (!dataIsItems || data[i].kind === "file") {
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.uploadFile(file);
      }
    }
  };

  toggleShowLoading = () => {
    const showLoading = !this.state.showLoading;
    this.setState({ showLoading });
  };

  uploadFile = (file) => {
    this.toggleShowLoading();
    const { uploadCallback } = this.props.config;
    const { onChange } = this.props;
    uploadCallback(file)
      .then(({ data }) => {
        this.setState({ showLoading: false, dragEnter: false });
        onChange(data["link"], file["name"]);
      })
      .catch(() => {
        this.setState({ showLoading: false, dragEnter: false });
      });
  };

  renderAttachmentModal() {
    const {
      config: { popupClassName, inputAccept },
      translations,
    } = this.props;
    const { showLoading, dragEnter } = this.state;
    return (
      <div
        className={classNames("rdw-attachment-modal", popupClassName)}
        onClick={stopPropagation}
      >
        <label
          htmlFor="file"
          className={classNames("rdw-attachment-modal-upload-label", {
            "rdw-attachment-modal-upload-highlighted": dragEnter,
          })}
        >
          {translations["components.controls.attachment.dropFileText"]}
          <input
            type="file"
            id="file"
            accept={inputAccept}
            onChange={this.selectAttachment}
            onDrop={this.onFileDrop}
            onDragEnter={() => this.setState({ dragEnter: true })}
            onDragLeave={() => this.setState({ dragEnter: false })}
            className="rdw-attachment-modal-upload-input"
          />
        </label>
        {showLoading ? (
          <div className="rdw-attachment-modal-spinner">
            <Spinner />
          </div>
        ) : undefined}
      </div>
    );
  }

  render() {
    const {
      config: { icon, className, title },
      expanded,
      onExpandEvent,
      translations,
    } = this.props;
    return (
      <div
        className="rdw-attachment-wrapper"
        aria-haspopup="true"
        aria-label="rdw-attachment-control"
        aria-expanded={expanded}
        title={
          title || translations["components.controls.attachment.attachment"]
        }
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
        >
          <img src={icon} />
        </Option>
        {expanded ? this.renderAttachmentModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
