var webpack = require('webpack');
var config = require('./webpack.dev.js');
var ora = require('ora');
var spinner = ora("building ...");

// enabled watch mode //
config.watch = true;

// enabled cache mode //
config.cache = true;

spinner.start();

var compiler = webpack(config, function (err, stats) {
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