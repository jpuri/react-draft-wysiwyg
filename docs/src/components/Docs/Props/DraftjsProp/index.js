import React from 'react';

export default () => (
  <div>
    <h3>DraftJS Properties</h3>
    <div className="docs-desc">
      Properties provided by DraftJS like spellCheck, readOnly, tabIndex, placeholder, handleDroppedFiles, handlePastedFiles, stripPastedStyles, aria properties are all supported by the editor.
      They are passed over to the underlying DraftJS editor.<br /><br />
      If you are implementing handlePastedImage and handlePastedFiles simultaneously. if an image is pasted at the editor, only handlePastedImage will be called. same with  handleDroppedImage and handleDroppedFiles.<br /><br />
      (ARIA properties like ariaLabel, ariaOwneeID, ariaActiveDescendantID, ariaAutoComplete, ariaDescribedBy, ariaExpanded, ariaHasPopup can be used).
    </div>
  </div>
);
