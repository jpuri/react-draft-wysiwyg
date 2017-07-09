/* @flow */

import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import DropdownOption from '..';

describe('DropdownOption test suite', () => {
  it('should have a li when rendered', () => {
    expect(shallow(
      <DropdownOption>
        <div>test</div>
      </DropdownOption>,
    ).node.type).to.equal('li');
  });

  it('should click event should trigger onSelect function call', () => {
    const onSelect = spy();
    const option = mount(
      <DropdownOption onSelect={onSelect}>
        <div>test</div>
      </DropdownOption>,
    );
    option.childAt(0).simulate('click');
    expect(onSelect.called).to.equal(true);
  });
});
