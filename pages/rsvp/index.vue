<template>
    <view class="container">
        <Opening class="comp" v-if="currentComp == 'Opening'" @onCompChange="onCompChange"></Opening>
        <Types class="comp" v-if="currentComp == 'Types'" @onCompChange="onCompChange"></Types>
        <Sex class="comp" v-if="currentComp == 'Sex'" @onCompChange="onCompChange"></Sex>
        <Style class="comp" v-if="currentComp == 'Style'" @onCompChange="onCompChange"></Style>
    </view>
</template>

<script>
    // rsvp风格、性别选择流程
    import Opening from './components/opening.vue'
    import Types from './components/type.vue'
    import Sex from './components/sex.vue'
    import Style from './components/style.vue'

    export default {
        name: 'rsvp-index',
        components: {
            Opening,
            Sex,
            Types,
            Style,
        },
        data() {
            return {
                currentComp: '',
            }
        },
        onInit() {},
        onLoad(query) {
            // #ifdef MP-WEIXIN
            const from = query.from || ""
            console.log('rsvp from: ', from)
            // 现场太阳码
            if (from == 'onsite' && getApp().globalData.from != 'weixin') {
                getApp().globalData.userInfo.onsite = 1
                getApp().globalData.userInfo.from = 'onsite'
                uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
                
                if(getApp().globalData.userInfo.token != null) {
                    uni.redirectTo({
                        url: '../home/home'
                    })
                    
                    return
                }
            }
            // #endif
            
            const comp = query.comp || ""
            if(comp == 'Style') {
                this.currentComp = 'Style'
            } else if(comp == 'Types') {
                this.currentComp = 'Types'
            } else if(comp == 'Sex') {
                this.currentComp = 'Sex'
            } else {
                this.currentComp = 'Opening'
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
                console.log('onCompChange: ', comp)
                if (typeof comp != 'string') {
                    if (typeof comp == 'object' && comp) {
                        comp = comp.detail.__args__[0]
                    }
                }

                switch (comp) {
                    case 'Opening':
                        this.currentComp = comp
                        break
                    case 'Types':
                        this.currentComp = comp
                        break
                    case 'Sex':
                        this.currentComp = comp
                        break
                    case 'Style':
                        this.currentComp = comp
                        break
                    case 'Room':
                        uni.redirectTo({
                            url: './room'
                        })
                        break
                    case 'Home':
                        uni.redirectTo({
                            url: '../home/home'
                        })
                        break
                }
            },
        }
    }
</script>

<style>
    .container,
    .comp {
        width: 100%;
        height: 100%;

        overflow: hidden;
    }
</style>
