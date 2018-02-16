import React from "react";
import defaultToolbar from "./defaultToolbar";
import Codemirror from "react-codemirror";
import CustomizeToolbarOption from "./CustomizeToolbarOption";
import CustomToolbarOption from "./CustomToolbarOption";
import I18N from "./I18N";

export default () => (
  <div>
    <h3>Customizing toolbar</h3>
    <ol>
      <li>
        <b>toolbarOnFocus</b>: Toolbar is visible only when editor is focused.
      </li>
      <li>
        <b>toolbarHidden</b>: Toolbar is hidden if this property is true.
      </li>
      <li>
        <b>toolbar</b>: customizing pre-built toolbar options.
      </li>
      <li>
        <b>toolbarCustomButtons</b>: adding new options to the toolbar.
      </li>
    </ol>
    <div className="docs-desc top-margined">
      <b>toolbarOnFocus</b>
    </div>
    <Codemirror
      value={
        "import React, { Component } from 'react';\n" +
        "import { Editor } from 'react-draft-wysiwyg';\n" +
        "\n\n" +
        "<Editor\n" +
        "  toolbarOnFocus\n" +
        '  wrapperClassName="wrapper-class"\n' +
        '  editorClassName="editor-class"\n' +
        '  toolbarClassName="toolbar-class"\n' +
        "/>"
      }
      options={{
        lineNumbers: true,
        mode: "jsx",
        readOnly: true
      }}
    />
    <div className="docs-desc top-margined">
      <b>toolbarHidden</b>
    </div>
    <Codemirror
      value={
        "import React, { Component } from 'react';\n" +
        "import { Editor } from 'react-draft-wysiwyg';\n" +
        "\n\n" +
        "<Editor\n" +
        "  toolbarOnFocus\n" +
        '  wrapperClassName="wrapper-class"\n' +
        '  editorClassName="editor-class"\n' +
        '  toolbarClassName="toolbar-class"\n' +
        "/>"
      }
      options={{
        lineNumbers: true,
        mode: "jsx",
        readOnly: true
      }}
    />
    <div className="docs-desc top-margined">
      <b>toolbar</b>
      <div className="docs-desc top-margined">
        toolbar property provides a lot of parameters to customize pre-built
        option in the toolbar. Default value of toolbar property is as shown
        below.
      </div>
    </div>
    <Codemirror
      value={defaultToolbar}
      options={{
        lineNumbers: true,
        mode: "jsx",
        readOnly: true
      }}
    />
    <div className="docs-desc top-margined">
      Various parameters and their use is:
    </div>
    <ol>
      <li>
        <b>options</b>
        <span>
          : Its an array of available options in the toolbar and in each menu
          option. Only those options specified in this property are added to
          toolbar and in the order in which they are specified. By default all
          options are present. In case of fontSize options can be used to add
          more font-sizes to the droption.
        </span>
      </li>
      <li>
        <b>classname</b>
        <span>
          : This property can be used to add classname to buttons, dropdowns and
          popups in the toolbar.
        </span>
      </li>
      <li>
        <b>inDropdown</b>
        <span>
          : This property can be used to group the options in dropdown.
        </span>
      </li>
      <li>
        <b>component</b>
        <span>
          : This property can be used to configure a custom react component to
          be used for toolbar options, instead of the pre-built ones.
        </span>
      </li>
      <li>
        <b>icon</b>
        <span>: This can be used to specify icon for toolbar buttons.</span>
      </li>
      <li>
        <b>colorPicker: colors</b>
        <span>
          : This is array of colors to be shown in color-picker. Value should be
          a rgb value.
        </span>
      </li>
      <li>
        <b>link: showOpenOptionOnHover</b>
        <span>
          : If this is true a small arrow icon is shown over links on hover.
          Clicking this icon will open link in new tab. Value is true by
          default.
        </span>
      </li>
      <li>
        <b>link: defaultTargetOption</b>
        <span>
          : This property sets the target of link in the editor. Default value
          is '_self'.
        </span>
      </li>
      <li>
        <b>emoji: emojis</b>
        <span>
          : The property is arrary of emoji characters (unicodes). Which are
          shown in emoji option.
        </span>
      </li>
      <li>
        <b>embedded: defaultSize</b>
        <span>
          : This property can be used to pass default size (height and width) of
          embedded link in the editor. The default values are 'auto'.
        </span>
      </li>
      <li>
        <b>image: urlEnabled</b>
        <span>
          : The property can be used to configure if the option to specify image
          source URL should be enalbled. Default value is true.
        </span>
      </li>
      <li>
        <b>image: uploadEnabled</b>
        <span>
          : The property can be used to configure if the option to upload image
          computer should be enabled. Default value is true.
        </span>
      </li>
      <li>
        <b>image: uploadCallback</b>
        <span>
          : This is image upload callBack. It should return a promise that
          resolves to give image src. Default value is true.<br />
          Both above options of uploadEnabled and uploadCallback should be
          present for upload to be enabled.<br />
          Promise should resolve to return an object{" "}
          <code className="code_sm">{"{ data: { link: <THE_URL>}}"}</code>.
        </span>
      </li>
      <li>
        <b>image: previewImage</b>
        <span>
          : The property can be used to configure image preview after upload in
          image popup, false by default.
        </span>
      </li>
      <li>
        <b>image: alignmentEnabled</b>
        <span>
          : The property can be used to configure if image alignment should be
          enabled. Alignment options are LEFT, RIGHT and CENTER. Default value
          is true.
        </span>
      </li>
      <li>
        <b>image: inputAccept</b>
        <span>
          : The property can be used to configure which file types should be
          allowed to upload by file input for image upload.
        </span>
      </li>
      <li>
        <b>image: alt</b>
        <span>
          : The property can be used to enable alt field for images and
          optionally make it mandatory.
        </span>
      </li>
      <li>
        <b>image: defaultSize</b>
        <span>
          : This property can be used to pass default size (height and width) of
          embedded link in the editor. The default values are 'auto'.
        </span>
      </li>
    </ol>
    <div className="docs-desc top-margined">An example:</div>
    <Codemirror
      value={
        "import React, { Component } from 'react';\n" +
        "import { Editor } from 'react-draft-wysiwyg';\n" +
        "\n\n" +
        "<Editor\n" +
        "  toolbarHidden\n" +
        '  wrapperClassName="wrapper-class"\n' +
        '  editorClassName="editor-class"\n' +
        '  toolbarClassName="toolbar-class"\n' +
        "  toolbar={{\n" +
        "    inline: { inDropdown: true },\n" +
        "    list: { inDropdown: true },\n" +
        "    textAlign: { inDropdown: true },\n" +
        "    link: { inDropdown: true },\n" +
        "    history: { inDropdown: true },\n" +
        "  }}\n" +
        "/>"
      }
      options={{
        lineNumbers: true,
        mode: "jsx",
        readOnly: true
      }}
    />
    <CustomizeToolbarOption />
    <CustomToolbarOption />
    <I18N />
  </div>
);
