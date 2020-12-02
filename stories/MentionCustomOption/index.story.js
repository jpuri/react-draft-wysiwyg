/* @flow */

import React from 'react';
import { Editor } from '../../src';
import { Icon } from '@innovaccer/design-system';
import { disabledArgtypes, commonArgs } from '../__common__/argTypes';

export const All = (args) => {
  const customOptionRenderer = (suggestion, active, index) => (
    <div className="d-flex justify-content-between Editor-dropdown-option">
      {suggestion.label}
      {active === index && <Icon name="check" />}
    </div>
  );

  return (
    <Editor
      {...args}
      mention={{
        label: ' ',
        trigger: '@',
        dropdownOptions: { customOptionRenderer },
        suggestions: [
          { label: 'First Name', value: 'First Name' },
          { label: 'Last Name', value: 'Last Name' },
          { label: 'PCP', value: 'PCP' },
          { label: 'Address', value: 'Address' },
          { label: 'DOB', value: 'DOB' },
        ],
      }}
    />
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
  title: 'Library/Mention - CustomOption',
  component: Editor,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
