<template>
	<div class="homepageDivLeft" style="width: 100%;height: calc(100% - 0.05rem);">
		<div class="leftBg homebg">
			<div class="homeTitle">资产统计</div>
			<div class="leftTop" style="height: calc(100% - 0.4rem);">
			</div>
		</div>
		<div class="leftBg homebg">
			<div class="homeTitle">设施统计</div>
			<div class="middleChange">
				<div class="middleMain" :class="isssActive == index ? 'middleActiveT' : 'middleActiveF'" :key="index"
					v-for="(item, index) in sstj" @click="changesstj(item.id, index)">{{ item.name }}</div>
			</div>
			<div style="margin-top: 0.3rem;padding: 0 0.4rem;">
				<Row>
					<Col span="8" v-if="index < 3" style="text-align: center;" :key="'ss' + index"
						v-for="(item, index) in sscount">
					<img :src="require('@/assets/img/component/home/' + index + '.png')" class="middleBg imgAllGifs" />
					<div class="middleContent">
						<div class="middleContVal">{{ item.count }}</div>
						<div class="middleContTitle">{{ item.fsw }}</div>
					</div>
					</Col>
				</Row>
			</div>
		</div>
		<div class="leftBg homebg">
			<div class="homeTitle">管线类型统计</div>
			<div id="lineTypeChart" style="width: 100%;height: calc(100% - 0.4rem);"></div>
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
			sstj: [
				{
					name: "雨水设施",
					id: '雨水'
				},
				{
					name: "污水设施",
					id: '污水'
				},

			],
			isssActive: 0,
			line: {
				ysline: 0, //雨水管线
				wsline: 0, //污水管线
				cctvline: 0, //cctv
				defectline: 0 //缺陷
			},
			ssCountlist: {
				雨水: [
					{
						count: 0,
						fsw: '篦子'
					},
					{
						count: 0,
						fsw: '窨井'
					},
					{
						count: 0,
						fsw: '检修井'
					}
				],
				污水: [
					{
						count: 0,
						fsw: '篦子'
					},
					{
						count: 0,
						fsw: '窨井'
					},
					{
						count: 0,
						fsw: '检修井'
					}
				]
			},
			sscount: [
				{
					count: 0,
					fsw: '其他'
				},
				{
					count: 0,
					fsw: '篦子'
				},
				{
					count: 0,
					fsw: '出水口'
				}
			]
		};
	},
	methods: {

	},
	mounted() {

	},
	beforeDestroy() { },
};
</script>

<style lang="less" scoped="scoped">
.homepageDivLeft {
	padding: 0.10rem;

	.leftBg {
		width: 100%;
		height: calc(~"100% / 3 - 0.1rem");
		margin-top: 0.1rem;

		.leftTop {
			width: 100%;
			// width: calc(~"4.68rem * 0.9");
			height: calc(~"2.62rem * 0.9");
			// margin-top: 0.2rem;
			// margin-left: calc(~"(100% - 4.68rem * 0.9) / 2");
			position: relative;
		}

		.topVal {
			font-family: 'DIN1451ALT';
			font-size: 0.34rem;
			line-height: 1;
			font-style: italic;
		}

		.topUnit {
			color: rgb(185, 201, 213);
			margin-left: 0.05rem;
			font-size: 0.18rem;
			letter-spacing: 2px;
			font-style: italic;
		}

		.topTitle {
			color: rgb(163, 203, 226);
			font-size: 0.17rem;
			font-weight: 500;
			margin-left: 0.15rem;
			margin-top: 0.05rem;
			letter-spacing: 2px;
		}

		.topValue {
			margin-left: 0.15rem;
		}

	

		.topContent1,
		.topContent2 {
			top: calc(~"50% - 0.6rem" /2);
		}

		.topContent3,
		.topContent4 {
			top: calc(~"50% - 0.8rem" /2);
		}

		.middleTitle {
			height: 0.3rem;
			width: calc(~"100% - 0.8rem");
			margin-left: 0.4rem;
			margin-top: 0.2rem;
			background-image: linear-gradient(to right, rgba(0, 84, 131, 1), 20%, rgba(0, 84, 131, 0));
			padding-left: 0.15rem;
			line-height: 0.33rem;
			font-family: "lmqylszrht";
			color: rgb(149, 225, 255);
			letter-spacing: 3px;
			font-style: italic;
			font-size: 0.15rem;
		}

		.middleChange {
			margin-top: 0.1rem;
			// padding-left: 0.7rem;
			text-align: center;
		}

		.middleMain {
			display: inline-block;
			width: 1.11rem;
			height: 0.37rem;
			line-height: 0.37rem;
			cursor: pointer;
			text-align: center;
			font-size: 0.17rem;
			// color: rgb(8, 82, 102);
			// font-family: "lmqylszrht";
		}

		.middleActiveT {
			background: #007A80;
			color: rgb(236, 255, 255);
		}

		.middleActiveF {
			color: #75BDBC;
			background: #004049;
		}

		.middleBg {
			width: 1.1rem;
			height: 1.1rem;
			position: relative;
		}

		.middleContent {
			position: absolute;
			top: 0.3rem;
			width: 100%;
			text-align: center;
			z-index: 2;
		}

		.middleContVal {
			color: rgb(234, 236, 240);
			font-size: 0.25rem;
			font-family: "DIN1451ALT";
			line-height: 1;
		}

		.middleContTitle {
			color: rgb(33, 176, 216);
			font-size: 0.18rem;
		}
	}
}
</style>
