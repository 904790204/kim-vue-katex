const fs = require('fs')
const path = require('path')
function MergeCommonCss() {}
MergeCommonCss.prototype.apply = compiler => {
	compiler.plugin('done', (compilation, callback) => {
		let customCss = fs.readFileSync(
			path.resolve('./', 'src', 'default.css'),
			'utf8'
		)
		let copyCss = fs.readFileSync(
			path.resolve('./', 'dist', 'core', 'katex.css'),
			'utf8'
		)
		let content = copyCss + customCss
		fs.writeFileSync(
			path.resolve('./', 'dist', 'core', 'katex.css'),
			content,
			'utf8'
		)
		content = content.replace(/\s/g, '')
		fs.writeFileSync(
			path.resolve('./', 'dist', 'core', 'katex.min.css'),
			content,
			'utf8'
		)
	})
}
module.exports = MergeCommonCss
