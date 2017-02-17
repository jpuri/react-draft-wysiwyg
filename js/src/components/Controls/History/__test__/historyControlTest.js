/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import HistoryControl from '..';
import defaultToolbar from '../../../../config/defaultToolbar';

describe('HistoryControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <HistoryControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.history}
      />
    ).node.type).to.equal('div');
  });

  it('should have 2 child elements', () => {
    const control = mount(
      <HistoryControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.history}
      />
    );
    expect(control.children().length).to.equal(2);
  });
});
