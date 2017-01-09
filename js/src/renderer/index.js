import { Entity, ContentBlock } from 'draft-js';
import Embedded from './Embedded';
import Image from './Image';

export default function BlockRendererFunc(block: ContentBlock): Object {
  if (block.getType() === 'atomic') {

    const entity = Entity.get(block.getEntityAt(0));

    if (entity && entity.type === 'IMAGE') {
      return {
        component: Image,
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
