import React from 'react';

export default () => (
  <div>
    <h3>RTL and Text Alignment</h3>
    <div className="docs-desc">
      DraftJS library has out of box sopport for RTL, it decides text-direction using bidi algorithm. 
      It works at block-level. <br />
      Property 'textAlignment' can be used to force text-alignment in a particular direction. 
      It can have values 'left', 'right' and 'center'. It will over-ride the results of bidi-algorigthm. 
      This property will be applicable to all blocks. Toobar option of text-alignment will override 'textAlignment' 
      property also at block level.
    </div>
  </div>
);
