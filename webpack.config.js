module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ["babel-loader"]
    },{
      test: /\.(sass|scss|css)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },{
			test: /\.(png|jpe?g|gif)$/i,
			use: ['file-loader'],
		}]
  },
};