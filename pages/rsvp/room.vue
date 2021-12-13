<template>
    <view class="container">
        <Intro class="comp" v-if="currentComp == 'Intro'" @onCompChange="onCompChange"></Intro>
		<Map class="comp" v-if="currentComp == 'Map'" @onCompChange="onCompChange"></Map>
        <Find class="comp" v-if="currentComp == 'Find'" @onCompChange="onCompChange"></Find>
    </view>
</template>

<script>
    // rsvp寻找皇冠流程
    import Intro from './components/intro.vue'
    // import Map from './components/map.vue'
    import Find from './components/find.vue'
    
    // #ifdef H5
    import Map from './components/maph5.vue'
    // #endif
    
    // #ifdef MP-WEIXIN
    import Map from './components/mapwx.vue'
    // #endif
   
    export default {
        name: 'rsvp-room',
        components: {
            Intro,
			Map,
            Find,
        },
        data() {
            return {
                currentComp: '',
            }
        },
        onInit() {
            console.log('room onInit')
        },
        onLoad(options) {
            console.log('room onLoad')
            console.log(options)
			
            if (options.comp == 'Map') {
                this.currentComp = 'Map'
            } else if (options.comp == 'Find') {
                this.currentComp = 'Find'
            } else {
                this.currentComp = 'Intro'
            }
        },
        onUnload() {
            console.log('room onUnload')
        },
        onReady() {
            console.log('room onReady')
        },
        onShow() {
            console.log('room onShow')
        },
        onHide() {
            console.log('room onHide')
        },
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
                console.log('onCompChange: ', comp)
                
                if(typeof comp != 'string') {
                    if(typeof comp == 'object' && comp) {
                        comp = comp.detail.__args__[0]
                    }
                }

                switch (comp) {
                    case 'Style':
                        uni.redirectTo({
                            url: './index?comp=Style'
                        })
                        break
                    case 'Intro':
                        this.currentComp = comp
                        break
                    case 'Map':
                        this.currentComp = comp
                        break
                    case 'Find':
                        this.currentComp = comp
                        break
                    case 'Appointment':
                        // #ifdef MP-WEIXIN
                        // 现场太阳码进入
                        if(getApp().globalData.userInfo.from == 'onsite') {
                            uni.redirectTo({
                                url: '../home/home'
                            })
                        } else 
                        // #endif
                        {
                            uni.redirectTo({
                                url: './appointment'
                            })
                        }
                        break
                }
            }
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
