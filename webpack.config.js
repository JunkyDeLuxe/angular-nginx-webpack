var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js',
		vendors: [ 
			'lodash',
			'angular', 
			'angular-ui-router',
			'angular-ui-bootstrap',
			'jquery',
			'moment',
			'bootstrap-less/bootstrap/bootstrap.less'
		]
	},
	output: {
		path: __dirname + '/dist',
		filename: "js/app.js"
	},
	plugins: [
		new copyWebpackPlugin([ { from: './src/index.html' } ]),
		new webpack.optimize.CommonsChunkPlugin("vendors", "./js/vendors.js", Infinity)
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