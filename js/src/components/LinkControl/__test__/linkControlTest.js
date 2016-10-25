/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import LinkControl from '..';
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
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
      />
    ).node.type).to.equal('div');
  });

  it('should have 2 child elements by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    expect(control.children().length).to.equal(2);
  });

  it('should open link modal when option-1 is clicked', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    control.childAt(0).simulate('click');
    expect(control.children().length).to.equal(3);
  });

  it('should have no value for state variable by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    assert.isNotTrue(control.state().showModal);
    assert.equal(control.state().linkTarget, '');
    assert.equal(control.state().linkTitle, '');
  });
});
