import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import vueKatex from './index'
Vue.config.productionTip = false
console.log(vueKatex.version)
Vue.use(vueKatex, {
	flag: [
		{ left: '$$', right: '$$' },
		{ left: '$', right: '$' },
		{ left: '<left>', right: '<right>' }
	],
	options: {
		displayMode: true,
		throwOnError: true,
		errorColor: '#FF0000'
	}
	// compatible:true,
	// compatibleConfig:compatibleConfig
})
new Vue({
	el: '#app',
	components: { App },
	template: '<App/>'
})
