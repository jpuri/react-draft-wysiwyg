/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const uploadCallback = (file) => {
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve({ data: { link: reader.result } });
        reader.onerror = e => reject(e);
        reader.readAsDataURL(file);
      });
  };

  return (
    <Editor
      {...args}
      toolbar={{
        insert: {
          image: {
            uploadCallback,
            defaultSize: { height: '200px' },
          }
        }
      }}
    />
  );
};

All.argTypes = {
  ...disabledArgtypes,
  toolbar: { control: { disable: true } }
};

All.args = {
  ...commonArgs,
};

export default {
  title: 'Library/Image',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
