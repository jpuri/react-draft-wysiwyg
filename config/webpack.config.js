const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'rich-text-editor.js',
    library: 'richText',
    libraryTarget: 'commonjs-module',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    // react: 'react',
    // immutable: 'immutable',
    // 'react-dom': 'react-dom',
    // 'draft-js': 'draft-js',
    //'@innovaccer/design-system': 'InnovaccerDesignSystem'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'rich-text-editor.css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer, precss],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /immutable\.js$|draftjs-utils\.js$/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      { test: /\.(png|jpg)$/, use: [{ loader: 'url-loader?limit=8192' }] },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};
