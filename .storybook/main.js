const path = require('path');

module.exports = {
  stories: ['../stories/**/*.story.@(js)'],
  addons: [{
    name: '@storybook/addon-essentials',
    options: {
      controls: false,
    }
  }],

  webpackFinal: async (config, { configType }) => {
    const customRules = [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        include: path.resolve(__dirname, '../'),
      },
    ];

    // Return the altered config
    const newRules = [...config.module.rules, ...customRules];
    return { ...config, module: { ...config.module, rules: newRules } }
  },
};
