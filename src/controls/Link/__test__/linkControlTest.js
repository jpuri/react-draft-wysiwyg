/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';

import LinkControl from '..';
import Option from '../../../components/Option';
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
    expect(control.find(Option).length).to.equal(2);
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
    const state = control.state();
    assert.isNotTrue(state.expanded);
    assert.equal(state.link, undefined);
  });

  it('should convert links starting with www to start with http://', () => {
    const onChange = spy();
    const control = mount(
      <LinkControl
        config={defaultToolbar.link}
        onChange={onChange}
        editorState={editorState}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    control.setState({ expanded: true });
    const buttons = control.find('.rdw-option-wrapper');
    buttons.first().simulate('click');
    const inputs = control.find('.rdw-link-modal-input');
    inputs.last().simulate('change', { target: { name: 'linkTitle', value: 'the google' } });
    inputs.first().simulate('change', { target: { name: 'linkTarget', value: 'www.google.com' } });
    const addButton = control.find('.rdw-link-modal-btn').first();
    addButton.simulate('click');
    const lastCall = contentState.getLastCreatedEntityKey();
    assert.equal(contentState.getEntity(lastCall).getData().url, 'http://www.google.com');
  });
});
