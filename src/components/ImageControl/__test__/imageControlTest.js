/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import ImageControl from '..';
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
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
      />
    ).node.type).to.equal('div');
  });

  it('should have 1 child elements by default', () => {
    const control = mount(
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    expect(control.children().length).to.equal(1);
  });

  it('should open image modal when option is clicked', () => {
    const control = mount(
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    control.childAt(0).simulate('click');
    expect(control.children().length).to.equal(2);
  });
});
