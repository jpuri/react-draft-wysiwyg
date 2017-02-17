import Embedded from './Embedded';
import getImageComponent from './Image';

const getBlockRenderFunc = (config, customBlockRenderer, getEditorState) => {
  return (block) => {
    if (typeof customBlockRenderer === 'function') {
      const renderedComponent = customBlockRenderer(block, config, getEditorState);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      const contentState = getEditorState().getCurrentContent();
      const entity = contentState.getEntity(block.getEntityAt(0));
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
    return undefined;
  };
};

export default getBlockRenderFunc;
