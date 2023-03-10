<template>
	<div class="header" style="z-index: 99;">
		<Modal v-model="modal1" class='model_style' width='450' :mask-closable="false" title="密码修改" @on-ok="Confirmpassword"
			@on-cancel="Cancelmodel">
			<Form :label-width="80" style="width: 100%;height: 100%;padding-right: 10px;color:#fff;" label-position="right">
				<FormItem label="原密码" style="width: 100%;text-align: center;">
					<input type="password" v-model="inputValue1" class="Input__original" autocomplete='new-password'
						readonly onfocus="this.removeAttribute('readonly');" style="width: 100%;" />
				</FormItem>
				<FormItem label="新密码" style="width: 100%;text-align: center;">
					<input type="password" autocomplete='new-password' v-model="inputValue2" class="Input__original"
						style="width: 100%;">
				</FormItem>
				<FormItem label="确认密码" style="width: 100%;text-align: center;">
					<input type="password" autocomplete='new-password' v-model="inputValue3" class="Input__original"
						@blur="check" style="width: 100%;">
				</FormItem>
			</Form>
		</Modal>
		<div>
			<div class="homePageTitle">
				<div style="height: 100%;">
					<div style="width: 6.4rem;float: left;height: 0.75rem;">
						<!-- <div class="headerTitle" style="width: 4.99rem;height: auto;margin-top: 0.14rem;margin-left: 0.7rem;"></div> -->
						<img src="@/assets/template/004/img/app/灌南县排水管网GIS平台.png"
							style="width: 4.99rem;margin-top: -0.05rem;margin-left: 0.5rem;" />
					</div>
					<div class="right-div" style="width: 10rem;float: left;padding-left: 0.8rem;">
						<div :key="index" :class="[ismeunNumLeft == item.id ? 'menuDiv menuDivL' : 'menuDiv']"
							v-for="(item, index) in menuDataLeft">
							<a :href="'#/home/' + item.classname + '?id=' + item.id">
								<div style="height: 100%" @click="changeMenu_left(item.id)">
									<div class="homeMenu homeMenuLeft"
										:class="[ismeunNumLeft == item.id ? 'homeMenuTextT' : 'homeMenuTextF']">
										{{ item.menuname }}
									</div>
								</div>
							</a>
							<div v-if="index < menuDataLeft.length - 1"
								style="width: 2px;height: 0.15rem;background-color: #00b0db;position: absolute;right: 0;top: 0.305rem;border-radius: 0.05rem;">
							</div>
						</div>
					</div>
					<div class="right-div"
						style="font-size: 0.17rem;float: left;padding-left: 0.8rem;right: 1.6rem;position: absolute;">
						<div style="padding-right: 0.2rem;float:right;color:rgb(25, 210, 255);padding-top: 0.25rem;" id="showTime"></div>
						<div
							style="width: 2px;height: 0.35rem;background: #5AF1F7;right:0rem;position: absolute;top: 0.205rem;border-radius: 0.05rem;">
						</div>
					</div>
					<ul class="right-menu">
						<li class="eui-nav-item">
							<Dropdown trigger="click" style="" @on-click='accountSwitches'>
								<span style='cursor: pointer;color: #fff;font-size: 0.2rem;'>
									<img src="../assets/头像.png" class="logo-img" />
									<span style="padding-left: 0.1rem;color: #19d2ff;">{{ useraliasname }}</span>
									<Icon type="arrow-down-b"></Icon>
								</span>
								<DropdownMenu slot="list" style="color: #ffffff">
									<DropdownItem name="密码修改">密码修改</DropdownItem>
									<Dropdown-item name="账号切换">账号切换</Dropdown-item>
								</DropdownMenu>
							</Dropdown>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import bus from "../eventBus.js";
