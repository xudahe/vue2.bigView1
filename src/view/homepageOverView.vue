<template>
	<div style="width: 19.2rem;height: calc(100% - 0.75rem);">

		<div id="homePage_Div" style="width: 19.2rem;height: 100%;">
			<!-- 中间主体部分 -->
			<div class="homePageDiv" style="height: 100%;position: relative;overflow: hidden;width: 100%;">
				<div style="height: 100%;position: relative">
					<div style="height: 100%;">
						<div :key="index" v-for="(item, index) in menus" style="width: 100%;height: 100%;float: left;">
							<div style="height: 100%;">
								<component :is="item.classname"></component>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>
<script>
import bus from "../eventBus.js";
import home from "../components/homepage/home.vue"; //首页
export default {
	components: {
		home
	},
	watch: {
		// 监测路由变化,只要变化了就获取路由参数重新加载菜单
		$route(to, from) {
			var _this = this;
			// to为跳转之后的路由
			var menuid = this.$route.query.id
			_this.getMenus(menuid);
		}
	},
	data() {
		return {
			menus: [],
		};
	},
	methods: {
		getMenus(val) {
			var _this = this;
			_this.menus = [];
			let list = this.$store.state.user.userinfo.SysInfos; //所有系统菜单
			let pid = this.$store.state.user.pid; //平台id
			if (list.length > 0) {
				for (let i = 0; i < list.length; i++) {
					if (list[i].id == pid) { //筛选出该平台下的菜单
						let system = list[i].system;
						for (let j = 0; j < system.length; j++) {
							let menu = system[j].menu;
							for (let k = 0; k < menu.length; k++) {
								if (menu[k].id == val) { //筛选出综合菜单
									let children = menu[k].children;
									for (let l = 0; l < children.length; l++) {
										_this.menus.push({
											classname: children[l].classname,
											id: children[l].id,
											img: children[l].img,
											menulocation: children[l].menulocation.split(','),
											menuname: children[l].menuname,
											menusize: children[l].menusize.split(','),
											seq: children[l].seq,
											systemid: children[l].systemid,
										})
									}
								}
							}
						}
					}
				}
			}
		},
	},
	mounted() {
		var _this = this;
		this.$nextTick(() => {
			var menuid = _this.$route.query.id; //序号（id）
			_this.getMenus(menuid);
		})

	},
	beforeDestroy() {

	},
	created() {
		this._getLess('/view/homepageOverView.less');
	}
};
</script>

<style lang="less">
.ivu-carousel {
	height: 100% !important;
}

.ivu-carousel-list {
	height: 100% !important;
}

.ivu-carousel-track {
	height: 100% !important;
}

.ivu-carousel-arrow {
	background-color: rgb(83, 133, 152) !important;
}

.ivu-carousel-arrow :hover {
	background-color: rgb(83, 133, 152) !important;
}
</style>
