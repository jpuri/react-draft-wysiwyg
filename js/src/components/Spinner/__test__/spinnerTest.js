/* @flow */

import React from 'react';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Spinner from '..';

describe('Option test suite', () => {
  it('should have a div when rendered', () => {
    expect(shallow(
      <Spinner />,
    ).node.type).to.equal('div');
  });
});
