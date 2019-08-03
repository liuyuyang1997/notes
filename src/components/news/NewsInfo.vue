<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dataFormat() }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区域 -->
    <comment-box :id = this.id></comment-box>
  </div>
</template>

<script>
// 导入 评论子组件
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: []
    };
  },
  mounted () {
    this.$ajax
      .get('http://www.liulongbin.top:3005/api/getnew/' + this.id)
      .then(response => (this.newsinfo = response.data.message[0]))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  },
  components: {
      'comment-box': comment
  }   
};
</script>

<style scoped>
.newsinfo-container {
  padding: 0 4px;
}
.newsinfo-container .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
}
.newsinfo-container .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
}
.newsinfo-container .content img{
      width: 100%;
}
</style>
