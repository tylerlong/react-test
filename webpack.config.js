const path = require('path');


module.exports = {
  entry: {
    'index': path.resolve(__dirname, './index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ],
  },
};
