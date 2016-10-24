/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import FontFamilyControl from '..';
import { Dropdown } from '../../Dropdown';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

describe('FontFamilyControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <FontFamilyControl
        onChange={() => {}}
        editorState={editorState}
      />
    ).node.type).to.equal('div');
  });

  it('should have a dropdown child component well defined', () => {
    const control = mount(
      <FontFamilyControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    assert.equal(control.childAt(0).props().children.length, 2);
    assert.isDefined(control.childAt(0).props().onChange);
    assert.equal(control.childAt(0).type(), Dropdown);
  });
});
