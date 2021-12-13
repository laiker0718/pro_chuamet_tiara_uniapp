<template>
	<view class="ar-container">
		<kivicube-scene class="ar-kivicube" 
            scene-id="qWSsRZNwTEeIkIhVs4Q9bTjiPGANWfny"
            sceneId="qWSsRZNwTEeIkIhVs4Q9bTjiPGANWfny" 
            hideScan=true
            hideDownload=true
            hideLoading=true
            hideTakePhoto=true
            @ready="ready" 
            @error="error"
		    @downloadAssetStart="downloadStart" 
            @downloadAssetProgress="downloadProgress"
		    @downloadAssetEnd="downloadEnd" 
            @loadSceneStart="loadStart" 
            @loadSceneEnd="loadEnd" 
            @sceneStart="sceneStart"
            @tracked="tracked"
            @lostTrack="lostTrack"
		    @openUrl="openUrl" 
            @photo="photo" />
            
		<cover-image class="ar-filter-img" :src="arFilterSrc"></cover-image>
        
        <cover-image class="ar-tiara-dotted" :src="tiaraDottedSrc"
            :style="{'width': width * 0.6 + 'px', 'height': width * 0.6 * tiaraDottedRatio + 'px'}"></cover-image>
        
        <cover-view class="ar-tips" :style="{'bottom': width * barBottomRatio + 20 + 'px'}">在展厅内寻找此形状的冠冕</cover-view>
        
		<cover-image class="ar-bar-bottom" :src="barBottom"
		    :style="{'width': width + 'px', 'height': width * barBottomRatio + 'px'}"></cover-image>
            
        <cover-image class="ar-btn-back" :src="backSrc" @click="onBtnBack"
            :style="{'top': btnTop + 'px', 'left': btnLeft + 'px', 'width': width * 0.1 + 'px', 'height': width * 0.1 * 0.5 + 'px'}">
        </cover-image>
	</view>
</template>

<script>
    import {
        url_common_bar_bottom,
        url_home_power_ar_filter,
        url_home_power_dotted_tiara,
        
        url_common_btn_back,
    } from '@/common/globaldata.js'
    
    import {
        g_bar_bottom_ratio,
        g_home_power_dotted_tiara_ratio,
    } from '@/common/const.js'
    
    const {
        setPackageRootPath,
        downloadSceneAsset,
        clearSceneCache
    } = requirePlugin("kivicube")
    
    setPackageRootPath("arPackage")
    
	export default {
		name: 'ar-package-ar',
		data() {
			return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,
                
                titleTop: 120,
                
                barBottom: url_common_bar_bottom,
                barBottomRatio: g_bar_bottom_ratio,
                
                backSrc: url_common_btn_back,
                btnTop: 20,
                btnLeft: 5,
                btnHeight: 30,
                
                arFilterSrc: url_home_power_ar_filter,
                tiaraDottedSrc: url_home_power_dotted_tiara,
                tiaraDottedRatio: g_home_power_dotted_tiara_ratio,
                
                isRecognized: false,
			}
		},
		onInit() {},
		onLoad() {
            if(this.height / this.width > 2) {
                this.titleTop = 120
            } else {
                this.titleTop = 40
            }
            
            this.btnTop = getApp().globalData.boundingMenu.top + 10
            this.btnLeft = getApp().globalData.wWidth - getApp().globalData.boundingMenu.right
            this.btnHeight = getApp().globalData.boundingMenu.height
        },
		onUnload() {},
		onReady() {},
		onShow() {},
		onHide() {},
		onResize() {},
		onPullDownRefresh() {},
		onReachBottom() {},
		onTabItemTap() {},
		onShareAppMessage() {},
		onShareTimeline() {},
		onAddToFavorites() {},
		methods: {
            eventRecognized() {
                console.log('eventRecognized')
            
            },
            onBtnBack() {
                console.log('onBtnBack')
                uni.redirectTo({
                    url: '../../../pages/chapter/chapter?index=1'
                })
            },
            
            ready() {
                console.log("ready");
                // wx.showToast({
                //     title: "场景加载中...",
                //     icon: "none"
                // });
            },
            downloadStart() {
                console.log("downloadStart");
            },
            downloadProgress({
                detail: progress
            }) {
                console.log("downloadProgress", progress);
            },
            downloadEnd() {
                console.log("downloadEnd");
            },
            loadStart() {
                console.log("loadStart");
            },
            loadEnd() {
                console.log("loadEnd");
            },
            sceneStart() {
                console.log("sceneStart");
                // wx.showToast({
                //     title: "可开始体验场景",
                //     icon: "none"
                // });
                
                uni.redirectTo({
                    url: '../../../pages/productDetail/productDetail?roomIndex=1&productIndex=2'
                })
            },
            tracked() {
                console.log("tracked");
            },
            lostTrack() {
                console.log("lostTrack");
            },
            openUrl({
                detail: url
            }) {
                console.log("openUrl", url);
            },
            photo({
                detail: photoPath
            }) {
                wx.saveImageToPhotosAlbum({
                    filePath: photoPath,
                    success() {
                        console.log("保存照片成功");
                    },
                    fail(e) {
                        console.error("保存照片失败", e);
                    }
                });
            },
            error(e) {
                const {
                    detail
                } = e;
                if (detail && detail.isCameraAuthDenied) {
                    // 如果是权限问题，则向用户申请权限。
                    const page = this;
                    wx.showModal({
                        title: "提示",
                        content: "请给予“摄像头”权限",
                        success() {
                            wx.openSetting({
                                success({
                                    authSetting: {
                                        "scope.camera": isGrantedCamera
                                    }
                                }) {
                                    if (isGrantedCamera) {
                                        clearSceneCache();
                                        wx.redirectTo({
                                            url: "/" + page.route
                                        });
                                    } else {
                                        wx.showToast({
                                            title: "获取“摄像头”权限失败！",
                                            icon: "none"
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
                console.error(e);
            }
		}
	}
</script>

<style>
    .ar-container {
        display: block;
        
        width: 100%;
        height: 100%;
    }
    
    .ar-kivicube {
        /* display: block; */
        
        width: 100%;
        height: 100%;
    }
    
    .ar-filter-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    
    .ar-tiara-dotted {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    
    .ar-title-content {
        position: absolute;
        width: 100%;
    }
    
    .ar-main-title {
        position: absolute;
        width: max-content;
        font-size: 26px;
        line-height: 33px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    	text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        left: 50%;
        transform: translateX(-50%);
    }
    
    .ar-sub-title {
        position: absolute;
        width: max-content;
        font-size: 18px;
        line-height: 20px;
        margin-top: 36px;
    	text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        left: 50%;
        transform: translateX(-50%);
    }
    
    .ar-top-content {
        position: absolute;
    }
    
    .ar-tips {
        position: absolute;
        left: 0px;
        width: 100%;
        text-align: center;
    }
    
    .ar-bar-bottom {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
    }
    
    .ar-btn-back {
        position: absolute;
    }
</style>
