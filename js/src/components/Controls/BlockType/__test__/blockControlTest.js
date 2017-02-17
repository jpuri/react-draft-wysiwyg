/* @flow */

import React from 'react';
import { expect, assert } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import Block from '..';
import { Dropdown } from '../../../Dropdown';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('Block test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <Block
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.blockType}
      />
    ).node.type).to.equal('div');
  });

  it('should have 8 child elements when inDropdown is false', () => {
    const blockDefaultCount = 8;
    const block = mount(
      <Block
        onChange={() => {}}
        editorState={editorState}
        config={{...defaultToolbar.blockType, inDropdown: false}}
      />
    );
    expect(block.children().length).to.equal(blockDefaultCount);
  });

  it('should have a dropdown child component well defined', () => {
    const block = mount(
      <Block
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.blockType}
        modalHandler={new ModalHandler()}
      />
    );
    assert.equal(block.childAt(0).props().children.length, 2);
    assert.isDefined(block.childAt(0).props().onChange);
    assert.equal(block.childAt(0).type(), Dropdown);
  });
});
