<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container" :style="{'background-image': 'url(' + bgSrc + ')', 
                     'background-repeat': 'no-repeat', 
                     'background-size': 'cover',
                     'background-position': 'bottom center'}">

            <Top mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="1"></Top>

            <image :src="gemsBgSrc" mode="widthFix" :style="{'position': 'absolute', 'width': width * 0.84 + 'px', 'left': (width * 0.08) + 'px', 'top': btnsTop + 'px'}"></image>
            
            <view class="power" :style="{'width': width * 0.32 + 'px', 
                          'height': width * 0.32 * powerRatio + 'px', 
                          'margin-left': (width * 0.68 / 2) + 'px',
                          'margin-top': powerTop + 'px'}">
                <image v-if="gemPower != null" class="gem-img-power" :src="gemPower" mode="widthFix"></image>
                <view class="gem-name">权力象征</view>
            </view>
            <view :style="{'display': 'flex', 'width': width * 0.84 + 'px', 'margin-left': (width * 0.08) + 'px'}">
                <view class="eternity" :style="{'width': width * 0.21 + 'px', 
                              'height': width * 0.21 * eternityRatio + 'px',
                              'justify-content': gemEternity != null ? 'flex-start' : 'center'}">
                    <image v-if="gemEternity != null" class="gem-img-eternity" :src="gemEternity" mode="widthFix">
                    </image>
                    <view class="gem-name-eternity">通往永恒</view>
                </view>
                <view class="love" :style="{'width': width * 0.42 + 'px', 
                              'height': width * 0.42 * loveRatio + 'px'}">
                    <image v-if="gemLove != null" class="gem-img-love" :src="gemLove" mode="widthFix"></image>
                    <view class="gem-name">为爱加冕</view>
                </view>
                <view class="creation" :style="{'width': width * 0.21 + 'px', 
                              'height': width * 0.21 * creationRatio + 'px', 
                              'justify-content': gemCreation != null ? 'flex-start' : 'center'}">
                    <image v-if="gemCreation != null" class="gem-img-creation" :src="gemCreation" mode="widthFix">
                    </image>
                    <view class="gem-name-creation">创想力量</view>
                </view>
            </view>

            <view
                :style="{'display': 'flex', 'width': width * 0.84 + 'px', 'margin-left': (width * 0.08) + 'px', 'margin-top': -(width * (0.42 / 2) * loveRatio) + 'px'}">
                <view class="fashion" :style="{'width': width * 0.42 + 'px', 
                              'height': width * 0.42 * fashionRatio + 'px'}">
                    <image v-if="gemFashion != null" class="gem-img-fashion" :src="gemFashion" mode="widthFix"></image>
                    <view class="gem-name" :style="{'margin-top': gemFashion == null ? '20%' : '5px'}">型格利器</view>
                </view>
                <view class="transmission" :style="{'width': width * 0.42 + 'px', 
                              'height': width * 0.42 * transmissionRatio + 'px'}">
                    <image v-if="gemTransmission != null" class="gem-img-transmission" :src="gemTransmission"
                        mode="widthFix"></image>
                    <view class="gem-name" :style="{'margin-top': gemTransmission == null ? '20%' : '5px'}">史诗传承</view>
                </view>
            </view>
            <view class="desc-first" :style="{'margin-top': descFirstTop + 'px'}">悄悄告诉您，每个展厅都藏着一颗宝石哦</view>
            <view class="desc-detail">快用手机逐个解锁，创作一款您的专属冠冕吧！</view>
            
            <view v-if="isOnsite" class="rule" @click="onBtnPrivacy" :style="{'bottom': ruleBottom + 'px'}">个人信息处理规则</view>

            <view class="btn-content">
                <view class="btn-power" @click="onMainmenuClicked(0)" :style="{'width': width * 0.32 / 2 + 'px',
                                'height': width * 0.32 * 3 / 5 * powerRatio + 'px', 
                                'left': (width * 0.68 / 2) + width * 0.32 / 4 + 'px',
                                'top': btnsTop + width * 0.32 / 4 * powerRatio + 'px'}" />
                <view class="btn-eternity" @click="onMainmenuClicked(1)"
                    :style="{'width': width * 0.21 * 2 / 3 + 'px',
                                'height': width * 0.21 / 3 * eternityRatio + 'px',
                                'left': (width * 0.08) + 'px',
                                'top': btnsTop + width * 0.32 * powerRatio + width * 0.21 / 3 * eternityRatio + 'px'}" />
                <view class="btn-love" @click="onMainmenuClicked(3)"
                    :style="{'width': width * 0.42 / 2 + 'px',
                                'height': width * 0.42 / 2 * loveRatio + 'px',
                                'left': (width * 0.08) + width * 0.21 + (width * 0.42 / 2) / 2 + 'px',
                                'top': btnsTop + width * 0.32 * powerRatio + (width * 0.42 / 2) / 2 * loveRatio + 'px'}" />
                <view class="btn-creation" @click="onMainmenuClicked(5)"
                    :style="{'width': width * 0.21 * 2 / 3 + 'px',
                                'height': width * 0.21 / 3 * creationRatio + 'px',
                                'right': (width * 0.08) + 'px',
                                'top': btnsTop + width * 0.32 * powerRatio + width * 0.21 / 3 * creationRatio + 'px'}" />
                <view class="btn-fashion" @click="onMainmenuClicked(2)"
                    :style="{'width': width * 0.42 / 2 + 'px',
                                'height': width * 0.42 * 2 / 3 * fashionRatio + 'px',
                                'left': (width * 0.08) + (width * 0.42 / 2) / 2 + 'px',
                                'top': btnsTop + width * 0.32 * powerRatio + width * 0.42 / 2 * loveRatio + width * 0.42 / 3 * fashionRatio + 'px'}" />
                <view class="btn-transmission" @click="onMainmenuClicked(4)"
                    :style="{'width': width * 0.42 / 2 + 'px',
                                'height': width * 0.42 * 2 / 3 * transmissionRatio + 'px',
                                'right': (width * 0.08) + (width * 0.42 / 2) / 2 + 'px',
                                'top': btnsTop + width * 0.32 * powerRatio + width * 0.42 / 2 * loveRatio + width * 0.42 / 3 * transmissionRatio + 'px'}" />
            </view>
            
            <view class="btn-menu-frame" 
                :style="{'position': 'absolute', 
                        'width': width * 0.12 + 'px', 'height': width * 0.12 + 'px',
                        'top': menuBtnTop + 'px', 'left': menuBtnLeft + 'px'}" 
                @click="showMainMenu">
                <image class="btn-menu" :src="menuSrc" mode="widthFix"></image>
            </view>
            <MainMenu v-if="isMenuShow" class="main-menu" @onMainmenuClicked="onMainmenuClicked"></MainMenu>

            <image class="btn-audio" :src="audioSrc" mode="widthFix" @click="onBtnAudio"
            	:style="{'top': audioBtnTop + 'px'}"></image>
                
            <Bottom></Bottom>
            
            <Privacy v-if="isShowPolicy" @onBtnClose="onBtnClose"></Privacy>
        </view>
    </uni-transition>
