<template>
	<div class="homepageDiv" style="width: 100%;height: 100%;">
		<div id="homePage_Div" style="width: 19.2rem;height: 100%;">
			<!-- 中间主体部分 -->
			<div class="homePageDiv" style="width: 100%;height: 100%;">
				<div style="height: 100%;">
					<!-- 左侧 -->
					<div id="circleLeft" style="height: 100%;width: 4.7rem;float: left;position:absolute;z-index: 1;" class="fade-in-right">
						<homeLeft ref="homeLeft"></homeLeft>
					</div>
					<!-- 中间 -->
					<div id="circleMiddle" style="height: 100%;width: 9.8rem;float: left;position:absolute;z-index: 0;left: 4.7rem;">
						<div style="height:calc(100% - 2.8rem - 0.1rem - 0.1rem);marginTop:0" class="scale-in">
							<homeMiddleTop ref="homeMiddleTop"></homeMiddleTop>
						</div>
						<div id="circleMiddleBot" style="height: calc(2.8rem + 0.1rem + 0.1rem);" class="fade-in-up">
							<homeMiddleBot ref="homeMiddleBot"></homeMiddleBot>
						</div>
					</div>
					<!-- 右侧 -->
					<div style="height: 100%;width: 4.7rem;float: left;position:absolute;z-index: 1;right: 0;" class="fade-in-left">
						<div id="circleRight" style="height: 100%;width: 100%;">
							<homeRight ref="homeRight"></homeRight>
						</div>
		
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import homeLeft from "./homeMenu/homeLeft";
	import homeMiddleBot from "./homeMenu/homeMiddleBot.vue";
	import homeMiddleTop from "./homeMenu/homeMiddleTop.vue";
	import homeRight from "./homeMenu/homeRight.vue";
	export default {
		name: "homepage",
		components: {
			homeLeft,
			homeMiddleBot,
			homeMiddleTop,
			homeRight,
		},
		data() {
			return {};
		},
		methods: {},
		mounted() {},
		beforeDestroy() {},
	};
</script>

<style>
</style>
