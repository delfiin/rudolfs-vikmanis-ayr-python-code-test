const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './static/js/index.js'),
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './static/output'),
    filename: 'bundle.js',
  },
};