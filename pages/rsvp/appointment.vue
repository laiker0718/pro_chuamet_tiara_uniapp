<template>
    <view class="container">
        <Onsite class="comp" v-if="currentComp == 'Onsite'" @onCompChange="onCompChange"></Onsite>
        <Input class="comp" v-if="currentComp == 'Input'" @onCompChange="onCompChange"></Input>
        <Input2 class="comp" v-if="currentComp == 'Input2'" @onCompChange="onCompChange"></Input2>
        <Input3 class="comp" v-if="currentComp == 'Input3'" @onCompChange="onCompChange"></Input3>
    </view>
</template>

<script>
    // rsvp预约流程
    import Onsite from './components/onsite.vue'
    import Input from './components/input.vue'
    import Input2 from './components/input2.vue'
    import Input3 from './components/input3.vue'

    export default {
        name: 'rsvp-appointment',
        components: {
            Onsite,
            Input,
            Input2,
            Input3,
        },
        data() {
            return {
                currentComp: '',
                from: '',
            }
        },
        onInit() {},
        onLoad(options) {
            const comp = options.comp || ""
            if(comp == 'Input') {
                this.currentComp = 'Input'
            } else if(comp == 'Input2') { // 线上预约
                this.currentComp = 'Input2'
            }  else if(comp == 'Input3') { // 选择场次
                this.currentComp = 'Input3'
            } else {
                this.currentComp = 'Onsite'
            }
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
            onCompChange(comp) {
                console.log(comp)
                if(typeof comp != 'string') {
                    if(typeof comp == 'object' && comp) {
                        comp = comp.detail.__args__[0]
                    }
                }

                switch (comp) {
                    case 'Back': 
                        let token = getApp().globalData.userInfo.token
                        let isActive = getApp().globalData.userInfo.isActive
                        let isOnsite = getApp().globalData.userInfo.onsite
                        let digitalTool = (getApp().globalData.from == 'Digital')
                        if(digitalTool) {
                            this.currentComp = 'Onsite'
                        } else if(token != null) {
                            if(isOnsite == 0 && isActive && getApp().globalData.userInfo.stage == 1) {
                                uni.redirectTo({
                                    url: '../home/home?comp=Home'
                                })
                            } else if(isOnsite == 0){
                                uni.redirectTo({
                                    url: './countdown?showBack=true'
                                })
                            } else {
                                uni.redirectTo({
                                    url: './qrcode'
                                })
                            }
                        } else {
                            uni.redirectTo({
                                url: './room?comp=Find'
                            })
                        }
                        break
                    case 'Onsite': 
                        this.currentComp = comp
                        break
                    case 'Input':
                        this.currentComp = comp
                        break
                    case 'Input2':
                        this.currentComp = comp
                        break
                    case 'Input3':
                        this.currentComp = comp
                        break
                    case 'QrCode':
                        uni.redirectTo({
                            url: './qrcode'
                        })
                        break
                    case 'Countdown':
                        uni.redirectTo({
                            url: './countdown?showBack=true'
                        })
                        break
					case 'Home':
                        if(getApp().globalData.userInfo.stage == 1) {
                            uni.redirectTo({
                                url: '../home/home?comp=Home'
                            })
                        } else {
                            uni.redirectTo({
                                url: '../home/home'
                            })
                        }
					    break
                }
            },
        }
    }
</script>

<style>
    .container, .comp {
        width: 100%;
        height: 100%;
        
        overflow: hidden;
    }
</style>
