/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import { convertFromHTML, ContentState } from 'draft-js';
import getButtonDecorator from '..';

describe('ButtonDecorator test suite', () => {
  const ButtonDecorator = getButtonDecorator({ showOpenOptionOnHover: true });
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const entityKey = contentState
    .createEntity('BUTTON', 'MUTABLE', { title: 'title', url: 'url' })
    .getLastCreatedEntityKey();

  it('should have a div when rendered', () => {
    const Button = ButtonDecorator.component;
    expect(mount(<Button entityKey={entityKey} contentState={contentState}>Button</Button>).childAt(0).type()).to.equal('a');
  });

  it('should have state initialized correctly', () => {
    const Button = ButtonDecorator.component;
    const control = shallow(<Button entityKey={entityKey} contentState={contentState}>Button</Button>);
    assert.isNotTrue(control.state().showPopOver);
  });

  it('should have 1 child element by default', () => {
    const Button = ButtonDecorator.component;
    const control = shallow(<Button entityKey={entityKey} contentState={contentState}>Button</Button>);
    expect(control.children().length).to.equal(1);
  });

  it('should have 1 child element when showPopOver is true', () => {
    const Button = ButtonDecorator.component;
    const control = mount(<Button entityKey={entityKey} contentState={contentState}>Button</Button>);
    control.setState({ showPopOver: true });
    expect(control.childAt(0).children().length).to.equal(1);
  });
});