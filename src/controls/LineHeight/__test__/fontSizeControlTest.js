/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import LineHeightControl from '..';
import { Dropdown } from '../../../components/Dropdown';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('LineHeightControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <LineHeightControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.lineHeight}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have a dropdown child component well defined', () => {
    const control = mount(
      <LineHeightControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.lineHeight}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    assert.equal(control.find(Dropdown).length, 1);    
    assert.equal(control.find(Dropdown).prop('children').length, 2);
    assert.isDefined(control.childAt(0).props().onChange);
  });
});
