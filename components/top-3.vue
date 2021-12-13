<template>
    <view :style="{'width': '100%','margin-top': top + 'px'}">
        <view class="main-title">{{mTitle}}</view>
        <view class="sub-title">{{sTitle}}</view>
    </view>
</template>

<script>
    export default {
        name: 'com-top3',
        props: ['mainTitle', 'subTitle'],
        watch: {
            mainTitle(val) {
                console.log('main title: ', val)
                this.mTitle = val
            },
            subTitle(val) {
                console.log('sub title: ', val)
                this.sTitle = val
            },
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                
                top: 40,
                mTitle: '',
                sTitle: '',
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
            this.sTitle = this.subTitle
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
        font-size: 18px;
        line-height: 30px;
        margin-left: auto;
        margin-right: auto;
    }

    .sub-title {
        width: max-content;
        font-size: 18px;
        line-height: 20px;
        margin-top: 6px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
