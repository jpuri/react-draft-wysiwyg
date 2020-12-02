/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { Text } from '@innovaccer/design-system';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const [status, setStatus] = React.useState('focused');

  const onFocus = () => {
    setStatus('focused');
  };

  const onBlur = () => {
    setStatus('blurred');
  };

  return (
    <div>
      <Text weight="medium">State right now: {status}</Text><br />
      <Editor
        {...args}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};

All.argTypes = {
  ...disabledArgtypes,
  mention: { control: { disable: true } }
};

All.args = {
  ...commonArgs
};

export default {
  title: 'Library/FocusBlurCallbacks',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
