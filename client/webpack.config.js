/* eslint-disable consistent-return */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const productionConfig = require('./webpack-config/production.webpack.config.js');
const developmentConfig = require('./webpack-config/development.webpack.config.js');

const PATHS = {
  output: path.resolve(__dirname, 'dist'),
  devServer: path.join(__dirname, 'dist'),
};

const commonConfig = {
  entry: './src/app/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    path: PATHS.output,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: './src/style', to: 'style' }],
    }),
  ],
  devServer: {
    contentBase: PATHS.devServer,
  },
};

module.exports = (env) => {
  if (env === 'production') {
    return { ...commonConfig, ...productionConfig };
  }
  if (env === 'development') {
    return { ...commonConfig, ...developmentConfig };
  }
};
