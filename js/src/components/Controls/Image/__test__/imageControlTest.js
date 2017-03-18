/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect, assert } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import ImageControl from '..';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('ImageControl test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <IntlProvider locale="en">
        <ImageControl
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.image}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    ).html().startsWith('<div')).to.be.true;
  });

  it('should have 1 child element by default', () => {
    const control = mount(
      <IntlProvider locale="en">
        <ImageControl
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.image}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    );
    expect(control.children().length).to.equal(1);
  });

  it('should set signalShowModal to true when option is clicked', () => {
    const control = mount(
      <IntlProvider locale="en">
        <ImageControl
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.image}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    );
    const imageControl = control.find('ImageControl');
    assert.isNotTrue(imageControl.node.signalShowModal);
    control.find('Option').simulate('click');
    assert.isTrue(imageControl.node.signalShowModal);
  });
});
