/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import HistoryControl from '..';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('HistoryControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <HistoryControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.history}
        modalHandler={new ModalHandler()}
      />
    ).html().startsWith('<div')).to.be.true;
  });

  it('should have 2 child elements', () => {
    const control = mount(
      <HistoryControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.history}
        modalHandler={new ModalHandler()}
      />
    );
    expect(control.children().length).to.equal(2);
  });
});
