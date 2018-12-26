import React from 'react';
import Codemirror from "react-codemirror";

export default () => (
  <div>
    <h3>customStyleMap</h3>
    <div className="docs-desc">
      This is map of custom styles that be be applied in the editor.
      <br />
      Key is name of style and value is style object. For example
    </div>
    <Codemirror
      value={`{
  redBackground: {
    backgroundColor: \'red\'
  },
  greenBackground: {
    backgroundColor: \'green\'
  }
}`
      }
      options={{
        lineNumbers: true,
        mode: "jsx",
        readOnly: true
      }}
    />
  </div>
);
