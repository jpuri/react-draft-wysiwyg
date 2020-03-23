/* @flow */

import React, { useState } from 'react';
import { Editor } from '../../src';

const ControlledSelectedOptions = () => {
    const [state, setState] = useState();

    return (<div className="rdw-storybook-root">
        <h3>Editor with only selected toolbar options.</h3>
        <Editor
            editorState={state}
            onEditorStateChange={e => setState(e)}
            toolbar={{
                blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                },
                inline: {
                    options: ['bold', 'italic'],
                },
                list: {
                    options: ['unordered', 'ordered'],
                },
                options: ['blockType', 'inline', 'list'],
            }}
        />
    </div>)
};

export default ControlledSelectedOptions;
