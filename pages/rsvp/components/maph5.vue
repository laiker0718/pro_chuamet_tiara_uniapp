<template>
    <uni-transition mode-class="slide-bottom" :duration="500" :show="true"
        :styles="{'width': '100%', 'height': '100%'}">
        <view class="container">
            <view id="sphere-view"></view>

            <view v-if="isShowProduct" class="product-content animate__animated animate__fadeIn">
                <image class="product-img" :src="productSrc" mode="widthFix"></image>
            </view>

            <view v-if="isShowDialog" class="dialog-content animate__animated animate__fadeIn">
                <view class="dialog-area">
                    <image class="butler" :src="butlerSrc" mode="widthFix"></image>
                    <view class="dialog"
                        :style="{'width': dialogWidth + 'px', 'height': dialogWidth * dialogRatio + 'px', 'background-image': 'url(' + dialogSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                        <view class="dialog1" :style="{'padding-left': dialogPadding}">{{dialogStr1}}</view>
                        <view v-if="dialogStr2 != ''" class="dialog2" :style="{'padding-left': dialogPadding}">
                            {{dialogStr2}}
                        </view>
                    </view>
                </view>
            </view>

            <Back class="btn-back" @onBtnBack="onBtnBack"></Back>
        </view>
    </uni-transition>
</template>

