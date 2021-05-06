/* @flow */

import React from 'react';
import { Editor } from '../../src';

const handlePastedImage = file => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
    const data = new FormData(); // eslint-disable-line no-undef
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  })
}

const handleDroppedImage = (selection, file) => {
  return new Promise(resolve => {

    const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
    const data = new FormData(); // eslint-disable-line no-undef
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
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
