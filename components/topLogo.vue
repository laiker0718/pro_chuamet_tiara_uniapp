<template>
    <view :style="{'width': '100%','margin-top': top + 'px'}">
        <image class="top-logo" :src="logoUrl" mode="widthFix"></image>
    </view>
</template>

<script>
    import {
        url_logo_white
    } from '@/common/globaldata.js'
    
    export default {
        name: 'com-top-logo',
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                
                top: 30,
                
                logoUrl: url_logo_white,
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            if(this.height / this.width > 2) {
                this.top = 110
            } else {
                this.top = 30
            }
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {}
    }
</script>

<style>
    .top-logo {
        width: 40%;
        margin-left: 30%;
        object-fit: contain;
    }
</style>