<script>
    // Sphere Viewer
    import {
        Viewer as PhotoSphereViewer
    } from 'photo-sphere-viewer'
    import MarkersPlugin from 'photo-sphere-viewer/dist/plugins/markers'
    import GyroscopePlugin from 'photo-sphere-viewer/dist/plugins/gyroscope'
    import StereoPlugin from 'photo-sphere-viewer/dist/plugins/stereo'
    import VisibleRangePlugin from 'photo-sphere-viewer/dist/plugins/visible-range'
    import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
    import 'photo-sphere-viewer/dist/plugins/markers.css'

    import Top from '@/components/top.vue'
    import Back from '@/components/back.vue'

    import {
        url_rsvp_room_all,
        url_rsvp_room_sphere,
        url_rsvp_room_sphere_loading,
        url_rsvp_room_butler,
        url_rsvp_room_dialog,
        url_rsvp_room_dialog_short,
        url_rsvp_room_dialog_medium,
        url_rsvp_room_dialog_medium_long,
        url_rsvp_room_dialog_long,

        url_rsvp_room_dialog_finger,

        url_rsvp_room_product_ring,
        url_rsvp_room_product_bracelet,
        url_rsvp_room_product_necklace,

        url_rsvp_room_circle,
    } from '@/common/globaldata.js'

    import {
        g_rsvp_room_ratio,
        g_rsvp_room_dialog_ratio,
        g_rsvp_room_dialog_short_ratio,
        g_rsvp_room_dialog_medium_ratio,
        g_rsvp_room_dialog_medium_long_ratio,
        g_rsvp_room_dialog_long_ratio
    } from '@/common/const.js'

    export default {
        name: 'room-map',
        components: {
            Top,
            Back,
        },
        data() {
            return {
                width: getApp().globalData.sWidth,
                height: getApp().globalData.sHeight,

                step: 0, // 0:管家首次说话， 1：点击戒指或头饰后，2：点击项链后

                bgSrc: url_rsvp_room_all,
                sphereLoading: url_rsvp_room_sphere_loading,

                productSrc: url_rsvp_room_product_ring,
                isShowProduct: false,

                cicleMark: url_rsvp_room_circle,
                fingerSrc: url_rsvp_room_dialog_finger,

                butlerSrc: url_rsvp_room_butler,
                dialogSrc: url_rsvp_room_dialog_medium_long,
                dialogWidth: getApp().globalData.sWidth * 0.74,
                dialogRatio: g_rsvp_room_dialog_medium_long_ratio,
                dialogPadding: '12%',
                isShowDialog: false,
                dialogStr1: "",
                dialogStr2: "",
				
				isStepOk: false,
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            this.createPhotoSphereView()
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            onBtnBack() {
                console.log('onBtnBack')
                if (window.__wxjs_environment === 'miniprogram') {
                    console.log('wx app back')
                    wx.miniProgram.redirectTo({
                        url: './room'
                    })
                } else {
                    console.log('h5 back')
                    this.$emit("onCompChange", "Intro")
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
            onBtnCircle(e, markers) {
                this.setClickMusic('https://qn.notionbase.com/chaumet/rsvp/music/click.mp3')

                this.dialogSrc = url_rsvp_room_dialog_medium
                this.dialogWidth = this.width * 0.58
                this.dialogRatio = g_rsvp_room_dialog_medium_ratio
                this.dialogPadding = '15%'
				
				this.isStepOk = false
				
                if (e == 1) {
                    this.productSrc = url_rsvp_room_product_ring
                    this.step++
                } else if (e == 2) {
                    this.productSrc = url_rsvp_room_product_bracelet
                    this.step++
                } else if (e == 3) {
                    this.productSrc = url_rsvp_room_product_necklace
                    this.step++
                } else {
					this.isStepOk = true
                    if (window.__wxjs_environment === 'miniprogram') {
                        console.log('wx app find')
                        
                        wx.miniProgram.redirectTo({
                            url: './room?comp=Find'
                        })
                    } else {
                        console.log('h5 find')
                        this.$emit("onCompChange", "Find")
                    }
                    
                    return
                }

                let str1 = ""
                let str2 = ""
                this.dialogStr1 = ""
                this.dialogStr2 = ""

                if (e == 1) {
                    str1 = "那是约瑟芬皇后系列-冠冕钻戒"
                    str2 = ""
                } else if (e == 2) {
                    str1 = "那是约瑟芬皇后系列-冠冕手镯"
                    str2 = ""
                } else if (e == 3) {
                    str1 = "那是约瑟芬皇后系列-冠冕项链"
                    str2 = ""
                }

                this.isShowProduct = true
                this.isShowDialog = true

                let that = this
                let str1Len = 0
                let str2Len = 0
                let internal = setInterval(() => {
                    if (str1Len <= str1.length) {
                        this.dialogStr1 = str1.substr(0, str1Len);
                        str1Len++
                    } else if (str2Len <= str2.length) {
                        this.dialogStr2 = str2.substr(0, str2Len);
                        str2Len++
                    } else {
                        let timerIn = setTimeout(() => {
                            that.isShowProduct = false
                            that.isShowDialog = false
							that.isStepOk = true

                            clearTimeout(timerIn)
                        }, 1000)

                        clearInterval(internal);
                    }
                }, 60)

                if (this.step >= 2) {
                    let timer = setTimeout(() => {
                        this.isShowDialog = true

                        this.dialogStr1 = ""
                        this.dialogStr2 = ""

                        this.dialogSrc = url_rsvp_room_dialog_long
                        this.dialogWidth = this.width * 0.756
                        this.dialogRatio = g_rsvp_room_dialog_long_ratio
                        this.dialogPadding = '12%'

                        let str1 = "对了，刚刚有人送来一个蓝色礼盒，在钢琴上，"
                        let str2 = "快打开看看吧！"
                        let str1Len = 0
                        let str2Len = 0
                        let internal = setInterval(() => {
                            if (str1Len <= str1.length) {
                                that.dialogStr1 = str1.substr(0, str1Len);
                                str1Len++
                            } else if (str2Len <= str2.length) {
                                that.dialogStr2 = str2.substr(0, str2Len);
                                str2Len++
                            } else {
                                let inTimer = setTimeout(() => {
                                    that.isShowDialog = false
									that.isStepOk = true
                                    clearTimeout(inTimer)
                                }, 1000)

                                clearInterval(internal);
                            }
                        }, 60)

                        clearTimeout(timer)
                    }, 2500)
                }
            },
            createPhotoSphereView() {
                let that = this

                const PSV = new PhotoSphereViewer({
                    container: 'sphere-view',
                    // navbar: false,
                    navbar: [
                        'gyroscope',
                    ],
                    mousewheel: false,
                    defaultLong: -Math.PI * 6 / 7,
                    defaultZoomLvl: 1,
                    panorama: this.bgSrc,
                    plugins: [
                        GyroscopePlugin,
                        StereoPlugin,
                        [MarkersPlugin, {
                            markers: (function() {
                                var a = []

                                a.push({
                                    id: 'ring',
                                    image: that.cicleMark,
                                    width: 50,
                                    height: 50,
                                    className: 'breathingEffect',
                                    latitude: (1700 / 4096) * Math.PI - Math.PI / 2,
                                    longitude: (8192 - 7300) / 8192 * Math.PI * 2 - Math
                                        .PI,
                                })

                                a.push({
                                    id: 'bracelet',
                                    image: that.cicleMark,
                                    width: 50,
                                    height: 50,
                                    className: 'breathingEffect',
                                    latitude: (1480 / 4096) * Math.PI - Math.PI / 2,
                                    longitude: (8192 - 6470) / 8192 * Math.PI * 2 - Math
                                        .PI,
                                })

                                a.push({
                                    id: 'necklace',
                                    image: that.cicleMark,
                                    width: 50,
                                    height: 50,
                                    className: 'breathingEffect',
                                    latitude: (1530 / 4096) * Math.PI - Math.PI / 2,
                                    longitude: (8192 - 670) / 8192 * Math.PI * 2 - Math
                                        .PI,
                                })
								
								a.push({
								    id: 'find',
								    image: that.cicleMark,
								    width: 50,
								    height: 50,
								    className: 'breathingEffect',
								    latitude: (1760 / 4096) * Math.PI - Math.PI / 2,
								    longitude: (8192 - 5830) / 8192 * Math.PI * 2 -
								        Math.PI,
								})
								
								a.push({
								    id: 'finger',
								    image: that.fingerSrc,
								    width: 30,
								    height: 56,
								    latitude: (1615 / 4096) * Math.PI - Math.PI / 2,
								    longitude: (8192 - 5800) / 8192 * Math.PI * 2 -
								        Math.PI,
								})

                                return a
                            }())
                        }]
                    ]
                })
                console.log('create psv')
                
                PSV.on('ready', function() {
                    console.log('sphere ready')
                    if (window.__wxjs_environment === 'miniprogram') {
                        PSV.toggleFullscreen()
                        console.log('full screen')
                    }
                    
                    let timer = setTimeout(() => {
                        that.isShowDialog = true
						that.isStepOk = false

                        let str1 = "欢迎来到肖邦沙龙，请点击光标开始探索吧"
                        let str2 = ""
                        let str1Len = 0
                        let str2Len = 0
                        let internal = setInterval(() => {
                            if (str1Len <= str1.length) {
                                that.dialogStr1 = str1.substr(0, str1Len);
                                str1Len++
                            } else if (str2Len <= str2.length) {
                                that.dialogStr2 = str2.substr(0, str2Len);
                                str2Len++
                            } else {
                                let timerIn = setTimeout(() => {
                                    that.isShowDialog = false
									that.isStepOk = true

                                    clearTimeout(timerIn)
                                }, 1000)

                                clearInterval(internal);
                            }
                        }, 60)

                        clearTimeout(timer)
                    }, 1000)
                })

                let markers = PSV.getPlugin(MarkersPlugin)
                markers.on('select-marker', function(e, marker, data) {
					if(!that.isStepOk) return
					
                    if (marker.id == "ring") {
                        markers.removeMarker(marker)
                        that.onBtnCircle(1, markers)
                    } else if (marker.id == "bracelet") {
                        markers.removeMarker(marker)
                        that.onBtnCircle(2, markers)

                    } else if (marker.id == "necklace") {
                        markers.removeMarker(marker)
                        that.onBtnCircle(3, markers)
                    } else if (marker.id == "find") {
                        that.onBtnCircle(4, markers)
                    }
                })

                markers.on('unselect-marker', function(e, marker) {
                    console.log('unselect', marker.id)
                })

                markers.on('over-marker', function(e, marker) {
                    console.log('over', marker.id)
                })

                markers.on('leave-marker', function(e, marker) {
                    console.log('leave', marker.id)
                })

                markers.on('select-marker-list', function(e, marker) {
                    console.log('select-list', marker.id)
                })

                markers.on('goto-marker-done', function(e, marker) {
                    console.log('goto-done', marker.id)
                })
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    #sphere-view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
    }

    .title-top {
        position: absolute;
        z-index: 99;
    }
    
    .btn-back {
        z-index: 99;
    }

    .product-content {
        position: absolute;
        width: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        
        z-index: 99;
    }

    .product-img {
        width: 100%;
    }

    .dialog-content {
        position: absolute;
        bottom: 10%;
        width: 90%;
        left: 5%;
        
        z-index: 99;
    }

    .dialog-area {
        display: flex;
        /* justify-content: center; */
        align-items: center;
    }

    .butler {
        width: 16%;
    }

    .dialog {
        color: #000000;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        justify-content: center;
    }

    .dialog1,
    .dialog2 {
        width: 100%;
        font-size: 12px;
    }
    
    .finger {
        position: absolute;
        width: 6%;
    }
</style>
