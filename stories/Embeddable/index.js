/* @flow */

import React from 'react';
import embed from "embed-video";

import { Editor } from '../../src';

const Embeddable = () =>
  (<div className="rdw-storybook-root">
    <h3>Image option supports image upload also.</h3>
    <Editor
      spellCheck
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
      toolbar={{
        embedded: {
          embedCallback: link => {
            const detectedSrc = /<iframe.*? src="(.*?)"/.exec(embed(link));
            return (detectedSrc && detectedSrc[1]) || link;
          },
        },
      }}
    />
  </div>);

export default Embeddable;
