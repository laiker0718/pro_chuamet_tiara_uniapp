<template>
    <view :style="{'width': '100%', 'margin-top': top + 'px'}">
        <view class="main-title">{{mTitle}}</view>
    </view>
</template>

<script>
    export default {
        name: 'com-top-book',
        props: ['mainTitle'],
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                
                top: 40,
                mTitle: '',
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            if(this.height / this.width > 2) {
                this.top = 120
            } else {
                this.top = 40
            }
            
            this.mTitle = this.mainTitle
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {}
    }
</script>

<style>
    .main-title {
        width: max-content;
        font-size: 26px;
        line-height: 26px;
        border-bottom: 1px solid #FFFFFF;
        margin-left: auto;
        margin-right: auto;
    }
</style>
