/* @flow */

import React from 'react';
import { Editor } from '../../src';

function CustomIcon() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        background: 'red',
        color: '#fff',
      }}
    >b
    </div>
  );
}

function IconOverride() {
  return (
    <div className="rdw-storybook-root">
      <div className="rdw-storybook-locale-wrapper">
        <span className="rdw-storybook-locale-lbl">
          The Bold button should render a custom component instead of the
          default image.
        </span>
      </div>

      <Editor
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        toolbar={{
          inline: {
            bold: {
              icon: CustomIcon,
            },
          },
        }}
      />
    </div>
  );
}

export default IconOverride;
