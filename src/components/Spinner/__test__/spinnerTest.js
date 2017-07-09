/* @flow */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Spinner from '..';

describe('Option test suite', () => {
  it('should have a div when rendered', () => {
    expect(shallow(
      <Spinner />,
    ).node.type).to.equal('div');
  });
});
