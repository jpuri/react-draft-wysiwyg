import React from 'react';

export default () => (
  <div>
    <h3>DraftJS Properties</h3>
    <div className="docs-desc">
      Properties provided by DraftJS like spellCheck, readOnly, tabIndex, placeholder, stripPastedStyles, aria properties are all supported by the editor.
      They are passed over to the underlying DraftJS editor.<br />
      (ARIA properties like ariaLabel, ariaOwneeID, ariaActiveDescendantID, ariaAutoComplete, ariaDescribedBy, ariaExpanded, ariaHasPopup can be used).
    </div>
  </div>
);
