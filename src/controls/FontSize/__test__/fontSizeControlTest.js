/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { mount } from 'enzyme';
import {
  EditorState,
  ContentState,
} from 'draft-js';
import htmlToDraft from "html-to-draftjs";
import FontSizeControl from '..';
import FontSizeComponent from '../Component';
import { Dropdown } from '../../../components/Dropdown';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('FontSizeControl test suite', () => {
  const { contentBlocks, entityMap } = htmlToDraft('<div style="font-size:20px">test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <FontSizeControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontSize}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have a dropdown child component well defined', () => {
    const control = mount(
      <FontSizeControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontSize}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    assert.equal(control.find(Dropdown).length, 1);    
    assert.equal(control.find(Dropdown).prop('children').length, 2);
    assert.isDefined(control.childAt(0).props().onChange);
  });

  it('it passes correct currentState.fontSize prop down to FontSizeComponent', () => {
    const control = mount(
      <FontSizeControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.fontSize}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    assert.equal(control.find(FontSizeComponent).prop('currentState').fontSize, 20);
  });
});
