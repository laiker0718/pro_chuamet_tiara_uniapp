<template>
	<uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
		<view class="container" :style="{'background-image': 'url(' + bgSrc + ')', 
                     'background-repeat': 'no-repeat', 
                     'background-size': 'cover',
                     'background-position': 'bottom center'}">

            <TopLogo></TopLogo>

			<view class="desc-title">芳登广场12号</view>
			<view class="line"></view>
			<view class="desc-first">欢迎进入CHAUMET灵魂府邸</view>
			<view class="desc">在法国文化遗产肖邦沙龙中</view>
			<view class="desc">寻找CHAUMET为您准备的专属冠冕...</view>
			<view class="desc"></view>
			<view class="op-content" @click="onBtnOpen">
				<image class="handle" :class="isLoading ? 'rotateEffect' : ''" :src="handleSrc" mode="widthFix"
					:style="{'bottom': 160 + 'px'}"></image>
				<view v-if="!isLoading" class="open-your-door breathingEffect"
					:style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'line-height': width * 0.4 * btnBgRatio + 'px','bottom': height*0.15+'px'}">
					点击开启
				</view> 
			</view>

			<Bottom></Bottom>

			<Back @onBtnBack="onBtnBack"></Back>
		</view>
	</uni-transition>
</template>

<script>
	// 游戏介绍
	import TopLogo from '@/components/topLogo.vue'
	import Bottom from '@/components/bottom.vue'
	import Back from '@/components/back.vue'

	import {
		url_common_btn_background,

		url_rsvp_intro_bg,
		url_rsvp_intro_handle,

		url_rsvp_room_all,
	} from '@/common/globaldata.js'

	import {
		g_btn_background_ratio
	} from '@/common/const.js'

	export default {
		name: 'room-intro',
		components: {
			TopLogo,
			Bottom,
			Back,
		},
		data() {
			return {
				width: getApp().globalData.wWidth,
				height: getApp().globalData.wHeight,

				bgSrc: url_rsvp_intro_bg,
				handleSrc: url_rsvp_intro_handle,

				btnBg: url_common_btn_background,
				btnBgRatio: g_btn_background_ratio,
				isClick:false,
				isLoading: false,
				
                timerIn: null,
			}
		},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {
			this.timerIn = setTimeout(() => {
				this.onBtnOpen()
                
                clearTimeout(this.timerIn)
                this.timerIn = null
			}, 8000)
		},
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		methods: {
			onBtnOpen() {
				console.log('onBtnNext')
                if(this.isClick) return
                
				this.isClick = true
				let loadCount = 0
				this.isLoading = true
                // 提前加载room
                let that = this
                uni.getImageInfo({
                    src: url_rsvp_room_all,
                    success: (res) => {
                        that.playAudio()
                        
                        if(that.timerIn != null)
                            clearTimeout(that.timerIn)
                            
                        let timer = setTimeout(() => {
                            that.isLoading = false
                            that.isClick = false
                            
                            that.$emit("onCompChange", "Map")
                            clearTimeout(timer)
                        }, 1000)
                    }
                })
			},
			onBtnBack() {
                clearTimeout(this.timerIn)
                this.timerIn = null
                
                this.$emit("onCompChange", "Style")
			},
            playAudio() {
                const innerAudioContext = uni.createInnerAudioContext();
                innerAudioContext.autoplay = true;
                innerAudioContext.src = 'https://qn.notionbase.com/chaumet/rsvp/music/open.mp3';
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
		overflow-y: scroll;
	}

	.desc-title,
	.desc-first,
	.desc {
		width: 100%;
		text-align: center;
	}

	.desc-title {
		font-size: 24px;
		margin-top: 60px;
		height: 30px;
		line-height: 30px;
	}

	.line {
		width: 50%;
		margin-left: 25%;
		margin-top: 20px;
		height: 1px;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.desc,
	.desc-first {
		font-size: 14px;
		height: 30px;
		line-height: 30px;
		
	}

	.desc-first {
		margin-top: 20px;
	}

	.op-content {
		width: 100%;
	}

	.handle {
		position: absolute;
		width: 40%;
		margin-left: 30%;
	}

	.open-your-door {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		text-align: center;
		margin-left: 30%;
		font-weight: bold;
	}
</style>
