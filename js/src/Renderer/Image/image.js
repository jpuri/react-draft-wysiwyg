import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars
import Option from '../../components/Option';

export default class Image extends Component {

  static propTypes: Object = {
    block: PropTypes.object.isRequired,
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
    this.setEntityAlignment('none');
  };

  setEntityAlignment: Function = (alignment): void => {
    const { block } = this.props;
    const entityKey = block.getEntityAt(0);
    Entity.mergeData(
      entityKey,
      { alignment }
    );
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

  renderAlignmentOptions(): Object {
    return (
      <div
        className="image-alignment-options-popup"
      >
        <Option
          onClick={this.setEntityAlignmentLeft}
          className="image-alignment-option"
        >
          L
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="image-alignment-option"
        >
          C
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="image-alignment-option"
        >
          R
        </Option>
      </div>
    );
  }

  render(): Object {
    const { block } = this.props;
    const { hovered } = this.state;
    const entity = Entity.get(block.getEntityAt(0));
    const { src, alignment } = entity.getData();
    return (
      <span
        onMouseEnter={this.toggleHovered}
        onMouseLeave={this.toggleHovered}
        className={classNames(
          'image-alignment',
          {
            'image-left': alignment === 'left',
            'image-right': alignment === 'right',
            'image-center': !alignment || alignment === 'none',
          }
        )}
      >
        <span className="image-imagewrapper">
          <img
            src={src}
            role="presentation"

          />
          {
            hovered ?
              this.renderAlignmentOptions()
              :
              undefined
          }
        </span>
      </span>
    );
  }
}
