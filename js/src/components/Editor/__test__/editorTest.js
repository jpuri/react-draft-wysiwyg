/* @flow */

import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import Editor from '..';

describe('Editor menu test suite', () => {
  it('should have a div when rendered', () => {
    expect(shallow(<Editor />).node.type).to.equal('div');
  });

  it('should have an editorState object in state', () => {
    const editor = shallow(<Editor />);
    assert.isDefined(editor.state().editorState);
    assert.isDefined(editor.state().editorFocused);
  });
});
