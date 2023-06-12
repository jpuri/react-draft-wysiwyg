/* @flow */

import React from "react";
import { Editor } from "../..";

import "../styles.css";

const Component = () => (
  <div className="rdw-storybook-root">
    <Editor
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
  </div>
);

export default {
  title: "Editor",
  component: Component,
};

export const Basic = {
  args: {},
};
