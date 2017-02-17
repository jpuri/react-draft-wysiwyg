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
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('LinkControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(shallow(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />
    ).node.type).to.equal('div');
  });

  it('should have 2 child elements by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
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
        modalHandler={new ModalHandler()}
      />
    );
    control.childAt(0).simulate('click');
    expect(control.nodes[0].signalShowModal).to.equal(true);
  });

  it('should have no value for state variable by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        modalHandler={new ModalHandler()}
      />
    );
    assert.isNotTrue(control.state().showModal);
    assert.equal(control.state().linkTarget, '');
    assert.equal(control.state().linkTitle, '');
  });
});
