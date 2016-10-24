/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import InlineControl from '..';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

describe('InlineControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
      />
    ).node.type).to.equal('div');
  });

  it('should have 5 child elements by default', () => {
    const control = mount(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    expect(control.children().length).to.equal(5);
  });

  it('should have 1 child elements if inDropdown is true', () => {
    const control = mount(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
        inDropdown
      />
    );
    expect(control.children().length).to.equal(1);
    expect(control.childAt(0).children().length).to.equal(2);
  });

  it('should execute onChange when child elements are clicked', () => {
    const onChange = spy();
    const control = mount(
      <InlineControl
        onChange={onChange}
        editorState={editorState}
      />
    );
    control.childAt(0).simulate('click');
    assert.isTrue(onChange.calledOnce);
    control.childAt(1).simulate('click');
    assert.equal(onChange.callCount, 2);
    control.childAt(2).simulate('click');
    assert.equal(onChange.callCount, 3);
    control.childAt(3).simulate('click');
    assert.equal(onChange.callCount, 4);
    control.childAt(4).simulate('click');
    assert.equal(onChange.callCount, 5);
  });

  it('should have false value for all rich styles in state by default', () => {
    const control = shallow(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    assert.isNotTrue(control.state().currentStyles.BOLD);
    assert.isNotTrue(control.state().currentStyles.ITALIC);
    assert.isNotTrue(control.state().currentStyles.UNDERLINE);
    assert.isNotTrue(control.state().currentStyles.STRIKETHROUGH);
    assert.isNotTrue(control.state().currentStyles.CODE);
  });
});
