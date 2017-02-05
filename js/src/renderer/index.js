import { Entity, ContentBlock } from 'draft-js';
import Embedded from './Embedded';
import getImageComponent from './Image';

const getBlockRenderFunc = (config, customBlockRenderer) => {
  return (block) => {
    if (typeof customBlockRenderer === 'function') {
      const renderedComponent = customBlockRenderer(block, config);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      const entity = Entity.get(block.getEntityAt(0));
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
  }
}

export default getBlockRenderFunc;
