<template>
	<div id="appComponts" class="appDiv">
		<!-- 弹出窗组件 -->
		<div v-if="isdialog">
			<dialogtt ref="dialog" v-model="dialog.show" :title="dialog.title" :buttons="dialog.buttons"
				:bodyshow="dialog.bodyshow" @input="closeDialog">
				<div class="dialogCoor" style="margin: 0.1rem;">
					<component :is="componentNameLeft" v-bind:detailData="detailDataLeft"></component>
				</div>
			</dialogtt>
		</div>
		<!-- 左侧 -->
		<!-- 菜单部分 -->
		<div v-show="showMenu" class="appMenu" :style="{ width: menuwidth + 'rem' }">
			<div class="appMenumain">
				<div style="padding: 0 0.05rem;float: left;cursor: pointer;width: 100%;" :key="index"
					v-for="(item, index) in menuData">
					<div style="margin-top: 0.15rem;width: 100%;"
						:class="[menuFlag == index ? 'appMenuDivsel' : 'appMenuDiv']" @click="changeMenu(item, index)">
						<div style="display: inline-block;vertical-align: middle;">
							<img :src="menuFlag == index ? item.imgT : item.imgF" class="menuimg" />
						</div>

						<div class="menuContText">
							<span :class="menuFlag == index ? 'activeT' : 'activeF'">{{ item.menuname }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isleft" class="appCompontsLeft fade-in-right" :style="{ width: leftwidth + 'rem' }">
			<div class="appCompontsBottomDiv">
				<div v-if="isClose" style="position: relative;">
					<Icon class="close_l" type="ios-close-circle-outline" @click="closeleft" />
					<div class="appCompontsBottomTitle" style="font-size:0.17rem;">{{ titleLeftName }}</div>
				</div>
				<!-- 组件部分 -->
				<div class="appCompontsmain">
					<component :is="componentNameLeft" v-bind:detailData="detailDataLeft"></component>
				</div>
			</div>
		</div>
		<div class="appCompontsRight" :style="{ width: 19.2 - leftwidth - menuwidth + 'rem' }">
			<!-- 地图部分 -->
			<div class="appCompontsMap scale-in" :style="{ height: isbottom ? '55%' : '100%' }">
				<newMap ref="newMap"></newMap>
			</div>
			<!-- 底部详情框部分 -->
			<div v-if="isbottom" class="appCompontsBottom fade-in-up">
				<div class="appCompontsBottomDiv">
					<Icon class="close" type="ios-close-circle-outline" @click="closebottom" />
					<div class="appCompontsBottomTitle">{{ titleBotmName }}</div>
					<div class="appCompontsBottomMain">
						<component :is="componentNameBottom" v-bind:detailData="detailDataBottom"
							v-bind:itemdata="detailitemDataBottom"></component>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>


<script>
import bus from "../eventBus.js";
import ApiSetting from "../ApiSetting";
import {
	MapControl
} from "../map/NewMapControl.js";
import newMap from "../map/NewMapControl.vue";
import dialogtt from "../components/dialog.vue"

export default {
	name: "application",
	components: {
		newMap,
		dialogtt
	},
	watch: {
		// 监测路由变化,只要变化了就获取路由参数重新加载菜单
		$route(to, from) {
			var _this = this;
			// to为跳转之后的路由
			_this.oldindex = null;
			var menuid = this.$route.query.id
			_this.menuid = this.$route.query.id

			_this.getMenus(menuid);
			_this.closebottom();
			_this.closeleft();
		}
	},
	props: {},
	data() {
		return {
			menuid: null,
			menuwidth: 2.05,
			showMenu: true,
			leftwidth: 0,
			isbottom: false,
			isleft: false,
			isClose: true,
			menuData: [],
			menuFlag: null,
			oldindex: null,
			componentNameLeft: "",
			detailDataLeft: {},
			componentNameBottom: "",
			detailDataBottom: {},
			detailitemDataBottom: {},
			titleBotmName: "",
			titleLeftName: "",
			dialog: {
				show: false,
				title: {
					text: '',
					className: 'xa-bg-blue' //标题样式类名，包含`background`、`color`即可
				},
				bodyshow: true,
			},
			isdialog: false
		};
	},
	methods: {
		getMenus(menuid) {
			var _this = this;
			_this.menuData = [];
			_this.menuFlag = null;
			_this.showMenu = true;
			let list = this.$store.state.user.userinfo.SysInfos; //所有系统菜单
			let pid = this.$store.state.user.pid; //平台id
			if (list.length > 0) {
				for (let i = 0; i < list.length; i++) {
					if (list[i].id == pid) { //筛选出该平台下的菜单
						let system = list[i].system;
						for (let j = 0; j < system.length; j++) {
							let menu = system[j].menu;
							for (let k = 0; k < menu.length; k++) {
								if (menu[k].id == menuid) { //筛选出综合菜单
									let children = menu[k].children;
									for (let l = 0; l < children.length; l++) {
										_this.menuData.push({
											classname: children[l].classname,
											id: children[l].id,
											img: children[l].img,
											menulocation: children[l].menulocation.split(','),
											menuname: children[l].menuname,
											menusize: children[l].menusize.split(','),
											seq: children[l].seq,
											note: children[l].note,
											systemid: children[l].systemid,
											bgImgT: "../../static/img/newapp/menubgs.png",
											bgImgF: "../../static/img/newapp/menubg.png",
											imgF: require('../assets/img/menus/' + children[l].img),
											imgT: require('../assets/img/menus/' + children[l].img.substring(0, children[l].img.length - 4) + "s.png"),
											name: children[l].menuname,
											jumpName: children[l].classname
										})
									}
									if (_this.menuData.length == 1) {
										_this.menuwidth = 0;
										_this.showMenu = false;
										setTimeout(() => {
											_this.changeMenu(_this.menuData[0], 0)
										}, 500);
									} else {
										_this.menuwidth = 2.05;
										_this.showMenu = true;
									}
								}
							}
						}
					}
				}

			}
		},
		changeMenu(item, index) {
			var _this = this;
			if (item.id == undefined) {
				return;
			}
			if (item.note == '左侧') {
				_this.isleft = true;
				_this.isdialog = false;

				if (item.id == 53 || item.id == 58) {
					_this.leftwidth = 7.14;
				} else {
					_this.leftwidth = 5.14;
				}
			} else if (item.note == '全屏') {
				_this.isleft = true;
				_this.isdialog = false;
				_this.leftwidth = 19.2 - this.menuwidth - 0.1
			} else if (item.note == '弹出窗') {
				_this.closeleft();
				_this.isleft = false;
				_this.isdialog = true;
				this.dialog.title.text = item.menuname;
				this.dialog.show = true;
				setTimeout(() => {
					this.$refs.dialog.retresize();
				}, 0)


			} else {
				_this.isleft = true;
				_this.isdialog = false;
				_this.leftwidth = 5.14;
			}
			_this.titleLeftName = item.menuname;
			_this.componentNameLeft = item.jumpName;

			if (this.oldindex == index) {
				return;
			}

			_this.oldindex = index;
			_this.menuFlag = index;
		},
		closebottom() {
			this.isbottom = false;
		},
		closeleft() {
			this.leftwidth = 0;
			this.isleft = false;
		},
		closeDialog() {
			this.isdialog = false;
		}
	},
	mounted() {
		var _this = this;
		var menuid = this.$route.query.id; //序号（id）
		_this.menuid = this.$route.query.id;
		_this.getMenus(menuid);
		bus.$off("detail-app_close");
		bus.$on("detail-app_close", this.closebottom);
		bus.$off("detail-app");
		bus.$on("detail-app", function (value, item, title, itemsdata) {
			_this.isbottom = true;
			_this.detailDataBottom = item;
			_this.detailitemDataBottom = itemsdata;
			_this.componentNameBottom = value;
			_this.titleBotmName = title;
		});
	},
	created() {
		this._getLess("/view/application.less");
	},
	beforeDestroy() {
	},
}
</script>

<style lang="less">
.appDiv {
	.verBottom {
		background-color: rgba(24, 46, 95, 0.7);
		color: #ffffff;
	}

	.verBottom:hover {
		border-color: transparent !important;
	}
}
</style>
