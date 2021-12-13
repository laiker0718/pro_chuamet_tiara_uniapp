<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container"
            :style="{'background-image': 'url(' + bgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover'}">

            <Top mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="1"></Top>

            <canvas v-if="qrcodeAllImg == null" class="qrcodeCanvas" canvas-id="qrcodeCanvas"></canvas>

            <!-- #ifdef MP-WEIXIN -->
            <canvas v-if="qrcodeAllImg == null" class="myCanvas" id="myCanvas" canvas-id="myCanvas" type="2d"
                :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}">
            </canvas>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <canvas v-if="qrcodeAllImg == null" class="myCanvas" canvas-id="myCanvas"
                :style="{'width': canvasWidth + 'px', 'height': canvasHeight + 'px'}">
            </canvas>
            <!-- #endif -->

            <image class="qrcode-all-img" :src="qrcodeAllImg" mode="widthFix"></image>

            <view v-if="qrcodeAllImg != null" class="cover-view" :style="{'top': coverTop - 82 + 'px',
                            'background-image': 'url(' + popCoverSrc + ')',
                            'background-repeat': 'no-repeat',
                            'background-size': 'cover',
                            'background-position': 'bottom center'}"></view>

            <!-- #ifdef MP-WEIXIN -->
            <view v-if="qrcodeAllImg != null" class="remind-content"
                :style="{'top': btnsTop - width * 0.4 * btnBgRatio + 'px'}">
                <image class="remind-select" :src="remindSelect" @click="onBtnRemindSelect">
                </image>
                <view class="remind-text" @click="onBtnRemindSelect">开启活动提醒</view>
            </view>
            <!-- #endif -->

            <view v-if="qrcodeAllImg != null" class="op-btns" :style="{'top': btnsTop + 'px'}">
                <!-- #ifdef MP-WEIXIN -->
                <view class="btn-save"
                    :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}"
                    @click="onBtnSave">
                    保存信息
                </view>
                <!-- #endif -->
                <view class="btn-modiy"
                    :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}"
                    @click="onBtnModify">
                    修改预约
                </view>
            </view>

            <!-- #ifdef H5 -->
            <view v-if="qrcodeAllImg != null" class="save-tip breathingEffect">长按预邀函可保存图片</view>
            <!-- #endif -->

            <!-- #ifdef MP-WEIXIN -->
            <view v-if="isSaved" class="save-tip">预邀函保存成功</view>
            <!-- #endif -->

            <Bottom></Bottom>

            <Back v-if="isShowBack" @onBtnBack="onBtnBack"></Back>
        </view>
    </uni-transition>
</template>

