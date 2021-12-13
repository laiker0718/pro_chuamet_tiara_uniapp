<template>
	<view class="container">
		<view> {{desc}} </view>
	</view>
</template>

<script>
	export default {
		name: 'page-name',
		components: {
			
		},
		data() {
			return {
				desc: 'page 生命周期'
			}
		},
		onInit() {},
		onLoad() {},
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
		
		}
	}
</script>

<style>
	.container {
		display: flex;
        flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		color: #000000;
		background-color: #FFFFFF;
	}
</style>
