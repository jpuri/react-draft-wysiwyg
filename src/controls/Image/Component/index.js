import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropdownOption } from '../../../components/Dropdown';
import Option from '../../../components/Option';
import { Tooltip, Icon, Text } from '@innovaccer/design-system';

class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
    inDropdown: PropTypes.bool,
  };

  state = {
    imgSrc: '',
    dragEnter: false,
    uploadHighlighted:
      this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
    showImageLoading: false,
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
    alt: '',
  };

  componentDidUpdate(prevProps) {
    const { config } = this.props;
    if (prevProps.expanded && !this.props.expanded) {
      this.setState({
        imgSrc: '',
        dragEnter: false,
        uploadHighlighted: config.uploadEnabled && !!config.uploadCallback,
        showImageLoading: false,
        height: config.defaultSize.height,
        width: config.defaultSize.width,
        alt: '',
      });
    } else if (
      config.uploadCallback !== prevProps.config.uploadCallback ||
      config.uploadEnabled !== prevProps.config.uploadEnabled
    ) {
      this.setState({
        uploadHighlighted: config.uploadEnabled && !!config.uploadCallback,
      });
    }
  }

  // onDragEnter = event => {
  //   this.stopPropagation(event);
  //   this.setState({
  //     dragEnter: true,
  //   });
  // };

  // onImageDrop = event => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   this.setState({
  //     dragEnter: false,
  //   });

  //   // Check if property name is files or items
  //   // IE uses 'files' instead of 'items'
  //   let data;
  //   let dataIsItems;
  //   if (event.dataTransfer.items) {
  //     data = event.dataTransfer.items;
  //     dataIsItems = true;
  //   } else {
  //     data = event.dataTransfer.files;
  //     dataIsItems = false;
  //   }
  //   for (let i = 0; i < data.length; i += 1) {
  //     if (
  //       (!dataIsItems || data[i].kind === 'file') &&
  //       data[i].type.match('^image/')
  //     ) {
  //       const file = dataIsItems ? data[i].getAsFile() : data[i];
  //       this.uploadImage(file);
  //     }
  //   }
  // };

  showImageUploadOption = () => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  addImageFromState = () => {
    const { imgSrc, alt } = this.state;
    let { height, width } = this.state;
    const { onChange } = this.props;
    if (!isNaN(height)) {
      height += 'px';
    }
    if (!isNaN(width)) {
      width += 'px';
    }
    onChange(imgSrc, height, width, alt);
  };

  showImageURLOption = () => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  toggleShowImageLoading = () => {
    const showImageLoading = !this.state.showImageLoading;
    this.setState({
      showImageLoading,
    });
  };

  updateValue = event => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  selectImage = event => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  uploadImage = file => {
    this.toggleShowImageLoading();
    const { uploadCallback } = this.props.config;

    uploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
          imgSrc: data.link || data.url,
        }, this.addImageFromState);

        this.fileUpload = false;
      })
      .catch(() => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
      });
  };

  fileUploadClick = () => {
    this.fileUpload = true;
    //event.stopPropagation();
  };

  stopPropagation = event => {
    if (!this.fileUpload) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  render() {
    const {
      config: { icon, className, title, inputAccept },
      expanded,
      inDropdown,
    } = this.props;

    if (inDropdown) {
      return (
        <DropdownOption>
          <label
            htmlFor="file"
            className="Editor-insert-imageLabel"
          >
            <Icon
              size={20}
              name={icon}
              className="mr-4"
            />
            <Text>{title}</Text>
          </label>
          <input
            type="file"
            id="file"
            accept={inputAccept}
            onChange={this.selectImage}
            className="Editor-insert-imageInput"
          />
        </DropdownOption>
      );
    }

    return (
      <div
        aria-haspopup="true"
        aria-expanded={expanded}
      >
        <Tooltip tooltip={title}>
          <Option
            className={"mr-2"}
            value="unordered-list-item"
            onClick={this.fileUploadClick}
          >
            <label
              htmlFor="file"
              className="Editor-insert-imageLabel"
            >
              <Icon name={icon} size={20} />
            </label>
            <input
              type="file"
              id="file"
              accept={inputAccept}
              onChange={this.selectImage}
              className="Editor-insert-imageInput"
            />
          </Option>
        </Tooltip>
      </div>
    );
  }
}

export default LayoutComponent;
