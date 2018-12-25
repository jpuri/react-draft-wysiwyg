/* @flow */

import React from 'react';
import { expect, assert } from 'chai';// eslint-disable-line import/no-extraneous-dependencies
import { spy } from 'sinon';// eslint-disable-line import/no-extraneous-dependencies
import { mount } from 'enzyme';// eslint-disable-line import/no-extraneous-dependencies
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import TextAlignControl from '..';
import Option from '../../../components/Option';
import Dropdown from '../../../components/Dropdown';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('TextAlignControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <TextAlignControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.textAlign}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have 4 child elements by default', () => {
    const control = mount(
      <TextAlignControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.textAlign}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.find(Option).length).to.equal(4);
  });

  it('should have 5 child options of dropdown child elements if inDropdown is true', () => {
    const control = mount(
      <TextAlignControl
        onChange={() => {}}
        editorState={editorState}
        config={{ ...defaultToolbar.textAlign, inDropdown: true }}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.childAt(0).childAt(0).prop('children').length).to.equal(5);
  });

  it('should execute onChange when any of first any child elements is clicked', () => {
    const onChange = spy();
    const control = mount(
      <TextAlignControl
        onChange={onChange}
        editorState={editorState}
        config={defaultToolbar.textAlign}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    control.find(Option).at(0).simulate('click');
    assert.isTrue(onChange.calledOnce);
    control.find(Option).at(1).simulate('click');
    assert.equal(onChange.callCount, 2);
    control.find(Option).at(2).simulate('click');
    assert.equal(onChange.callCount, 3);
    control.find(Option).at(3).simulate('click');
    assert.equal(onChange.callCount, 4);
  });
});
