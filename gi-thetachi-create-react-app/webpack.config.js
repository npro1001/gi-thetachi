const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './release'),
    filename: 'index.html', // bundle.js
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SERVER': JSON.stringify(process.env.REACT_APP_SERVER),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-react',
              {
                plugins: [
                  ['@babel/plugin-proposal-class-properties', { loose: true }],
                  ['@babel/plugin-proposal-private-methods', { loose: true }],
                  ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
                ],
              },
            ],
            plugins: ['babel-plugin-react-native-web'],
          },
        },
      },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
            {
                loader: 'file-loader',
                options: {
                name: '[name].[ext]',
                outputPath: 'images/',
                publicPath: 'images/',
                },
            },
            ],
        },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    fallback: {
        "fs": false,
        "os": require.resolve('os-browserify/browser'),
        "path": require.resolve('path-browserify')
      },
    extensions: ['.web.js', '.js'],
  },

};
