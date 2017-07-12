/* @flow */

import React, { Component } from 'react';
import { Editor } from '../../src';

import './styles.css';

class ToolbarHidden extends Component {

  state: any = {
    toolbarHidden: false,
  };

  toggleToolbar: Function = () => {
    const toolbarHidden = !this.state.toolbarHidden;
    this.setState({
      toolbarHidden,
    });
  };

  render() {
    const { toolbarHidden } = this.state;
    return (
      <div className="rdw-storybook-root">
        <div className="rdw-storybook-locale-wrapper">
          <span className="rdw-storybook-locale-lbl">Show / Hide toolbar</span>
          <button onClick={this.toggleToolbar}>{toolbarHidden ? 'show' : 'Hide'}</button>
        </div>
        <Editor
          toolbarHidden={toolbarHidden}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
        />
      </div>
    );
  }
}

export default ToolbarHidden;
