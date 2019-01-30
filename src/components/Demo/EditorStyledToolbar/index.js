/* @flow */

import React from "react";
import { Editor } from "react-draft-wysiwyg";
import Codemirror from "react-codemirror";

import bold from "../../../../images/demo/bold.gif";
import italic from "../../../../images/demo/italic.gif";
import underline from "../../../../images/demo/underline.gif";
import strikethrough from "../../../../images/demo/strikethrough.gif";
import subscript from "../../../../images/demo/subscript.gif";
import superscript from "../../../../images/demo/superscript.gif";
import eraser from "../../../../images/demo/erase.gif";
import left from "../../../../images/demo/left-align.gif";
import right from "../../../../images/demo/right-align.gif";
import center from "../../../../images/demo/center-align.gif";
import justify from "../../../../images/demo/justify.gif";
import ordered from "../../../../images/demo/ordered.gif";
import unordered from "../../../../images/demo/unordered.gif";
import indent from "../../../../images/demo/indent.gif";
import outdent from "../../../../images/demo/outdent.gif";
import link from "../../../../images/demo/link.gif";
import unlink from "../../../../images/demo/unlink.gif";
import image from "../../../../images/demo/image.gif";
import undo from "../../../../images/demo/undo.gif";
import redo from "../../../../images/demo/redo.gif";

const EditorStyledToolbar = () => (
  <div className="demo-section">
    <h3>9. Editor toolbar with custom icons and styling.</h3>
    <div className="demo-section-wrapper">
      <div className="demo-editor-wrapper">
        <Editor
          toolbarClassName="demo-toolbar-custom"
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor-custom"
          toolbar={{
            inline: {
              options: ["italic"],
              bold: { icon: bold, className: "demo-option-custom" },
              italic: { icon: italic, className: "demo-option-custom" },
              underline: { icon: underline, className: "demo-option-custom" },
              strikethrough: {
                icon: strikethrough,
                className: "demo-option-custom"
              },
              monospace: { className: "demo-option-custom" },
              superscript: {
                icon: superscript,
                className: "demo-option-custom"
              },
              subscript: { icon: subscript, className: "demo-option-custom" }
            },
            blockType: {
              className: "demo-option-custom-wide",
              dropdownClassName: "demo-dropdown-custom"
            },
            fontSize: { className: "demo-option-custom-medium" },
            list: {
              unordered: { icon: unordered, className: "demo-option-custom" },
              ordered: { icon: ordered, className: "demo-option-custom" },
              indent: { icon: indent, className: "demo-option-custom" },
              outdent: { icon: outdent, className: "demo-option-custom" }
            },
            textAlign: {
              left: { icon: left, className: "demo-option-custom" },
              center: { icon: center, className: "demo-option-custom" },
              right: { icon: right, className: "demo-option-custom" },
              justify: { icon: justify, className: "demo-option-custom" }
            },
            fontFamily: {
              className: "demo-option-custom-wide",
              dropdownClassName: "demo-dropdown-custom"
            },
            colorPicker: {
              className: "demo-option-custom",
              popupClassName: "demo-popup-custom"
            },
            link: {
              popupClassName: "demo-popup-custom",
              link: { icon: link, className: "demo-option-custom" },
              unlink: { icon: unlink, className: "demo-option-custom" }
            },
            emoji: {
              className: "demo-option-custom",
              popupClassName: "demo-popup-custom"
            },
            embedded: {
              className: "demo-option-custom",
              popupClassName: "demo-popup-custom"
            },
            image: {
              icon: image,
              className: "demo-option-custom",
              popupClassName: "demo-popup-custom"
            },
            remove: { icon: eraser, className: "demo-option-custom" },
            history: {
              undo: { icon: undo, className: "demo-option-custom" },
              redo: { icon: redo, className: "demo-option-custom" }
            }
          }}
        />
      </div>
      <Codemirror
        value={
          "import React from 'react';\n" +
          "import { Editor } from 'react-draft-wysiwyg';\n" +
          "import * as Icons from 'images/icons';\n" +
          "\n\n" +
          "const EditorStyledToolbar = () => (\n" +
          "  <Editor\n" +
          '    toolbarClassName="demo-toolbar-custom"\n' +
          '    wrapperClassName="demo-wrapper"\n' +
          '    editorClassName="demo-editor-custom"\n' +
          "    toolbar={{\n" +
          "      inline: {\n" +
          "        bold: { icon: Icons.bold, className: 'demo-option-custom' },\n" +
          "        italic: { icon: Icons.italic, className: 'demo-option-custom' },\n" +
          "        underline: { icon: Icons.underline, className: 'demo-option-custom' },\n" +
          "        strikethrough: { icon: Icons.strikethrough, className: 'demo-option-custom' },\n" +
          "        monospace: { className: 'demo-option-custom' },\n" +
          "        superscript: { icon: Icons.superscript, className: 'demo-option-custom' },\n" +
          "        subscript: { icon: Icons.subscript, className: 'demo-option-custom' },\n" +
          "      },\n" +
          "      blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },\n" +
          "      fontSize: { className: 'demo-option-custom-medium' },\n" +
          "      list: {\n" +
          "        unordered: { icon: Icons.unordered, className: 'demo-option-custom' },\n" +
          "        ordered: { icon: Icons.ordered, className: 'demo-option-custom' },\n" +
          "        indent: { icon: Icons.indent, className: 'demo-option-custom' },\n" +
          "        outdent: { icon: Icons.outdent, className: 'demo-option-custom' },\n" +
          "      },\n" +
          "      textAlign: {\n" +
          "        left: { icon: Icons.left, className: 'demo-option-custom' },\n" +
          "        center: { icon: Icons.center, className: 'demo-option-custom' },\n" +
          "        right: { icon: Icons.right, className: 'demo-option-custom' },\n" +
          "        justify: { icon: Icons.justify, className: 'demo-option-custom' },\n" +
          "      },\n" +
          "      fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },\n" +
          "      colorPicker: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },\n" +
          "      link: {\n" +
          "        popupClassName: 'demo-popup-custom\n" +
          "        link: { icon: Icons.link, className: 'demo-option-custom' },\n" +
          "        unlink: { icon: Icons.unlink, className: 'demo-option-custom' },\n" +
          "      },\n" +
          "      emoji: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },\n" +
          "      embedded: { className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },\n" +
          "      image: { icon: Icons.image, className: 'demo-option-custom', popupClassName: 'demo-popup-custom' },\n" +
          "      remove: { icon: Icons.eraser, className: 'demo-option-custom' },\n" +
          "      history: {\n" +
          "        undo: { icon: Icons.undo, className: 'demo-option-custom' },\n" +
          "        redo: { icon: Icons.redo, className: 'demo-option-custom' },\n" +
          "      },\n" +
          "    }}\n" +
          "  />\n" +
          ");"
        }
        options={{
          lineNumbers: true,
          mode: "jsx",
          readOnly: true
        }}
      />
    </div>
  </div>
);

export default EditorStyledToolbar;