import ApiSetting from "../ApiSetting";
export default {
	components: {

	},
	computed: {
		isFollow() {
			return this.$store.state.user.userinfo; //需要监听的数据
		}
	},
	watch: {
		isFollow(newVal, oldVal) {
			this.userId = newVal;
			this.useraliasname = newVal.useraliasname;
			this.getSysList(this.$store.state.user.pname);
		},
		$route(to, from) {
			var _this = this;
			// to为跳转之后的路由
			this.ismeunNumLeft = null;
			this.ismeunNumRight = null;
			var menuid = this.$route.query.id
			for (let i = 0; i < this.menuDataLeft.length; i++) {
				if (menuid == this.menuDataLeft[i].id) {
					this.ismeunNumLeft = menuid;
				}
			}
			for (let j = 0; j < this.menuDataRight.length; j++) {
				if (menuid == this.menuDataRight[j].id) {
					this.ismeunNumRight = menuid;
				}
			}
		}
	},
	data() {
		return {
			ptTitle: '',
			ptname: "",
			time: null,
			userId: this.$store.state.user.userinfo,
			useraliasname: this.$store.state.user.userinfo.useraliasname,
			ssqh: this.$store.state.user.pid,
			modal1: false, //密码修改模态框
			inputValue1: '', //原密码修改
			inputValue2: '', //新密码
			inputValue3: '', //密码确认
			weathers: [
				{ type: '', txtInfo: '' }
			],
			dateTime: {
				weekday: "",
				time: "",
				day: ""
			},
			linkUrl: "",
			ismeunNumLeft: null,
			ismeunNumRight: null,
			menuDataLeft: [],
			menuDataRight: [],
			list: [],
			operationsys: null, // 是否显示运维管理
		};
	},
	methods: {
		getSysList(name) {
			// let desktopname = '鼓楼区';
			this.list = [];
			var menuInfo = [];
			var menuList = [];
			this.menuDataLeft = [];
			this.menuDataRight = [];
			var sysInfo = this.userId.SysInfos;
			if (sysInfo != undefined && sysInfo.length > 0) {
				for (var i = 0; i < sysInfo.length; i++) {
					if (sysInfo[i].desktopname == name) {
						menuInfo = sysInfo[i].system;
					}
				}
				for (let j = 0; j < menuInfo.length; j++) {
					this.list = menuInfo[j].menu;
					let arr = menuInfo[j].menu;
					for (let k = 0; k < arr.length; k++) {
						menuList.push(arr[k])
					}
				}

				if (menuList.length > 0) {
					var theme = this.$store.state.theme == '' || this.$store.state.theme == null ? '001' : this.$store.state.theme;
					for (let k = 0; k < menuList.length; k++) {
						var img = ''
						img = menuList[k].img.substring(0, 13) + 'template/' + theme + '/' + menuList[k].img.substring(13)
						this.menuDataLeft.push({
							classname: menuList[k].classname,
							id: menuList[k].id,
							bgImgT: '../../static/img/newhome/BG_navigation_s_left.png',
							bgImgF: '',
							imgF: img.substring(0, img.length - 5) + "n.png",
							imgT: img,
							menuname: menuList[k].menuname,
							seq: menuList[k].seq,
							systemid: menuList[k].systemid,
							children: menuList[k].children
						})
					}
				}
			}
		},
		changeMenu_left(id) {
			this.ismeunNumRight = null;
			this.ismeunNumLeft = id;
		},
		changeMenu_Right(id) {
			this.ismeunNumLeft = null;
			this.ismeunNumRight = id;
		},
		accountSwitches(name) {

			if (name == '账号切换') {
				sessionStorage.message = '';

				let loginName = this.$store.state.user.pname;
				sessionStorage.message = '';
				this.$router.push({
					name: this.$store.state.user.loginUrl[loginName],
					params: {
						flag: true
					}
				});
				this.ismeunNumLeft = this.menuDataLeft[0].id;
				this.ismeunNumRight = null;
			} else if (name == '密码修改') {
				this.modal1 = true;
				this.inputValue1 = '';
				this.inputValue2 = '';
				this.inputValue3 = '';
			}
		},
		Confirmpassword() {
			this.$http(ApiSetting.passwordModule, {
				oldpassword: this.inputValue1,
				newpassword: this.inputValue2,
				id: this.userId.id
			}).then(
				res => {
					if (res.data.success == true) {
						this.$Message.info('密码修改成功');
						this.$store.commit('logout', this);
						this.$router.push({
							name: 'login'
						});
					} else {
						if (res.data.success == false) {
							this.$Message.info('密码修改失败');
						}
					}
				},
				error => {
					alert(error);
				}
			);
		},
		Cancelmodel() { },
		check() {
			var boo = this.inputValue2 == this.inputValue3;
			if (boo) {
				return true;
			} else {
				alert('两次密码不一致');
			}
		},
	},
	mounted() {
		var _this = this;
		_this.ptTitle = this.$store.state.user.headertitle[this.$store.state.user.pname];
		_this.getSysList(this.$store.state.user.pname); //获取顶部系统

		if (!sessionStorage.message || sessionStorage.message == "") {
			// this.$router.push({
			// 	name: "login"
			// });
		} else {
			this.ismeunNumLeft = null;
			this.ismeunNumRight = null;
			var currentPath = window.location.hash.slice(1);
			if (currentPath.indexOf("?") > -1) {
				var subcurrpath = currentPath.substring(currentPath.indexOf("?"), currentPath.length);
				var paras = currentPath.substring(currentPath.indexOf("?") + 4);
				for (let i = 0; i < this.menuDataLeft.length; i++) {
					if (paras == this.menuDataLeft[i].id) {
						this.ismeunNumLeft = paras;
					}
				}
				for (let j = 0; j < this.menuDataRight.length; j++) {
					if (paras == this.menuDataRight[j].id) {
						this.ismeunNumRight = paras;
					}
				}
			} else {
				this.ismeunNumRight = null;
				this.ismeunNumLeft = this.menuDataLeft[0].id;
			}
		}

		// 创建定时器更新最新的时间
		const timer = setInterval(function () {
			let dt = new Date();
			var y = dt.getFullYear();
			var mt = padaDate(dt.getMonth() + 1);
			var day = padaDate(dt.getDate());
			var h = padaDate(dt.getHours()); //获取时
			var m = padaDate(dt.getMinutes()); //获取分
			var s = padaDate(dt.getSeconds()); //获取秒
			document.getElementById("showTime").innerHTML = y + "-" + mt + "-" + day + " " + h + ":" + m + ":" + s;
		}, 1000);

		function padaDate(value) {
			return value < 10 ? "0" + value : value;
		};

		this.$once("hook:beforeDestroy", () => {
			clearInterval(timer);
		});

	},

	created() {
		this._getLess("/header/index.less");
	},
};
</script>

<style lang="less">
.header {
	.ivu-dropdown-menu {
		min-width: 0 !important;
	}

	.ivu-dropdown-item {
		padding: 7px 12px !important;
	}

	.Input__original {
		width: 100%;
		height: 35px;
	}

	.Title {
		font-family: 'login';
		color: #fff;
		font-size: 0.46rem;
		position: relative;
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#ffffff), to(#b5e4e4));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-align: center;
	}

}
</style>
