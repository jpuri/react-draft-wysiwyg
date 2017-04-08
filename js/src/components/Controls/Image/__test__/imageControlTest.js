/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect, assert } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies

import ImageControl from '..';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('ImageControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.image}
        modalHandler={new ModalHandler()}
      />
    ).html().startsWith('<div')).to.be.true;
  });

  it('should have 1 child element by default', () => {
    const control = mount(
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.image}
        modalHandler={new ModalHandler()}
      />
    );
    expect(control.children().length).to.equal(1);
  });

  it('should set signalExpanded to true when option is clicked', () => {
    const control = mount(
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.image}
        modalHandler={new ModalHandler()}
      />
    );
    const imageControl = control.find('ImageControl');
    assert.isNotTrue(imageControl.node.signalExpanded);
    control.find('Option').simulate('click');
    assert.isTrue(imageControl.node.signalExpanded);
  });
});
