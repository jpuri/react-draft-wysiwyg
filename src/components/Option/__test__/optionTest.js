/* @flow */

import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import Option from '..';

describe('Option test suite', () => {
  it('should have a span when rendered', () => {
    expect(mount(
      <Option
        value="b"
        onClick={() => {}}
      >
        <span>testing</span>
      </Option>,
    ).childAt(0).type()).to.equal('div');
  });

  it('should have child element passed after mount', () => {
    const option = mount(
      <Option
        value="b"
        onClick={() => {}}
      >
        <span>testing</span>
      </Option>,
    );
    expect(option.children().length).to.equal(1);
    expect(option.children().type()).to.equal('div');
  });

  it('should execute funcion passed in onClick props when clicked', () => {
    const onClick = spy();
    const option = mount(
      <Option
        value="b"
        onClick={onClick}
      >
        <span>testing</span>
      </Option>,
    );
    option.children().simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });

  it('should not execute funcion passed in onClick props when clicked if disabled', () => {
    const onClick = spy();
    const option = mount(
      <Option
        value="b"
        onClick={onClick}
        disabled
      >
        <span>testing</span>
      </Option>,
    );
    option.children().simulate('click');
    expect(onClick.called).to.equal(false);
  });
});
