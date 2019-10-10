const path = require('path')
const fs = require('fs')
var exec = require('child_process').execSync
function AutoPackageVersion(options) {
	this.path = options.path || ''
}
AutoPackageVersion.prototype.apply = function(compiler) {
	compiler.plugin('done', (compilation, callback) => {
		let target = this.path || path.resolve('./', 'package.json')
		let content = JSON.parse(fs.readFileSync(target, 'utf8'))
		let version = exec(`npm view ${content.name} version`) + ''
		let num = version.split('.')
		num[num.length - 1] = Number(num[num.length - 1]) + 1
		version = num.join('.')
		content.version = version
		fs.writeFileSync(target, JSON.stringify(content, null, 4), 'utf8')
	})
}
module.exports = AutoPackageVersion
