'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  // mode: 'production',
  mode: 'development',

  entry: {
    main: './src/App.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'App.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'angularjs',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.js'
      },
      shared: []
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['main']
    })
  ]
};
