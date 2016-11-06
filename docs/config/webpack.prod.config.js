const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, '../static'),
    filename: 'bundle.js',
    publicPath: '',
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
    new ExtractTextPlugin('main.css', {
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './template/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /immutable\.js$|draftjs-utils\.js$|draftjs-to-html\.js$|lodash\.js$|react-draft-wysiwyg\.js$/ },
      {
        test: /\.css$/,
        exclude: /Draft\.css$|font-awesome\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader'
        ),
      },
      {
        test: /Draft\.css$/,
        loader: 'style-loader!css-loader',
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]',
      },
    ],
  },
  postcss: () => [autoprefixer, precss],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};
