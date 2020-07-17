<template>
	<view>
		<button type="primary" @tap="waterMark">图片转canvas(加水印)</button>
		<button type="primary" @tap="convertCanvasToImage">生成图片</button>
		<!-- 原图区域 -->
		<view class="canvas-clock" >
			<view class="tips">原图：</view>
			<img :src="original" />
		</view>
		<!-- 画布区域 -->
		<view class="canvas-clock" >
			<view class="tips"v-if="showCanvas">画布：</view>
			<canvas id="myCanvas" width="300" height="170"></canvas>
		</view>
		<!-- 图片区域 -->
		<view class="img-block" v-if="base64">
			<view class="tips">图片：</view>
			<img :src="base64" />
		</view>
		
		<view class="base64Info" v-if="base64!=''">图片base64：(在控制台中查看)</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			original: '../../static/demo.png', //原图
			showCanvas: false, //画布区域是否展示
			base64:'', //生成的有水印的图片 的base64
		};
	},
	methods: {
		//绘制水印
		waterMark() {
			// 创建一个Image对象
			let img = new Image();
			img.src = this.original;
			//uniapp中的canvas标签会被套一层 uni-canvas 所以获取元素时需要 .firstChild
			let canvas = document.getElementById('myCanvas').firstChild;
			let ctx = canvas.getContext('2d');  //创建画布上绘图的环境
			setTimeout(function(){
				// 绘制图片 两个0代表距离画布左上角的距离 300和150代表图片缩放后的宽高
				ctx.drawImage(img, 0, 0,300,150); 
				// 设置水印样式
				ctx.font = '12px microsoft yahei';
				ctx.fillStyle = '#fff';
				ctx.fillText('@水印水印水印', 5, 20); // 绘制水印
			},100)
			this.showCanvas = true;
		},
		//从 canvas 中提取图片
		convertCanvasToImage() {
			let canvas = document.getElementById('myCanvas').firstChild; 
			this.base64 = canvas.toDataURL("image/png"); //把画布转换为base64
			console.log(this.base64);
		}
	}
};
</script>

<style>
	.tips{
		font-size: 14px;
	}
	img{
		width: 300px;
		height:150px;
	}
	.base64Info{
		font-size: 14px;
		width: 100%;
		word-wrap:break-word;
	}
</style>
