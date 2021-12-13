<script>
    export default {
        // 初始化完成时触发（全局只触发一次）
        onLaunch: function(params) {
            console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
            console.log('app params: ', params)
            
            this.globalData.from = params.query.from
            this.globalData.channel = params.query.channel
            console.log('app from : ', this.globalData.from)
            
            var s = uni.getSystemInfoSync()
            this.globalData.sWidth = s.screenWidth
            this.globalData.sHeight = s.screenHeight
            this.globalData.wWidth = s.windowWidth
            this.globalData.wHeight = s.windowHeight
            this.globalData.pixelRatio = s.pixelRatio

            console.log('window width: ' + this.globalData.wWidth + ', height: ' + this.globalData.wHeight)
            console.log('screen width: ' + this.globalData.sWidth + ', height: ' + this.globalData.sHeight)

            // #ifdef MP-WEIXIN
            let r = uni.getMenuButtonBoundingClientRect()
            console.log('bounding menu rect: ', r)
            this.globalData.boundingMenu.width = r.width
            this.globalData.boundingMenu.height = r.height
            this.globalData.boundingMenu.top = r.top
            this.globalData.boundingMenu.bottom = r.bottom
            this.globalData.boundingMenu.left = r.left
            this.globalData.boundingMenu.right = r.right
            // #endif

            // #ifdef H5
            var u = navigator.userAgent //http request header
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //判断Android终端
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios
            console.log('Android: ' + isAndroid)
            console.log('IOS: ' + isIOS)
            // #endif

            // #ifdef MP-WEIXIN
            uni.loadFontFace({
                global: true, // 是否全局可用
                scopes: ['webview', 'native'], // 重点!!!使字体在原生canvas 2d里面也可用
                family: 'Adobe',
                source: 'url("https://qn.notionbase.com/chaumet/font/Adobe1015.woff")',
                success(e) {
                    console.log('success', e)
                },
                fail(err) {
                    console.log('failed', err)
                },
            })

            uni.login({
                provider: 'weixin',
                success: res => {
                    console.log(res)

                    // the code is used to get openid
                    this.globalData.userInfo.code = res.code
                }
            })
            // #endif
        },
        // 启动，或从后台进入前台显示
        onShow: function() {},
        // 从前台进入后台
        onHide: function() {},
        // 报错时触发
        onError: function() {},
        // 页面发送的数据进行监听
        onUniNViewMessage: function() {},
        // 对未处理的 Promise 拒绝事件监听函数
        onUnhandledRejection: function() {},
        // 页面不存在监听函数
        onPageNotFound: function() {},
        // 监听系统主题变化
        onThemeChange: function() {},
        // global variable
        globalData: {
            sWidth: 0,
            sHeight: 0,
            wWidth: 0,
            wHeight: 0,
            pixelRatio: 2,
            boundingMenu: {
                width: 0,
                height: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            isCountDownFirst: false, // 是否直接显示倒计时
            from: '', // weixin：weixin，red：xiaohongshu，Digital Tool：Digital，pulbic：public
            channel: 0, // channel
            shareTitle: 'share title',
            shareDesc: '',
            shareImg: 'https://qn.notionbase.com/chaumet/common/share-theme.jpg?v=0.1',
            userInfo: {
                token: null,
                code: null, // use to get openid
                name: null,
                type: -1, // 0:power，1:eternity，2:fashion，3:love，4:transission, 5: creative
                sex: 1, // 1:King, 2:Queen
                age: null,
                phone: null,
                city: null,
                from: null,
                onsite: -1, // online:0, onsite:1
                stage: 0, // 0:rsvp, 1: home
                isActive: true,
                stageInfo: {
                    rsvp: {
                        date: null, // date
                        time: null, // time
                    },
                },
            },
        },
    }
</script>

<style>
    @import url("./static/font/font.css");

    /* public css */
    page,
    body {
        width: 100%;
        height: 100%;
        color: #FFFFFF;
        background-image: linear-gradient(#061655, #4B5EA5);
        font-family: 'Adobe-Regular', 'HanSansCN-Regular';

        overflow: hidden;
    }

    .bounceInEffect {
        animation: bounceIn 2s linear;
        -webkit-animation: bounceIn 2s linear;
        -ms-animation: bounceIn 2s linear;
        -moz-animation: bounceIn 2s linear;
    }

    .fadeInThreeEffect {
        animation: breathing 1s linear 3;
        -webkit-animation: breathing 1s linear 3;
        -ms-animation: breathing 1s linear 3;
        -moz-animation: breathing 1s linear 3;
    }

    .fadeInEffect {
        animation: breathing 0.5s linear 2;
        -webkit-animation: breathing 0.5s linear 2;
        -ms-animation: breathing 0.5s linear 2;
        -moz-animation: breathing 0.5s linear 2;
    }

    .breathingEffect {
        animation: breathing 3s linear infinite;
        -webkit-animation: breathing 3s linear infinite;
        -ms-animation: breathing 3s linear infinite;
        -moz-animation: breathing 3s linear infinite;
    }

    @keyframes breathing {
        0% {
            opacity: 0.2;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0.2;
        }
    }

    @-webkit-keyframes breathing {
        0% {
            opacity: 0.2;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0.2;
        }
    }

    @-ms-keyframes breathing {
        0% {
            opacity: 0.2;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0.2;
        }
    }

    @-moz-keyframes breathing {
        0% {
            opacity: 0.2;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0.2;
        }
    }

    .rotateEffect {
        animation: rotate 3s linear infinite;
        -webkit-animation: rotate 3s linear infinite;
        -ms-animation: rotate 3s linear infinite;
        -moz-animation: rotate 3s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotateZ(0deg);
        }

        to {
            transform: rotateZ(360deg);
        }
    }

    @-webkit-keyframes rotate {
        from {
            transform: rotateZ(0deg);
        }

        to {
            transform: rotateZ(360deg);
        }
    }

    @-ms-keyframes rotate {
        from {
            transform: rotateZ(0deg);
        }

        to {
            transform: rotateZ(360deg);
        }
    }

    @-moz-keyframes rotate {
        from {
            transform: rotateZ(0deg);
        }

        to {
            transform: rotateZ(360deg);
        }
    }

    .scaleEffect {
        animation: scale .5s linear;
        -webkit-animation: scale .5s linear;
        -ms-animation: scale .5s linear;
        -moz-animation: scale .5s linear;
    }

    @keyframes scale {
        from {
            transform: scale(0.8);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @-webkit-keyframes scale {
        from {
            transform: scale(0.8);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @-ms-keyframes scale {
        from {
            transform: scale(0.8);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @-moz-keyframes scale {
        from {
            transform: scale(0.8);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* page fade */
    .pt-page-fade {
        animation: pagefade 1s linear;
        -webkit-animation: pagefade 1s linear;
        -ms-animation: pagefade 1s linear;
        -moz-animation: pagefade 1s linear;
    }

    /* pagefade */
    @keyframes pagefade {
        0% {
            opacity: 0.2;
        }

        100% {
            opacity: 1.0;
        }
    }

    @-webkit-keyframes pagefade {
        0% {
            opacity: 0.2;
        }

        100% {
            opacity: 1.0;
        }
    }

    @-moz-keyframes pagefade {
        0% {
            opacity: 0.2;
        }

        100% {
            opacity: 1.0;
        }
    }
</style>
