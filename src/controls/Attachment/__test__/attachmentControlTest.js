/* @flow */

import React from "react";
import { expect, assert } from "chai";
import { mount } from "enzyme";
import { spy } from "sinon";
import { EditorState, convertFromHTML, ContentState } from "draft-js";

import AttachmentControl from "..";
import Option from "../../../components/Option";
import defaultToolbar from "../../../config/defaultToolbar";
import ModalHandler from "../../../event-handler/modals";
import localeTranslations from "../../../i18n";

describe("AttachmentControl test suite", () => {
  const contentBlocks = convertFromHTML("<div>test</div>");
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <AttachmentControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.attachment}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    ).html().startsWith('<div')).to.equal(true);
  });

  it('should have 1 child element by default', () => {
    const control = mount(
      <AttachmentControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.attachment}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    expect(control.children().length).to.equal(1);
  });

  it('should open upload screen on label click', () => {
    const control = mount(
      <AttachmentControl
        onChange={() => {}}
        editorState={editorState}
        config={defaultToolbar.attachment}
        translations={localeTranslations.en}
        modalHandler={new ModalHandler()}
      />,
    );
    control.setState({ expanded: true });
    const buttons = control.find(".rdw-attachment-modal-upload-label");
    buttons.first().simulate("click");
  });
});
