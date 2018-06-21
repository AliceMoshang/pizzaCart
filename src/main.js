// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {store} from './store/store.js'

//引入路由文件
import { routes } from './routes'

import axios from 'axios'
axios.defaults.baseURL = 'https://wd2730848817yvaxtm.wilddogio.com/'
Vue.prototype.$http = axios
//外部样式
import '../static/css/common.css'
import '../static/css/font/iconfont.css'



// 按需引入element ui组件
import {  
	Form,
  	FormItem,
  	Button,
  	Input,
    Row,
    Col ,
    Icon
   } from 'element-ui';
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon);
Vue.config.productionTip = false
Vue.use(VueRouter)

//路由配置
const router = new VueRouter({
	routes,
	mode:"history",
  scrollBehavior(to,from,savedPosition){
    // return { x:0, y :100}
   // return { selector: '.btn'}
   if(savedPosition){
    return savedPosition
   }else{
    return { x:0, y :0}
   }
  }
})

//全局守卫
// router.beforeEach((to, from , next)=>{
// 	//alert("还未登陆，请先登陆！")
// 	//next();让页面正常显示
// 	//判断store.getters.isLogin == false
// 	if(to.path == "/login" || to.path == "/register"){
// 		next();
// 	}else{
// 		alert("还没有登陆，请先登陆！")
// 		next("/login")
// 	}
// })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  render: h => h(App),
  router,
  store
})


