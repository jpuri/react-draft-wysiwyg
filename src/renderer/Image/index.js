import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';
import './styles.css';

const getImageComponent = config => class Image extends Component {
  static propTypes: Object = {
    block: PropTypes.object,
    contentState: PropTypes.object,
  };

  state: Object = {
    hovered: false,
  };

  setEntityAlignmentLeft: Function = (): void => {
    this.setEntityAlignment('left');
  };

  setEntityAlignmentRight: Function = (): void => {
    this.setEntityAlignment('right');
  };

  setEntityAlignmentCenter: Function = (): void => {
    this.setEntityAlignment('center');
  };

  setEntitySize: Function = (size): void => {
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);

    contentState.mergeEntityData(
      entityKey,
      {
        height: size || 'auto',
        width: 'auto'
      },
    );
    config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
    this.setState({
      dummy: true,
    });
  };

  setEntityAlignment: Function = (alignment): void => {
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    contentState.mergeEntityData(
      entityKey,
      { alignment },
    );
    config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
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

  renderAlignmentOptions(alignment,icons): Object {
    return (
      <div
        className={classNames(
          'rdw-image-alignment-options-popup',
          {
            'rdw-image-alignment-options-popup-right': alignment === 'right',
          },
        )}
      >
        <Option
          onClick={this.setEntityAlignmentLeft}
          className="rdw-image-alignment-option"
        >
          {icons.left ?<img src={icons.left} /> : 'L'}
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="rdw-image-alignment-option"
        >
          {icons.center ?<img src={icons.center} /> : 'C'}
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="rdw-image-alignment-option"
        >
          {icons.right ?<img src={icons.right} /> : 'R'}
        </Option>
      </div>
    );
  }


  renderSizeOptions(options, alignment): Object {
    return (
      <div
        className={classNames(
          'rdw-image-alignment-options-popup',
          {
            'rdw-image-alignment-options-popup-right': alignment === 'right',
          },
          'rdw-image-alignment-options-separator',
        )}
      >
        {
          options.map(option => {
            return (
              < Option
                key={option.size}
                onClick={this.setEntitySize}
                value={option.size}
                className="rdw-image-size-option"
              >
                {option.label}
              </Option>
            )
          })

        }
      </div >
    );
  }

  render(): Object {
    const { block, contentState } = this.props;
    const { hovered } = this.state;
    const { isReadOnly, isImageAlignmentEnabled, isImageSizeEnabled, imageSizeOptionsSetting, imageAlignmentIcons } = config;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src, alignment, height, width, alt } = entity.getData();
    const wrapperAlign = alignment === 'none' ? 'center' : alignment
    const alignIcons = imageAlignmentIcons()
    return (
      <span
        onMouseEnter={this.toggleHovered}
        onMouseLeave={this.toggleHovered}
        className={classNames(
          'rdw-image-alignment',
          {
            'rdw-image-left': alignment === 'left',
            'rdw-image-right': alignment === 'right',
            'rdw-image-center': !alignment || alignment === 'center',
          },
        )}
      >
        <span className="rdw-image-imagewrapper" style={{textAlign:wrapperAlign}}>
          <img
            src={src}
            alt={alt}
            style={{
              height,
              width,
            }}
          />
          <div className="rdw-image-options-wrapper">
            {
              !isReadOnly() && hovered && isImageAlignmentEnabled() ?
                this.renderAlignmentOptions(alignment,alignIcons)
                :
                undefined
            }
            {
              !isReadOnly() && hovered && isImageSizeEnabled() ?
                this.renderSizeOptions(imageSizeOptionsSetting(),alignment)
                :
                undefined
            }
          </div>
        </span>
      </span>
    );
  }
};

export default getImageComponent;
