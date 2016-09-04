/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import ColorPicker from '..';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

describe('ColorPicker test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <ColorPicker
        onChange={() => {}}
        editorState={editorState}
      />
    ).node.type).to.equal('div');
  });

  it('should correctly set default state values', () => {
    const control = mount(
      <ColorPicker
        onChange={() => {}}
        editorState={editorState}
      />
    );
    assert.isNotTrue(control.state().showModal);
    assert.equal(control.state().currentStyle, 'color');
    assert.isUndefined(control.state().currentColor);
    assert.isUndefined(control.state().currentBgColor);
  });

  it('should open modal when first shild is clicked', () => {
    const control = mount(
      <ColorPicker
        onChange={() => {}}
        editorState={editorState}
      />
    );
    assert.isNotTrue(control.state().showModal);
    control.childAt(0).simulate('click');
    assert.isTrue(control.state().showModal);
  });

  it('should have 2 child elements when modal is open', () => {
    const control = mount(
      <ColorPicker
        onChange={() => {}}
        editorState={editorState}
      />
    );
    expect(control.children().length).to.equal(1);
    control.childAt(0).simulate('click');
    expect(control.children().length).to.equal(2);
  });
});
