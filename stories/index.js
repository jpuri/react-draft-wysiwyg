import React from 'react';
import { storiesOf } from '@storybook/react';
import DemoEditor from './DemoEditor';
import I18nEditor from './I18nEditor';

import './styles.css';

storiesOf('Basic', module).add('story', () => <DemoEditor />);
storiesOf('Internalization', module).add('story', () => <I18nEditor />);
