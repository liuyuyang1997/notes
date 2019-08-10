<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dataFormat }}</span>
            <span>点击{{ photoinfo.click }}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
        </div>
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>  
    </div>
</template>

<script>
// 1.导入评论子组件
import comment from '../subcomponents/comment.vue'
import { constants } from 'crypto';

export default {
    data(){
        return {
            //从路由中获取到的图片id
            id: this.$route.params.id,
            //图片详情
            photoinfo: {},
            //缩略轮播图
            thumbsList: []
        }
    },
    created () {
        this.getPhotoInfo()
        this.getThumbsList()
    },
    methods: {
        getPhotoInfo(){
        this.$ajax
            .get('http://www.liulongbin.top:3005/api/getimageInfo/'+ this.id)
            .then(response => (this.photoinfo = response.data.message[0]))
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        getThumbsList(){
            this.$ajax({
                method: "get",
                url: "http://www.liulongbin.top:3005/api/getthumimages/" + this.id ,
            }).then(response => {
                var data = response.data
                if (data.status == 0) {        
                    data.message.forEach(item => {
                        item.w = 600;   //设置以大图浏览时的宽度
                        item.h = 400;     //设置以大图浏览时的高度
                        item.src = item.src;  //大图
                        item.msrc = item.src;  //小图
                    });            
                    this.thumbsList = data.message
                } else {
                    console.log('error')
                }
            });
        }
    },
    components:{
        'cmt-box': comment
    }      
}
</script>

<style lang="scss">
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .thumbs{
.imgPrev{
.my-gallery{
figure{
display: inline-block;
margin: 10px;
}
img{
width: 100px;
height: 100px;
box-shadow: 0 0 8px #999;
}
}
}
}
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>
