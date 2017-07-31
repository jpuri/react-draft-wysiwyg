import React from 'react';

export default () => (
  <div>
    <h3>wrapperId</h3>
    <div className="docs-desc">
      The library generates and adds an id to wrapper around the editor. This is required for some more complex event handling.
      In case of server side rendering generated id can create trouble and thus this property can be used.
    </div>
  </div>
);
