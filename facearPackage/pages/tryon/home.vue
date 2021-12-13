<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container" :style="{'background-image': 'url(' + bgSrc + ')', 
                     'background-repeat': 'no-repeat', 
                     'background-size': 'cover',
                     'background-position': 'bottom center'}">

            <Top class="top" mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="1"></Top>

            <image class="tiara-img" :src="tiaraSrc" mode="widthFix"></image>

            <view class="btn-start"
                :style="{'width': width * 0.5 + 'px', 'height': width * 0.5 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}"
                @click="onBtnStart">
                开始体验
            </view>

            <Bottom></Bottom>

            <Back @onBtnBack="onBtnBack"></Back>

            <template v-if="isShowPolicy">
                <uni-transition mode-class="fade" :duration="500" :show="true"
                    :styles="{'width': '100%', 'height': '100%'}">
                    <view class="privacy-content"
                        :style="{'width': width * 0.7 + 'px', 'height': width * 0.7 * privacyBgRatio + 'px', 'background-image': 'url(' + privacyBgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                        <view class="privacy">
                            为向您提供冠冕试戴体验服务，我们需要收集您的人像照片。我们会采取严格保护措施确保您的个人信息安全。您不提供该等信息的，我们可能无法向您提供冠冕试戴体验功能。在展览结束后，我们将不留存您的图像信息，请自行下载保存。在您点击同意前，请确认您已年满14周岁并已获得法定监护人的同意。
                        </view>
                        <view class="privacy-ops">
                            <image class="btn-agree" :src="btnAgreeSrc" mode="widthFix" @click="onBtnAgree"></image>
                            <image class="btn-reject" :src="btnBackSrc" mode="widthFix" @click="onBtnReject"></image>
                        </view>
                    </view>
                </uni-transition>
            </template>
        </view>
    </uni-transition>
</template>

<script>
    // 游戏介绍
    import Top from '@/components/top.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'

    import {
        url_common_btn_background,

        url_try_bg,
        url_try_tiara,
        url_try_privacy_selected,
        url_try_privacy_unselected,
        
        url_home_fashion_facear_pop_bg,
        url_home_fashion_facear_btn_agree,
        url_home_fashion_facear_btn_back,
    } from '@/common/globaldata.js'

    import {
        g_btn_background_ratio,
        g_facear_pop_bg_ratio,
    } from '@/common/const.js'

    export default {
        name: 'facear-home',
        components: {
            Top,
            Bottom,
            Back,
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,

                btnBg: url_common_btn_background,
                btnBgRatio: g_btn_background_ratio,

                bgSrc: url_try_bg,
                tiaraSrc: url_try_tiara,
                
                btnAgreeSrc: url_home_fashion_facear_btn_agree,
                btnBackSrc: url_home_fashion_facear_btn_back,
                
                privacyBgSrc: url_home_fashion_facear_pop_bg,
                privacyBgRatio: g_facear_pop_bg_ratio,
                
                isShowPolicy: false, // 是否显示隐私条款
            }
        },
        onInit() {},
        onLoad() {},
        onUnload() {},
        onReady() {},
        onShow() {},
        onHide() {},
        onResize() {},
        onPullDownRefresh() {},
        onReachBottom() {},
        onTabItemTap() {},
        onShareAppMessage() {},
        onShareTimeline() {},
        onAddToFavorites() {},
        methods: {
            onBtnAgree() {
                console.log('onBtnAgree')
                uni.redirectTo({
                    url: './tryonNew'
                })
            },
            onBtnReject() {
                if (!this.isShowPolicy) return
                this.isShowPolicy = false
            },
            onBtnStart() {
                console.log('onBtnStart')

                if (this.isShowPolicy) return

                this.isShowPolicy = true
            },
            onBtnBack() {
                uni.redirectTo({
                    url: '../../../pages/chapter/chapter?index=3'
                })
            },
        }
    }
</script>

<style>
    .container {
        display: block;
        width: 100%;
        height: 100%;
    }

    .top {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .tiara-img {
        position: absolute;
        width: 72%;
        margin-left: 14%;
        bottom: 410px;
    }

    .privacy-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .privacy,
    .privacy-ops {
        width: 70%;
        margin-left: 15%;
    }

    .privacy {
        font-size: 14px;
        line-height: 22px;

        text-align: justify;
        text-align-last: left;

        white-space: normal;
        word-break: break-word;
        word-wrap: break-word;
    }

    .privacy-ops {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .btn-agree,
    .btn-reject {
        width: 50%;
    }

    .btn-start {
        position: absolute;
        bottom: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        margin-left: 25%;
    }
</style>
