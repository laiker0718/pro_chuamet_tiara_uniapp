<template>
    <uni-transition mode-class="slide-right" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
        <view class="container"
            :style="{'background-image': 'url(' + bgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'cover'}">

            <Top mainTitle="TIARA DREAM" subTitle="冠冕绮梦" :opacity="1"></Top>

            <view class="form"
                :style="{'width': width * 0.90 + 'px', 'height': width * 0.90 * popRatio + 'px', 'background-image': 'url(' + popBgSrc + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}">
                <view class="information">预约信息</view>

                <view class="name-content">
                    <view class="title">姓名</view>
                    <input class="input" :style="{'border-bottom': isNameInvalid ? '1px solid #FF0000' : '1px solid #AAAAAA'}" placeholder=" " :value="name" @input="onNameChange" />
                </view>
                <view class="phone-content">
                    <view class="title">手机</view>
                    <input class="input" :style="{'border-bottom': isPhoneInvalid ? '1px solid #FF0000' : '1px solid #AAAAAA'}" type="number" placeholder=" " :value="phone" @input="onPhoneChange" />
                </view>
                <view class="valid-code">
                    <view class="title">验证码</view>
                    <view class="valid-code-content">
                        <input class="valid-code-input" :style="{'border-bottom': isVerifyCodeInvalid ? '1px solid #FF0000' : '1px solid #AAAAAA'}" type="number" placeholder=" " :value="validCode"
                            @input="onValidCodeChange" />
                        <view class="valid-code-btn" @click="onBtnGetValidCode"
                            :style="{'background-color': isValidCodeClicked ? '#808080' : '#05216A'}">{{validCodeTip}}
                        </view>
                    </view>
                </view>
                <view class="age-and-city-content">
                    <view class="age-content">
                        <view class="title-age">年龄段</view>
                        <view class="pick-content-age">
                            <picker class="picker-age" @change="bindAgeChange" :value="age" :range="ageArr">
                                <view class="age-item">{{ageArr[age]}}</view>
                            </picker>
                            <image class="arrow-solid-age" :src="arrowSolidDown" ></image>
                        </view>
                    </view>
                    <view class="city-content">
                        <view class="title-city">常住地</view>
                        <view class="pick-content-city">
                            <!-- <picker class="picker-city" @change="bindCityChange" :value="city" :range="cityArr">
                                <view class="city-item">{{cityArr[city]}}</view>
                            </picker> -->
                            <picker class="picker-city" mode="multiSelector" @columnchange="bindCityChange"
                                :value="cityIndex" :range="cityArr">
                                <view class="city-item">{{cityArr[1][cityIndex[1]]}}</view>
                            </picker>
                            <image class="arrow-solid-city" :src="arrowSolidDown" ></image>
                        </view>
                    </view>
                </view>
                <view class="date-content">
                    <view class="title">日期</view>
                    <view class="pick-content">
                        <picker class="picker" @change="bindDateChange" :value="date" :range="dateArr">
                            <view class="city-item">{{dateArr[date]}}</view>
                        </picker>
                        <image class="arrow-solid" :src="arrowSolidDown"></image>
                    </view>
                </view>
                <view class="time-content">
                    <view class="title">时间</view>
                    <view class="pick-content">
                        <picker class="picker" @change="bindTimeChange" :value="time" :range="timeArr">
                            <view class="city-item">{{timeArr[time]}}</view>
                        </picker>
                        <image class="arrow-solid" :src="arrowSolidDown" ></image>
                    </view>
                </view>

                <view class="privacy-content">
                    <image class="privacy-select" :src="privacySelect" @click="onBtnPrivacySelect">
                    </image>
                    <view class="privacy-text" :style="{'border-bottom': '1px solid #0B257A'}"  @click="onBtnPrivacy">个人信息处理规则</view>
                </view>
                
				<view :class="['btn-confirm', isDataInvalid ? 'bounceInEffect' : '']"
				    :style="{'width': width * 0.4 + 'px', 'height': width * 0.4 * btnBgRatio + 'px', 'background-image': 'url(' + btnBg + ')', 'background-repeat': 'no-repeat', 'background-size': 'contain'}"
				    @click="onBtnConfirm">
				    确认信息
				</view>
            </view>

            <Bottom></Bottom>

            <Back @onBtnBack="onBtnBack"></Back>
 
            <Privacy v-if="isShowPolicy" @onBtnClose="onBtnClose"></Privacy>
        </view>
    </uni-transition>
</template>

