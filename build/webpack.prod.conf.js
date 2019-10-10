const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AutoPackageVersion = require('auto-package-version')
const MergeCommonCss = require('./plugins/merge-common-css')
const path = require('path')
let prodWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(['../dist']),
		new UglifyJsPlugin(),
		new AutoPackageVersion({
			path: path.resolve(__dirname, '..', 'package.json')
		}),
		new MergeCommonCss()
	]
})

module.exports = prodWebpackConfig
