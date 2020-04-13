const path = require('path');

module.exports = {
  entry: {     
		main: [
			'./src/App.js',
			'./src/App.scss'
	]},
  output: {
    path: path.resolve(__dirname, 'assets', 'bundle'),
		publicPath: '/',
    filename: '[name].bundle.js'
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
			exclude: [/\.js$/, /\.html$/, /\.json$/, /\.ejs$/],
			test: /\.(png|jpe?g|gif)$/i,
			use: ['file-loader'],
		}]
  },
};