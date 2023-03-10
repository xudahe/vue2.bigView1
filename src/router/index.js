import Vue from 'vue'
import VueRouter from 'vue-router'
import NavConfig from './nav.config.yml'
Vue.use(VueRouter)

function regeisterRoute (navConfig) {
  const routes = []
  const parentRoutes = {}
  Object.keys(NavConfig).forEach((lang, idx) => {

    const pageNavs = NavConfig[lang]

    pageNavs.forEach(nav => {
      const parentName = nav.name
      const pagetype=nav.type;

    // if (parentName==undefined || parentName=="") {
    //   alert("111");
    // }

    parentRoutes[`${parentName}`] = parentRoutes[`${parentName}`] || addParentRoute(parentName, lang)

    if (nav.groups) {
      nav.groups.forEach(group => {

        group.items.forEach(item => {
          // if(pagetype=='compent')
          // {
          //   regeisterComponent(parentName,item.name,group.fold)
          // }
          // else
            addRoute(parentName, item, group.fold)
        })
        // if(group.details){
        //   group.details.forEach(item => {
        //   //if(pagetype=='compent')
        //   {
        //     regeisterComponent(parentName,item.name,group.fold)
        //   }

        // })
        // }
      })
    } else if(nav.views){
      nav.views.forEach(group => {


        // if(pagetype=='compent')
        // {
        //   regeisterComponent(parentName,group.name,group.fold)
        // }
        // else
          addviewRoute(parentName, group)


      })
    } else if (nav.items) {
      nav.items.forEach(item => {
        addRoute(parentName, item, "")
      })
    }
  })

  })
//   function regeisterComponent(parentName,templateName,groupname){
//     Vue.component(templateName,  function (resolve) {
//   // 这个特殊的 require 语法告诉 webpack
//   // 自动将编译后的代码分割成不同的块，
//   // 这些块将通过 Ajax 请求自动下载。
//   require([`@/${parentName}/${groupname}/${templateName}.vue`], resolve)
// });
//   }
  function addParentRoute (parentName, lang) {
    return {
      path: `/${parentName.toLowerCase()}`,
      component:resolve => { require([`@/view/${parentName.toLowerCase()}.vue`],resolve);},
      children: []
    }
  }

  function addRoute (parentName, item, lang) {
    parentRoutes[`${parentName}`].children.push({
      path: `${item.name.toLowerCase()}`,
      name: `${item.name.toLowerCase()}`,
      meta:{title:`${item.title.toLowerCase()}`},
      component: resolve => {require([`@/components/${parentName}/${lang}/${item.name.toLowerCase()}.vue`],resolve);}
    })
  }
  function addviewRoute (parentName, item) {
    parentRoutes[`${parentName}`].children.push({
      path: `${item.name}`,
      name: `${item.name}`,
      meta:{title:`${item.title.toLowerCase()}`},
      component: resolve => {require([`@/view/${item.name}.vue`],resolve);}
    })
  }

  for (const key in parentRoutes) {
    if (parentRoutes.hasOwnProperty(key)) {
      routes.push(parentRoutes[key])
    }
  }

  return routes
}

let routes = regeisterRoute(NavConfig)

const userLang =  'zh'

routes = routes.concat([{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component:resolve => { require(['@/components/login.vue'], resolve);}
},
{
  path: '/login',
  name: 'yb',
  meta: {
    title: '首页'
  },
  component:resolve => { require(['@/components/login.vue'], resolve);}
},

{
  path: '/load',
  name: 'load',
  meta: {
    title: '加载'
  },
  component:resolve => { require(['@/components/load.vue'], resolve);}
},


])

routes.forEach(page => {

  if (page.path === '/home') {
   // page.name='opmng';
   page.children.push({
     path: '',
     name: 'home',
     redirect: { name: page.children[0].name }
   })
 } else if (page.path === '/dailychecksys') {
   page.children.push({
     path: '',
     name: 'dailychecksys',
     redirect: { name: page.children[0].name }
   })
 }

})

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }

    return { x: 0, y: 0 }
  }
})

function GenerateRoutes(privileges){
    var f = item => {
        if(item.path === '*'){
            return true;
        }else{
            if(item.children && item.children.length > 0){
                item.children = item.children.filter(f);
                if(item.children.length>0){
                    item.redirect = item.children[0].path;
                    return true;
                }else{
                    return false;
                }
            }else{
                return (privileges.indexOf(item.name) > -1)
            }
        }
    }

    let accessedRouters = asyncRouter.filter(f);
    let recombineRouters = constantRouter.concat(accessedRouters);
    sessionUtil.setItem('recombineRouters',recombineRouters);
    return accessedRouters;
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router
