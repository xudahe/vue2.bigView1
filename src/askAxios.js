
import axios from 'axios'
import qs from 'qs'
import store from './vuex/store'
import apiConfig from '../public/apiConfig.js'

axios.interceptors.request.use(config => {
  //store.commit('UPDATE_LOADING',true) //显示loading
 //  if (sessionStorage.getItem("Authorization")) {
	// 	config.headers.common['Authorization'] = sessionStorage.getItem("Authorization") 
	// }
  return config
}, error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    response.data = JSON.parse(response.request.responseText)
  }
  return response
}, error => {
  return Promise.resolve(error.response)
})

function errorState(response) {
  //store.commit('UPDATE_LOADING',false)  //隐藏loading
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    alert('网络异常1')
  }

}

function successState(res) {
  //store.commit('UPDATE_LOADING',false) //隐藏loading
  //统一判断后端返回的错误码
  if (res.data.errCode == '000002') {
    alert('网络异常')
  } else if (res.data.errCode != '000002' && res.data.errCode != '000000') {
    alert('网络异常2')
  }
}
// var baseURL = mapconfig.webservices;
// 176
const httpServer = (opts, data) => {
  let Public = { //公共参数

  }
	if(opts.url.indexOf('&SSQH') != -1){
	  opts.url = opts.url.substring(0,opts.url.indexOf('&SSQH'));
	}else if(opts.url.indexOf('?SSQH') != -1){
	  opts.url = opts.url.substring(0,opts.url.indexOf('?SSQH'));
  }
  var roleid = '',orgid = '';
  if(store.state.user.userinfo.roleid != undefined && store.state.user.userinfo.roleid != ''){
    var rolelist = store.state.user.userinfo.roleid.split(",");
    for(var i =0;i<rolelist.length;i++){
      if(rolelist[i] == "21"){
        roleid = rolelist[i];
      }
    }
    if(roleid == ''){
      roleid = rolelist[0];
    }
  }
  if(store.state.user.userinfo.orgid != undefined && store.state.user.userinfo.orgid != ''){
    orgid = store.state.user.userinfo.orgid;
  }
	// if(opts.url.indexOf('?') != -1){
	// 	// 50是水环境,遇到水环境平台则ssqh传溧水的34
 //    opts.url = opts.url+"&SSQH="+(store.state.user.pid==50?34:store.state.user.pid)+"&sroleid="+roleid+"&sorigid="+orgid;
	// }else{
	//   opts.url = opts.url+"?SSQH="+(store.state.user.pid==50?34:store.state.user.pid)+"&sroleid="+roleid+"&sorigid="+orgid;
 //  }
 if(opts.url.indexOf('?') != -1){
 	// 50是水环境,遇到水环境平台则ssqh传溧水的34
   opts.url = opts.url+"&SSQH="+store.state.user.pid+"&sroleid="+roleid+"&sorigid="+orgid;
 }else{
   opts.url = opts.url+"?SSQH="+store.state.user.pid+"&sroleid="+roleid+"&sorigid="+orgid;
 }
  var baseURL = ''

  baseURL = apiConfig.webservices;

  
  // console.log(baseu);
  let httpDefaultOpts = { //http默认配置  `
    method: opts.method,
    baseURL,
    url: opts.url,
    timeout: 60000,
    params: Object.assign(Public, data),
		
    //data: opts.method == 'get' ?
      //qs.stringify(Object.assign(Public, data)) : qs.stringify(data),
    // headers:opts.headers? opts.headers:(opts.method=='get'?{
    //   'X-Requested-With': 'XMLHttpRequest',
    //   "Accept": "application/json",
    //   "Content-Type": "application/json; charset=UTF-8"
    // }:{
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // })
  }
  if (opts.method == 'get') {
	  // httpDefaultOpts.headers = {
	  //   "Access-Control-Allow-Headers":"x-requested-with,content-type,Authorization"
	  // }
    httpDefaultOpts.data = qs.stringify(Object.assign(Public, data))
    delete httpDefaultOpts.data
  } else if (opts.method == 'post') {
	  // httpDefaultOpts.headers = {
	  //   "Access-Control-Allow-Headers":"x-requested-with,content-type,Authorization"
	  // }
    httpDefaultOpts.data = qs.stringify(data)
    delete httpDefaultOpts.params
  } else if (opts.method == 'other') {
    httpDefaultOpts.method = 'post'
    httpDefaultOpts.headers = {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Content-Type": "application/json; charset=UTF-8"
    }
    httpDefaultOpts.data = JSON.stringify(data)
    delete httpDefaultOpts.params
  } else if (opts.method == 'tpl') {
    httpDefaultOpts.method = 'post'
    httpDefaultOpts.headers = {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
    httpDefaultOpts.data = ata
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        // successState(res)
        resolve(res)
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )

  })
  return promise
}

export default httpServer
