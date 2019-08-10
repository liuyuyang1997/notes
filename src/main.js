// --host 192.168.0.103

//导入vue包
import Vue from 'vue'
//导入App组件
import App from './App.vue'

//导入axios
import axios from 'axios'
Vue.prototype.$ajax = axios

//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//导入自己的router.js路由模块
import router from './router.js'

//导入格式化时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function(dataStr, pattren="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattren)
})

//导入mui
import './lib/mui/css/mui.css'
//导入额外图标css
import './lib/mui/css/icons-extra.css'

// //按需导入mint-ui 组件
// import 'mint-ui/lib/style.css'
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//全局导入mint-ui
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入并安装vue-preview
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

var vm = new Vue({
	el: '#app',
	data: {},
	// 在 webpack 中，如果想要通过 vue， 把一个组件放到页面中去展示，vm 实例中的 render 函数可以实现
	render: function (createElements) { 
		return createElements(App)
	},
	router //挂载路由到 VM 实例上   
})


