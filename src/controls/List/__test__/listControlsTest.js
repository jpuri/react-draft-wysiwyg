/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import ListControl from '..';
import Option from '../../../components/Option';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('ListControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <ListControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.list}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have 4 child elements by default', () => {
    const control = mount(
      <ListControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.list}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.find(Option).length).to.equal(4);
  });

  it('should have 1 child elements if inDropdown is true', () => {
    const control = mount(
      <ListControl
        onChange={() => {}}
        editorState={editorState}
        config={{ ...defaultToolbar.list, inDropdown: true }}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).to.equal(1);
    expect(control.childAt(0).childAt(0).prop('children').length).to.equal(2);
  });

  it('should execute onChange when create list buttons are clicked', () => {
    const onChange = spy();
    const control = mount(
      <ListControl
        onChange={onChange}
        editorState={editorState}
        config={defaultToolbar.list}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    control.find(Option).at(0).simulate('click');
    assert.isTrue(onChange.calledOnce);
    control.find(Option).at(0).simulate('click');
    assert.equal(onChange.callCount, 2);
  });
});
