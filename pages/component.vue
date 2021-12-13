<template>
	<view class="container">
		<view> {{desc}} </view>
	</view>
</template>

<script>
	export default {
		name: 'component-name',
		data() {
			return {
				desc: 'page 生命周期'
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
