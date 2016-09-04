/* @flow */

import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import HistoryControl from '..';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

describe('HistoryControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <HistoryControl
        onChange={() => {}}
        editorState={editorState}
      />
    ).node.type).to.equal('div');
  });

  it('should have 2 child elements', () => {
    const control = mount(
      <HistoryControl
        onChange={() => {}}
        editorState={editorState}
      />
    );
    expect(control.children().length).to.equal(2);
  });
});
