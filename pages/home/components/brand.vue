<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container" :style="{'background-image': 'url(' + bgSrc + ')', 
                     'background-repeat': 'no-repeat', 
                     'background-size': 'cover',
                     'background-position': 'bottom center'}">

            <Top mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="1"></Top>

			<view class="desc-title">展览介绍</view>
            <view class="desc-content-1">欢迎您步入由CHAUMET</view>
            <view class="desc-content-2">呈现的Tiara Dream"冠冕绮梦"</view>
            <view class="desc-content-3">云上互动体验大展</view>
            <view class="desc-content-4">于云端璀璨绮境中</view>
			<view class="desc-content-5">寻找您心仪的冠冕吧</view>
			<!-- <view class="desc-content-6">冠冕的璀璨绮境，寻找您的冠冕吧</view> -->

            <view class="btn-begin breathingEffect" @click="onBtnHome"
                :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                下一步
            </view>
            
            <Bottom></Bottom>

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

        url_home_bg_brand,
    } from '@/common/globaldata.js'

    import {
        g_btn_background_ratio
    } from '@/common/const.js'

    export default {
        name: 'home-brand',
        components: {
            Top,
            Bottom,
            Back,
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,

                bgSrc: url_home_bg_brand,
                
                btnBg: url_common_btn_background,
                btnBgRatio: g_btn_background_ratio,
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
        methods: {
            onBtnHome() {
                console.log('onBtnHome')
                // this.$emit("onCompChange", "Find")

                // let param = {
                //     'chapter': 'Home'
                // }
                // this.$emit("onCompChange", param)
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

	.desc-title {
		position: absolute;
		width: 80%;
		margin-left: 10%;
		font-size: 30px;
		height: 50px;
		bottom: 305px;
		border-bottom: 1px inset rgba(255, 255, 255, 0.5);
		text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
	}

    .desc-content-1,
    .desc-content-2,
    .desc-content-3,
    .desc-content-4,
	.desc-content-5,
	.desc-content-6 {
        position: absolute;
        width: 80%;
        margin-left: 10%;
        font-size: 14px;
        line-height: 24px;
        height: 24px;
		text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.6);
        /* text-align: justify; */
    }

	
	.desc-content-1 {
	    bottom: 260px;
	}
	
	.desc-content-2 {
	    bottom: 236px;
	}
	
    .desc-content-3 {
        bottom: 212px;
    }

    .desc-content-4 {
        bottom: 188px;
    }

    .desc-content-5 {
        bottom: 164px;
    }
    
    .desc-content-6 {
        bottom: 140px;
    }
    
    .desc-title-2, .desc-content-1, .desc-content-3 {
        text-align: left;
    }

    .desc-title-2::after,
    .desc-content-1::after,
    .desc-content-3::after {
        display: inline-block;
        width: 100%;
        content: "";
    }
    
    .btn-begin {
		display: flex;
		justify-content: center;
		align-items: center;
        position: absolute;
        bottom: 90px;
        text-align: center;
        /* display: flex;
        align-items: center;
        justify-content: center; */
        margin-left: 30%;
    }
</style>
