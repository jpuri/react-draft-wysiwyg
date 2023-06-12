/* @flow */

import React from "react";
import { Editor } from "../..";

import "../styles.css";

const SpellCheckComponent = () => (
  <div className="rdw-storybook-root">
    <h3>Editor with spellcheck</h3>
    <Editor
      spellCheck
      toolbarClassName="rdw-storybook--toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
  </div>
);

export default {
  title: "Editor",
  component: SpellCheckComponent,
};

export const SpellCheck = {
  args: {},
};
