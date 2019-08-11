<template>
    <div class="goodsinfo_container">
        <!-- 商品轮播区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- :swiperdata="swiperdata"为父元素向子元素传值 -->
                    <swiper :swiperdata="swiperdata" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p class="quantities">
                        <transition 
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @after-enter="afterEnter">
                            <span class="ball" v-show="ballFlag" ref="ball"></span>
                        </transition>   
                        购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }} 件</p>
                    <p>上架时间：{{ goodsinfo.add_time }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// 1.导入轮播图子组件
import swiper from '../subcomponents/swiper.vue'
//导入数字选择框子组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return {
            //将路由参数中的id挂载到data中 方便以后调用
            id: this.$route.params.id,
            //轮播图数据
            swiperdata: [],
            //商品详细信息
            goodsinfo: {},
            ballFlag: false, //控制小球隐藏显示的标识
            selectedCount: 1 //保存用户选中的商品数量 默认数量为1
        }
    },
    created(){
        this.getSwiper()
        this.getGoodsInfo()
    },
    methods: {
        getSwiper(){
            this.$ajax({
                method: "get",
                url: "http://www.liulongbin.top:3005/api/getthumimages/" + this.id ,
            }).then(response => {
                var data = response.data
                if (data.status == 0) {        
                    data.message.forEach(item => {
                        // 由于swiper子组件中使用的是 img.url 故将我们获取到的img.src复制给img.url
                        item.url = item.src
                    });            
                    this.swiperdata = data.message
                } else {
                    console.log('error')
                }
            });
        },
        //获取商品信息
        getGoodsInfo(){
            this.$ajax({
                method: "get",
                url: "http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id ,
            }).then(response => {
                var data = response.data
                if (data.status == 0) {
                    this.goodsinfo = data.message[0]
                } else {
                    console.log('error')
                }
            });
        },
        //点击使用编程式导航进入 图文介绍页面
        goDesc(id){
            this.$router.push({name: 'goodsdesc', params: {id}})
        },
        //点击使用编程式导航进入 评论页面
        goComment(id){
            this.$router.push({name: 'goodscomment', params: {id}})
        },
        //添加到购物车
        addToShopCar(){
            this.ballFlag = !this.ballFlag
            //返回对象的样式 {id: 商品id, count: 购买的数量, price: 商品的单价, selected: true 打开 false关闭}
            //拼接出一个要 保存到 store 中 catr数组里的 商品信息对象
            var goodsinfo = {
                id: this.id, 
                count: this.selectedCount, 
                price: this.goodsinfo.sell_price, 
                selected: true
            }
            //调用 store 中的 mutations 将商品加入购物车
            this.$store.commit('addToCart', goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            //el.offsetWidth 写上这句话才有动画效果
            el.offsetWidth
            // domObject.getBoundingClientRect()  
            //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
            //获取小球在页面中的位置
            var ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            var badgePosition = document.getElementById('badge').getBoundingClientRect(); 
            var Xdist = badgePosition.left - ballPosition.left
            var Ydist = badgePosition.top - ballPosition.top

            //以下两行代码为拼接字符串方式 上：传统方式 下：es的模板字符串 显然下更简单方便
            // el.style.transform = "translate("+ Xdist +"px,"+ Ydist + "px)"
            el.style.transform = `translate(${Xdist}px,${Ydist}px)`
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.29,1,.69)"
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        getSelectedCount(count){
            //当子组件把 选中的数量传递给父组件的时候， 把选中的值保存到 data上
            this.selectedCount = count
            console.log('父组件拿到的数量值为'+this.selectedCount)
        }
    },
    // 2.注册轮播图子组件
    components: {
        swiper,
        numbox
    }
}
</script>


<style lang="scss" scoped>
.goodsinfo_container{
    background-color: #eee;
    overflow: hidden;
    .mui-card{
        overflow: visible;
    }
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
    display: block;
        button{
            margin: 15px 0;
        }
    }
    .quantities{
        position: relative;
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            top: 9px;
            left: 122px;
            z-index: 100;
        }
    }
    
}

</style>
