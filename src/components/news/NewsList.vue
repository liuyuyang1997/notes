<template>
    <div>
        <!-- 新闻列表 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in info" :key="item.id">
                <router-link :to="'/home/newslist/newsinfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dataFormat()}}</span>
                            <span>点击：{{ item.click }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            info: []
        }
    },
    mounted () {
    this.$ajax
      .get('/dist/json/newslist.json')
      .then(response => (this.info = response.data.message))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
    }   
}
</script>

<style scoped>
.mui-table-view h1{
    font-size: 14px;
}
.mui-table-view .mui-ellipsis{
    color:#226aff;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
</style>
