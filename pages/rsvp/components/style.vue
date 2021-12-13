<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container"
            :style="{'background-image': 'url(' + bgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover'}">

            <TopLogo></TopLogo>

            <view class="choose-style-tip" >您的专属风格卡片</view>
            <view class="style-content" @click="onBtnStart"
                :style="{'width': width * 0.66 + 'px', 'height': width * 0.66 * styleRatio + 'px', 'background-image': 'url(' + styleBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                <image class="avatar" :src="avatar" mode="widthFix"></image>
            </view>

            <view class="btn-name breathingEffect"
                :style="{'width': width * 0.5 + 'px', 'height': width * 0.5 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}"
                @click="onBtnStart">
                进入芳登广场12号
            </view>

            <Bottom></Bottom>

            <Back @onBtnBack="onBtnBack"></Back>
        </view>
    </uni-transition>
</template>

<script>
    // 生成的类型
	import TopLogo from '@/components/topLogo.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'

    import {
        url_common_btn_background,
        url_common_line_bottom,

        url_rsvp_bg_style,
        url_rsvp_style_avatar_emperor,
        url_rsvp_style_avatar_empress,

        url_rsvp_style_power,
        url_rsvp_style_enternity,
        url_rsvp_style_fashion,
        url_rsvp_style_love,
        url_rsvp_style_transmission,
        url_rsvp_style_creative,
		url_rsvp_sex_underline
    } from '@/common/globaldata.js'

    import {
        g_btn_background_ratio,
        g_rsvp_style_ratio,

        g_style_desc,
    } from '@/common/const.js'

    export default {
        name: 'index-style',
        components: {
            TopLogo,
            Bottom,
            Back,
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,

                bgSrc: url_rsvp_bg_style,
                styleBg: url_rsvp_style_power,
                styleRatio: g_rsvp_style_ratio,
                btnBg: url_common_btn_background,
                btnBgRatio: g_btn_background_ratio,
                lineBottom: url_common_line_bottom,
				line: url_rsvp_sex_underline,
                avatar: null,
                style: g_style_desc[0],
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            let sex = getApp().globalData.userInfo.sex
            if (sex == 1) {
                this.avatar = url_rsvp_style_avatar_emperor
            } else {
                this.avatar = url_rsvp_style_avatar_empress
            }

            let type = getApp().globalData.userInfo.type
            this.style = g_style_desc[type]
            console.log(this.style)
            if (type == 0) {
                this.styleBg = url_rsvp_style_power
            } else if (type == 1) {
                this.styleBg = url_rsvp_style_enternity
            } else if (type == 2) {
                this.styleBg = url_rsvp_style_fashion
            } else if (type == 3) {
                this.styleBg = url_rsvp_style_love
            } else if (type == 4) {
                this.styleBg = url_rsvp_style_transmission
            } else if (type == 5) {
                this.styleBg = url_rsvp_style_creative
            }
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            onBtnStart() {
                this.setClickMusic('https://qn.notionbase.com/chaumet/rsvp/music/click.mp3');
                this.$emit("onCompChange", "Room")
            },
            onBtnBack() {
                this.$emit("onCompChange", "Types")
            },
            setClickMusic(e){
            	const innerAudioContext = uni.createInnerAudioContext();
            	innerAudioContext.autoplay = true;
            	innerAudioContext.src = e;
            	innerAudioContext.onPlay(() => {
            		console.log('开始播放');
            	});
            	innerAudioContext.onError((res) => {
            		console.log(res.errMsg);
            		console.log(res.errCode);
            	})
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .choose-style-tip {
        width: max-content;
        margin-top: 30px;
        font-size: 12px;
		height: 14px;
		line-height: 2px;
        margin-left: auto;
        margin-right: auto;
		font-weight: bold;
	}
    .style-content {
        margin-left: 17%;
        margin-top: 20px;
    }

    .avatar {
        width: 35%;
        margin-left: 32.5%;
        margin-top: 40px;
    }

    .title,
    .desc1,
    .desc2,
    .desc3,
    .desc4,
    .desc5 {
        width: 90%;
        margin-left: 5%;
        text-align: center;
    }

    .title {
        font-size: 18px;
        margin-top: 20px;
        font-family: 'HanSansCN-Bold';
    }

    .desc1,
    .desc2,
    .desc3,
    .desc4,
    .desc5 {
        font-size: 12px;
        padding-top: 5px;
    }

    .desc1 {
        margin-top: 10px;
    }

    .bottom-line {
        width: 70%;
        margin-left: 15%;
    }

    .btn-name {
        display: flex;
        justify-content: center;
        align-items: center;
        
        font-size: 16px;
        margin-left: 25%;
        margin-top: 30px;
        /*少2个px，btn背景底边漏出*/
        /* text-align: center; */
		font-weight: bold;
    }
</style>
