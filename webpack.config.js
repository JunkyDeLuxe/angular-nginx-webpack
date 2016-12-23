var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js',
		vendor: [
			"angular", 
			"angular-ui-router", 
			"babel-polyfill",
			"jquery",
			"moment"
		]
	},
	output: {
		path: './dist',
		filename: 'js/app.js'
	},
	plugins: [
		new copyWebpackPlugin([
			{ from: './src/index.html' }
		]),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"js/vendor.js")
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// {
			// 	test: /\.(woff|woff2|ttf|eot)$/,
			// 	loader: 'file'
			// },
			{
			 	test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader?name=/img/[name].[ext]'
			},
			{
				test: /\.html$/,
				loader: "html-loader"
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			}
		]
	}
};