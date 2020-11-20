/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';

import Option from '../../../components/Option';
import InlineControl from '..';
import defaultToolbar from '../../../config/defaultToolbar';
import ModalHandler from '../../../event-handler/modals';
import localeTranslations from '../../../i18n';

describe('InlineControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.inline}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have 5 child elements by default', () => {
    const control = mount(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.inline}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.find(Option).length).to.equal(7);
  });

  it('should have 1 child elements if inDropdown is true', () => {
    const control = mount(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
        config={{ ...defaultToolbar.inline, inDropdown: true }}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).to.equal(1);
    expect(control.childAt(0).childAt(0).prop('children').length).to.equal(2);
  });

  it('should execute onChange when child elements are clicked', () => {
    const onChange = spy();
    const control = mount(
      <InlineControl
        onChange={onChange}
        editorState={editorState}
        config={defaultToolbar.inline}
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
    control.find(Option).at(4).simulate('click');
    assert.equal(onChange.callCount, 5);
  });

  it('should have false value for all rich styles in state by default', () => {
    const control = shallow(
      <InlineControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.inline}
        modalHandler={new ModalHandler()}
      />,
    );
    assert.isNotTrue(control.state().currentStyles.BOLD);
    assert.isNotTrue(control.state().currentStyles.ITALIC);
    assert.isNotTrue(control.state().currentStyles.UNDERLINE);
    assert.isNotTrue(control.state().currentStyles.STRIKETHROUGH);
    assert.isNotTrue(control.state().currentStyles.MONOSPACE);
  });
});
