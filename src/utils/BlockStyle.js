// The function will return block inline styles using block level meta-data
export default function blockStyleFn(block: Object): string {
  const blockAlignment = block.getData() && block.getData().get('text-align');
  const blockDepth = block.getData() && block.getData().get('text-indent');
  const blockLineHeight = block.getData() && block.getData().get('line-height');
  let styleString = []
  if (blockAlignment) {
    styleString.push(`rdw-${blockAlignment}-aligned-block`);
  }
  if (blockDepth) {
    styleString.push(`rdw-text-indent-${blockDepth}`);
  }
  if (blockLineHeight) {
    const blockLineHeightString = `rdw-lineheight-${blockLineHeight}`.replace('.', '-')
    styleString.push(blockLineHeightString);
  }
  return styleString.length ? styleString.join(' ') : '';
}
