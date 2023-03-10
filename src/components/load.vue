<template>
	<div class="menusDiv">
		<div class="loadDiv">
			<div style="height: 100%;width: 50%;float: left;position: relative">
				<img src="@/assets/img/login/loading.png"
					style="width: 5.53rem;height: 7.09rem;position: absolute;right: 0;top: calc((100% - 7.09rem) / 2);" />
			</div>
			<div style="height: 100%;width: 50%;float: left;text-align: left;padding-left: 0.2rem;">
				<div class="text">{{ text }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import ApiSetting from '../ApiSetting.js';
import bus from '../eventBus.js';

export default {
	components: {},

	data() {
		return {
			text: ''
		};
	},
	methods: {},

	mounted() {
		var that = this;
		that.text = '登录中...';
		let username = this.$route.params.username;
		let password = this.$route.params.password;

		var source = {
			"id": 2,
			"username": "gnadmin",
			"useraliasname": "灌南管理员",
			"type": "管理员",
			"foreignguid": "",
			"companyguid": "",
			"regionslist": "1",
			"roleidslist": "2",
			"companyname": "",
			"orgid": 2,
			"orgname": "灌南县信息中心",
			"ora_level": 1,
			"levelcode": "xa",
			"roleid": "2",
			"rolecode": "gly",
			"rolename": "管理员",
			"regioncode": "灌南县",
			"regionname": "灌南县",
			"SysInfos": [
				{
					"id": 2,
					"desktopname": "灌南县",
					"databaseaddr": 123,
					"databasename": "123",
					"username": "123",
					"userpassword": "123",
					"databasetype": "123",
					"systemaddr": "排水.png",
					"systempz": "",
					"remark": "灌南县排水管网GIS平台",
					"compartment": "灌南县",
					"extent": "{\"xmin\":13270957.525,\"ymin\":4034862.262,\"xmax\":13293755.759,\"ymax\":4045888.303}",
					"theme": "004",
					"srid": 1,
					"systems": "2",
					"system": [
						{
							"id": 2,
							"name": "灌南县系统",
							"note": "",
							"url": "",
							"iconame": "123",
							"isuse": 1,
							"jumppath": "123",
							"seq": "",
							"menu": [
								{
									"id": 2,
									"menuname": "设施总览",
									"classname": "homepageOverView",
									"systemid": 2,
									"img": "",
									"seq": 1,
									"menusize": "",
									"menulocation": "",
									"note": "全屏",
									"parentid": 0,
									"children": [
										{
											"id": 3,
											"menuname": "设施总览",
											"classname": "home",
											"systemid": 2,
											"img": "",
											"seq": 1,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 2
										}
									]
								},
								{
									"id": 14,
									"menuname": "查询统计",
									"classname": "application",
									"systemid": 2,
									"img": "",
									"seq": 2,
									"menusize": "",
									"menulocation": "",
									"note": "左侧",
									"parentid": 0,
									"children": [
										{
											"id": 46,
											"menuname": "设施查询",
											"classname": "dataQuery",
											"systemid": 2,
											"img": "数据查询.png",
											"seq": 1,
											"menusize": "",
											"menulocation": "",
											"note": "左侧",
											"parentid": 14
										},
										{
											"id": 22,
											"menuname": "排口统计",
											"classname": "outletmonitor",
											"systemid": 2,
											"img": "数据统计.png",
											"seq": 3,
											"menusize": "",
											"menulocation": "",
											"note": "弹出窗",
											"parentid": 14
										},
										{
											"id": 25,
											"menuname": "历史管理",
											"classname": "history",
											"systemid": 2,
											"img": "数据统计.png",
											"seq": 3,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 14
										},
										{
											"id": 45,
											"menuname": "缺陷管理",
											"classname": "defect",
											"systemid": 2,
											"img": "检测异常告警.png",
											"seq": "",
											"menusize": "",
											"menulocation": "",
											"note": "左侧",
											"parentid": 14
										}
									]
								},
								{
									"id": 13,
									"menuname": "健康检测",
									"classname": "application",
									"systemid": 2,
									"img": "",
									"seq": 3,
									"menusize": "",
									"menulocation": "",
									"note": "全屏",
									"parentid": 0,
									"children": [
										{
											"id": 27,
											"menuname": "健康检测",
											"classname": "CCTVQuery",
											"systemid": 2,
											"img": "健康检测.png",
											"seq": 1,
											"menusize": "",
											"menulocation": "",
											"note": "左侧",
											"parentid": 13
										}
									]
								},
								{
									"id": 5,
									"menuname": "运维管理",
									"classname": "application",
									"systemid": 2,
									"img": "",
									"seq": 6,
									"menusize": "",
									"menulocation": "",
									"note": "全屏",
									"parentid": 0,
									"children": [
										{
											"id": 6,
											"menuname": "用户管理",
											"classname": "userManagement",
											"systemid": 2,
											"img": "用户管理.png",
											"seq": 1,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 5
										},
										{
											"id": 7,
											"menuname": "角色管理",
											"classname": "roleManagement",
											"systemid": 2,
											"img": "角色管理.png",
											"seq": 2,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 5
										},
										{
											"id": 8,
											"menuname": "部门管理",
											"classname": "deptManagement",
											"systemid": 2,
											"img": "部门管理.png",
											"seq": 3,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 5
										},
										{
											"id": 9,
											"menuname": "菜单管理",
											"classname": "menuconfig",
											"systemid": 2,
											"img": "菜单管理.png",
											"seq": 4,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 5
										},
										{
											"id": 10,
											"menuname": "平台管理",
											"classname": "ptgl",
											"systemid": 2,
											"img": "平台管理.png",
											"seq": 5,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 5
										},
										{
											"id": 11,
											"menuname": "系统管理",
											"classname": "systemconfig",
											"systemid": 2,
											"img": "系统管理.png",
											"seq": 6,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 5
										},
										{
											"id": 12,
											"menuname": "服务管理",
											"classname": "mapservice",
											"systemid": 2,
											"img": "服务管理.png",
											"seq": 7,
											"menusize": "",
											"menulocation": "",
											"note": "全屏",
											"parentid": 5
										}
									]
								}
							]
						}
					]
				}
			],
			"ServerUrl": [
				{
					"uuid": 21,
					"id": "XMXA",
					"uid": 21,
					"servicename": "灌南县服务",
					"serviceurl": "",
					"servicetype": "",
					"isdefaultload": false,
					"slider": 100,
					"switchs": true,
					"serviceimg": "",
					"check": true,
					"sid": "",
					"identlyids": "",
					"parenmentid": "",
					"compartment": "灌南县",
					"index": 1,
					"remark": "",
					"ssqh": "",
					"systemaddr": "",
					"extent": "",
					"children": [
						{
							"uuid": 22,
							"id": "XMXA_psgx",
							"uid": 22,
							"servicename": "排水管线",
							"serviceurl": "http://58.213.48.106/arcgis/rest/services/GNPS/灌南管线/MapServer",
							"servicetype": "dynamic",
							"isdefaultload": false,
							"slider": 100,
							"switchs": true,
							"serviceimg": "",
							"check": true,
							"sid": "[2,3,4,6,7,8,10,11,12]",
							"identlyids": "[3,4,7,8,11,12]",
							"parenmentid": "XMXA",
							"compartment": "灌南县",
							"index": 1,
							"remark": "",
							"ssqh": "",
							"systemaddr": "",
							"extent": "",
							"children": [
								{
									"uuid": 23,
									"id": "XMXA_psgx_ys",
									"uid": 23,
									"servicename": "雨水管",
									"serviceurl": "",
									"servicetype": "dynamic",
									"isdefaultload": false,
									"slider": 100,
									"switchs": true,
									"serviceimg": "",
									"check": true,
									"sid": "[2,3,4]",
									"identlyids": "",
									"parenmentid": "XMXA_psgx",
									"compartment": "灌南县",
									"index": 1,
									"remark": "",
									"ssqh": "",
									"systemaddr": "",
									"extent": ""
								},
								{
									"uuid": 24,
									"id": "XMXA_psgx_ws",
									"uid": 24,
									"servicename": "污水管",
									"serviceurl": "",
									"servicetype": "dynamic",
									"isdefaultload": false,
									"slider": 100,
									"switchs": true,
									"serviceimg": "",
									"check": true,
									"sid": "[6,7,8]",
									"identlyids": "",
									"parenmentid": "XMXA_psgx",
									"compartment": "灌南县",
									"index": 1,
									"remark": "",
									"ssqh": "",
									"systemaddr": "",
									"extent": ""
								},
								{
									"uuid": 26,
									"id": "XMXA_psgx_hl",
									"uid": 26,
									"servicename": "合流管",
									"serviceurl": "",
									"servicetype": "dynamic",
									"isdefaultload": false,
									"slider": 100,
									"switchs": true,
									"serviceimg": "",
									"check": true,
									"sid": "[10,11,12]",
									"identlyids": "",
									"parenmentid": "XMXA_psgx",
									"compartment": "灌南县",
									"index": 1,
									"remark": "",
									"ssqh": "",
									"systemaddr": "",
									"extent": ""
								}
							]
						}
					]
				}
			],
			"qx": []
		};

		loadScripts(undefined, function (params) {

			var sourceList = source.SysInfos;
			var allMenu = {
				headMenu: [],
				leftMenu: []
			};
			if (this.checkboxValue1 == true) {
				Cookies.set('password', password);
				Cookies.set('code', username);
			}

			if (source.ServerUrl.length > 0) {
				for (let a = 0; a < source.ServerUrl.length; a++) {
					source.ServerUrl[a].check = eval(source.ServerUrl[a].check);
					source.ServerUrl[a].switchs = eval(source.ServerUrl[a].switchs);
					source.ServerUrl[a].isdefaultload = eval(source.ServerUrl[a]
						.isdefaultload);
					let children = source.ServerUrl[a].children;
					if (children.length > 0) {
						for (let b = 0; b < children.length; b++) {
							children[b].check = eval(children[b].check);
							children[b].switchs = eval(children[b].switchs);
							children[b].isdefaultload = eval(children[b].isdefaultload);
							let children1 = children[b].children;
							if (children1.length > 0) {
								for (let c = 0; c < children1.length; c++) {
									children1[c].check = eval(children1[c].check);
									children1[c].switchs = eval(children1[c].switchs);
									children1[c].isdefaultload = eval(children1[c].isdefaultload);
								}
							}

						}
					}
				}
			}
			sessionStorage.message = JSON.stringify(source);
			that.$store.state.user.userinfo = source;

			var pnameList = source.ServerUrl;
			if (pnameList.length > 0) {
				if (pnameList.length == 1) {
					//只绑定了一个平台，直接跳转至应用系统
					that.$store.state.user.pname = pnameList[0].compartment;
					that.$store.state.user.serviceId = pnameList[0].id;
					sessionStorage.pname = pnameList[0].compartment;
					sessionStorage.serviceId = pnameList[0].id;
					for (let i = 0; i < sourceList.length; i++) {
						if (pnameList[0].compartment == sourceList[i].desktopname) {
							that.$store.state.user.pid = sourceList[i].id;
							sessionStorage.pid = sourceList[i].id;
						}
					}
				}
			} else {
				this.$Modal.warning({
					title: '警告',
					content: '您没有配置任何地图服务,请与管理员联系！'
				});
				return;
			}
			if (that.$store.state.user.userinfo.SysInfos.length > 0) {
				var sysInfo = that.$store.state.user.userinfo.SysInfos;
				var ptname = pnameList[0].compartment;
				var menuInfo = [];
				var menuList = [];

				for (var i = 0; i < sysInfo.length; i++) {
					if (sysInfo[i].desktopname == ptname) {
						menuInfo = sysInfo[i].system;
					}
				}
				for (let j = 0; j < menuInfo.length; j++) {
					menuList = menuInfo[j].menu;
				}
				if (menuList.length > 0) {
					for (var i = 0; i < sysInfo.length; i++) {
						if (sysInfo[i].desktopname == ptname) {
							//主题样式
							let theme = sysInfo[i].theme == null ? '001' : sysInfo[i].theme; //主题颜色
							that.$store.state.theme = theme;
							localStorage.theme = theme;
							bus.$emit('appless', theme);
						}
					}
					if (pnameList.length > 0) {
						that.text = '登录成功!!!';
						setTimeout(function () {
							that.$router.push({
								name: 'home',
								params: {
									name: 'yb',
									loginId: 'yb'
								}
							});
						}, 500);
					}
				} else {
					that.$Modal.warning({
						title: '警告',
						content: '您没有配置任何菜单,请与管理员联系！'
					});
					return;
				}
			} else {
				this.$Modal.warning({
					title: '警告',
					content: '您没有配置任何菜单,请与管理员联系！'
				});
				return;
			}
		})
	},
	beforeDestroy() { }
};
</script>
<style lang="less" scoped="scoped">
.menusDiv {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-repeat: round;
	background-color: #090540;

	.loadDiv {
		height: 100%;
	}

	.text {
		color: #ffffff;
		font-size: 0.5rem;
		font-weight: 500;
		line-height: 2rem;
		height: 2rem;
		margin-top: calc(~'(100% - 2rem) / 2');
	}
}
</style>
