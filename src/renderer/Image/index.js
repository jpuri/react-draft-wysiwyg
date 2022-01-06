import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, SelectionState, Modifier } from "draft-js";
import classNames from "classnames";
import Option from "../../components/Option";
import defaultToolbar from "../../config/defaultToolbar";
import "./styles.css";

const getImageComponent = (config) =>
  class Image extends Component {
    static propTypes: Object = {
      block: PropTypes.object,
      contentState: PropTypes.object,
    };

    componentDidMount = () => {
      const { block, contentState } = this.props;
      const entity = contentState.getEntity(block.getEntityAt(0));
      let { height, width } = entity.getData();

      if (height == null) {
        height = "auto";
      }

      if (width == null) {
        width = "auto";
      }

      this.setState({ height, width });
    };

    state: Object = {
      hovered: false,
      height: "0px",
      width: "0px",
    };

    removeImage: Function = (): void => {
      const { block, contentState } = this.props;

      const blockKey = block.getKey();
      const afterKey = contentState.getKeyAfter(blockKey);
      const targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: afterKey,
        focusOffset: 0,
      });
      let newContentState = Modifier.setBlockType(contentState, targetRange, "unstyled");

      newContentState = Modifier.removeRange(newContentState, targetRange, "backward");
      config.onChange(EditorState.push(config.getEditorState(), newContentState, "remove-range"));
    };

    setEntityAlignmentLeft: Function = (): void => {
      this.setEntityAlignment("left");
    };

    setEntityAlignmentRight: Function = (): void => {
      this.setEntityAlignment("right");
    };

    setEntityAlignmentCenter: Function = (): void => {
      this.setEntityAlignment("none");
    };

    setEntitySizeAuto: Function = (): void => {
      this.setState({ height: "auto", width: "auto" });
      this.setEntitySize("auto", "auto");
    };

    applySize: Function = (): void => {
      this.setEntitySize(this.state.height, this.state.width);
    };

    setEntitySize: Function = (height, width): void => {
      const { block, contentState } = this.props;
      const entityKey = block.getEntityAt(0);

      let entityHeight = height;
      let entityWidth = width;

      contentState.mergeEntityData(entityKey, {
        height: entityHeight,
        width: entityWidth,
      });
      config.onChange(EditorState.push(config.getEditorState(), contentState, "change-block-data"));
      this.setState({
        dummy: true,
      });
    };

    setEntityAlignment: Function = (alignment): void => {
      const { block, contentState } = this.props;
      const entityKey = block.getEntityAt(0);
      contentState.mergeEntityData(entityKey, { alignment });
      config.onChange(EditorState.push(config.getEditorState(), contentState, "change-block-data"));
      this.setState({
        dummy: true,
      });
    };

    toggleHovered: Function = (): void => {
      const hovered = !this.state.hovered;
      this.setState({
        hovered,
      });
    };

    renderAlignmentOptions(alignment): Object {
      const icons = defaultToolbar.imageAlign;

      return (
        <div
          className={classNames("rdw-image-alignment-options-popup", {
            "rdw-image-alignment-options-popup-right": alignment === "right",
          })}
        >
          <Option onClick={this.setEntityAlignmentLeft} className="rdw-image-alignment-option">
            <img className="" src={icons.left} alt="" />
          </Option>
          <Option onClick={this.setEntityAlignmentCenter} className="rdw-image-alignment-option">
            <img src={icons.center} alt="" />
          </Option>
          <Option onClick={this.setEntityAlignmentRight} className="rdw-image-alignment-option">
            <img src={icons.right} alt="" />
          </Option>
        </div>
      );
    }

    handleChangeHeight(increase) {
      let height;
      if (this.state.height == "auto") {
        height = document.getElementById("image").clientHeight;
      } else {
        height = Number(this.state.height.replace("px", ""));
      }
      const newHeight = increase ? height + 10 : height - 10;
      this.setState({ height: newHeight.toString().concat("px") });
    }

    handleChangeWidth(increase) {
      let width;
      if (this.state.width == "auto") {
        width = document.getElementById("image").clientWidth;
      } else {
        width = Number(this.state.width.replace("px", ""));
      }
      const newWidth = increase ? width + 10 : width - 10;
      this.setState({ width: newWidth.toString().concat("px") });
    }

    renderSizeOptions(alignment): Object {
      const icons = defaultToolbar.imageSizing;

      return (
        <div
          className={classNames(
            "rdw-image-alignment-options-popup",
            {
              "rdw-image-alignment-options-popup-right": alignment === "right",
            },
            "rdw-image-alignment-options-separator"
          )}
        >
          <input
            className="size-to-update"
            type={`${this.state.height == `auto` ? `text` : `number`}`}
            value={this.state.height.replace("px", "")}
            onClick={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              e.preventDefault(), this.setState({ height: e.target.value.concat("px") });
            }}
          />
          <div>
            <Option onClick={() => this.handleChangeHeight(true)} className="rdw-image-size-option-update">
              <img className="size-arrow" src={icons.upArrow} />
            </Option>
            <Option onClick={() => this.handleChangeHeight(false)} className="rdw-image-size-option-update">
              <img className="size-arrow" src={icons.downArrow} />
            </Option>
          </div>
          <input
            className="size-to-update"
            type={`${this.state.width == `auto` ? `text` : `number`}`}
            value={this.state.width.replace("px", "")}
            onClick={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              e.preventDefault(), this.setState({ width: e.target.value.concat("px") });
            }}
          />
          <div>
            <Option onClick={() => this.handleChangeWidth(true)} className="rdw-image-size-option-update">
              <img className="size-arrow" src={icons.upArrow} />
            </Option>
            <Option onClick={() => this.handleChangeWidth(false)} className="rdw-image-size-option-update">
              <img className="size-arrow" src={icons.downArrow} />
            </Option>
          </div>
          <Option onClick={this.applySize} className="rdw-image-size-option">
            Apply
          </Option>
          <Option onClick={this.setEntitySizeAuto} className="rdw-image-size-option">
            Auto
          </Option>
        </div>
      );
    }

    renderDeletionOption(alignment): Object {
      return (
        <div
          className={classNames(
            "rdw-image-alignment-options-popup",
            {
              "rdw-image-alignment-options-popup-right": alignment === "right",
            },
            "rdw-image-alignment-options-separator"
          )}
        >
          <Option onClick={this.removeImage} className="rdw-image-size-option">
            X
          </Option>
        </div>
      );
    }

    render(): Object {
      const { block, contentState } = this.props;
      const { hovered } = this.state;
      const { isReadOnly, isImageAlignmentEnabled, isImageSizeEnabled, isImageDeletionEnabled } = config;
      const entity = contentState.getEntity(block.getEntityAt(0));
      const { src, alignment, height, width, alt } = entity.getData();

      return (
        <>
          <span
            onMouseEnter={this.toggleHovered}
            onMouseLeave={this.toggleHovered}
            className={classNames("rdw-image-alignment", {
              "rdw-image-left": alignment === "left",
              "rdw-image-right": alignment === "right",
              "rdw-image-center": !alignment || alignment === "none",
            })}
          >
            <span className="rdw-image-imagewrapper">
              <div
                style={{
                  height,
                  width,
                  position: "relative",
                }}
              >
                <div
                  className="rdw-image-options-wrapper"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                >
                  {!isReadOnly() /*&& hovered*/ && isImageDeletionEnabled()
                    ? this.renderDeletionOption("right")
                    : undefined}
                </div>
                <img
                  id="image"
                  src={src}
                  alt={alt}
                  style={{
                    height,
                    width,
                  }}
                />
              </div>

              <div className="rdw-image-options-wrapper">
                {!isReadOnly() /*&& hovered*/ && isImageAlignmentEnabled()
                  ? this.renderAlignmentOptions(alignment)
                  : undefined}
                {!isReadOnly() /*&& hovered*/ && isImageSizeEnabled() ? this.renderSizeOptions(alignment) : undefined}
              </div>
            </span>
          </span>
        </>
      );
    }
  };

export default getImageComponent;
