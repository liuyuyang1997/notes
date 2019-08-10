<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in swiperdata" :key="item.url">
                <img :src="item.url" alt="" :class="{full: isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ['swiperdata','isfull']
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
}
.mint-swipe .mint-swipe-item{
    text-align: center;
}
.mint-swipe .mint-swipe-item img{
    height: 100%;
}

.full{
    width: 100%;
}
</style>
