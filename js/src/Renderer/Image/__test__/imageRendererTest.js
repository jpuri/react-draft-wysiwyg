/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';
import { getAllBlocks } from 'draftjs-utils';
import getImageComponent from '../index';
import { convertFromHTML, AtomicBlockUtils, ContentState, EditorState } from 'draft-js';

describe('ImageRenderer test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  const entityKey = contentState
    .createEntity('IMAGE', 'MUTABLE', { src: 'testing' })
    .getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' ',
  );

  it('should have a div when rendered', () => {
    const Image = getImageComponent({ isReadOnly: () => false, isImageAlignmentEnabled: () => true });
    expect(
      shallow(<Image block={getAllBlocks(newEditorState).get(1)} />).node.type)
        .to.equal('span');
  });

  it('should have state initialized correctly', () => {
    const Image = getImageComponent({ isReadOnly: () => false, isImageAlignmentEnabled: () => true });
    const control = shallow(<Image block={getAllBlocks(newEditorState).get(1)} />);
    assert.isNotTrue(control.state().hovered);
  });

  it('should have 1 child element by default', () => {
    const Image = getImageComponent({ isReadOnly: () => false, isImageAlignmentEnabled: () => true });
    const control = shallow(<Image block={getAllBlocks(newEditorState).get(1)} />);
    expect(control.children().length).to.equal(1);
  });
});
