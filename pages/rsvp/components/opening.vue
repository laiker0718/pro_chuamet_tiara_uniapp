<template>
	<!-- <uni-transition mode-class="fade" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}"> -->
		<view class="container pt-page-fade">
			<video id="video" class="video" :enable-progress-gesture="false" :src="videoUrl" :controls="false"
				x5-playsinline playsinline webkit-playsinline autoplay :muted="videoMuted" objectFit="contain"
				@ended="eventVideoEnded"></video>

			<image class="btn-audio" :src="audioSrc" mode="widthFix" @click="onBtnAudio"
				:style="{'top': btnTop + 'px'}"></image>
                
            <view v-if="isShowJump" class="btn-jump" :style="{'top': jumpTop + 'px'}" @click="onBtnJump">跳过</view>
                
            <image v-if="isShowStart" class="btn-start breathingEffect" :src="startSrc" mode="widthFix" @click="onBtnStart" :style="{'bottom': wHeight * ((wHeight / (wHeight >= 812 ? 812 : wHeight)) * (wHeight >= 812 ? 0.144 : 0.17)) - ((wWidth - (wHeight >= 812 ? 375 : (wHeight / 812) * 375)) * 102 / 389) + 'px'}"></image>
		</view>
	<!-- </uni-transition> -->
</template>

<script>
	// 开屏视频
	import {
		url_opening_video1080,
		url_opening_video1125,

		url_common_btn_audio_open,
		url_common_btn_audio_close,
        
        url_common_btn_strat,
	} from '@/common/globaldata.js'

	export default {
		name: 'index-opening',
		data() {
			return {
				wWidth: getApp().globalData.wWidth,
				wHeight: getApp().globalData.wHeight,

				videoCtx: null,
				videoMuted: true,

				videoUrl: null,
				videoPoster: null,

				audioSrc: url_common_btn_audio_close,
                
                isShowStart: false,
                startSrc: url_common_btn_strat,

				btnTop: 30,
                jumpTop: 30,
                
                isShowJump: false,
			}
		},
		beforeCreate() {},
		created() {
            console.log('rsvp opening from: ', getApp().globalData.userInfo.from)
            if(getApp().globalData.userInfo.from == 'onsite') {
                this.isShowJump = true
            }
        },
		beforeMount() {},
		mounted() {
			this.$music.playBgm({
				mute: true
			})
			// if (this.wHeight / this.wWidth >= 2.16) {
			// 	this.videoUrl = url_opening_video1125
			// } else {
			// 	this.videoUrl = url_opening_video1080
			// }
            this.videoUrl = url_opening_video1125
            
			this.videoPoster = this.videoUrl + '?vframe/jpg/offset/3'

			// #ifdef MP-WEIXIN
			this.videoMuted = false
			this.audioSrc = url_common_btn_audio_open
			this.btnTop = getApp().globalData.boundingMenu.bottom + 10
            this.jumpTop = getApp().globalData.boundingMenu.top
			// #endif

			// this.videoCtx = uni.createVideoContext('#video')
			// this.videoCtx.muted = false
			// this.videoCtx.play()
		},
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		methods: {
			eventVideoEnded(e) {
				console.log('eventVideoEnded', e)
				
                this.isShowStart = true
				//this.setClickMusic('https://qn.notionbase.com/chaumet/rsvp/music/bg_music.mp3');
				
    //             this.$emit("onCompChange", "Sex")
    //             this.$music.playBgm({
				// 	mute: false
				// })
			},
            onBtnStart() {
                this.$emit("onCompChange", "Sex")
                this.$music.playBgm({
                	mute: false
                })
            },
			onBtnAudio() {
				console.log('onBtnAudio')

				this.videoMuted = !this.videoMuted
                uni.setStorageSync('music', !this.videoMuted)
				if (this.videoMuted) {
					this.audioSrc = url_common_btn_audio_close
                    this.$music.playBgm({
                    	mute: true
                    })
				} else {
					this.audioSrc = url_common_btn_audio_open
                    this.$music.playBgm({
                    	mute: false
                    })
				}
			},
            onBtnJump() {
                console.log('onBtnJump')
                this.$emit("onCompChange", "Home")
            },
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
	}

	.video {
		width: 100%;
		height: 100%;
        
        object-position: bottom center;
	}

	.btn-audio {
		position: absolute;
		width: 8%;
		right: 30rpx;
	}
    
    .btn-jump {
        position: absolute;
        width: max-content;
        border-bottom: 1px solid #FFFFFF;
        left: 30rpx;
        font-size: 16px;
        line-height: 30px;
    }
    
    .btn-start {
        position: absolute;
        width: 34%;
        left: 33%;
    }
</style>
