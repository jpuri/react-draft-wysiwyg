import React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import I18n from './I18n';
import FloatingToolbar from './FloatingToolbar';
import CustomToolbar from './CustomToolbar';
import ConvertToHTML from './ConvertToHTML';
import ConvertFromHTML from './ConvertFromHTML';
import ConvertToMarkdown from './ConvertToMarkdown';
import ConvertToRawDraftContent from './ConvertToRawDraftContent';

import './styles.css';

storiesOf('Basic', module).add('story', () => <Basic />);
storiesOf('I18n', module).add('story', () => <I18n />);
storiesOf('CustomToolbar', module).add('story', () => <CustomToolbar />);
storiesOf('FloatingToolbar', module).add('story', () => <FloatingToolbar />);
storiesOf('ConvertToRawDraftContent', module).add('story', () => <ConvertToRawDraftContent />);
storiesOf('ConvertToHTML', module).add('story', () => <ConvertToHTML />);
storiesOf('ConvertFromHTML', module).add('story', () => <ConvertFromHTML />);
storiesOf('ConvertToMarkdown', module).add('story', () => <ConvertToMarkdown />);

// toolbar hidden
/**
- spell check
- image upload
- focus/blur callbacks
- Mention
- HashTag
- readOnly
- cosutom decorators
- custom block renderer
*/
