//一级路由
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import About from './components/About'
import Menu from './components/Menu'
import MyAdmin from './components/MyAdmin'

//二级路由
import ContactUs from './components/about/ContactUs'
import Dilivery from './components/about/Dilivery'
import History from './components/about/History'
import Order from './components/about/Order'

//三级路由
import PersonName from './components/about/contact/PersonName'
import Phone from './components/about/contact/Phone'

export const routes = [
	{path:"/",components:{
		default: Home,
		'order': Order,
		'history': History,
		'dilivery': Dilivery,
	}},
	{path:"/menu",component:Menu},
	{path:"/myadmin",component:MyAdmin,
	// beforeEnter:(to, from ,next)=>{
		//路由独享守卫
		//alert("还未登陆，请先登陆！")
        //next(false);页面不会跳转，还在上一个路由处。
		//判断store.getters.isLogin == false
		// if(to.path == "/login" || to.path == "/register"){
		// 	next();
		// }else{
		// 	alert("还没有登陆，请先登陆！")
		// 	next("/login")
		// }
	// }
	},
	{path:"/login",component:Login},
	{path:"/register",component:Register},
	{path:"/about",component:About,redirect:'/contactus',
		children:[//二级路由
			{path:'/contactus',component:ContactUs,redirect:'/phone',
			children:[//三级路由
			{path:'/person',component:PersonName},
			{path:'/phone',component:Phone},
			]
			},
		{path:'/dilivery',component:Dilivery},
		{path:'/history',component:History},
		{path:'/order',component:Order},
	]},
	]