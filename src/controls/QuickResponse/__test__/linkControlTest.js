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
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('LinkControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  const quickResponses = {};
  const config = { className: 'test', quickResponses: {} };

  it('should have a div when rendered', () => {
    expect(mount(
      <LinkControl
        quickResponses={quickResponses}
        onChange={() => {}}
        editorState={editorState}
        config={config}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have 1 child elements by default', () => {
    const control = mount(
      <LinkControl
        onChange={() => {}}
        quickResponses={quickResponses}
        editorState={editorState}
        config={config}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).to.equal(1);
  });

  it('should have no value for state variable link default', () => {
    const control = mount(
      <LinkControl
        quickResponses={quickResponses}
        config={config}
        onChange={() => {}}
        editorState={editorState}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    const linkControl = control.find('Link');
    assert.isNotTrue(linkControl.root.node.state.expanded);
    assert.equal(linkControl.root.node.state.link, undefined);
  });
});
