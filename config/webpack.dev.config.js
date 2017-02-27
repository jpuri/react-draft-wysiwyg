const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './js/playground/index',
  ],
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /draftjs-to-markdown\.js$|immutable\.js$|draftjs-utils\.js$|draftjs-to-html\.js$|lodash\.js$/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader"
        }),
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
    new HtmlWebpackPlugin({
      template: './js/playground/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer, precss],
      }
    })
  ],
  resolve: {
    // alias: {
    //   'draftjs-to-html': path.join(__dirname, '../../draftjs-to-html', 'js'),
    //   'draftjs-to-markdown': path.join(__dirname, '../../draftjs-to-markdown', 'js'),
    // },
    extensions: ['.js', '.json'],
  },
};
