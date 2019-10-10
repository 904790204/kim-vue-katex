import katex from 'katex'
import 'katex/dist/contrib/mhchem.min'
import 'katex/dist/katex.css'
import './default.css'
// import '../dist/core/katex.css'
import compatibleConfig from './compatible'
import vuekatex from '../package.json'

class VueKatex {
	constructor(el, binding, vnode, options) {
		if (typeof binding.value == 'undefined') return
		this.el = el
		this.binding = binding
		this.vnode = vnode
		this.options =
			options && options.hasOwnProperty('options') ? options.options : {}
		this.compatible =
			options && options.hasOwnProperty('compatible')
				? options.compatible
				: true
		if (options && options.hasOwnProperty('compatibleConfig')) {
			this.compatibleConfig = {
				...compatibleConfig,
				...options.compatibleConfig
			}
		} else {
			this.compatibleConfig = compatibleConfig
		}
		this.flag = (options && options.flag) || '$$'
		this.left = null
		this.right = null
		this.value = null
		this.leftArr = []
		this.rightArr = []
		//统一配置时
		if (Array.isArray(this.flag)) {
			//传数组时
			this.flag.forEach(el => {
				if (el.hasOwnProperty('left') && el.hasOwnProperty('right')) {
					this.leftArr.push(el.left)
					this.rightArr.push(el.right)
				}
			})
		} else if (typeof this.flag == 'object') {
			//传对象时
			this.left = this.flag.left
			this.right = this.flag.right
		} else if (typeof this.flag == 'string') {
			//传字符串时
			this.left = this.flag
			this.right = this.flag
		}
		this.setContent()
	}
	setContent() {
		//单独配置时
		if (typeof this.binding.value == 'string') {
			//传字符串时
			this.value = this.binding.value
		} else if (typeof this.binding.value == 'object') {
			//传对象时
			this.value = this.binding.value.content
			this.flag = this.binding.value.flag || this.flag
			this.left =
				this.binding.value.left || this.binding.value.flag || this.left
			this.right =
				this.binding.value.right ||
				this.binding.value.flag ||
				this.right
		}
		this.options = Object.assign(
			{
				ignoredTags: [
					'script',
					'noscript',
					'style',
					'textarea',
					'pre',
					'code'
				],
				ignoredClasses: [],
				macros: {},
				displayMode: true
			},
			this.options
		)
		if (this.left == null || this.right == null) {
			for (var i = 0; i < this.leftArr.length; i++) {
				this.left = this.leftArr[i]
				this.right = this.rightArr[i]
				this.decode()
			}
			this.left = null
			this.right = null
		} else {
			this.decode()
		}
		this.vnode.elm.innerHTML = this.value
	}
	cutKeyWord(t) {
		return t.replace(/([\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/])/g, `\\$1`)
	}
	decode() {
		this.value = this.HTMLDecode(this.value)
		var reg = new RegExp(
			`${this.cutKeyWord(this.left)}([\\s\\S]*?)${this.cutKeyWord(
				this.right
			)}+?`
		)
		// var reg = new RegExp(`(?<!\\\\)${this.cutKeyWord(this.left)}([\\s\\S]*?)(?<!\\\\)${this.cutKeyWord(this.right)}+?`)
		// var reg = new RegExp(`${this.cutKeyWord(this.left)}([\\s\\S]*?)${this.cutKeyWord(this.right)}+?`)
		// var reg = /\$\$([\s\S]*?)\$\$+?/
		var arr = this.value.split(reg)
		arr.forEach((item, index) => {
			if (index % 2 == 1) {
				try {
					if (item != '') {
						arr[index] = katex.renderToString(
							this.toCompatible(item),
							this.options
						)
					}
				} catch (err) {
					console.log(err)
				}
			}
		})
		this.value = arr.join('')
	}
	update(el, binding, vnode) {
		this.el = el
		this.binding = binding
		this.vnode = vnode
		this.setContent()
	}
	HTMLDecode(txt) {
		txt = txt.replace(/</g, '&lt;')
		txt = txt.replace(/>/g, '&gt;')
		var temp = document.createElement('div')
		temp.innerHTML = txt
		var output = temp.innerText || temp.textContent
		temp = null
		return output
	}
	toCompatible(txt) {
		if (this.compatible) {
			for (let item in this.compatibleConfig) {
				let items = this.cutKeyWord(item)
				if (items.charAt(items.length - 1) == '}') {
					txt = txt.replace(
						new RegExp(`${items}`, 'g'),
						this.compatibleConfig[item]
					)
				} else {
					txt = txt.replace(
						new RegExp(`${items}(?![a-zA-Z])`, 'g'),
						this.compatibleConfig[item]
					)
				}
			}
		}
		return txt
	}
}
let vue_katex = {
	install: function(Vue, options) {
		Vue.directive('katex', {
			bind(el, binding, vnode) {
				el.vueKatex = new VueKatex(el, binding, vnode, options)
			},
			update(el, binding, vnode) {
				if (typeof binding.value == 'object') {
					if (binding.value.content == binding.oldValue.content) {
						return
					}
				} else {
					if (binding.value == binding.oldValue) {
						return
					}
				}
				el.vueKatex.update(el, binding, vnode)
			}
		})
	},
	version: `vue-katex:${vuekatex.version},katex:${katex.version}`
}
export default vue_katex

let _global = (function() {
	return this || (0, eval)('this')
})()
!('KimJSZip' in _global) && (_global.vueKatex = vue_katex)
