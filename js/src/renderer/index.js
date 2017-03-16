import Embedded from '../Renderer/Embedded';
import getImageComponent from '../Renderer/Image';

const getBlockRenderFunc = (config, customBlockRenderer, getEditorState) => {
  return (block) => {
    if (typeof customBlockRenderer === 'function') {
      const renderedComponent = customBlockRenderer(block, config, getEditorState);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      const contentState = getEditorState().getCurrentContent();
      const entityKey = block.getEntityAt(0);

      if (entityKey) {
        const entity = contentState.getEntity(entityKey);
        if (entity && entity.type === 'IMAGE') {
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
