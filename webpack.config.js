'use strict';

const { includes } = require('lodash');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = !includes(process.argv, '-p');
const shouldWatch = includes(process.argv, '-w');

module.exports = {
  mode: isDev ? 'development' : 'production',
  watch: shouldWatch,
  devtool: 'inline-source-map',
  entry: {
    background: './app/scripts/background.ts',
    contentscript: './app/scripts/contentscript.ts',
    devtools: './app/scripts/devtools.ts',
    crisp: './app/scripts/crisp.tsx'
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist/')
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          // don't add contenthash to names for production
          // as it is a browser extension
          name: '[name].[ext]',
          outputPath: 'images',
          publicPath: '../images'
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'app/manifest.json', to: 'manifest.json'},
        { from: 'app/images', to: 'images' },
        { from: 'app/libs', to: 'libs' }, // TODO import all libs' stylesheets and scripts from node_modules
        { from: 'app/pages', to: 'pages' }
      ],
    }),
    new MiniCssExtractPlugin({ filename: 'styles/[name].css' }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_fnames: true,
          mangle: false
        }
      }),
    ],
  },
};