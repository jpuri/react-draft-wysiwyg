/* @flow */

import React from 'react';
import { expect, assert } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import LinkControl from '..';
import defaultToolbar from '../../../config/defaultToolbar';

describe('InlineControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
      />
    ).node.type).to.equal('div');
  });

  it('should have 2 child elements by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
      />
    );
    expect(control.children().length).to.equal(2);
  });

  it('should open link modal when option-1 is clicked', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
      />
    );
    control.childAt(0).simulate('click');
    expect(control.children().length).to.equal(3);
  });

  it('should have no value for state variable by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
      />
    );
    assert.isNotTrue(control.state().showModal);
    assert.equal(control.state().linkTarget, '');
    assert.equal(control.state().linkTitle, '');
  });
});
