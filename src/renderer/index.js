import Embedded from './Embedded';
import Code from './Code';
import getImageComponent from '../renderer/Image';

const getBlockRenderFunc = (config, customBlockRenderer, translations) => (block) => {
  if (typeof customBlockRenderer === 'function') {
    const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
    if (renderedComponent) return renderedComponent;
  }
  if (block.getType() === 'atomic') {
    const contentState = config.getEditorState().getCurrentContent();
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
    if (entity
      && (entity.type === 'SCRIPT'
        || entity.type === 'DIV')
    ) {
      return {
        component: Code,
        editable: false,
        props: {
          codeTranslation: translations['components.controls.blocktype.code'],
        },
      };
    }
  }
  return undefined;
};

export default getBlockRenderFunc;
