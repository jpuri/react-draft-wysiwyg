/* @flow */

import React from 'react';
import { Editor } from '../../src';
import './styles.css';

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
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
    },
  );
}

const FloatingToolbar = () =>
  (<div className="rdw-storybook-root">
    <h3>Toolbar appears as editor is clicked</h3>
    <Editor
      toolbarOnFocus
      toolbarClassName="rdw-storybook-toolbar-absolute"
      wrapperClassName="rdw-storybook-wrapper-margined"
      editorClassName="rdw-storybook-editor"
      toolbar={{
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: false },
        },
      }}
    />
  </div>);

export default FloatingToolbar;
