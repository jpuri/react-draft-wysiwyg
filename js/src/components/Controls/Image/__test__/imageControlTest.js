/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import ImageControl from '..';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('ImageControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.image}
        modalHandler={new ModalHandler()}
      />
    ).node.type).to.equal('div');
  });

  it('should have 1 child elements by default', () => {
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

  it('should open image modal when option is clicked', () => {
    const control = mount(
      <ImageControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.image}
        modalHandler={new ModalHandler()}
      />
    );
    control.childAt(0).simulate('click');
    expect(control.nodes[0].signalShowModal).to.equal(true);
  });
});
