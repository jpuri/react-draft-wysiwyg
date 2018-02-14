/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import Codemirror from 'react-codemirror';
import sampleEditorContent from '../../../util/sampleEditorContent';
import EditorStyleProp from './EditorStyleProp';
import EditorStateProp from './EditorStateProp';
import CustomizingToolbarProp from './CustomizingToolbarProp';
import MentionProp from './MentionProp';
import HashtagProp from './HashtagProp';
import EditorRef from './EditorRef';
import EventCallbackProp from './EventCallbackProp';
import DraftjsProp from './DraftjsProp';
import TextAlignmentProp from './TextAlignmentProp';
import ReadOnlyProp from './ReadOnlyProp';
import DecoratorProp from './DecoratorProp';
import BlockRenderingProp from './BlockRenderingProp';
import WrapperIdProp from './WrapperIdProp';

const Props = () => (
  <div className="docs-section">
    <h2>Properties</h2>
    <EditorStyleProp />
    <EditorStateProp />
    <CustomizingToolbarProp />
    <MentionProp />
    <HashtagProp />
    <EditorRef />
    <EventCallbackProp />
    <DraftjsProp />
    <TextAlignmentProp />
    <ReadOnlyProp />
    <DecoratorProp />
    <BlockRenderingProp />
    <WrapperIdProp />
  </div>
);

export default Props;
