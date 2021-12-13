<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container"
            :style="{'background-image': 'url(' + bgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover'}">

            <Top mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="1"></Top>

            <canvas v-if="popAllImg == null" class="myCanvas" canvas-id="myCanvas"
                :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}">
            </canvas>

            <image class="pop-all-img" :src="popAllImg" mode="widthFix"></image>

            <view v-if="popAllImg != null" class="op-btns" :style="{'top': btnsTop + 'px'}">
                <view class="btn-appoint"
                    :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}"
                    @click="onBtnAppoint">
                    {{appointSrc}}
                </view>
                <view class="btn-home"
                    :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}"
                    @click="onBtnHome">
                    返回首页
                </view>
            </view>

            <!-- #ifdef H5 -->
            <view v-if="popAllImg != null" class="save-tip breathingEffect">长按太阳码可保存图片</view>
            <!-- #endif -->

            <!-- #ifdef MP-WEIXIN -->
            <image class="btn-save" :src="btnSaveSrc" mode="widthFix" @click="onBtnSave"></image>
            <view v-if="isSaved" class="save-tip">太阳码保存成功</view>
            <!-- #endif -->

            <Bottom></Bottom>

            <Back v-if="isShowBack" @onBtnBack="onBtnBack"></Back>
        </view>
    </uni-transition>
</template>

