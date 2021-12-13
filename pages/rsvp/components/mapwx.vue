<template>
    <uni-transition mode-class="slide-bottom" :duration="500" :show="true"
        :styles="{'width': '100%', 'height': '100%'}">
        <view class="container">
            <web-view src="https://chaumetexhibition.notionbase.com/tiaradream/#/pages/rsvp/room?comp=Map&from=weixin">
            </web-view>
        </view>
    </uni-transition>
</template>

<script>
    import Top from '@/components/top.vue'
    import Back from '@/components/back.vue'

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
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            message(e) {
                console.log('message:', e)
                let data = e.detail.data
                if(data && data.length > 0 && data[data.length - 1].action == "back") {
                    this.$emit("onCompChange", "Intro")
                } else if(data && data.length > 0 && data[data.length - 1].action == "find") {
                    this.$emit("onCompChange", "Find")
                } 
            },
            onBtnBack() {
                console.log('onBtnBack')
                this.$emit("onCompChange", "Intro")
            },
        }
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
    }
</style>
