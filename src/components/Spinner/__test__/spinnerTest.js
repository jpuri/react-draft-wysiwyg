/* @flow */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Spinner from '..';

describe('Option test suite', () => {
  it('should have a span when rendered', () => {
    expect(mount(
      <Spinner />,
    ).childAt(0).type()).to.equal('div');
  });
});
