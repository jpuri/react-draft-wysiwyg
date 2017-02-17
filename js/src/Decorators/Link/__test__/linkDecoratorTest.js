/* @flow */

import React from 'react';
import { Entity } from 'draft-js';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import LinkDecorator from '..';
import { convertFromHTML, AtomicBlockUtils, ContentState, EditorState } from 'draft-js';

describe('LinkDecorator test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const entityKey = contentState
    .createEntity('LINK', 'MUTABLE', { title: 'title', url: 'url' })
    .getLastCreatedEntityKey();

  it('should have a div when rendered', () => {
    const Link = LinkDecorator.component;
    expect(shallow(<Link entityKey={entityKey}>Link</Link>).node.type).to.equal('span');
  });

  it('should have state initialized correctly', () => {
    const Link = LinkDecorator.component;
    const control = shallow(<Link entityKey={entityKey}>Link</Link>);
    assert.isNotTrue(control.state().showPopOver);
  });

  it('should have 1 child element by default', () => {
    const Link = LinkDecorator.component;
    const control = shallow(<Link entityKey={entityKey}>Link</Link>);
    expect(control.children().length).to.equal(1);
  });

  it('should have 2 child element when showPopOver is true', () => {
    const Link = LinkDecorator.component;
    const control = mount(<Link entityKey={entityKey}>Link</Link>);
    control.setState({ showPopOver: true });
    expect(control.children().length).to.equal(2);
  });
});
