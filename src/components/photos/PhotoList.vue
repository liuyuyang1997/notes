<template>
    <div>
        <!-- 顶部导航栏 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片懒加载 -->
        <ul class="photolist">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
//1.导入mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data(){
        return {
            cates: [{
                title: '全部',
                id: 0
            }], //顶部导航中的所有分类
            list: [] //图片列表数据        
        }
    },
    created(){
        this.getAllCategory()
        //默认进入页面，就主动请求 所有图片列表数据
        this.getPhotoListByCateId(0)
    },
    //初始化控件一类的代码最好放在mounted中 因为此时所有的dom元素刚刚挂载到页面中
    mounted(){
        //2.初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        //获取所有的图片分类
        getAllCategory(){
            this.$ajax
                .get('http://www.liulongbin.top:3005/api/getimgcategory/')
                .then(response => (this.cates = this.cates.concat(response.data.message)))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                })
        },
        //根据分类id 获取图片列表
        getPhotoListByCateId(cateId){
            this.$ajax
                .get('http://www.liulongbin.top:3005/api/getimages/' + cateId)
                .then(response => (this.list = response.data.message))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                })
        }
    }
}
</script>

<style lang="scss" scoped>
* { touch-action: pan-y; }

.photolist{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px; 
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: #fff;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba($color: #000000, $alpha: 0.4);
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}
</style>
