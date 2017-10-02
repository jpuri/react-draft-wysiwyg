/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

import LinkControl from '..';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('LinkControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have 2 child elements by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).to.equal(2);
  });

  it('should have no value for state variable link default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.link}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    const linkControl = control.find('Link');
    assert.isNotTrue(linkControl.node.state.expanded);
    assert.equal(linkControl.node.state.link, undefined);
  });
});
