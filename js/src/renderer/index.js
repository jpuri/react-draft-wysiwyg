import Embedded from './Embedded';
import getImageComponent from '../Renderer/Image';
import { EditorState, SelectionState } from 'draft-js';

const getBlockRenderFunc = (config, customBlockRenderer, getEditorState) => {
  return (block) => {
    if (typeof customBlockRenderer === 'function') {
      const renderedComponent = customBlockRenderer(block, config, getEditorState);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      const contentState = getEditorState().getCurrentContent();
      let entityKey = block.getEntityAt(0);

      if (entityKey) {
        const entity = contentState.getEntity(entityKey);
        if (entity && entity.type === 'IMAGE') {
          console.log('image block selected', block.getKey(), contentState.getKeyAfter(block.getKey()))
          // Force selection to leave image block to avoid errors
          const nextBlockKey = contentState.getKeyAfter(block.getKey());
          const selectionState = SelectionState.createEmpty(nextBlockKey);
          selectionState.merge({
            focusKey: nextBlockKey,
            focusOffset: 0,
            hasFocus: true
          });
          EditorState.forceSelection(getEditorState(), selectionState);
          return {
            component: getImageComponent(config),
            editable: false,
          };
        } else if (entity && entity.type === 'EMBEDDED_LINK') {
          return {
            component: Embedded,
            editable: false,
          };
        }
      }
    }
    return undefined;
  };
};

export default getBlockRenderFunc;
