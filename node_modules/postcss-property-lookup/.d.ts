/// <reference path="node_modules/postcss/postcss.d.ts" />

declare module 'postcss-property-lookup' {
  import postcss from 'postcss';
  var _default: postcss.Plugin<PostCssPropertyLookup.Options>;
  export default _default;
  export module PostCssPropertyLookup {
    interface Options {
      /**
       * When a lookup cannot be resolved, this specifies whether to throw an
       * error or log a warning. In the case of a warning, the invalid lookup
       * value will be replaced with an empty string.
       */
       logLevel?: string;
    }
  }
}
