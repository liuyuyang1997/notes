<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time }}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pageindex : 1, //默认显示第一页评论
            comments: [] //所有的评论数据
        }
    },
    mounted () {
        this.getComments()
    },
    methods: {
        //ajax 获取评论数据
        getComments(){
            this.$ajax
                .get('http://www.liulongbin.top:3005/api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
                //将下次请求的数据与第一次拼接
                .then(response => (this.comments = this.comments.concat(response.data.message)))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        //加载更多评论方法
        getMore(){
            this.pageindex++
            this.getComments()
        }
    },
    props:['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>