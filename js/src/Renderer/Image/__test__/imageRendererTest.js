/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow } from 'enzyme';
import { getAllBlocks } from 'draftjs-utils';
import Image from '../index';
import { convertFromHTML, Entity, AtomicBlockUtils, ContentState, EditorState } from 'draft-js';

describe('ImageRenderer test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);
  const entityKey = Entity.create('IMAGE', 'MUTABLE', { src: 'testing' });
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );

  it('should have a div when rendered', () => {
    expect(
      shallow(<Image block={getAllBlocks(newEditorState).get(1)} />).node.type)
        .to.equal('span');
  });

  it('should have state initialized correctly', () => {
    const control = shallow(<Image block={getAllBlocks(newEditorState).get(1)} />);
    assert.isNotTrue(control.state().hovered);
  });

  it('should have 1 child element by default', () => {
    const control = shallow(<Image block={getAllBlocks(newEditorState).get(1)} />);
    expect(control.children().length).to.equal(1);
  });
});
