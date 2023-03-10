<template>
	<div class="homepageDivMiddle" style="width: 100%;height: calc(100% - 0.05rem);">
		<div style="width: 100%;float: left;height: 100%;">
			<div class="middleBg homebg">
				<div class="homeTitle1">道路统计</div>
				<div id="areaStatices" style="width: 100%;height: calc(100% - 0.44rem);"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import bus from "../../../eventBus.js";
	import ApiSetting from "../../../ApiSetting.js";

	export default {
		components: {

		},
		data() {
			return {

			};
		},
		methods: {
			
		},
		mounted() {
			
		},
		beforeDestroy() {},
	};
</script>

<style lang="less" scoped="scoped">
	.homepageDivMiddle {
		padding: 0.1rem 0;

		.middleBg {
			width: 100%;
			height: 100%;
		}
	}
</style>
