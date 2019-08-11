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

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var cart = JSON.parse(localStorage.getItem('cart') || '[]')

var store = new Vuex.Store({
	state: { //调用方法 this.$store.state.*** 
		cart: cart //将购物车中商品的数据用数组存储起来 {id: 商品id, count: 购买的数量, price: 商品的单价, selected: true 打开 false关闭}
	},
	mutations: { //调用方法 this.$store.commit('方法名称','可选唯一参数')
		addToCart(state,goodsinfo){
			//点击加入购物车，把商品信息，保存到 store 中的 cart 上
			//分析
			//1.如果购物车中，之前就有对应商品，那么 更新商品数量
			//2.没有 直接把 商品数据 push到 cart 中 即可
			//假设在购物车中 没有找到 与 新加入的数据 相同的数据 
			var flag = false
			//some 找到就停止 不用 完全遍历
			state.cart.some(item=>{
				if(item.id == goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}
			})

			//如果循环完毕 并没有 在购物车中找到与新数据相同的数据 就在现有购物车数据中 push新数据 
			if(!flag){
				state.cart.push(goodsinfo)
			}

			//当更新购物车之后 把cart数组 进行本地存储
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		updateGoodsInfo(state, goodsinfo){
			//在购物车页面修改商品数量
			state.cart.some(item=>{
				if(item.id == goodsinfo.id){
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})
			//当修改完商品的数量后 把最新的数量 保存在 本地数据中
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		removeFromCart(state, id){
			//根据id 从store 中的购物车中 删除对应数据
			state.cart.some((item,i)=>{
				if(item.id == id){
					state.cart.splice(i,1)
					return true
				}
			})
			//将删除完毕的 最新的购物车数据 保存到 本地存储中
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		updateGoodsSelected(state,info){
			state.cart.some(item=>{
				if(item.id == info.id){
					item.selected = info.selected
				}
			})
			//把最新的 开关 开闭 状态 写入本地存储
			localStorage.setItem('cart', JSON.stringify(state.cart))
		}
	},
	getters: { //调用方法 this.$store.state.getters.***
		//相当于 计算属性 也相当于 filters
		getAllCount(state){
			var c = 0;
			state.cart.forEach(item=>{
				c += item.count
			})
			return c
		},
		getGoodsCount(state){
			var o = {}
			state.cart.forEach(item=>{
				o[item.id] = item.count;
			})
			return o
		},
		getGoodsSelected(state){
			var o = {}
			state.cart.forEach(item=>{
				o[item.id] = item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state){
			var o = {
				count: 0, //勾选的数量
				amount: 0 //勾选商品的总价
			}
			state.cart.forEach(item=>{
				if(item.selected){
					o.count += item.count 
					o.amount += item.price * item.count
				}
			})
			return o
		}
	}
})

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
	router, //挂载路由到 VM 实例上   
	store  //挂载store 状态管理对象
})


