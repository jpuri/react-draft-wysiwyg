/* @flow */

import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import Icon from '..';

describe('Icon test suite', () => {
  it('should render an image when `src` prop is not a function', () => {
    const src = 'https://placekitten.com/200/300';
    const clickSpy = spy();
    const wrap = mount(<Icon src={src} onClick={clickSpy} />);
    const img = wrap.find('img');
    img.simulate('click');

    expect(img.props()).to.eql({ src, alt: '', onClick: clickSpy });
    expect(clickSpy.called).to.eql(true);
  });

  it('should render a component when the `src` prop is a function', () => {
    const clickSpy = spy();
    function IconComponent(props) {
      return (
        <button {...props} />
      );
    }

    const wrap = mount(<Icon src={IconComponent} onClick={clickSpy} />);
    const btn = wrap.find('button');
    btn.simulate('click');

    expect(btn.props()).to.eql({ onClick: clickSpy });
    expect(clickSpy.called).to.eql(true);
  });
});
