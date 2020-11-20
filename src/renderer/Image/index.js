import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, SelectionState, Modifier } from 'draft-js';
import classNames from 'classnames';
import { Icon, Popover } from '@innovaccer/design-system';

const getImageComponent = config => class Image extends Component {
  static propTypes: Object = {
    block: PropTypes.object,
    contentState: PropTypes.object,
  };

  state: Object = {
    //hovered: false,
    open: false,
  };

  // setEntityAlignmentLeft: Function = (): void => {
  //   this.setEntityAlignment('left');
  // };

  // setEntityAlignmentRight: Function = (): void => {
  //   this.setEntityAlignment('right');
  // };

  // setEntityAlignmentCenter: Function = (): void => {
  //   this.setEntityAlignment('none');
  // };

  // setEntityAlignment: Function = (alignment): void => {
  //   const { block, contentState } = this.props;
  //   const entityKey = block.getEntityAt(0);
  //   contentState.mergeEntityData(
  //     entityKey,
  //     { alignment },
  //   );
  //   config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
  //   this.setState({
  //     dummy: true,
  //   });
  // };

  removeEntity: Function = (e): void => {
    e.preventDefault();
    e.stopPropagation();
    const { block, contentState } = this.props;

    const blockKey = block.getKey();
    const afterKey = contentState.getKeyAfter(blockKey);
    
    const targetRange = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: afterKey,
      focusOffset: 0,
    });

    let newContentState = Modifier.setBlockType(
      contentState,
      targetRange,
      'unstyled'
    );

    newContentState = Modifier.removeRange(newContentState, targetRange, 'backward');
    config.onChange(EditorState.push(config.getEditorState(), newContentState, 'remove-range'));
  };

  // toggleHovered: Function = (): void => {
  //   const hovered = !this.state.hovered;
  //   this.setState({
  //     hovered,
  //   });
  // };

  // renderAlignmentOptions(alignment): Object {
  //   return (
  //     <div
  //       className={classNames(
  //         'rdw-image-alignment-options-popup',
  //         {
  //           'rdw-image-alignment-options-popup-right': alignment === 'right',
  //         },
  //       )}
  //     >
  //       <Option
  //         onClick={this.setEntityAlignmentLeft}
  //         className="rdw-image-alignment-option"
  //       >
  //         L
  //       </Option>
  //       <Option
  //         onClick={this.setEntityAlignmentCenter}
  //         className="rdw-image-alignment-option"
  //       >
  //         C
  //       </Option>
  //       <Option
  //         onClick={this.setEntityAlignmentRight}
  //         className="rdw-image-alignment-option"
  //       >
  //         R
  //       </Option>
  //     </div>
  //   );
  // }
  onTogglePopper = (updatedOpen) => {
    this.setState({
      open: updatedOpen
    })
  };

  render(): Object {
    const { block, contentState } = this.props;
    const { open } = this.state;
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src, height, width, alt } = entity.getData();

    const ImageClass = classNames({
      ['Editor-image']: true,
      ['Editor-image--delete']: open
    });

    const trigger = (
      <img
        className={ImageClass}
        src={src}
        alt={alt}
        style={{
          height,
          width,
        }}
      />
    );

    return (
      <Popover
        trigger={trigger}
        position="bottom-end"
        appendToBody={false}
        open={open}
        onToggle={this.onTogglePopper}
      >
        <div onClick={this.removeEntity} className="Editor-image-delete">
          <Icon name="delete" size={20} />
        </div>
      </Popover>
    );
  }
};

export default getImageComponent;
