// The function will return block inline styles using block level meta-data
export default function blockStyleFn(block: Object): string {
  const blockAlignment = block.getData() && block.getData().get('text-align');
  const blockDepth = block.getData() && block.getData().get('indent');
  if (blockAlignment) {
    return `rdw-${blockAlignment}-aligned-block`;
  } else if (blockDepth || blockDepth === 0) {
    return `rdw-indent-${blockDepth}`;
  }
  return '';
}
