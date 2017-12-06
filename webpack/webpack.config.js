module.exports = {
  entry: '../index.js',
  output: {
    filename: '../src/bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}
