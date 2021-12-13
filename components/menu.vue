<template>
    <uni-transition mode-class="fade" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container" @click="onMainmenuClicked(-1)">
            <uni-transition mode-class="slide-left" :duration="500" :show="true"
                :styles="{'width': '100%', 'height': '100%'}">
                <view class="menu-container">
                    <view class="menu-content" :style="{'top': topHeight + 'px', 'bottom': bottomHeight + 'px', 'height': height - topHeight - bottomHeight + 'px'}">
                        <block v-for="(item, index) in menuList" :key="index">
                            <view class="menu-item" @click="onMainmenuClicked(index)">
                                <view class="menu-chapter">
                                    <view class="menu-chapter-index">{{item.chapter}}</view>
                                    <!-- <view class="arrow-right">{{arrowRight}}</view> -->
                                    <image class="arrow-right" :src="arrowRight" mode="widthFix"></image>
                                </view>
                                <view class="menu-name">{{item.name}}</view>
                            </view>
                        </block>
                    </view>
                </view>
            </uni-transition>
        </view>
    </uni-transition>
</template>

<script>
    import {
        url_common_arrow_right
    } from '@/common/globaldata.js'
    
    import {
        g_main_menu,
        
        g_bar_bottom_ratio,
    } from '@/common/const.js'

    export default {
        name: 'main-menu',
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                
                barBottomRatio: g_bar_bottom_ratio,
                
                menuList: g_main_menu,
                // arrowRight: ">",
                arrowRight: url_common_arrow_right,
                
                topHeight: 0,
                bottomHeight: 0,
            }
        },
        beforeCreate() {},
        created() {
            this.topHeight = getApp().globalData.boundingMenu.bottom
            this.bottomHeight = this.width * this.barBottomRatio
        },
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            onMainmenuClicked(e) {
                console.log('onMainmenuClicked: ', e)

                this.$emit('onMainmenuClicked', e)
            }
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
        background-color: rgba(13, 37, 122, 0.7);
    }
    
    .menu-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 60%;
        height: 100%;
        background-color: rgba(13, 37, 122, 1);
    }
    
    .menu-content {
        position: absolute;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        width: 100%;
        overflow-y: scroll;
    }

    .menu-item {
        display: inline-block;
        width: 80%;
        margin-left: 10%;
        /* color: #05216A; */
        color: #FFFFFF;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .menu-chapter {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #FFFFFF;
        font-size: 26px;
        height: 30px;
        line-height: 30px;
        font-family: 'Adobe-Regular';
    }
    
    .arrow-right {
        width: 5%;
    }

    .menu-name {
        font-size: 15px;
        height: 24px;
        line-height: 24px;
    }
</style>
