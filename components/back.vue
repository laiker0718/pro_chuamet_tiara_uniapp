<template>
    <image class="btn-back" :src="backSrc" mode="widthFix" @click="onBtnBack"
        :style="{'top': btnTop + 'px', 'left': btnLeft + 'px'}">
    </image>
</template>

<script>
    import {
        url_common_btn_back
    } from '@/common/globaldata.js'
    export default {
        name: 'com-back',
        data() {
            return {
                backSrc: url_common_btn_back,

                btnTop: 20,
                btnLeft: 5,
                btnHeight: 30,
            }
        },
        mounted() {
            // #ifdef MP-WEIXIN
            this.btnTop = getApp().globalData.boundingMenu.top + 10
            this.btnLeft = getApp().globalData.wWidth - getApp().globalData.boundingMenu.right
            this.btnHeight = getApp().globalData.boundingMenu.height
            // #endif
        },
        methods: {
            onBtnBack() {
                console.log('back comp onBtnBack')
                this.$emit("onBtnBack")
            }
        },
    }
</script>

<style>
    .btn-back {
        position: absolute;
        width: 10%;
    }
</style>
