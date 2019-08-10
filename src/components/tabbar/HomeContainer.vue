<template>
    <div>
        <!-- 轮播图区域 -->
        <!-- 3.使用轮播图子组件 -->
        <swiper :swiperdata="swiperdata" :isfull="true"></swiper>

        <!-- 菜单六宫格区域 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
//1.导入轮播图子组件
import swiper from '../subcomponents/swiper.vue'
export default {
    data(){
        return {
            swiperdata: []
        }
    },
    mounted () {
    this.$ajax
      .get('/dist/json/banner.json')
      .then(response => (this.swiperdata = response.data.banner))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
    },
    //2.注册轮播图子组件
    components:{
        swiper
    }
}
</script>

<style scoped>
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
.mui-grid-view.mui-grid-9 img{
    width: 60px;
    height: 60px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 13px;
    font-family: 'Micsoft YaHei'
}
</style>
