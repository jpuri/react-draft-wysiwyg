/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect } from 'chai';
import { mount } from 'enzyme';

import HistoryControl from '..';
import Option from '../../../components/Option';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

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
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have 2 child elements', () => {
    const control = mount(
      <HistoryControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.history}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.find(Option).length).to.equal(2);
  });
});
