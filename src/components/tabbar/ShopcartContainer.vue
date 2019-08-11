<template>
    <div class="shopcart-container">
        <div class="goods-list">
            <!-- 商品列表区域 -->
           <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
						v-model="$store.getters.getGoodsSelected[item.id]"
						@change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
						<img :src="item.thumb_path" alt="">
						<div class="info">
							<h1>{{ item.title }}</h1>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initcount="$store.getters.getGoodsCount[item.id]" 
								:goodsid="item.id"></numbox> 
								<a href="#" @click.prevent="remove(item.id)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>

            <!-- 结算区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计（不含运费）</p>
							<p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
        </div>

		<p>{{ $store.getters.getGoodsSelected }}</p>
    </div>
</template>

<script>
import numbox from '../subcomponents/shopcart_numbox.vue'
export default {
	data(){
		return {
			goodsList: []
		}
	},
	created(){
		this.getGoodsList()
	},
	methods: {
		getGoodsList(){
			//1.获取到 store 中所有商品的id 拼接出用 逗号 分隔的字符串
			var idArr = []
			this.$store.state.cart.forEach(item => {
				idArr.push(item.id)
			});
			//如果购物车中没有商品则 直接返回 不进行ajax请求
			if(idArr.length<=0){
				return;
			}
			this.$ajax({
				method: "get",
				url: "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" + idArr.join(",") ,
			}).then(response => {
				var data = response.data
				if (data.status == 0) {
					this.goodsList = data.message
				} else {
					console.log('error')
				}
			});
		},
		remove(id, index){
			//点击删除 把商品从 store 中 根据id删除		同时 将goodslist中的dom元素 通过 index删除
			this.goodsList.splice(index,1)
			this.$store.commit("removeFromCart",id)
		},
		selectedChanged(id,value){
			//每当点击开关 把最新的开关状态 同步到 store 中
			this.$store.commit('updateGoodsSelected',{id: id, selected:value})
		}
	},
    components: {
		numbox
	}
}
</script>

<style lang="scss" scoped>
.shopcart-container{
	background-color: #eee;
	overflow: hidden;
	.goods-list{
		.mui-card-content-inner{
			display: flex;
			align-items: center;
		}
		img{
			width: 60px;
			height: 60px;
		}
		h1{
			font-size: 13px;
		}
		.info{
			.price{
				color: red;
			}
		}
		.jiesuan {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red {
			color: red;
			font-weight: bold;
			font-size: 16px;
			}
		}
	}
}
</style>
