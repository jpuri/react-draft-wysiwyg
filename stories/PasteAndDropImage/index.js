/* @flow */

import React from 'react';
import { Editor } from '../../src';

const handlePastedImage = files => {
  return new Promise(resolve => {
    resolve({ data: { link: "https://via.placeholder.com/500" } })
  })
}

const handleDroppedImage = (selection, files) => {
  return new Promise(resolve => {
    resolve({ data: { link: "https://via.placeholder.com/500" } })
  })
}

const PasteAndDropImages = () =>
(
  <div className="rdw-storybook-root">
    <span>Paste Image or Drop an Image</span>
    <Editor
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
      handlePastedImage={handlePastedImage}
      handleDroppedImages={handleDroppedImage}
      toolbar={{
        image:{
          sizeOptionSetting: [
            { label:"small", size:"10rem" },
            { label:"medium", size:"20rem" },
            { label:"large", size:"30rem" },
            { label:"auto", size:"auto" },
          ]
        }
      }}
    />
  </div>
)

export default PasteAndDropImages;