<script>
    // 倒计时页面
    import Top from '@/components/top.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'

    import {
        url_onsite_btn_background,

        url_rsvp_bg_input,
        url_rsvp_input_bg_pop,

        url_rsvp_online_bg_pop,

        url_wxapp_qrcode,

        url_rsvp_countdown_btn_save,
    } from '@/common/globaldata.js'

    import {
        g_onsite_btn_background_ratio,

        g_rsvp_online_ratio,
    } from '@/common/const.js'

    export default {
        name: 'countdown',
        components: {
            Top,
            Bottom,
            Back,
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

                popAllImg: null,

                btnsTop: 0,
                qrcodeSrc: url_wxapp_qrcode,

                btnBg: url_onsite_btn_background,
                btnBgRatio: g_onsite_btn_background_ratio,

                appointSrc: '亲莅现场',
                isShowBack: false,

                btnSaveSrc: url_rsvp_countdown_btn_save,

                // #ifdef MP-WEIXIN
                isSaved: false,
                // #endif

                canvasWidth: parseInt(getApp().globalData.wWidth * 0.80),
                canvasHeight: parseInt(getApp().globalData.wWidth * 0.80 * g_rsvp_online_ratio),
            }
        },
        onInit() {},
        onLoad(options) {
            // title 顶部偏移
            if (this.height / this.width > 2) {
                this.btnsTop += 120
            } else {
                this.btnsTop += 40
            }
            // title 高度
            this.btnsTop += 33 + 26
            // canvas 偏移
            this.btnsTop += 30
            // pop height
            this.btnsTop += this.canvasHeight
            // 减去button 高度， 2个
            this.btnsTop -= (this.width * 0.4 * this.btnBgRatio) * 2
            // 减去button离底部偏移量
            this.btnsTop -= 20
            // 减去第二个button偏移量
            this.btnsTop -= 16

            this.$music.playBgm({
                mute: true
            })
            
            if (options.showBack == 'true') {
                this.isShowBack = true
            }
            
            if(getApp().globalData.isCountDownFirst) {
                this.isShowBack = false
            }
            
            let onsite = getApp().globalData.userInfo.onsite
            if (onsite == 1) {
                this.appointSrc = '我的预约'
            } else {
                this.appointSrc = '亲莅现场'
            }

            let that = this
            uni.getImageInfo({
                src: url_rsvp_online_bg_pop,
                success: (res) => {
                    console.log("get bg pop image ok")
                    that.popBgSrc = res.path

                    uni.getImageInfo({
                        src: url_wxapp_qrcode,
                        success: (res2) => {
                            console.log("get bg qrcode image ok")
                            
                            that.qrcodeSrc = res2.path
                            that.drawCanvas()
                        },
                        fail: (err) => {
                            console.log(err)
                            that.qrcodeSrc = null
                        }
                    })
                },
                fail: (err) => {
                    console.log(err)
                    that.popBgSrc = null
                }
            })
        },
        onUnload() {},
        onReady() {},
        onShow() {},
        onHide() {},
        onResize() {},
        onPullDownRefresh() {},
        onReachBottom() {},
        onTabItemTap() {},
        onShareAppMessage() {
            return {
                title: getApp().globalData.shareTitle,
                path: '/pages/rsvp/index',
                imageUrl: getApp().globalData.shareImg,
            }
        },
        onShareTimeline() {
            return {
                title: getApp().globalData.shareTitle,
                query: '',
                imageUrl: getApp().globalData.shareImg,
            }
        },
        onAddToFavorites() {},
        methods: {
            drawCanvas() {
                console.log("drawCanvas")
                
                var ctx = uni.createCanvasContext('myCanvas')

                ctx.drawImage(this.popBgSrc, 0, 0, this.canvasWidth, this.canvasHeight)


                let y = 90
                // #ifdef H5
                if(this.sHeight > 920) {
                    y += 40
                } else if(this.sHeight > 890) {
                    y += 25
                } else if(this.sHeight > 840) {
                    y += 10
                }
                // #endif
                
                // #ifdef MP-WEIXIN
                if(this.height > 920) {
                    y += 40
                } else if(this.height > 890) {
                    y += 25
                } else if(this.height > 840) {
                    y += 10
                }
                // #endif
                
                y += 40
                ctx.font = '14px HanSansCN-Regular media'
                ctx.setFontSize(14)
                ctx.setFillStyle('#000000')
				let titleStr = '寻宝之旅于11月5日至11月30日开启'
				if(getApp().globalData.userInfo.onsite == 0)
					titleStr = '您可于11月5日至11月30日扫码线上观展'
                const titleWidth = ctx.measureText(titleStr)
                ctx.fillText(titleStr, (this.canvasWidth - titleWidth.width) / 2, y)
                y += 14
				ctx.fillStyle='#030698'
				ctx.fillRect((this.canvasWidth-66)/2,y,66,1);
                y += 10

                ctx.drawImage(this.qrcodeSrc, (this.canvasWidth - 100) / 2, y, 100, 100)
                y += 100
                y += 30

                ctx.font = '8px HanSansCN-Regular'
                ctx.setFontSize(12)
                ctx.setFillStyle('#000000')
                // // #ifdef MP-WEIXIN
                // let desc1 = "扫码进入小程序"
                // let desc2 = "点击最下方按钮，保存展览二维码至相册"
                // // #endif
                // // #ifdef H5
                // let desc1 = "扫码进入小程序"
                // let desc2 = "长按太阳码可保存至手机相册"
                // // #endif
                let desc1 = "扫码进入小程序"
                let desc2
                if(getApp().globalData.userInfo.onsite == 0) {
                    desc2 = "诚邀您点击下方按钮预约线下体验"
                } else {
                    desc2 = ''
                }
                const descWidth = ctx.measureText(desc1)
                ctx.fillText(desc1, (this.canvasWidth - descWidth.width) / 2, y)
                y += 18
                
				const descWidth1 = ctx.measureText(desc2)
				ctx.fillText(desc2, (this.canvasWidth - descWidth1.width) / 2, y)
                y += 8
                y += 10

                ctx.draw()

                console.log("drawCanvas ok,begin to convert to image")
                
                let that = this
                let ratio = getApp().globalData.pixelRatio
                setTimeout(() => {
                    uni.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: this.canvasWidth,
                        height: this.canvasHeight,
                        destWidth: this.canvasWidth * ratio,
                        destHeight: this.canvasHeight * ratio,
                        canvasId: 'myCanvas',
                        success: function(res) {
                            // console.log(res.tempFilePath)
                            that.popAllImg = res.tempFilePath
                        },
                        fail: function(err) {
                            console.log(err)
                        }
                    })
                }, 1000)
            },
            onBtnAppoint() {
                let isOnsite = getApp().globalData.userInfo.onsite
                
                if (isOnsite == 0) {
                    uni.redirectTo({
                        url: './appointment?comp=Input3'
                    })
                } 
                else {
                    uni.redirectTo({
                        url: './qrcode'
                    })
                }
            },
            onBtnHome() {
                console.log('onBtnHome')
                
                let digitalTool = (getApp().globalData.from == 'Digital')
                if(digitalTool) {
                    uni.redirectTo({
                        url: "./appointment"
                    })
                } else {
                    uni.redirectTo({
                        url: "./index?comp=Sex"
                    })
                }
            },
            onBtnSave() {
                // #ifdef MP-WEIXIN
                let that = this
                uni.saveImageToPhotosAlbum({
                    filePath: this.popAllImg,
                    success: function() {
                        console.log('save success');
                        that.isSaved = true

                        let timer = setTimeout(() => {
                            that.isSaved = false
                        }, 3000)
                    }
                })
                // #endif
            },
            onBtnBack() {
                let onsite = getApp().globalData.userInfo.onsite
                
                if(this.isShowBack) {
                    if(onsite == 0) {
                        uni.redirectTo({
                            url: './appointment?comp=Input2'
                        })
                    } else {
                        uni.redirectTo({
                            url: './appointment?comp=Input3'
                        })
                    }
                }
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* overflow-y: scroll; */
    }

    .myCanvas {
        position: fixed;
        left: 100%;
        top: 100%;

        /* margin-left: 5%;
        margin-top: 30px;
        width: 90%; */
    }

    .pop-all-img {
        /* position: fixed;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        
        opacity: 0; */
        margin-left: 10%;
        margin-top: 30px;
        width: 80%;
    }

    .op-btns {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-left: 5%;
        /* justify-content: space-around;
        align-items: center; */
    }

    .btn-appoint,
    .btn-home {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 28%;
        color: #000000;
        font-size: 14px;
    }

    .btn-appoint {
        /* margin-top: 20px; */
    }

    .btn-home {
        margin-top: 16px;
    }

    .btn-save {
        width: 6%;
        margin-left: 47%;
        margin-top: 10px;
    }

    .save-tip {
        width: 100%;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
    }
</style>
