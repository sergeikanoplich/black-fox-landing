const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  target: 'node',
  externals: nodeExternals(),
  node: {
    __dirname: true,
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      loader: 'css/locals?modules&importLoaders=1&localIdentName=[local]!sass',
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
    },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'window': JSON.stringify(false),
    }),
  ],
};
