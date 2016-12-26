var path = require('path');
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');

var __currentPath = path.resolve(__dirname);

module.exports = {
	entry: {
		app: __currentPath + '/src/app.js',
		vendors: ['lodash', 'angular', 'angular-ui-router', 'angular-ui-bootstrap', 'jquery', 'moment']
	},
	output: {
		path: __dirname + '/dist',
		filename: "js/app.js"
	},
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
				// Will copy stringified html sources for each module in app.js //
				loader: "html-loader" 
				// Will copy html files sources into their own directory html file with extract loader //
				//loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader'
			},
			{
				test: /\.css$/,
				loader: extractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.less$/,
				loader: extractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
			{ 
				test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: 'file-loader?name=/fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		new cleanWebpackPlugin(['dist'], { root: __currentPath, verbose: true, dry: false }),
		new copyWebpackPlugin([ { from: __currentPath + '/src/index.html' } ]),
		new webpack.optimize.CommonsChunkPlugin('vendors',  './js/vendors.js', Infinity),
		new extractTextPlugin('./css/styles.css')
	]
};