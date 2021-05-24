'use strict';

const { merge, includes } = require('lodash');
const BrowserExtensionPlugin = require('extension-build-webpack-plugin');
const baseConfig = require('./webpack.config');

const isDev = !includes(process.argv, '-p');

const newConfig = merge({}, baseConfig, {
  plugins: [
    new BrowserExtensionPlugin({devMode: isDev, name: 'crisp.zip', directory: 'app', updateType: 'minor'})
  ]
})

module.exports = {
  ...newConfig,
};
