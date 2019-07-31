//导入vue包 hahaha
import Vue from 'vue'
//导入App组件
import App from './App.vue'

//导入mui
import './lib/mui/css/mui.css'
//按需导入mint-ui header组件
import 'mint-ui/lib/style.css'
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

var vm = new Vue({
	el: '#app',
	data: {},
	// 在 webpack 中，如果想要通过 vue， 把一个组件放到页面中去展示，vm 实例中的 render 函数可以实现
	render: function (createElements) { 
		return createElements(App)
  } 
})