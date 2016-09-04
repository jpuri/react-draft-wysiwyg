/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import LinkDecorator from '..';

describe('LinkDecorator test suite', () => {
  it('should have a div when rendered', () => {
    const Link = LinkDecorator.component;
    expect(shallow(<Link>Link</Link>).node.type).to.equal('span');
  });

  it('should have state initialized correctly', () => {
    const Link = LinkDecorator.component;
    const control = shallow(<Link>Link</Link>);
    assert.isNotTrue(control.state().showPopOver);
  });

  it('should have 1 child element by default', () => {
    const Link = LinkDecorator.component;
    const control = shallow(<Link>Link</Link>);
    expect(control.children().length).to.equal(1);
  });

  it('should have 2 child element when showPopOver is true', () => {
    const Link = LinkDecorator.component;
    const control = mount(<Link>Link</Link>);
    control.setState({ showPopOver: true });
    expect(control.children().length).to.equal(2);
  });
});