<script>
    // 二维码页面
    import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
    import {
        pathToBase64,
        base64ToPath
    } from '@/js_sdk/mmmm-image-tools/index.js'

    import Top from '@/components/top.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'

    import {
        url_common_btn_blue_background,

        url_rsvp_bg_input,
        url_rsvp_input_bg_pop,
        url_rsvp_input_pop_cover,

        url_rsvp_input_privacy_selected,
        url_rsvp_input_privacy_unselected,

        url_wxapp_qrcode,

        api_regist,
        api_get_user_info,
        api_subscribe_message,
    } from '@/common/globaldata.js'

    import {
        g_rsvp_input_ratio,

        g_btn_background_blue_ratio
    } from '@/common/const.js'

    export default {
        name: 'qrcode',
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
                popBgSrc: url_rsvp_input_bg_pop,
                popRatio: g_rsvp_input_ratio,

                coverTop: 0,
                popCoverSrc: url_rsvp_input_pop_cover,

                btnsTop: 0,
                btnBg: url_common_btn_blue_background,
                btnBgRatio: g_btn_background_blue_ratio,

                isRemindSelect: false,
                remindSelect: url_rsvp_input_privacy_unselected,

                name: '',
                date: '', // 2021年9月30日 星期五
                time: '',
                qrcodeSrc: null,

                wxCodeSrc: url_wxapp_qrcode,

                qrcodeAllImg: null,

                // #ifdef MP-WEIXIN
                isSaved: false,
                canvas: null,
                // #endif
                canvasWidth: parseInt(getApp().globalData.wWidth * 0.9),
                canvasHeight: parseInt(getApp().globalData.wWidth * 0.9 * g_rsvp_input_ratio),

                isShowBack: true,
            }
        },
        onInit() {},
        onLoad(options) {
            // title top height
            if (this.height / this.width > 2) {
                this.btnsTop += 120
            } else {
                this.btnsTop += 40
            }
            // title height
            this.btnsTop += 33 + 26
            // canvas margin top
            this.btnsTop += 30
            // pop height
            this.btnsTop += this.canvasHeight
            this.coverTop = this.btnsTop
            // sub button height
            this.btnsTop -= this.width * 0.4 * this.btnBgRatio
            // 减去预约成功偏移量
            this.btnsTop -= 20

            let token = getApp().globalData.userInfo.token
            let name = getApp().globalData.userInfo.name
            this.name = name
            let type = getApp().globalData.userInfo.type
            let sex = getApp().globalData.userInfo.sex
            let age = getApp().globalData.userInfo.age
            let phone = getApp().globalData.userInfo.phone
            let city = getApp().globalData.userInfo.city

            let isActive = getApp().globalData.userInfo.isActive
            let isChecked = getApp().globalData.userInfo.isChecked
            let stage = getApp().globalData.userInfo.stage
            if (token != null && isActive && stage == 1 && !isChecked) {
                this.isShowBack = false
            }

            // #ifdef MP-WEIXIN
            this.getSubscribe(token)
            // #endif

            let da = getApp().globalData.userInfo.stageInfo.rsvp.date
            let newDate = new Date(da)
            let day = newDate.getDay()
            let week
            if (day === 1) {
                week = "一"
            } else if (day === 2) {
                week = "二"
            } else if (day === 3) {
                week = "三"
            } else if (day === 4) {
                week = "四"
            } else if (day === 5) {
                week = "五"
            } else if (day === 6) {
                week = "六"
            } else {
                week = "日"
            }
            this.date = newDate.getFullYear() + "年" +
                (newDate.getMonth() + 1) + "月" +
                newDate.getDate() + "日" +
                "  星期" + week

            this.time = getApp().globalData.userInfo.stageInfo.rsvp.time

            let from = 1 // 1: 小程序，2：H5
            // #ifdef MP-WEIXIN
            from = 1
            // #endif

            // #ifdef H5
            from = 2
            // #endif

            let qrCodeStr = token + "&" + from

            console.log(qrCodeStr)

            let that = this
            uQRCode.make({
                canvasId: 'qrcodeCanvas',
                componentInstance: this,
                text: qrCodeStr,
                size: 120,
                margin: 5,
                backgroundColor: '#ffffff',
                foregroundColor: '#000000',
                fileType: 'jpg',
                correctLevel: uQRCode.errorCorrectLevel.H
            }).then(res => {
                // console.log(res)
                base64ToPath(res)
                    .then(path => {
                        console.log(path)

                        // #ifdef MP-WEIXIN
                        const query = uni.createSelectorQuery()
                        query.select('#myCanvas').fields({
                            node: true,
                            size: true
                        }).exec((res) => {
                            console.log('获取到的canvas元素res', res)
                            that.canvas = res[0].node

                            let qrCode = that.canvas.createImage()
                            qrCode.src = path
                            qrCode.onload = () => {
                                that.qrcodeSrc = qrCode

                                let popBg = that.canvas.createImage()
                                popBg.src = url_rsvp_input_bg_pop
                                popBg.onload = () => {
                                    that.popBgSrc = popBg

                                    let wxCode = that.canvas.createImage()
                                    wxCode.src = url_wxapp_qrcode
                                    wxCode.onload = () => {
                                        that.wxCodeSrc = wxCode
                                        that.drawCanvas()
                                    }
                                }
                            }
                        })
                        // #endif
                        // #ifdef H5
                        that.qrcodeSrc = path
                        uni.getImageInfo({
                            src: url_rsvp_input_bg_pop,
                            success: (res) => {
                                that.popBgSrc = res.path

                                uni.getImageInfo({
                                    src: url_wxapp_qrcode,
                                    success: (res2) => {
                                        that.wxCodeSrc = res2.path
                                        that.drawCanvas()
                                    }
                                })
                            }
                        })
                        // #endif
                    })
                    .catch(error => {
                        console.error(error)
                    })
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
                let that = this

                // #ifdef MP-WEIXIN
                let ratio = getApp().globalData.pixelRatio
                this.canvas.width = this.canvasWidth * ratio
                this.canvas.height = this.canvasHeight * ratio
                var ctx = this.canvas.getContext('2d')
                // #endif

                // #ifdef H5
                let ratio = 1
                var ctx = uni.createCanvasContext('myCanvas')
                // #endif

                ctx.drawImage(this.popBgSrc, 0, 0, this.canvasWidth * ratio, this.canvasHeight * ratio)

                let y = 40 * ratio
                
                // #ifdef H5
                if (this.sHeight > 920) {
                    y += 40 * ratio
                } else if (this.sHeight > 890) {
                    y += 25 * ratio
                } else if (this.sHeight > 840) {
                    y += 10 * ratio
                }
                // #endif
                
                // #ifdef MP-WEIXIN
                if (this.height > 920) {
                    y += 40 * ratio
                } else if (this.height > 890) {
                    y += 25 * ratio
                } else if (this.height > 840) {
                    y += 10 * ratio
                }
                // #endif

                ctx.font = 'normal bold ' + 20 * ratio + 'px HanSansCN-Bold'
                ctx.fontSize = 20 * ratio
                ctx.fillStyle = '#05216A'
                const titleWidth = ctx.measureText('预邀函')
                ctx.fillText("预邀函", (this.canvasWidth * ratio - titleWidth.width) / 2, y)
                y += 20 * ratio
                y += 20 * ratio

                // #ifdef MP-WEIXIN
                ctx.font = 14 * ratio + 'px Adobe, HanSansCN-Regular'
                // #endif
                // #ifdef H5
                ctx.font = 14 * ratio + 'px Adobe-Regular, HanSansCN-Regular'
                // #endif
                ctx.fontSize = 14 * ratio
                let sex = (getApp().globalData.userInfo.sex == 2) ? '皇后：' : '国王：'
                let name = ' 尊敬的' + this.name + sex
                if(getApp().globalData.from == 'Digital') {
                    name = '尊敬的贵宾'
                }
                const nameWidth = ctx.measureText(name)
                ctx.fillText(name, (this.canvasWidth * ratio - nameWidth.width) / 2, y)
                y += 18 * ratio

                // #ifdef MP-WEIXIN
                ctx.font = 10 * ratio + 'px Adobe, HanSansCN-Regular'
                // #endif
                // #ifdef H5
                ctx.font = 10 * ratio + 'px Adobe-Regular, HanSansCN-Regular'
                // #endif
                ctx.fontSize = 10 * ratio
                let desc0 = '恭喜您预约成功'
                const desc0Width = ctx.measureText(desc0)
                ctx.fillText(desc0, (this.canvasWidth * ratio - desc0Width.width) / 2, y)
                y += 18 * ratio

                let desc1 = '踏上CHAUMET的梦幻冠冕之旅'
                const desc1Width = ctx.measureText(desc1)
                ctx.fillText(desc1, (this.canvasWidth * ratio - desc1Width.width) / 2, y)
                y += 18 * ratio

                let desc2 = '感受CHAUMET的风雅、卓艺与创想'
                const desc2Width = ctx.measureText(desc2)
                ctx.fillText(desc2, (this.canvasWidth * ratio - desc2Width.width) / 2, y)
                y += 18 * ratio

                ctx.drawImage(this.qrcodeSrc, (this.canvasWidth * ratio - 120 * ratio) / 2, y, 120 * ratio, 120 * ratio)
                y += 120 * ratio
                y += 20 * ratio

                let datetime = this.date + " " + this.time
                const datetimeWidth = ctx.measureText(datetime)
                ctx.fillText(datetime, (this.canvasWidth * ratio - datetimeWidth.width) / 2, y)
                y += 18 * ratio

                let addr = '北京三里屯太古里北区红馆'
                const addrWidth = ctx.measureText(addr)
                ctx.fillText(addr, (this.canvasWidth * ratio - addrWidth.width) / 2, y)
                y += 18 * ratio
                y += 10 * ratio

                let qrcodeTip3 = '展览当天需出示二维码现场签到'
                const qrcodeTip3Width = ctx.measureText(qrcodeTip3)
                ctx.fillText(qrcodeTip3, (this.canvasWidth * ratio - qrcodeTip3Width.width) / 2, y)
                y += 18 * ratio

                let qrcodeTip4 = '仅限本人使用，使用后即失效'
                const qrcodeTip4Width = ctx.measureText(qrcodeTip4)
                ctx.fillText(qrcodeTip4, (this.canvasWidth * ratio - qrcodeTip4Width.width) / 2, y)
                y += 18 * ratio

                ctx.drawImage(this.wxCodeSrc, 15 * ratio, this.canvasHeight * ratio - 80 * ratio, 70 * ratio, 70 *
                    ratio)

                let scanTips = '扫描太阳码快速进入小程序'
                const scanTipsWidth = ctx.measureText(scanTips)
                ctx.fillText(scanTips, (this.canvasWidth * ratio - scanTipsWidth.width) / 2, this.canvasHeight * ratio -
                    40 * ratio)

                // #ifdef H5
                ctx.draw()
                // #endif

                setTimeout(() => {
                    // #ifdef H5
                    uni.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: this.canvasWidth,
                        height: this.canvasHeight,
                        destWidth: this.canvasWidth * getApp().globalData.pixelRatio,
                        destHeight: this.canvasHeight * getApp().globalData.pixelRatio,
                        canvasId: 'myCanvas',
                        success: function(res) {
                    // #endif

                    // #ifdef MP-WEIXIN
                    uni.canvasToTempFilePath({
                        canvas: this.canvas,
                        success: function(res) {
                    // #endif
                            // console.log(res.tempFilePath)
                            that.qrcodeAllImg = res.tempFilePath

                            // #ifdef MP-WEIXIN
                            uni.getSetting({
                                'withSubscriptions': true,
                                success(res) {
                                    console.log(res)
                                    if (res.subscriptionsSetting.mainSwitch) {
                                        that.isRemindSelect = true
                                        // that.remindSelect = url_rsvp_input_privacy_selected
                                    }
                                }
                            })
                            // #endif
                        },
                        fail: function(err) {
                            console.log(err)
                        }
                    })
                },1000)
            },
            // #ifdef MP-WEIXIN
            onBtnSave() {
                let that = this
                uni.saveImageToPhotosAlbum({
                    filePath: this.qrcodeAllImg,
                    success: function() {
                        console.log('save success');
                        that.isSaved = true

                        let timer = setTimeout(() => {
                            that.isSaved = false
                        }, 3000)
                    }
                })
            },
            onBtnRemindSelect() {
                console.log('onBtnRemindSelect')
                // if(this.isRemindSelect) return
                this.subscribeMessage()
            },
            subscribeMessage() {
                uni.requestSubscribeMessage({
                    tmplIds: ['kM4cc8QdjKTwhILp1UJku0hO30FC7VMVDbvNGjBOdc8'],
                    success: res => {
                        console.log('onBtnRemindSelect ok', res)
                        let accept = res['kM4cc8QdjKTwhILp1UJku0hO30FC7VMVDbvNGjBOdc8']
                        console.log('accept: ', accept)
                        if (accept == 'reject') {
                            this.isRemindSelect = false
                            this.remindSelect = url_rsvp_input_privacy_unselected
                        } else {
                            this.isRemindSelect = true
                            this.remindSelect = url_rsvp_input_privacy_selected
                        }
                        this.requestSubMessage(this.isRemindSelect)
                    },
                    fail: err => {
                        console.log('onBtnRemindSelect fail', err)
                        this.isRemindSelect = false
                        this.remindSelect = url_rsvp_input_privacy_unselected
                    }
                })
            },
            getSubscribe(token) {
                uni.request({
                    url: api_get_user_info,
                    method: 'POST',
                    data: {
                        'type': 'token',
                        'value': token
                    },
                    success: (res) => {
                        console.log('user info: ', res)
                        if (res.statusCode == 200) {
                            this.is_subscribe = res.data.data.is_subscribe
                            if (this.is_subscribe == 1) {
                                this.remindSelect = url_rsvp_input_privacy_selected
                            }
                        }
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })
            },
            requestSubMessage(isSubscribe) {
                uni.request({
                    url: api_subscribe_message,
                    method: 'POST',
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'chaumet ' + getApp().globalData.userInfo.token,
                    },
                    data: {
                        'code': getApp().globalData.userInfo.code,
                        "is_subscribe": isSubscribe
                    },
                    success: res => {
                        console.log('scribe info: ', res)
                    },
                    fail: err => {
                        console.log(err)
                    }
                })
            },
            // #endif
            onBtnModify() {
                uni.redirectTo({
                    url: "./appointment?comp=Onsite"
                })
            },
            onBtnBack() {
                console.log('onBtnBack')
                let token = getApp().globalData.userInfo.token
                let isOnsite = getApp().globalData.userInfo.onsite
                let isCheked = getApp().globalData.userInfo.isChecked
                let isActive = getApp().globalData.userInfo.isActive
                let isModified = getApp().globalData.isModified
                let stage = getApp().globalData.userInfo.stage
                getApp().globalData.isModified = false
                if (stage == 1) {
                    uni.redirectTo({
                        url: '../home/home?comp=Home'
                    })
                } else if (isModified) {
                    uni.redirectTo({
                        url: './appointment?comp=Input3'
                    })
                } else if (token != null) {
                    uni.redirectTo({
                        url: './countdown?showBack=true'
                    })
                } else {
                    uni.redirectTo({
                        url: './appointment?comp=Input'
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
        overflow: hidden;
        /* overflow-y: scroll; */
    }

    .qrcodeCanvas {
        position: fixed;
        left: -100%;
        top: -100%;
        width: 120px;
        height: 120px;
    }

    .myCanvas {
        position: fixed;
        left: 100%;
        top: 100%;

        /* margin-left: 5%;
        margin-top: 30px;
        width: 90%; */
    }

    .qrcode-all-img {
        /* position: fixed;
        width: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        
        opacity: 0; */
        margin-left: 5%;
        margin-top: 30px;
        width: 90%;
    }

    .cover-view {
        position: absolute;
        left: 5%;
        width: 90%;
        height: 80px;
        /* background-color: #FFFFFF; */
    }

    .remind-content {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
        color: #0B257A;
    }

    .remind-select {
        width: 22px;
        height: 22px;
    }

    .remind-text {
        font-size: 12px;
        line-height: 12px;
        margin-left: 6px;
    }

    .op-btns {
        position: absolute;
        display: flex;
        width: 90%;
        margin-left: 5%;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .btn-save,
    .btn-modiy {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #05216A;
    }

    .save-tip {
        width: 100%;
        font-size: 14px;
        line-height: 16px;
        text-align: center;
    }
</style>
