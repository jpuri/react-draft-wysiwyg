import React, { PropTypes, Component } from 'react';
import { Entity, ContentBlock } from 'draft-js';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars
import Option from '../../components/Option';

export default class Embed extends Component {

  static propTypes: Object = {
    block: PropTypes.instanceOf(ContentBlock).isRequired,
  };

  state: Object = {
    hovered: false,
  };

  componentDidMount() {
    this.renderEmbedly();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
      this.renderEmbedly();
    }
  }

  getScript() {
    const script = document.createElement('script');
    script.async = 1;
    script.src = '//cdn.embedly.com/widgets/platform.js';
    script.onload = () => {
      window.embedly();
    };
    document.body.appendChild(script);
  }

  enablePreview = () => {
    this.setState({
      showIframe: true,
    });
  };

  renderEmbedly() {
    if (window.embedly) {
      window.embedly();
    } else {
      this.getScript();
    }
  }

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
        className="embed-alignment-options-popup"
      >
        <Option
          onClick={this.setEntityAlignmentLeft}
          className="embed-alignment-option"
        >
          L
        </Option>
        <Option
          onClick={this.setEntityAlignmentCenter}
          className="embed-alignment-option"
        >
          C
        </Option>
        <Option
          onClick={this.setEntityAlignmentRight}
          className="embed-alignment-option"
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
    const innerHTML = `<div><a class="embedly-card" href="${src}" data-card-controls="0" data-card-theme="dark">Embedded ― ${src}</a></div>`;
    return (
      <span
        onMouseEnter={this.toggleHovered}
        onMouseLeave={this.toggleHovered}
        className={classNames(
          'embed-alignment',
          {
            'embed-left': alignment === 'left',
            'embed-right': alignment === 'right',
            'embed-center': !alignment || alignment === 'none',
          }
        )}
      >
        <span className="embed-embedwrapper">
          <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
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
