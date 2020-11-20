/* @flow */

import React from 'react';
import { Editor } from '../../src';

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const reader = new FileReader(); // eslint-disable-line no-undef
      console.log(reader);
      reader.onload = e => resolve({ data: { link: reader.result, reader } });
      reader.onerror = e => reject(e);
      reader.readAsDataURL(file);
    });
}

const ImageUpload = () =>
  (<div className="rdw-storybook-root">
    <h3>Image upload can render image as base64.</h3>
    <Editor
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
      toolbar={{
        insert: {
          image: {
            //uploadCallback: uploadImageCallBack,
            previewImage: true,
          }
        }
      }}
      // toolbar={{
      //   image: {
      //     uploadCallback: uploadImageCallBack,
      //     previewImage: true,
      //   },
      // }}
    />
  </div>);

export default ImageUpload;
