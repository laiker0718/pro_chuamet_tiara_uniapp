<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container"
            :style="{'background-image': 'url(' + bgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover'}">

            <TopLogo></TopLogo>

            <view class="choose-style-tip">请选择您的专属风格</view>
            <swiper class="type-list" current="currentIndex" @transition="onSwiperTransition"
                @animationfinish="onSwiperTransitionEnd" :previous-margin="((width * 0.36) / 2) + 'px'"
                :next-margin="((width * 0.36) / 2) + 'px'"
                :style="{'width': width + 'px', 'height': width * 0.64 * typeRatio + width * 0.5 * btnBgRatio + 40 + 'px'}">
                <block v-for="(item, index) in typeList" :key="index">
                    <swiper-item class="type-item" 
                        :style="{'width': width * 0.64 + 'px', 'height': width * 0.64 * typeRatio + width * 0.5 * btnBgRatio + 40 + 'px'}">
                        <view class="item-content" :style="{
                                'width': width * 0.64 + 'px', 'height': width * 0.64 * typeRatio + width * 0.5 * btnBgRatio + 40 + 'px',
                                'transform': 'rotateY(' + (((currentIndex - index) * baseAngle) + rotateAdjust) + 'deg)' + ' ' + 'scale3d(' + 1 + ', ' + (1 - ((index > currentIndex) ? ((index - currentIndex) * base3DAdjust - rotate3DAdjust) : ((currentIndex - index) * base3DAdjust + ((currentIndex == index && rotate3DAdjust < 0) ? -rotate3DAdjust : rotate3DAdjust)))) + ', ' + 1 + ')',
                                '-webkit-transform': 'rotateY(' + (((currentIndex - index) * baseAngle) + rotateAdjust) + 'deg)' + ' ' + 'scale3d(' + 1 + ', ' + (1 - ((index > currentIndex) ? ((index - currentIndex) * base3DAdjust - rotate3DAdjust) : ((currentIndex - index) * base3DAdjust + ((currentIndex == index && rotate3DAdjust < 0) ? -rotate3DAdjust : rotate3DAdjust)))) + ', ' + 1 + ')'
                            }">
                            <image class="item-img" :src="item.img" mode="widthFix" @click="onBtnItemClicked(index)">
                            </image>
                            <view class="item-name breathingEffect" @click="onBtnItemClicked(index)"
                                :style="{'width': width * 0.5 + 'px', 'height': width * 0.5 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                                {{item.name}}
                            </view>
                        </view>
                    </swiper-item>
                </block>
            </swiper>

            <Bottom></Bottom>
            <Back @onBtnBack="onBtnBack"></Back>
        </view>
    </uni-transition>
</template>

<script>
    // 风格选择
    import TopLogo from '@/components/topLogo.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'

    import {
        url_common_btn_background,

        url_rsvp_bg_style,

        url_rsvp_type_power,
        url_rsvp_type_enternity,
        url_rsvp_type_fashion,
        url_rsvp_type_love,
        url_rsvp_type_transmission,
        url_rsvp_type_creative,
		url_rsvp_sex_underline
    } from '@/common/globaldata.js'

    import {
        g_btn_background_ratio,

        g_rsvp_type_ratio
    } from '@/common/const.js'

    export default {
        name: 'index-type',
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
                btnBg: url_common_btn_background,
                btnBgRatio: g_btn_background_ratio,

                typeRatio: g_rsvp_type_ratio,
				line: url_rsvp_sex_underline,
                typeList: [{
                        img: url_rsvp_type_power,
                        name: "气场",
                    },
                    {
                        img: url_rsvp_type_enternity,
                        name: "恒心",
                    },
                    {
                        img: url_rsvp_type_fashion,
                        name: "时尚",
                    },
                    {
                        img: url_rsvp_type_love,
                        name: "浪漫",
                    },
                    {
                        img: url_rsvp_type_transmission,
                        name: "传承",
                    },
                    {
                        img: url_rsvp_type_creative,
                        name: "创想",
                    },
                ],
                currentIndex: 0,

                rotateAdjust: 0.0,
                baseAngle: 50.0,
                rotate3DAdjust: 0.0,
                base3DAdjust: 0.2,
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
            onSwiperChange(e) {
                console.log(e)
                this.setClickMusic('https://qn.notionbase.com/chaumet/rsvp/music/slide.mp3');
                this.currentIndex = e.detail.current
            },
            onSwiperTransition(e) {
                this.rotateAdjust = (e.detail.dx / (this.width * 0.64)) * this.baseAngle
                // console.log('rotate adjust: ', this.rotateAdjust)
                if(this.rotateAdjust > this.baseAngle) {
                    this.rotateAdjust = this.baseAngle
                }
                
                this.rotate3DAdjust = (e.detail.dx / (this.width * 0.64)) * this.base3DAdjust
                // console.log('rotate 3d adjust: ', this.rotate3DAdjust)
                if (this.rotate3DAdjust > this.base3DAdjust)
                    this.rotate3DAdjust = this.base3DAdjust
            
            },
            onSwiperTransitionEnd(e) {
                this.rotateAdjust = 0
                this.rotate3DAdjust = 0
                let index = e.detail.current
                if (this.currentIndex != index) {
                    this.currentIndex = index
                    this.setClickMusic('https://qn.notionbase.com/chaumet/rsvp/music/slide.mp3')
                }
            },
            setClickMusic(e) {
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
            onBtnItemClicked(e) {
                console.log('onBtnItemClicked:', e)
                this.setClickMusic('https://qn.notionbase.com/chaumet/rsvp/music/click.mp3');
                // 缓存用户选择风格
                this.currentIndex = e
                getApp().globalData.userInfo.type = this.currentIndex
                uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
                this.$emit("onCompChange", "Style")
            },
            onBtnBack() {
                console.log('onBtnBack')
                this.$emit("onCompChange", "Sex")
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

    .choose-style-tip {
        width: max-content;
        margin-top: 30px;
        font-size: 12px;
		height: 14px;
		line-height: 2px;
        margin-left: auto;
        margin-right: auto;
    }
	
    .type-list {
        margin-top: 15px;
    }
    
    .type-item {
        display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                
                perspective: 1500px;
                        perspective-origin: 50% 50%;
                        transform-style: preserve-3d;
    }

    .item-content {
        display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
    }

    .item-img {
        /* width: 89.2%; */
        width: 100%;
    }

    .item-name {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 18px;
        /* margin-left: 19.8%; */
        /* margin-left: 12%; */
        margin-top: 30px;
        /* letter-spacing: 8px;
		text-indent: 6px; */
        /*少2个px，btn背景底边漏出*/
        /* text-align: center; */
        font-weight: bold;
    }
</style>
