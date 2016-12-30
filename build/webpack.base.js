var path = require('path');
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var eslintFormatter = require('eslint-friendly-formatter');

var node_modules_dir = path.join(__dirname, '../node_modules');
var __currentPath = path.resolve(__dirname);

// var deps = [
// 	'angular/angular.min.js',
// 	'angular-ui-router/release/angular-ui-router.min.js'
// ];

var config = {
	entry: {
		app: __currentPath + '/../src/app.js',
		vendors: ['lodash', 'angular', 'angular-ui-router', 'angular-ui-bootstrap', 'angular-cookies', 'angular-translate', 'angular-translate-loader-static-files', 'angular-translate-storage-local', 'angular-dynamic-locale', 'jquery', 'moment']
	},
	output: {
		path: __dirname + '/../dist',
		filename: "js/app.js"
	},
	resolve: {
		alias: {}
	},
	module: {
		noParse: [], // Don’t parse files matching a RegExp or an array of RegExps.
		loaders: [
			// {
			// 	test: path.resolve(node_modules_dir, deps[0]),
			// 	loader: "expose?angular"
			// },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader!ng-annotate!babel-loader?presets[]=es2015&cacheDirectory'
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
			},
			{
				test: /\.json$/,
				loader: 'file-loader?name=/locales/[name].[ext]'
			}
		]
	},
	eslint: {
		configFile: __currentPath + '/../.eslintrc',
		formatter: eslintFormatter
	},
	plugins: [
		new cleanWebpackPlugin(['dist'], { root: __currentPath, verbose: true, dry: false }),
		new copyWebpackPlugin([ 
			{ from: __currentPath + '/../src/index.html' },
			{ from: node_modules_dir + '/angular-i18n/angular-locale_fr-fr.js', to: __dirname + '/../dist/js/' }
		]),
		new webpack.optimize.CommonsChunkPlugin('vendors',  './js/vendors.js', Infinity),
		new extractTextPlugin('./css/styles.css')
	]
};

// load minified version of vendors instead of all sources code //
// deps.forEach(function (dep) {
// 	var depPath = path.resolve(node_modules_dir, dep);

// 	config.resolve.alias[dep.split(path.sep)[0]] = depPath;
// 	config.module.noParse.push(depPath);
// });

module.exports = config;