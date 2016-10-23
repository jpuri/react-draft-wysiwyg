const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  devtool: 'source-map',
  entry: [
    './js/src/index',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'react-draft-wysiwyg.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'draft-js': 'draft-js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('react-draft-wysiwyg.css', {
      allChunks: true,
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /immutable\.js$/ },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader'
        ),
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  postcss: () => [autoprefixer, precss],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
