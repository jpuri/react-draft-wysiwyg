/* @flow */
import React, { Children } from 'react';
import { Button, Chip } from '@innovaccer/design-system';
import { Editor, EditorPreview } from '../../src';

export const All = (args) => {
  // import { Editor, EditorPreview } from '@innovaccer/rich-text-editor';

  const [editorState, setEditorState] = React.useState(Editor.utils.EditorState.createEmpty());
  const [raw, setRaw] = React.useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onClick = () => {
    const raw = Editor.utils.convertToRaw(editorState.getCurrentContent());
    setRaw(raw);
  };

  return (
    <div>
      <Editor
        editorClassName="RichTextEditor"
        placeholder="Begin Typing.."
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        mention={{
          suggestions: [
            { label: 'First Name', value: 'First Name' },
            { label: 'Last Name', value: 'Last Name' },
            { label: 'PCP', value: 'PCP' },
            { label: 'Address', value: 'Address' },
            { label: 'DOB', value: 'DOB' },
          ],
        }}
      />
      <Button
        appearance="primary"
        size="large"
        onClick={onClick}
        className="my-4"
      >
        Get Preview
      </Button>
      <div>
        <EditorPreview
          {...args}
          raw={raw}
          entities={{
            MENTION: (children, entity, { key }) => (
              <Chip label={children} type="action" key={key} />
            )
          }}
        />
      </div>
    </div>
  );
};

All.argTypes = {
  raw: { control: { disable: true } },
  colors: { control: { disable: true } },
};

export default {
  title: 'Library/Preview - CustomRenderer',
  component: EditorPreview,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