</template>

<script>
    // 游戏介绍
    import Top from '@/components/top.vue'
    import Bottom from '@/components/bottom.vue'
    import MainMenu from '@/components/menu.vue'
    import Privacy from '@/components/privacy.vue'

    import {
        g_home_creation_bg_ratio,
        g_home_eternity_bg_ratio,
        g_home_fashion_bg_ratio,
        g_home_love_bg_ratio,
        g_home_power_bg_ratio,
        g_home_transmission_bg_ratio,
        
        g_bar_bottom_ratio,
    } from '@/common/const.js'

    import {
        url_home_bg_home,
        url_home_btn_menu,

        url_home_gems_bg,
        url_home_gem_creation_background,
        url_home_gem_creation_get_background,
        url_home_gem_eternity_background,
        url_home_gem_eternity_get_background,
        url_home_gem_fashion_background,
        url_home_gem_fashion_get_background,
        url_home_gem_love_background,
        url_home_gem_love_get_background,
        url_home_gem_power_background,
        url_home_gem_power_get_background,
        url_home_gem_transmission_background,
        url_home_gem_transmission_get_background,

        url_gem_creation,
        url_gem_eternity,
        url_gem_fashion,
        url_gem_love,
        url_gem_power,
        url_gem_transmission,
        
        url_common_btn_audio_open,
        url_common_btn_audio_close,
    } from '@/common/globaldata.js'

    export default {
        name: 'home-home',
        components: {
            Top,
            Bottom,
            MainMenu,
            Privacy,
        },
        props: ["gems"],
        watch: {
            gems(val) {
                console.log('gems watch')
                console.log(val)
                if (val.length > 0) {
                    this.gems = val

                    this.updateGemsInfo()
                }
            }
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                sWidth: getApp().globalData.sWidth,
                sHeight: getApp().globalData.sHeight,

                menuBtnTop: 20,
                menuBtnLeft: 20,

                bgSrc: url_home_bg_home,
                gemsBgSrc: url_home_gems_bg,

                menuSrc: url_home_btn_menu,
                isMenuShow: false,

                videoMuted: true,
                audioSrc: url_common_btn_audio_close,
                audioBtnTop: 30,
                
                powerTop: 80,
                btnsTop: 0,

                creationBg: url_home_gem_creation_background,
                creationRatio: g_home_creation_bg_ratio,
                eternityBg: url_home_gem_eternity_background,
                eternityRatio: g_home_eternity_bg_ratio,
                fashionBg: url_home_gem_fashion_background,
                fashionRatio: g_home_fashion_bg_ratio,
                loveBg: url_home_gem_love_background,
                loveRatio: g_home_love_bg_ratio,
                powerBg: url_home_gem_power_background,
                powerRatio: g_home_power_bg_ratio,
                transmissionBg: url_home_gem_transmission_background,
                transmissionRatio: g_home_transmission_bg_ratio,

                gemCreation: null,
                gemEternity: null,
                gemFashion: null,
                gemLove: null,
                gemPower: null,
                gemTransmission: null,
                
                isOnsite: (getApp().globalData.from == 'onsite'),
                isShowPolicy: false, 
                ruleBottom: getApp().globalData.wWidth * g_bar_bottom_ratio + 10,
                
                descFirstTop: 50,
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            console.log('home mounted')
            // #ifdef MP-WEIXIN
            this.menuBtnTop = getApp().globalData.boundingMenu.top
            this.menuBtnLeft = this.width - getApp().globalData.boundingMenu.right
            // #endif

            if(this.sHeight > 920) {
                this.descFirstTop += 30
            } else if(this.sHeight > 890) {
                this.descFirstTop += 20
            } else if(this.sHeight > 840) {
                this.descFirstTop += 10
            }
            
            if (this.height / this.width > 1.8) {
                this.powerTop = 60
            } else {
                this.powerTop = 40
            }

            // title 顶部偏移
            if (this.height / this.width > 2) {
                this.btnsTop += 120
            } else {
                this.btnsTop += 40
            }
            // title 高度
            this.btnsTop += 33 + 26
            // power 偏移
            this.btnsTop += this.powerTop

            // #ifdef MP-WEIXIN
            this.audioSrc = url_common_btn_audio_open
            this.audioBtnTop = getApp().globalData.boundingMenu.bottom + 10
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
            
            this.updateGemsInfo()
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
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
            updateGemsInfo() {
                console.log("gems", this.gems)
                if (this.gems[0].isGet) {
                    this.powerBg = url_home_gem_power_get_background
                    this.gemPower = url_gem_power
                }
                if (this.gems[1].isGet) {
                    this.eternityBg = url_home_gem_eternity_get_background
                    this.gemEternity = url_gem_eternity
                }
                if (this.gems[2].isGet) {
                    this.fashionBg = url_home_gem_fashion_get_background
                    this.gemFashion = url_gem_fashion
                }
                if (this.gems[3].isGet) {
                    this.loveBg = url_home_gem_love_get_background
                    this.gemLove = url_gem_love
                }
                if (this.gems[4].isGet) {
                    this.transmissionBg = url_home_gem_transmission_get_background
                    this.gemTransmission = url_gem_transmission
                }
                if (this.gems[5].isGet) {
                    this.creationBg = url_home_gem_creation_get_background
                    this.gemCreation = url_gem_creation
                }
            },
            showMainMenu() {
                this.isMenuShow = true
            },
            onMainmenuClicked(e) {
                console.log('onMainmenuClicked: ', e)

                this.isMenuShow = false

                if (e < 0) return

                let param = {
                    'chapter': 'Chapter',
                    'index': e + 1
                }
                this.$emit("onCompChange", param)
            },
            onBtnPrivacy() {
                if (this.isShowPolicy) return
            
                this.isShowPolicy = true
            },
            onBtnClose() {
                if (!this.isShowPolicy) return
                this.isShowPolicy = false
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        /* overflow-y: scroll; */
        overflow-y: hidden;
    }

    .power,
    .love,
    .fashion,
    .transmission {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* .power {
        margin-top: 80px;
    } */

    .eternity,
    .creation {
        display: flex;
        flex-direction: column;
    }

    .eternity {
        margin-top: 1px;
    }

    .fashion {
        margin-left: 1px;
        margin-top: -1px;
    }

    .transmission {
        margin-top: -1px;
    }

    .gem-img-power {
        width: 34%;
    }

    .gem-img-eternity {
        width: 50%;
        margin-top: 60%;
        margin-left: 10%;
    }

    .gem-img-creation {
        width: 50%;
        margin-top: 60%;
        margin-left: 40%;
    }

    .gem-img-love {
        width: 22%;
    }

    .gem-img-fashion,
    .gem-img-transmission {
        width: 24%;
        margin-top: 8%;
    }

    .gem-name,
    .gem-name-eternity,
    .gem-name-creation {
        font-size: 12px;
        line-height: 16px;
        /* margin-top: 5px; */
    }

    .gem-name-eternity {
        margin-left: 4px;
    }

    .gem-name-creation {
        margin-left: 35%;
    }

    .desc-first,
    .desc-detail {
        width: 100%;
        text-align: center;
		font-size: 12px;
		line-height: 20px;
    }

    .desc-first {
        font-size: 12px;
    }

    /* 
    .btn-content {
        position: absolute;
    } */

    .btn-power,
    .btn-eternity,
    .btn-love,
    .btn-creation,
    .btn-fashion,
    .btn-transmission {
        position: absolute;
        /* background-color: #DD524D; */
    }

    .btn-menu {
        width: 22px;
    }
    
    .btn-audio {
        position: absolute;
        width: 8%;
        right: 30rpx;
    }
    
    .rule {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        width: max-content;
        border-bottom: 1px solid #FFFFFF;
    }
</style>
