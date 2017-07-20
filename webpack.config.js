const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'babel-runtime/core-js.js',
      'babel-polyfill'
    ],
    app: './src/index.jsx',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    inline: true,
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&importLoaders=1&localIdentName=[local]!postcss!sass'
      ),
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]',
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=fonts/[name].[ext]',
    },
    {
      test: /\.(jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=img/[name].[ext]',
    },
    {
      test: /\.(png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?mimetype=image/png&name=img/[name].[ext]',
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  postcss: () => ([
    // eslint-disable-next-line
    require('autoprefixer'),
  ]),
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new HtmlPlugin({
      template: 'public/index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('style.css'),
    new ManifestPlugin(),
  ],
};
