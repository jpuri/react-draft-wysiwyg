/* @flow */

import React from "react";
import { expect, assert } from "chai";
import { shallow } from "enzyme";
import Editor from "..";

describe("Editor test suite", () => {
  it("should have a div when rendered", () => {
    expect(
      shallow(<Editor />)
        .childAt(0)
        .type()
    ).to.equal("div");
  });

  it("should have an editorState object in state", () => {
    const editor = shallow(<Editor />);
    assert.isDefined(editor.state().editorState);
    assert.isDefined(editor.state().editorFocused);
  });

  it("should have toolbarHidden as false by default", () => {
    const editor = shallow(<Editor />);
    expect(editor.find(".rdw-editor-toolbar")).to.have.length(1);
  });

  it("should not focus editor when toggle to a second editor", () => {
    const firstEditor = shallow(<Editor />);
    const secondEditor = shallow(<Editor />);
    secondEditor.childAt(1).simulate('click');
    assert.isDefined(firstEditor.state().editorFocused);
    assert.isDefined(secondEditor.state().editorFocused);
  })
});
