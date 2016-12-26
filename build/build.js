var webpack = require('webpack');
var conf = require('./webpack.prod.js');
var ora = require('ora');
var spinner = ora("building ...");

spinner.start();

webpack(conf, function (err, stats) {
	if (err) throw err;

	spinner.stop();

	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n' );
});