import React from 'react';

export default () => (
  <div>
    <h3>customBlockRenderFunc</h3>
    <div className="docs-desc">
      Rendering of a blocks can be changed using customBlockRenderFunc. It
      should be a function that returns a react component.
      <br />
      (Currently if customBlockRenderFunc is present the default renderers of
      the editor do not work, this will soon be fixed.)
    </div>
  </div>
);
