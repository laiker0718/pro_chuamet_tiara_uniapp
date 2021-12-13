<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container" :style="{'background-image': 'url(' + bgSrc + ')', 
                     'background-repeat': 'no-repeat', 
                     'background-size': 'cover',
                     'background-position': 'bottom center'}">

            <Top mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="0"></Top>

            <image class="tiara" :class="stage == 1 ? 'fadeInEffect' : ''" :src="tiaraSrc" mode="widthFix"></image>
			<view v-if="stage == 1" class="message">咦？皇冠怎么不见了！</view>
            <view v-if="stage1 == 1" class="desc" @click="onBtnMessage">去找找看</view>
            <Bottom></Bottom>

            <Back @onBtnBack="onBtnBack"></Back>
        </view>
    </uni-transition>
</template>

<script>
    // 游戏介绍
    import Top from '@/components/top.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'

    import {
        url_rsvp_bg_find,

        url_rsvp_find_tiara,
        url_rsvp_find_message,
        url_rsvp_find_message_unread,
		url_rsvp_sex_underline
    } from '@/common/globaldata.js'

    export default {
        name: 'room-find',
        components: {
            Top,
            Bottom,
            Back,
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,

                bgSrc: url_rsvp_bg_find,
                tiaraSrc: url_rsvp_find_tiara,
                messageSrc: url_rsvp_find_message_unread,
				line: url_rsvp_sex_underline,
                stage: 1, // 0:皇冠呼吸，1：信封出现，2：邀请文案
				stage1: 0, // 1:邀请文案
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            let that = this
            uni.getImageInfo({
                src: this.bgSrc,
                success: (res) => {
                    uni.getImageInfo({
                        src: that.tiaraSrc,
                        success: (res1) => {
                            let timer = setTimeout(() => {
                                that.stage = 1
                                clearTimeout(timer)
                            	if (that.stage = 1) {
                            		let timer1 = setTimeout(() => {
                            			that.stage1 = 1
                            			clearTimeout(timer1)
                            		}, 500)
                            	}
                            }, 500)
                        }
                    })
                }
            })
            
			// if (this.stage = 1) {
			// 	let timer = setTimeout(() => {
			// 	    this.stage1 = 1
			// 	    clearTimeout(timer)
			// 	}, 1000)
			// }
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            onBtnMessage() {
                console.log('onBtnMessage')
                this.$emit("onCompChange", "Appointment")
            },
            onBtnBack() {
                this.$emit("onCompChange", "Map")
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

    .tiara {
        position: absolute;
        width: 45%;
        left: 50%;
        transform: translateX(-50%);
        bottom: 260px;
    }

    .message {
        position: absolute;
        width: 100%;
        bottom: 220px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
    }

    .desc {
        position: absolute;
        width: 16%;
		margin-left: 42%;
        bottom: 200px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
		border-bottom: 1px solid;
    }
	
    .bar-bottom {
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
    }
</style>
