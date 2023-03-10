<template>
	<div class="homepageDivRight" style="width: 100%;height: calc(100% - 0.05rem);">
		<div class="rightBg rightBgTop homebg">
			<div class="homeTitle">缺陷统计</div>
			<div id="defectsChart" style="height: calc(100% - 0.44rem);"></div>
		</div>
		<div class="rightBg homebg">
			<div class="homeTitle">管材统计</div>
			<div id="pipeStatisticsChart" style="height: calc(100% - 0.44rem);">

			</div>
		</div>
		<div class="rightBg rightBgBottom homebg">
			<div class="homeTitle">CCTV统计</div>
			<div id="cctvChart" style="height: calc(100% - 0.44rem);">

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
				noticeListsb: [],
				isActivesb: true, // 是否显示transitionTop动画
				timersb: [],
				noticeTopsb: 0,
				clength: ""
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
	.homepageDivRight {
		padding: 0.10rem;

		.rightBg {
			width: 100%;
			height: calc(~"100% / 3 - 0.1rem");
			margin-top: 0.1rem;
		}

		.rightBgTop {
			width: 100%;
			// height: calc(~"100% - 2.8rem - 0.1rem");

			.rightTopImg {
				width: calc(~"3.11rem * 0.9");
				height: calc(~"1rem * 0.9");
			}

			.rightTopImgY {
				width: calc(~"1.19rem * 0.9");
				height: calc(~"1.19rem * 0.9");
				position: absolute;
				left: 0.71rem;
				top: -0.07rem;
			}

			.rightTopMainDiv {
				position: absolute;
				top: 0.15rem;
				left: 2.2rem;
			}

			.topVal {
				font-size: 0.35rem;
				font-family: "SOURCEHANSANS-REGULAR";
				color: rgb(16, 210, 255);
				font-style: italic;
				line-height: 1;
			}

			.topUnit {
				font-size: 0.18rem;
				letter-spacing: 2px;
				color: rgb(185, 201, 213);
				margin-left: 0.05rem;
				font-style: italic;
				line-height: 1;
			}

			.topTitle {
				font-size: 0.18rem;
				letter-spacing: 2px;
				color: rgb(187, 224, 243);
				font-family: "SOURCEHANSANS-REGULAR";
			}

			.topimg {
				width: calc(~"0.15rem * 0.9");
				height: calc(~"0.14rem * 0.9");
				margin-top: calc(~"(0.55rem * 0.9 - 0.14rem * 0.9) / 2");
				margin-left: 0.18rem;
			}

			.topArea {
				font-size: 0.16rem;
				color: rgb(229, 255, 255);
				font-family: "SOURCEHANSANS-REGULAR";
				margin-left: 0.2rem;
			}

			.topCountDiv {
				float: right;
				line-height: calc(~"0.55rem * 0.9");
				margin-right: 0.2rem;

				.topCount {
					font-size: 0.2rem;
					color: rgb(227, 200, 60);
					font-family: "DIN1451ALT";
					margin-right: 0.2rem;
				}

				.topdefectUnit {
					font-size: 0.15rem;
					color: rgb(132, 147, 161);
					font-family: "SOURCEHANSANS-REGULAR";
				}
			}
		}

		.rightBgBottom {
			width: 100%;
			// height: 2.8rem;
			// margin-top: 0.1rem;

		}
	}
</style>
