import React from 'react';
import Codemirror from 'react-codemirror';

export default () => (
  <div>
    <div className="docs-desc top-margined">
      <b>Internationalizing toolbar</b>
      <div className="docs-desc top-margined">
        All text used in toolbar for labels and titles etc can be localized using property 'localization'. Its is an object with 2 parameters:
        <ol>
          <li>
            <b>locale</b>
            : This can be used to pass locale. Editor has support builtin for lcoales: en, fr, zh, ru, pt, ko, it, nl, de, da, zh_tw, pl, es.
          </li>
          <li>
            <b>translations</b>
            : This can be used to override the default translations od add new ones for locales not already supported.
            It should be an object similar to <a href="https://github.com/jpuri/react-draft-wysiwyg/blob/master/src/i18n/en.js">this</a>.
          </li>
        </ol>
      </div>
    </div>
    <Codemirror
      value={
        'import React from \'react\';\n' +
        'import { Editor } from \'react-draft-wysiwyg\';\n' +
        '\n\n' +
        'const EditorI18n = () => (\n' +
        '  <Editor\n' +
        '    wrapperClassName="demo-wrapper"\n' +
        '    editorClassName="demo-editor"\n' +
        '    localization={{\n' +
        '      locale: \'ko\',\n' +
        '    }}\n' +
        '  />\n' +
        ');'
      }
      options={{
        lineNumbers: true,
        mode: 'jsx',
        readOnly: true,
      }}
    />
  </div>
)
