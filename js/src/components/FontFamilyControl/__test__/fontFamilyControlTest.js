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
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../modal-handler/modals';

describe('FontFamilyControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <FontFamilyControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontFamily}
        modalHandler={new ModalHandler()}
      />
    ).node.type).to.equal('div');
  });

  it('should have a dropdown child component well defined', () => {
    const control = mount(
      <FontFamilyControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontFamily}
        modalHandler={new ModalHandler()}
      />
    );
    assert.equal(control.childAt(0).props().children.length, 2);
    assert.isDefined(control.childAt(0).props().onChange);
    assert.equal(control.childAt(0).type(), Dropdown);
  });
});
