
// The function will return block inline styles using block level meta-data
export function blockStyleFn(block: Object): string {
  const blockAlignment = block.getData() && block.getData().get('text-align');
  if (blockAlignment) {
    return `${blockAlignment}-aligned-block`;
  }
  return '';
}
