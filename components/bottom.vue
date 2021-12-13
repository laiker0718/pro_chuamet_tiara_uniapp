<template>
    <view :style="{'width': '100%'}">
        <view class="gap-bottom" :style="{'height': width * barBottomRatio + 'px'}"></view>
        
        <image class="bar-bottom" :src="barBottom" mode="widthFix"></image>
    </view>
</template>

<script>
    // 风格选择
    import {
        url_common_bar_bottom
    } from '@/common/globaldata.js'
    
    import {
        g_bar_bottom_ratio,
    } from '@/common/const.js'
    
    export default {
        name: 'com-bottom',
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                
                barBottom: url_common_bar_bottom,
                barBottomRatio: g_bar_bottom_ratio,
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {}
    }
</script>

<style>
    .bar-bottom {
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
    }
</style>
