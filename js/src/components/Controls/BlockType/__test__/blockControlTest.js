/* @flow */

import React from 'react';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import Block from '..';
import { IntlProvider } from 'react-intl';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('Block test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div at root when rendered', () => {
    expect(mount(
      <IntlProvider locale="en">
        <Block
          onChange={() => {}}
          editorState={editorState}
          config={{...defaultToolbar.blockType, inDropdown: false}}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    ).html().startsWith('<div')).to.be.true;
  });

  it('should have a dropdown child component defined', () => {
    const block = mount(
      <IntlProvider locale="en">
        <Block
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.blockType}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    );
    expect(block.find('Dropdown').length).to.equal(1);
  });

  it('should have 8 child elements when inDropdown is false', () => {
    const block = mount(
      <IntlProvider locale="en">
        <Block
          onChange={() => {}}
          editorState={editorState}
          config={{...defaultToolbar.blockType, inDropdown: false}}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    );
    expect(block.find('Option').length).to.equal(8);
  });
});
