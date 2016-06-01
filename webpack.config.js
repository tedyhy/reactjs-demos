var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry: [
		ROOT_PATH
	],
	output: {
		path: BUILD_PATH,
		filename: 'bundle-[hash].js',
	},
	// webpack-dev-server 配置
	devServer: {
		contentBase: ROOT_PATH,
		inline: true,
		progress: true,
	}
};