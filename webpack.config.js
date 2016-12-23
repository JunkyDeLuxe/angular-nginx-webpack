var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js',
		'angular-vendors': [
			"babel-polyfill",
			"angular",
			"angular-ui-router",
			"angular-ui-bootstrap"
		],
		libs: [
			"jquery",
			"moment",
			"bootstrap-less/bootstrap/bootstrap.less"
		]
	},
	output: {
		path: "./dist",
		filename: "js/[name].js"
	},
	plugins: [
		new copyWebpackPlugin([ { from: './src/index.html' } ]),

		// CHUNKS //
		new webpack.optimize.CommonsChunkPlugin("./js/init.js")
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
			 	test: /\.(jpe?g|png|gif)$/i,
				exclude: '/node_modules',
				loader: 'file-loader?name=/img/[name].[ext]',
			},
			{
				test: /\.html$/,
				exclude: '/node_modules',
				loader: "html-loader",
			},
			{
				test: /\.less$/,
				exclude: '/node_modules',
				loader: "style!css!less"
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)$/,
				loader: 'file-loader?name=/fonts/[name].[ext]'
			},
			// {
			// 	test: /\.css$/,
			// 	loaders: ['style', 'css']
			// }
		],
	}
};