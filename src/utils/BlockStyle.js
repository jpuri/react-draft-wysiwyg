// The function will return block inline styles using block level meta-data
export default function getBlockStyleFunc(func?: (block: Object) => string) {
  return function (block: Object): string {
    const blockAlignment = block.getData() && block.getData().get("text-align");
    const customStyle = func ? func(block) : "";
    if (blockAlignment) {
      return `rdw-${blockAlignment}-aligned-block ${customStyle}`;
    }
    return customStyle;
  };
}
