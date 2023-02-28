/* @flow */

import React from 'react';
import { Editor } from '../../src';

/**
 * This function is simulating an api call or whatever operation needed to store the image 
 * handlePastedImage and handleDroppedImage expect a promise returning a URL to be used as value of `src` attribute in an `img` element
 * this demo uses FileReader to transform the pasted or dropped image as base64 url. 
 * you might want to upload the image to an API or S3 and use its URL instead
 */
const saveFile = (file) => new Promise((resolve, reject) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    resolve(reader.result);
  };
  reader.onerror = function (error) {
    reject(error);
  };
})

const handlePastedImage = file => {
  return saveFile(file);
}

const handleDroppedImage = (selection, file) => {
  return saveFile(file);
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
      handleDroppedImage={handleDroppedImage}
      toolbar={{
        image: {
          sizeOptionSetting: [
            { label: "small", size: "10rem" },
            { label: "medium", size: "20rem" },
            { label: "large", size: "30rem" },
            { label: "auto", size: "auto" },
          ]
        }
      }}
    />
  </div>
)

export default PasteAndDropImages;
