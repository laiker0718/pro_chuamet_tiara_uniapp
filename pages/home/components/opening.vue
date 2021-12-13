<template>
    <!-- <uni-transition mode-class="fade" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}"> -->
        <view class="container pt-page-fade">
            <video id="video" class="video" :enable-progress-gesture="false" :src="videoUrl" :controls="false"
                x5-playsinline playsinline webkit-playsinline autoplay objectFit="contain" :muted="videoMuted"
                @ended="eventVideoEnded"></video>

            <image class="btn-audio" :src="audioSrc" mode="widthFix" @click="onBtnAudio"
            	:style="{'top': btnTop + 'px'}"></image>
        </view>
    <!-- </uni-transition> -->
</template>

<script>
    // 开屏视频
    import {
        url_opening_video1080,
        url_home_video1125,

        url_common_btn_audio_open,
        url_common_btn_audio_close,
    } from '@/common/globaldata.js'

    export default {
        name: 'home-opening',
        data() {
            return {
                wWidth: getApp().globalData.wWidth,
                wHeight: getApp().globalData.wHeight,

                videoCtx: null,
                videoMuted: true,

                videoUrl: null,
                videoPoster: null,

                audioSrc: url_common_btn_audio_close,

                btnTop: 30,
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            // if (this.wHeight / this.wWidth >= 2.16) {
            //     this.videoUrl = url_home_video1125
            // } else {
            //     this.videoUrl = url_home_video1125
            // }
            this.videoUrl = url_home_video1125
            
            this.videoPoster = this.videoUrl + '?vframe/jpg/offset/3'

            // #ifdef MP-WEIXIN
            this.videoMuted = false
            this.audioSrc = url_common_btn_audio_open
            this.btnTop = getApp().globalData.boundingMenu.bottom + 10
            // #endif
            
            let music = uni.getStorageSync('music')
            if(music == true) {
                this.videoMuted = false
                this.audioSrc = url_common_btn_audio_open
                this.$music.playBgm({
                	mute: false
                })
            } else {
                this.videoMuted = true
                this.audioSrc = url_common_btn_audio_close
                this.$music.playBgm({
                	mute: true
                })
            }

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
                console.log('eventVideoEnded')
                let param = {
                    'chapter': 'Brand'
                }
                this.$emit("onCompChange", param)
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
    }

    .btn-audio {
        position: absolute;
        width: 8%;
        right: 30rpx;
    }
</style>
