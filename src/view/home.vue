<template>
	<div id="homemain">
		<header2></header2>
		<router-view />
	</div>
</template>

<script>
import Vue from 'vue';
import header2 from '../components/header.vue';
import NavConfigGl from '../router/nav.configCompentGl.yml';

export default {
	components: {
		header2
	},
	watch: {
		$route(to, from) {

		}
	},
	mounted() {
		document.getElementsByTagName('title')[0].innerText = this.$store.state.user.headertitle[this.$store.state.user.pname];
		document.getElementById('homemain').style.width = window.innerWidth + 'px';
		document.getElementById('homemain').style.height = window.innerHeight + 'px';

		window.addEventListener('resize', function () {
			document.getElementById('homemain').style.width = window.innerWidth + 'px';
			document.getElementById('homemain').style.height = window.innerHeight + 'px';
		});
		var width = document.documentElement.clientWidth;
		var content = document.getElementsByTagName('body')[0];
		content.style.width = width;

		let rqueyid = this.$route.params.loginId;
		if (rqueyid) this.handleSubmit2(rqueyid);
	},
	data() {
		return {
			compartment: '鼓楼区'
		};
	},
	beforeDestroy() {
	},
	methods: {
		regeisterComponent(NavConfigGl) {

			Object.keys(NavConfigGl).forEach((lang, idx) => {
				const pageNavs = NavConfigGl[lang];

				pageNavs.forEach(nav => {
					const parentName = nav.name;

					if (nav.groups) {
						nav.groups.forEach(group => {
							group.items.forEach(item => {
								regeisterComponent(parentName, item.name, group.name);
								if (item.details) {
									item.details.forEach(item1 => {
										regeisterComponent(parentName, item1.name, group.name, item.name);
									});
								}
							});
						});
					}
				});
			});

			function regeisterComponent(parentName, templateName, groupname, itemName) {
				Vue.component(templateName, function (resolve) {
					// 这个特殊的 require 语法告诉 webpack
					// 自动将编译后的代码分割成不同的块，
					// 这些块将通过 Ajax 请求自动下载。
					if (itemName) {
						require([`@/${parentName}/${groupname}/${itemName}/${templateName}.vue`], resolve);
					} else {
						require([`@/${parentName}/${groupname}/${templateName}.vue`], resolve);
					}
				});
			}

		},
		handleSubmit2(logid) {
			var that = this;
			if (that.$store.state.user.userinfo.SysInfos.length > 0) {
				var sysInfo = that.$store.state.user.userinfo.SysInfos;
				var ptname = that.$store.state.user.pname;
				var menuInfo = [];
				var menuList = [];
				for (var i = 0; i < sysInfo.length; i++) {
					if (sysInfo[i].desktopname == ptname) {
						menuInfo = sysInfo[i].system;
					}
				}
				for (let j = 0; j < menuInfo.length; j++) {
					let arr = menuInfo[j].menu;
					for (let k = 0; k < arr.length; k++) {
						menuList.push(arr[k])
					}
				}
				if (menuList.length > 0) {
					if (menuList[0].menuname == '综合') {
						this.$router.push({
							name: menuList[0].classname,
							query: {
								id: menuList[0].id
							}
						});
					} else {
						var item = menuList[0];
						let list = [];
						let children = item.children;
						for (let l = 0; l < children.length; l++) {
							list.push({
								name: children[l].menuname,
								bgImgT: '../../static/img/newapp/Leftbar backgroud_s.png',
								bgImgF: '../../static/img/newapp/Leftbar backgroud_n.png',
								imgT: children[l].img,
								imgF: children[l].img.indexOf('选中') != -1
									? children[l].img.replace('选中', '默认')
									: children[l].img.substring(0, children[l].img.length - 5) + 'n.png',
								jumpName: children[l].classname
							});
						}
						this.$router.push({
							name: item.classname,
							params: {
								name: list
							},
							query: {
								id: item.id
							}
						});
					}
				} else {
					this.$Modal.warning({
						title: '警告',
						content: '您没有配置任何菜单,请与管理员联系！'
					});
					return;
				}
			}
		},
	},
	created() {
		// 开始注册组件
		this.regeisterComponent(NavConfigGl);
		this._getLess('/app.less');
		this._getLess('/public.less');
	}
};
</script>

