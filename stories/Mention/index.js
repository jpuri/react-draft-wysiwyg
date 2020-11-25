/* @flow */

import React from 'react';
import { Editor } from '../../src';

/**
 * Default trigger is '@' and default separator between words is ' '.
 * thus there fields are optional.
*/
const Mention = () =>
  (<div className="rdw-storybook-root">
    <span>Type @ to see suggestions</span>
    <Editor
      mention={{
        separator: ' ',
        trigger: '@',
        dropdownOptions: { dropdownClassName: 'Editor-mention-story' },
        suggestions: [
          { label: 'Address', value: 'Address' },
          { label: 'Appointment date', value: 'Appointment Date' },
          { label: 'DOB', value: 'DOB' },
          { label: 'First Name', value: 'First Name' },
          { label: 'Last Name', value: 'Last Name' },
          { label: 'PCP', value: 'PCP' },
        ],
      }}
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
  </div>);

export default Mention;
