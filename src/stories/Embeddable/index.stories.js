/* @flow */

import React from "react";
import embed from "embed-video";

import { Editor } from "../..";

import "../styles.css";

const EmbeddableComponent = () => (
  <div className="rdw-storybook-root">
    <h3>Image option supports image upload also.</h3>
    <Editor
      spellCheck
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
      toolbar={{
        link: {
          linkCallback: (params) => ({ ...params }),
        },
        embedded: {
          embedCallback: (link) => {
            const detectedSrc = /<iframe.*? src="(.*?)"/.exec(embed(link));
            return (detectedSrc && detectedSrc[1]) || link;
          },
        },
      }}
    />
  </div>
);

export default {
  title: "Editor",
  component: EmbeddableComponent,
};

export const Embeddable = {
  args: {},
};
