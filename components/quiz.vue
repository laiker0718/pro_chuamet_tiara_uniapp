<template>
    <uni-transition mode-class="fade" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container">
            <uni-transition mode-class="zoom-in" :duration="1500" :show="true"
                :styles="{'width': '100%', 'height': '100%'}">
                <view class="gem-get-content"
                    :style="{'width': width * 0.7 + 'px', 'height': width * 0.7 * popRatio + 'px', 'background-image': 'url(' + popBgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                    <view class="title">宝石图鉴</view>
                    <image class="bottom-line" :src="lineBottomSrc" mode="widthFix"></image>
                    <view class="name">{{name}}</view>
                    <image class="gem-img" :src="gemSrc" mode="widthFix"></image>
                    <view class="desc-first">{{desc[0]}}</view>
                    <view class="desc">{{desc[1]}}</view>
                    <view class="desc">{{desc[2]}}</view>
                </view>
            </uni-transition>
        </view>
    </uni-transition>
</template>

<script>
    import {
        url_common_line_bottom,
        
        url_home_power_gem_get_bg,
        url_home_eternity_gem_get_bg,
        url_home_fashion_gem_get_bg,
        url_home_love_gem_get_bg,
        url_home_transmission_gem_get_bg,
        url_home_creation_gem_get_bg,
        
        url_gem_creation,
        url_gem_eternity,
        url_gem_fashion,
        url_gem_love,
        url_gem_power,
        url_gem_transmission,
        
        api_add_gem,
    } from '@/common/globaldata.js'
    
    import {
        g_home_gem_get_pop_bg_ratio,
    } from '@/common/const.js'

    export default {
        name: 'quiz',
        props: ['roomIndex'],
        watch: {
            roomIndex(val) {
                console.log('get-gem: gem watch room index')
                this.roomIndex = val
                
                this.updateGemInfo()
            }
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                
                lineBottomSrc: url_common_line_bottom,
                
                popRatio: g_home_gem_get_pop_bg_ratio,
                popBgSrc: url_home_power_gem_get_bg,
                gemSrc: url_gem_power,
                name: '',
                desc: [],
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {
            console.log('get-gem: room index: ', this.roomIndex)

            this.updateGemInfo()
        },
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            updateGemInfo() {
                if (this.roomIndex == 1) {
                    this.popBgSrc = url_home_power_gem_get_bg
                    this.gemSrc = url_gem_power
                    this.name = '蓝宝石'
                    this.desc = [
                        "红宝石代表浪漫，约瑟芬皇后在",
                        "两个世纪中给爱情",
                        "巴黎带来了无限的灵感"
                    ]
                } else if (this.roomIndex == 2) {
                    this.popBgSrc = url_home_eternity_gem_get_bg
                    this.gemSrc = url_gem_eternity
                    this.name = '红宝石'
                    this.desc = [
                        "红宝石代表浪漫，约瑟芬皇后在",
                        "两个世纪中给爱情",
                        "巴黎带来了无限的灵感"
                    ]
                } else if (this.roomIndex == 3) {
                    this.popBgSrc = url_home_fashion_gem_get_bg
                    this.gemSrc = url_gem_fashion
                    this.name = '钻石'
                    this.desc = [
                        "红宝石代表浪漫，约瑟芬皇后在",
                        "两个世纪中给爱情",
                        "巴黎带来了无限的灵感"
                    ]
                } else if (this.roomIndex == 4) {
                    this.popBgSrc = url_home_love_gem_get_bg
                    this.gemSrc = url_gem_love
                    this.name = '粉宝石'
                    this.desc = [
                        "红宝石代表浪漫，约瑟芬皇后在",
                        "两个世纪中给爱情",
                        "巴黎带来了无限的灵感"
                    ]
                } else if (this.roomIndex == 5) {
                    this.popBgSrc = url_home_transmission_gem_get_bg
                    this.gemSrc = url_gem_transmission
                    this.name = '绿宝石'
                    this.desc = [
                        "红宝石代表浪漫，约瑟芬皇后在",
                        "两个世纪中给爱情",
                        "巴黎带来了无限的灵感"
                    ]
                } else if (this.roomIndex == 6) {
                    this.popBgSrc = url_home_creation_gem_get_bg
                    this.gemSrc = url_gem_creation
                    this.name = '黄宝石'
                    this.desc = [
                        "红宝石代表浪漫，约瑟芬皇后在",
                        "两个世纪中给爱情",
                        "巴黎带来了无限的灵感"
                    ]
                }
                
                this.addGem()
            },
            addGem() {
                console.log('get-gem: ' + this.roomIndex + ' get gem')
                let that = this
                uni.request({
                    url: api_add_gem,
                    method: 'POST',
                    data: {
                        room_number: this.roomIndex,
                        diamond_number: '1'
                    },
                    header: {
                        'Content-Type': 'application/json',
                        'Authorization': 'chaumet ' + getApp().globalData.userInfo.token,
                    },
                    success: (res) => {
                        console.log(res)
                        if (res.data.status == 0) {
                            console.log('get-gem: add gem ok')
            
                            if(getApp().globalData.userInfo.onsite == 1) {
                                getApp().globalData.userInfo.diyTiaraInfo.gemsOnsite[that.roomIndex - 1].isGet = true
                            } else {
                                getApp().globalData.userInfo.diyTiaraInfo.gemsOnline[that.roomIndex - 1].isGet = true
                            }
                            uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
            
                            that.$emit('addGem', 'success')
                        }
                    },
                    fail: (err) => {
                        console.log('get-gem: ', err)
                        
                        that.$emit('addGem', 'fail')
                    }
                })
            },
        }
    }
</script>

<style>
    .container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        
        background-color: rgba(255, 255, 255, 0.3);
    }

    .gem-get-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    
    .title, .name {
        font-size: 18px;
        height: 30px;
        line-height: 30px;
    }
    
    .title {
        padding-top: 20px;
    }
    
    .bottom-line {
        width: 50%;
        /* margin-left: 25%; */
    }
    
    .gem-img {
        width: 30%;
        margin-top: 30px;
    }
    
    .desc-first,
    .desc {
        font-size: 14px;
        line-height: 28px;
        width: 80%;
        text-align: center;
    }
    
    .desc-first {
        padding-top: 40px;
    }
</style>
