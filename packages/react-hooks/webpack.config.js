const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  // mode: 'production',
  mode: 'development',

  entry: {
    main: path.join(__dirname, 'src', 'App.jsx')
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.mjs', '.css']
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-react', { runtime: 'automatic' }]]
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true
      })
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'react_hooks',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx'
      },
      shared: []
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      chunks: ['main']
    })
  ]
};
