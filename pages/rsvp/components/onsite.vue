<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container" :style="{'background-image': 'url(' + bgSrc + ')', 
                     'background-repeat': 'no-repeat', 
                     'background-size': 'cover'}">

            <Top mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="0"></Top>

            <view class="pop-content"
                :style="{'width': width * 0.8 + 'px', 'height': width * 0.8 * popRatio + 'px', 'background-image': 'url(' + popBgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                <view class="desc-first" :style="{'padding-top': descTitleTop + 'px'}">{{descTitleSrc}}</view>
				<view style="text-align: center; margin-bottom: 6px;">
					<image :src="lineSrc" style="width: 20%; height: 1px;"></image>
				</view>
                <view class="desc1">CHAUMET Tiara Dream“冠冕绮梦”</view>
                <view class="desc2">沉浸式互动体验大展北京站已精彩落幕</view>
                <view class="desc3">您可选择云上观展，线上寻觅您的冠冕</view>
				<view class="btn-on-line"
                    :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain','background-position':'center'}"
                    @click="onSiteSelect(0)">
                    线上体验
                </view>
                <view class="btn-off-line"
                    :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain','background-position':'center'}"
                    @click="onSiteSelect(1)">
                    亲莅现场
                </view>
            </view>

            <Bottom></Bottom>

            <Back v-if="isShowBack" @onBtnBack="onBtnBack"></Back>
        </view>
    </uni-transition>
</template>

<script>
    // 线上或现场选择
    import Top from '@/components/top.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'
	import Home from '../../home/home.vue'

    import {
        url_onsite_btn_background,
		url_rsvp_online_line_pop,
        url_rsvp_bg_input,
        url_rsvp_online_bg_pop
    } from '@/common/globaldata.js'

    import {
        g_rsvp_online_ratio,

        g_onsite_btn_background_ratio
    } from '@/common/const.js'

    export default {
        name: 'appointment-onsite',
        components: {
            Top,
            Bottom,
            Back,
			Home,
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                sWidth: getApp().globalData.sWidth,
                sHeight: getApp().globalData.sHeight,

                bgSrc: url_rsvp_bg_input,
                popBgSrc: url_rsvp_online_bg_pop,
                popRatio: g_rsvp_online_ratio,
				lineSrc:url_rsvp_online_line_pop,
                btnBg: url_onsite_btn_background,
                btnBgRatio: g_onsite_btn_background_ratio,
                
                descTitleSrc: "尊敬的皇后",
                descTitleTop: 112,
                
                isShowBack: true,
                
                firstEnter: (getApp().globalData.userInfo.token == null),
                digitalTool: (getApp().globalData.from == 'Digital'),
            }
        },
        beforeCreate() {},
        created() {
            // #ifdef H5
            if(this.sHeight > 920) {
                this.descTitleTop = 142
            } else if(this.sHeight > 890) {
                this.descTitleTop = 132
            } else if(this.sHeight > 840) {
                this.descTitleTop = 122
            }
            // #endif
            
            // #ifdef MP-WEIXIN
            if(this.sHeight > 920) {
                this.descTitleTop = 142
            } else if(this.sHeight > 890) {
                this.descTitleTop = 132
            } else if(this.sHeight > 840) {
                this.descTitleTop = 122
            }
            // #endif
        },
        beforeMount() {},
        mounted() {
            if(getApp().globalData.from == 'Digital') {
                this.isShowBack = false
                this.descTitleSrc = "尊敬的贵宾"
            } else {
                let sex = getApp().globalData.userInfo.sex
                if(sex == 1) {
                    this.descTitleSrc = "尊敬的国王"
                } else if(sex == 2) {
                    this.descTitleSrc = "尊敬的皇后"
                }
            }
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            onSiteSelect(site) {
                console.log('onSiteSelect: ', site)
                
                let token = getApp().globalData.userInfo.token
                let isActive = getApp().globalData.userInfo.isActive
                let comp
                if(site == 0) {
                    getApp().globalData.userInfo.onsite = site
                    uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
                    
                    if(token != null) {
                        if(isActive && getApp().globalData.from != 'Digital') {
                            comp = "Home"
                        } else {
                            comp = "Countdown"
                        }
                    } else  {
                        comp = "Input2"
                    }
                } else {
                    // 线下直接return
                    return 
                    
                    if(token != null) {
                        comp = "Input3"
                    } else {
                        comp = "Input"
                    }
                }

                this.$emit("onCompChange", comp)
            },
            onBtnBack() {
                console.log('onBtnBack')
                this.$emit("onCompChange", 'Back')
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }

    .pop-content {
        /* margin-top: 100px; */
        margin-top: 10%;
        margin-left:10%;
        font-size: 16px;
    }

    .desc-first {
        width: 80%;
        height: 30px;
        line-height: 30px;
        text-align: center;
		margin-left: auto;
        margin-right: auto;
		color: #000000;
    }

    /* #ifdef H5 */
    /* .desc-first {
        padding-top: 112px;
    } */
    /* #endif */
    
    /* #ifdef MP-WEIXIN */
    /* .desc-first {
        padding-top: 112px;
    } */
    /* #endif */


	.desc1,
	.desc2,
	.desc3,
	.desc4 {
		width: 80%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 14px;
		margin: auto;
		color: #000000;
	}
    .btn-on-line,
    .btn-off-line {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 24%;
        color: #000000;
        font-size: 14px;
    }

    .btn-on-line {
        margin-top: 20px;
    }

    .btn-off-line {
        margin-top: 16px;
        color: #888888;
    }
</style>
