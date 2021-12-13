<template>
    <view class="container">
        <Opening class="comp" v-if="currentComp == 'Opening'" @onCompChange="onCompChange"></Opening>
        <Brand class="comp" v-if="currentComp == 'Brand'" @onCompChange="onCompChange"></Brand>
        <Home class="comp" v-if="currentComp == 'Home'" :gems="gems" @onCompChange="onCompChange"></Home>
    </view>
</template>

<script>
    import Opening from './components/opening.vue'
    import Brand from './components/brand.vue'
    import Home from './components/home.vue'
    
    import {
        api_regist,
        api_get_user_info,
    } from '@/common/globaldata.js'
    
    export default {
        name: 'home',
        components: {
            Opening,
            Brand,
            Home,
        },
        data() {
            return {
                currentComp: '',
				gems: [],
            }
        },
        onInit() {},
        onLoad(query) {
            const comp = query.comp || ""
            if(comp == 'Brand') {
                this.currentComp = 'Brand'
            } else if(comp == 'Home') {
                this.currentComp = 'Home'
            } else {
                this.currentComp = 'Opening'
            }
            
            getApp().globalData.userInfo.stage = 1
            uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))

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
            onCompChange(param) {
                console.log('onCompChange: ', param)
                
                let comp = param.chapter
                switch(comp) {
                    case 'Opening':
                        this.currentComp = comp
                        break
                    case 'Brand':
                        this.currentComp = comp
                        break
                    case 'Home':
                        this.currentComp = comp
                        break
                    case 'Chapter':
                        let index = param.index
                        console.log('chapter: ', index)
                        if(index < 7) {
                            uni.redirectTo({
                                url: '../chapter/chapter?index=' + index
                            })
                        } else if(index == 7) {
                            uni.redirectTo({
                                url: '../book/cover'
                            })
                        } else if(index == 8) {
							console.log(getApp().globalData.userInfo)
                            if(getApp().globalData.userInfo.from == 'onsite' && getApp().globalData.userInfo.stageInfo.rsvp.date == null) {
                                uni.redirectTo({
                                    url: '../rsvp/appointment?comp=Input'
                                })
                            }
							else if ( getApp().globalData.userInfo.onsite == 0 ) {
								uni.redirectTo({
								    url: '../rsvp/appointment?comp=Onsite'
								})
							}
                            else {
                            	uni.redirectTo({
                            	    url: '../rsvp/qrcode'
                            	})
                            }
                        } else if(index == 9) {
                            uni.scanCode({
                                onlyFromCamera: true,
                                success: (res) => {
                                    console.log('条码：', res)
                                    
                                    // 太阳码
                                    if(res.scanType == 'WX_CODE') {
                                        console.log('路径：', res.path)
                                        let path = res.path
                                        
                                        let pos = path.indexOf('pages')
                                        if(pos == 0) {
                                            path = '/' + path
                                        }
                                        
                                        if(path.indexOf('?') != -1) {
                                            path = path + '&from=home&back=true'
                                        } else {
                                            path = path + '?from=home&back=true'
                                        }

                                        uni.redirectTo({
                                            url: path
                                        })
                                    }
                                    // 二维码
                                    else if(res.scanType == 'QR_CODE') {
                                        // path, pages/home/home?
                                        // result, https://mp.weixin.qq.com/a/~~EhPoWGwzZXg~AgFm2j_KaXUObSVDa4V52w
                                    }
                                }
                            })
                        }
                        
                        break
                }
            },
            getUserInfo(idValue) {
                uni.request({
                    url: api_get_user_info,
                    method: 'POST',
                    data: {
                        'type': 'id',
                        'value': idValue
                    },
                    success: (res) => {
                        console.log('user info: ', res)
                        if(res.statusCode == 200) {
                            getApp().globalData.userInfo.token = res.data.data.token
                            getApp().globalData.userInfo.name = res.data.data.name
                            getApp().globalData.userInfo.type = res.data.data.type
                            getApp().globalData.userInfo.sex = res.data.data.sex
                            getApp().globalData.userInfo.onsite = 1
                            
                            getApp().globalData.userInfo.stageInfo.rsvp.date = res.data.data.date
                            getApp().globalData.userInfo.stageInfo.rsvp.time = res.data.data.start_time
                            getApp().globalData.userInfo.is_subscribe = res.data.data.is_subscribe
                            getApp().globalData.userInfo.isChecked = true
                            console.log('global user info: ', getApp().globalData.userInfo)
                            uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
                        }
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })
            },
            // vip，初始化数据
            initVipInfo() {
                getApp().globalData.userInfo.name = "您"
                getApp().globalData.userInfo.type = 0
                getApp().globalData.userInfo.sex = 2
                getApp().globalData.userInfo.age = "0-60"
                getApp().globalData.userInfo.phone = "11111111111"
                getApp().globalData.userInfo.city = "北京"
                getApp().globalData.userInfo.onsite = 1
                
                let curDate = new Date()
                let date = curDate.toISOString().slice(0, 10)
                let time = curDate.getHours() + ":00"
                // getApp().globalData.userInfo.stageInfo.rsvp.date = date
                // getApp().globalData.userInfo.stageInfo.rsvp.time = time
                
                uni.request({
                    url: api_regist,
                    method: 'POST',
                    data: {
                        name: getApp().globalData.userInfo.name,
                        type: getApp().globalData.userInfo.type,
                        sex: getApp().globalData.userInfo.sex,
                        age: getApp().globalData.userInfo.age,
                        phone: getApp().globalData.userInfo.phone,
                        city: getApp().globalData.userInfo.city,
                        onsite: getApp().globalData.userInfo.onsite,
                        date: date,
                        time: time,
                    },
                    success: (res) => {
                        console.log(res)
                        if(res.data.status == 0) {
                            getApp().globalData.userInfo.token = res.data.data.token
                            getApp().globalData.userInfo.isChecked = true
                            // store userInfo
                            uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
                        }
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })
            },
        }
    }
</script>

<style>
    .container, .comp {
        width: 100%;
        height: 100%;
    }
</style>
