/* @flow */

import React from 'react';
import { Editor } from '../../src';

/**
 * Default trigger is '@' and default separator between words is ' '.
 * thus there fields are optional.
*/
const QuickResponse = () => {
  const handleReturnKey = null;
  return (
    <div className="rdw-storybook-root">
      <span>Type = to see suggestions</span>
      <form onSubmit={e => console.warn('Submited', e)}>
        <Editor
          handleReturn={(e) => {
            console.warn('Outer QuickResponse wrapper handlerReturn');
            // By returning 'handled' from your handler, you indicate that the
            // event is handled and the Draft core should do nothing more with it.
            // By returning 'not-handled', you defer to Draft to handle the event.
            if (handleReturnKey && typeof handleReturnKey === 'function') {
              handleReturnKey(e);
              return 'handled';
            }
          }}
          quickResponse={{
            separator: ' ',
            trigger: '=',
            suggestions: [
              { text: 'APPLE', value: 'Hi!\n\nThank your for contacting us.\n\nPlease wait for 24 hours before you contact us again.\n\nHave a nice day.\n\n', url: 'apple' },
              { text: 'BANANA', value: 'Hi!\n\nThank your for contacting us.\n\nPlease wait for 24 hours before you contact us again.\n\nHave a nice day.\n\n', url: 'banana' },
              { text: 'CHERRY', value: 'cherry', url: 'cherry' },
              { text: 'DURIAN', value: 'durian', url: 'durian' },
              { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
              { text: 'FIG', value: 'fig', url: 'fig' },
              { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
              { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
            ],
          }}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
        />
      </form>
    </div>
  )
};

export default QuickResponse;
