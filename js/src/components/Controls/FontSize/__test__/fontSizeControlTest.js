/* @flow */

import React from 'react';
import { expect, assert } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import FontSizeControl from '..';
import { Dropdown } from '../../../Dropdown';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('FontSizeControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <FontSizeControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontSize}
        modalHandler={new ModalHandler()}
      />
    ).node.type).to.equal('div');
  });

  it('should have a dropdown child component well defined', () => {
    const control = mount(
      <FontSizeControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontSize}
        modalHandler={new ModalHandler()}
      />
    );
    assert.equal(control.childAt(0).props().children.length, 2);
    assert.isDefined(control.childAt(0).props().onChange);
    assert.equal(control.childAt(0).type(), Dropdown);
  });
});
