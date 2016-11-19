import { Entity, ContentBlock } from 'draft-js';
import Image from './Image';
import Embed from './Embed';

export default function BlockRenderer(block: ContentBlock): Object {
  if (block.getType() === 'atomic') {
    const entity = Entity.get(block.getEntityAt(0));
    if (entity && entity.type === 'IMAGE') {
      return {
        component: Image,
        editable: false,
      };
    } else if (entity && entity.type === 'EMBED') {
      return {
        component: Embed,
        editable: false,
      };
    }
  }
  return undefined;
}
