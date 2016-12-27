var webpack = require('webpack');
var config = require('./webpack.base');

// TODO Load minified libraries js files instead of minify all sources //
config.plugins = config.plugins.concat([
	new webpack.optimize.UglifyJsPlugin({
		comments: false,
		compress: {
			warnings: false
		}
	})
]);

module.exports = config;