<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" 
        @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        // 刚一进入页面组件无法使用 初始化数组选择框组件
        mui('.mui-numbox').numbox()
    },
    methods: {
        //每当文本框数据被修改的时候 立即把最新的数据 通过事件调用 传递给父组件
        countChanged(){
            //数量改变了
            console.log(this.$refs.numbox.value)
            this.$store.commit("updateGoodsInfo",{
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    },
    props: ['initcount','goodsid']
}
</script>

<style lang="scss" scoped>

</style>
