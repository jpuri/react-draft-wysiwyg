/* @flow */
import React from 'react';
import { Button } from '@innovaccer/design-system';
import { Editor, EditorPreview } from '../../src';

export const All = (args) => {
  // import { Editor, EditorPreview } from '@innovaccer/rich-text-editor';

  const [editorState, setEditorState] = React.useState(Editor.utils.EditorState.createEmpty());
  const [html, setHTML] = React.useState();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onClick = () => {
    const raw = Editor.utils.convertToRaw(editorState.getCurrentContent());
    const entities = {
      MENTION: (children, entity, { key }) => (
        <div key={key}>{entity.value}</div>
      ),
    }
    const html = EditorPreview.utils.convertToHTML(raw, true, { entities });
    setHTML(html);
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
            { label: 'First Name', value: 'Innovaccer' },
            { label: 'Last Name', value: 'Analytics' },
            { label: 'PCP', value: '112' },
            { label: 'Address', value: 'Test Address' },
            { label: 'DOB', value: '11-02-1998' },
          ],
        }}
      />
      <Button
        appearance="primary"
        size="large"
        onClick={onClick}
        className="my-4"
      >
        Get Preview HTML
      </Button>
      <div>
        {html}
      </div>
    </div>
  );
};

All.argTypes = {
  raw: { control: { disable: true } },
  colors: { control: { disable: true } },
};

export default {
  title: 'Library/Preview - toHTML',
  component: EditorPreview,
  parameters: {
    docs: {
      source: {
        type: 'code',
      }
    },
  },
};