<script>
    // 用户信息输入
    import Top from '@/components/top.vue'
    import Bottom from '@/components/bottom.vue'
    import Back from '@/components/back.vue'
    import Privacy from '@/components/privacy.vue'

    import {
        url_common_btn_blue_background,

        url_rsvp_bg_input,
        url_rsvp_input_bg_pop,
        url_rsvp_input_arrow_solid_up,
        url_rsvp_input_arrow_solid_down,
        url_rsvp_input_arrow_solid_down_base64,
        url_rsvp_input_arrow_up,
        url_rsvp_input_arrow_down,
        url_rsvp_input_radio_unselected,
        url_rsvp_input_radio_selected,

        url_rsvp_input_privacy1,
        url_rsvp_input_privacy2,
        url_rsvp_input_privacy3,
        url_rsvp_input_privacy_selected,
        url_rsvp_input_privacy_unselected,

        url_rsvp_input_btn_close,

        api_send_code,
        api_regist,
        api_pause_times,
    } from '@/common/globaldata.js'

    import {
        g_rsvp_input_ratio,

        g_btn_background_blue_ratio
    } from '@/common/const.js'

    import {
        g_city_list
    } from '@/common/city.js'

    export default {
        name: 'appointment-input',
        components: {
            Top,
            Bottom,
            Back,
            Privacy,
        },
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,

                bgSrc: url_rsvp_bg_input,
                popBgSrc: url_rsvp_input_bg_pop,
                popRatio: g_rsvp_input_ratio,

                arrowSolidDown: url_rsvp_input_arrow_solid_down_base64,

                btnBg: url_common_btn_blue_background,
                btnBgRatio: g_btn_background_blue_ratio,

                name: '',
                phone: '',
                validCode: '',
                receiveCode: '',
                isValidCodeClicked: false,
                timerCount: 60,
                validCodeTip: '获取验证码',
                age: 2,
                ageArr: [
                    '<18',
                    '18-24',
                    '24-30',
                    '30-35',
                    '35-40',
                    '>40',
                ],
                proviceKeys: [],
                cityIndex: [0, 0],
                cityArr: [
                    [],
                    []
                ],
                date: 0,
                dateArr: [],
                time: 0,
				timeArrAll: [
					'10:00~11:00',
					'11:00~12:00',
                    '12:00~13:00',
					'13:00~14:00',
					'14:00~15:00',
					'15:00~16:00',
					'16:00~17:00',
					'17:00~18:00',
                    '18:00~19:00',
                    '19:00~20:00',
                    '20:00~21:00',
                    '21:00~22:00',
				],
                timeArr: [
					'14:00~15:00',
					'15:00~16:00',
					'16:00~17:00',
                    '17:00~18:00',
                    '18:00~19:00',
                    '21:00~22:00',
				],
                isNameInvalid: false,
                isPhoneInvalid: false,
                isVerifyCodeInvalid: false,
                isPrivacyInvalid: false,
                isDataInvalid: false,

                isPrivacySelect: false,
                privacySelect: url_rsvp_input_privacy_unselected,
                
                isShowPolicy: false, // 是否显示隐私条款
                pauseTimes: {},
            }
        },
        beforeCreate() {},
        created() {
            let datePre = "2021-11-"
            let dateStart = 5
            let dateEnd = 31
            if(getApp().globalData.from == 'xiaohongshu') {
                dateStart = 6
                dateEnd = 7
                
                this.timeArr = []
                this.timeArr = this.timeArr.concat(this.timeArrAll)
                this.timeArr.splice(3, 9)
            } else {
				let curDate = new Date()
				let curYear = curDate.getFullYear()
				let curMonth = curDate.getMonth() + 1
				let curDay = curDate.getDate()
				console.log('curYear: ', curYear, ', curMonth: ', curMonth, ', curDay: ', curDay)
				if(curYear == '2021' && curMonth == '11' && curDay > dateStart) {
					dateStart = curDay
				}
			}
            for(let date = dateStart; date < dateEnd; date++) {
                let dateStr
                if(date < 10) {
                    dateStr = datePre + '0' + date
                } else {
                    dateStr = datePre + date
                }
                
                this.dateArr.push(dateStr)
            }
            
            this.getPauseTimes()
            
            let proviceList = g_city_list.province_list
            for (var key in proviceList) {
                this.proviceKeys.push(key)
                this.cityArr[0].push(proviceList[key])
            }
            
            this.parseCityList(0)
        },
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            parseCityList(province) {
                this.cityArr[1] = []

                let provinceKeyPre = this.proviceKeys[province].substr(0, 2)

                let cityList = g_city_list.city_list
                for (var cKey in cityList) {
                    let cityKeyPre = cKey.substr(0, 2)
                    if (provinceKeyPre == cityKeyPre) {
                        this.cityArr[1].push(cityList[cKey])
                    }
                }
            },
            onNameChange(e) {
                this.isNameInvalid = false
                
                // console.log('onNameChange')
                this.name = e.detail.value
                // console.log(this.name)
            },
            onPhoneChange(e) {
                this.isPhoneInvalid = false
                
                // console.log('onPhoneChange')
                this.phone = e.detail.value
                // console.log(this.phone)
            },
            onValidCodeChange(e) {
                this.isVerifyCodeInvalid = false
                
                // console.log('onValidCodeChange')
                this.validCode = e.detail.value
                // console.log(this.validCode)
            },
            onBtnGetValidCode() {
                console.log('onBtnGetValidCode')
                if (this.isValidCodeClicked) return

                if (this.phone.length < 11) {
                    return
                }
                var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
                if (!reg.test(this.phone)) {
                    return
                }

                this.isValidCodeClicked = true
                this.timerCount = 60
                this.validCodeTip = this.timerCount.toString()
                let timer = setInterval(() => {
                    this.timerCount--
                    this.validCodeTip = this.timerCount.toString()
                    if (this.timerCount <= 0) {
                        this.isValidCodeClicked = false
                        this.timerCount = 60
                        this.validCodeTip = '获取验证码'

                        clearInterval(timer)
                    }
                }, 1000)

                let that = this
                uni.request({
                    url: api_send_code,
                    method: 'POST',
                    data: {
                        'phone': this.phone
                    },
                    success: res => {
                        console.log(res)
                        if (res.data.status == 0) {
                            that.receiveCode = res.data.data.code
                            that.isDataInvalid = false
                        }
                    },
                    fail: err => {
                        console.log(err)
                    }
                })
            },
            bindAgeChange(e) {
                console.log('bindAgeChange')
                this.age = e.target.value
                console.log(this.age)
            },
            bindCityChange(e) {
                console.log('bindCityChange')

                this.cityIndex[e.target.column] = e.target.value
                if (e.detail.column == 0) {
                    this.parseCityList(this.cityIndex[0])
                }
                // else if (e.detail.column == 1) {
                //     this.$forceUpdate()
                // }
                this.$forceUpdate()
            },
            bindDateChange(e) {
                console.log('bindDateChange')
                this.date = e.target.value
                console.log(this.date)
                
                this.updateTimesByDate()
            },
            updateTimesByDate() {
                this.timeArr = []
                this.timeArr = this.timeArr.concat(this.timeArrAll)
                this.time = 0
                if(getApp().globalData.from == 'xiaohongshu') {
                    this.timeArr.splice(3, 9)
                } else {
                    if(this.dateArr[this.date] == '2021-11-05') { // 11-05
                        this.timeArr.splice(0, 4)
                    	this.timeArr.splice(5, 2)
                    } else if(this.dateArr[this.date] == '2021-11-06') { // 11-06
                    	this.timeArr.splice(0, 4)
                    } else if(this.dateArr[this.date] == '2021-11-07') { // 11-07
                    	this.timeArr.splice(0, 2)
                    	this.timeArr.splice(2, 4)
                    } else if(this.dateArr[this.date] == '2021-11-08') { // 11-08
                    	this.timeArr.splice(4, 2)
                    } else if(this.dateArr[this.date] == '2021-11-14') { // 11-14
                    	this.timeArr.splice(4, 1)
                    } else if(this.dateArr[this.date] == '2021-11-20') { // 11-20
                    	this.timeArr.splice(3, 2)
                    } else if(this.dateArr[this.date] == '2021-11-21') { // 11-21
                    	this.timeArr.splice(0, 3)
                    } else if(this.dateArr[this.date] == '2021-11-30') { // 11-30
                        this.timeArr.splice(8, 4)
                    }
                }
                
                let dateKey = this.dateArr[this.date]
                let pauseTimes = this.pauseTimes[dateKey]
                console.log('puase times: ', pauseTimes)
                
                if(pauseTimes == undefined || pauseTimes == 'undefined') {
					
				} else {
					console.log('time arr befor: ', this.timeArr)
					let that = this
					pauseTimes.forEach(item => {
					    console.log(item)
					    let index = 0
					    that.timeArr.forEach(time => {
					        if(time.indexOf(item) == 0) {
					            console.log('find it')
					            that.timeArr.splice(index, 1)
					            console.log('time arr after: ', that.timeArr)
					        }
					        
					        index++
					    })
					})
				}
                
				let curDate = new Date()
				let curYear = curDate.getFullYear()
				let curMonth = curDate.getMonth() + 1
				let curDay = curDate.getDate()
				let curStr = curYear + '-' + 
					(curMonth < 10 ? '0' + curMonth : curMonth) + '-' + 
					(curDay < 10 ? '0' + curDay : curDay)
				if (curStr == this.dateArr[this.date]) {
					let arr = [].concat(this.timeArr)
					let destArr = []
					let hours = new Date().getHours()
					arr.forEach(item => {
					    let time = parseInt(item.substring(0, 2))
					    if(time >= hours) {
					        destArr.push(item)
					    }
					})
					
					this.timeArr = [].concat(destArr)
				}
            },
            bindTimeChange(e) {
                console.log('bindTimeChange')
                this.time = e.target.value
                console.log(this.time)
            },
            onBtnConfirm() {
                return 
                
                console.log('onBtnConfirm')
                console.log(this.isDataInvalid)

                if (!this.isPrivacySelect) {
                    this.isPrivacyInvalid = true
                    return
                }

                if (this.isDataInvalid) return

                var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
                if (!reg.test(this.phone)) {
                    this.isPhoneInvalid = true
                    this.isDataInvalid = true
                }

                if (this.name.length < 1 || this.name.length > 10) {
                    this.isNameInvalid = true
                    this.isDataInvalid = true
                }

                if (this.validCode.length < 5 || this.validCode != this.receiveCode) {
                    this.isVerifyCodeInvalid = true
                    this.isDataInvalid = true
                }

                if (this.isDataInvalid) {
                    let timer = setTimeout(() => {
                        this.isDataInvalid = false
                        clearTimeout(timer)
                    }, 2000)

                    return
                }
                
                getApp().globalData.userInfo.onsite = 1
                getApp().globalData.userInfo.name = this.name
                getApp().globalData.userInfo.age = this.ageArr[this.age]
                getApp().globalData.userInfo.phone = this.phone
                getApp().globalData.userInfo.city = this.cityArr[1][this.cityIndex[1]] // this.cityArr[this.city]
                getApp().globalData.userInfo.stageInfo.rsvp.date = this.dateArr[this.date]
                getApp().globalData.userInfo.stageInfo.rsvp.time = this.timeArr[this.time]
                
                console.log(getApp().globalData.userInfo)

                let from = 1 // 1: 小程序，2：H5
                // #ifdef MP-WEIXIN
                from = 1
                // #endif
                
                // #ifdef H5
                from = 2
                // #endif
                
                // Digital： 3， 小红书：4 , 现场码：5
                if(getApp().globalData.from == 'xiaohongshu') {
                    from = 4
                } else if(getApp().globalData.from == 'Digital') {
                    from = 3
                } else if(getApp().globalData.userInfo.from == 'onsite') {
                    from = 5
                }
                
                // #ifdef H5
                console.log('channel: ', getApp().globalData.channel)
                
                if(getApp().globalData.channel != 0) {
                    from = from * 10 + getApp().globalData.channel
                }
                // #endif
                
                let that = this
                uni.request({
                    url: api_regist,
                    method: 'POST',
                    data: {
                        token: getApp().globalData.userInfo.token,
                        name: getApp().globalData.userInfo.name,
                        type: getApp().globalData.userInfo.type,
                        sex: getApp().globalData.userInfo.sex,
                        age: getApp().globalData.userInfo.age,
                        phone: getApp().globalData.userInfo.phone,
                        city: getApp().globalData.userInfo.city,
                        onsite: getApp().globalData.userInfo.onsite,
                        date: getApp().globalData.userInfo.stageInfo.rsvp.date,
                        time: getApp().globalData.userInfo.stageInfo.rsvp.time,
                        source: from
                    },
                    success: res => {
                        console.log(res)
                        if (res.data.status == 0) {
                            getApp().globalData.userInfo.token = res.data.data.token
                            getApp().globalData.userInfo.onsite = 1
                            // store userInfo
                            uni.setStorageSync('userInfo', JSON.stringify(getApp().globalData.userInfo))
                            
                            that.$emit("onCompChange", 'QrCode')
                            // if(getApp().globalData.userInfo.stage == 1 && getApp().globalData.userInfo.from == 'onsite') {
                            //     that.$emit("onCompChange", 'Home')
                            // } else {
                            //     that.$emit("onCompChange", 'QrCode')
                            // }
                        }
                    },
                    fail: err => {
                        console.log(err)
                    }
                })
            },
            onBtnPrivacySelect() {
                this.isPrivacyInvalid = false
                
                this.isPrivacySelect = !this.isPrivacySelect
                if (this.isPrivacySelect) {
                    this.privacySelect = url_rsvp_input_privacy_selected
                } else {
                    this.privacySelect = url_rsvp_input_privacy_unselected
                }
            },
            onBtnPrivacy() {
                if (this.isShowPolicy) return

                this.isShowPolicy = true
            },
            onBtnClose() {
                if (!this.isShowPolicy) return
                this.isShowPolicy = false
            },
            onBtnBack() {
                console.log('onBtnBack')
                if(getApp().globalData.userInfo.stage == 1 && getApp().globalData.userInfo.from == 'onsite') {
                    this.$emit("onCompChange", 'Home')
                } else {
                    this.$emit("onCompChange", 'Onsite')
                }
            },
            getPauseTimes() {
                let that = this
                uni.request({
                    url: api_pause_times,
                    method: 'POST',
                    success: res => {
                        console.log(res)
                        if (res.data.status == 0) {
                            that.pauseTimes = res.data.data.pause_type
                            console.log('pause times: ', that.pauseTimes)
                            that.updateTimesByDate()
                        }
                    },
                    fail: err => {
                        console.log(err)
                    }
                })
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        background-color: #05216A;
        font-family: 'Adobe-Regular', 'HanSansCN-Regular';
    }

    .form {
        margin-top: 30px;
        margin-left: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #05216A;
    }

    .information {
        width: 100%;
        text-align: center;
        /* padding-top: 40px; */
        font-size: 20px;
        line-height: 20px;
		/* font-weight: 900; */
        font-weight: bold;
		font-family: "HanSansCN-Bold";
    }

    .name-content,
    .phone-content,
    .date-content,
    .time-content {
        display: flex;
        width: 70%;
        margin-left: 15%;
        margin-top: 15px;
        justify-content: space-between;
        font-size: 14px;
    }

    /* .name-content {
        margin-top: 30px;
    }

    .date-content {
        margin-top: 20px;
    } */

    .valid-code {
        display: flex;
        width: 70%;
        margin-left: 15%;
        margin-top: 15px;
        justify-content: space-between;

        font-size: 14px;
    }

    .valid-code-content {
        display: flex;
        justify-content: space-between;
        width: 70%;
    }

    .valid-code-input {
        width: 50%;
        line-height: 20px;
        font-size: 14px;
    }

    .valid-code-btn {
        width: 45%;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #FFFFFF;
        /* border-radius: 2px; */
        text-align: center;
    }

    .age-and-city-content {
        display: flex;
        width: 70%;
        margin-left: 15%;
        margin-top: 15px;
        justify-content: space-between;

        font-size: 14px;
    }

    .age-content,
    .city-content {
        display: flex;
        flex-direction: column;
        width: 48%;
    }

    .pick-content-age,
    .pick-content-city {
        display: flex;
        width: 100%;
        height: 26px;
        border: 1px solid #AAAAAA;
        margin-top: 3px;
    }

    .picker-age,
    .picker-city {
        width: 85%;
        height: 26px;
        line-height: 26px;
    }

    .arrow-solid-age,
    .arrow-solid-city {
        /* width: 9.5%;
        margin-top: 9px; */
        width: 12px;
        height: 26px;
    }

    .title {
        width: 20%;
        height: 26px;
        line-height: 26px;
        text-align: justify;
    }

    .title::after {
        display: inline-block;
        width: 100%;
        content: "";
    }

    .title-age,
    .title-city {
        width: 42%;
        height: 20px;
        line-height: 20px;
        text-align: justify;
    }

    .title-age::after,
    .title-city::after {
        display: inline-block;
        width: 100%;
        content: "";
    }

    .input {
        width: 70%;
        line-height: 20px;
        font-size: 14px;
		z-index: 0;
    }

    .pick-content {
        display: flex;
        flex-direction: row;
        width: 70%;
        height: 26px;
        border: 1px solid #AAAAAA;
    }

    .picker {
        width: 90%;
        margin-left: 2px;
        height: 26px;
        line-height: 26px;
    }

    .arrow-solid {
        /* width: 30rpx;
        height: 40rpx;
        margin-top: 8rpx; */
        width: 12px;
        height: 26px;
    }

    .privacy-content {
        display: flex;
        flex-direction: row;
        width: 70%;
        margin-left: 15%;
        margin-top: 15px;
        justify-content: center;

        font-size: 14px;
    }

    .privacy-select {
        width: 22px;
        height: 22px;
    }

    .privacy-text {
        font-size: 14px;
        height: 22px;
        line-height: 22px;
        margin-left: 6px;
    }

    .btn-confirm {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 28%;
        margin-top: 30px;

        font-size: 14px;
        
        color: #888888;
    }
</style>
