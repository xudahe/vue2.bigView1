import Cookies from 'js-cookie';
const user = {
	state: {
		userinfo: {},
		layers: [],
		identifyTask: '',
		eventlist: undefined,
		modelname: '',
		pname: '',
		serviceId: '',
		pid: '',
		mapload: false,
		servertoken: '',
		headertitle: {
			"灌南县": '灌南县排水管网GIS平台',

		},
		// key为平台名称,value为对应的路由地址
		loginUrl: {
			"灌南县": 'yb',

		},
		title: '灌南县排水管网GIS平台'
	},
	mutations: {

		logout(state, vm) {
			/*  Cookies.remove('code');*/
			Cookies.remove('password');
			localStorage.clear();

		},
		Login(state) {
			state.eventlist = undefined;
			if (!sessionStorage.message || sessionStorage.message == '') {
				//  this.$router.push({
				//   name:'login'
				// })
				//this.$router.replace('login');
			} else {
				var pnameList = JSON.parse(sessionStorage.message).ServerUrl;
				let list = JSON.parse(sessionStorage.message).SysInfos;
				if (state.userinfo.id == undefined) {
					state.userinfo = JSON.parse(sessionStorage.message);
					if (pnameList.length > 0) {
						state.pname = sessionStorage.pname;
						state.serviceId = sessionStorage.serviceId;
						state.pid = sessionStorage.pid;
					}
				}

			}
		}
	}
};

export default user;