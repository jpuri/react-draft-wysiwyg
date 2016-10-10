/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import TextAlignControl from '..';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

describe('TextAlignControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <TextAlignControl
        onChange={() => {}}
        editorState={editorState}
      />
    ).node.type).to.equal('div');
  });

  it('should have 4 child elements by default', () => {
    const control = mount(
      <TextAlignControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    expect(control.children().length).to.equal(4);
  });

  it('should have 1 child elements if inDropdown is true', () => {
    const control = mount(
      <TextAlignControl
        onChange={() => {}}
        editorState={editorState}
        inDropdown
      />
    );
    expect(control.children().length).to.equal(1);
    expect(control.childAt(0).children().length).to.equal(2);
  });

  it('should execute onChange when any of first any child elements is clicked', () => {
    const onChange = spy();
    const control = mount(
      <TextAlignControl
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
  });
});
