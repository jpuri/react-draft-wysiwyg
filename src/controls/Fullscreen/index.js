/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import { getSelectionCustomInlineStyle } from 'draftjs-utils';

import { forEach } from '../../utils/common';
import LayoutComponent from './Component';

export default class Fullscreen extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
    translations: PropTypes.object,
    modalHandler: PropTypes.object,
  };

  state = {
    expanded: false,
  }

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  expandCollapse: Function = (): void => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  doFullscreen: Function = (): void => {
    const { editorState, onChange } = this.props;
    if ((document.fullScreenElement && document.fullScreenElement !== null)
        || document.mozFullScreen || document.webkitIsFullScreen) {
      this.attemptExitFullscreen();
    } else {
      this.attemptFullscreen();
    }
  };


  attemptFullscreen: Function = (): void => {
    const element = document.getElementById('rdw-storybook-root');
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  };

  attemptExitFullscreen: Function = (): void => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  doExpand: Function = (): void => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = (): void => {
    this.setState({
      expanded: false,
    });
  };

  render(): Object {
    const { config, translations } = this.props;
    const { expanded } = this.state;
    const FullscreenComponent = config.component || LayoutComponent;
    return (
      <FullscreenComponent
        config={config}
        translations={translations}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.doFullscreen}
      />
    );
  }
}

// todo: unit test coverage
