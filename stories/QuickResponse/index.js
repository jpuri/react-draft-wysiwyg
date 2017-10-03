/* @flow */

import React from 'react';
import { Editor } from '../../src';


function submitButtonHandler(event) {
  console.warn('submitButtonHandler === ', event);
}

/**
 * Default trigger is '=' and default separator between words is ' '.
 * thus there fields are optional.
*/
const QuickResponse = () => {
  const handleReturnKey = submitButtonHandler;
  return (
    <div className="rdw-storybook-root">
      <span>Type = to see suggestions</span>
      <form onSubmit={() => { submitButtonHandler('ONSUBMIT CALLED'); }}>
        <Editor
          handleReturn={(e) => {
            // By returning 'handled' from your handler, you indicate that the
            // event is handled and the Draft core should do nothing more with it.
            // By returning 'not-handled', you defer to Draft to handle the event.
            if (handleReturnKey && typeof handleReturnKey === 'function') {
              handleReturnKey('HANDLE RETURN');
              return 'handled';
            }
            return 'not-handled';
          }}
          quickResponse={{
            separator: ' ',
            trigger: '=',
            suggestions: [
              { text: 'Apple one', value: 'Hi!\n\nThank your for contacting us.\n\nPlease wait for 24 hours before you contact us again.\n\nHave a nice day.\n\n', url: 'apple' },
              { text: 'Apple Two', value: 'Hi!\n\nThank your for contacting us.\n\nPlease wait for 24 hours before you contact us again.\n\nHave a nice day.\n\n', url: 'banana' },
              { text: 'Cherry cherry', value: 'cherry', url: 'cherry' },
              { text: 'Durian', value: 'durian', url: 'durian' },
              { text: 'EGG egg EGG', value: 'eggfruit', url: 'eggfruit' },
              { text: 'fFFFiiggg', value: 'fig', url: 'fig' },
              { text: 'Grapefruit', value: 'grapefruit', url: 'grapefruit' },
              { text: 'Honeydew', value: 'honeydew', url: 'honeydew' },
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
