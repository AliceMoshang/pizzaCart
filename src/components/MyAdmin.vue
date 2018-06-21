<template>
	<div class="myadmin container">
		<el-row :gutter="20">
		  <el-col :md="16" :sm="24">
		  	<new-pizza></new-pizza>
		  </el-col>
		  <!-- 右侧菜单 -->
		  <el-col :md="8" :sm="24">
			  <div class="fw-b bb ptb-15 c6">Menu:</div>
			  <el-row class="bb">
				  <el-col :span="12"><div class="fs14 ptb-10">品种</div></el-col>
				  <el-col :span="12"><div class="fs14 ptb-10">删除</div></el-col>
			   </el-row>
			   <el-row class="bb" v-for="item in pizzas">
				  <el-col :span="12"><div class="fs14 ptb-10">{{item.name}}</div></el-col>
				  <el-col :span="12"><div class="fs14 ptb-10 el-icon-delete pl-10 pointer" @click="deletepizza(item)"></div></el-col>
			   </el-row>
		  </el-col>
		</el-row>
	
	</div>
	
</template>

<script>
import NewPizza from './NewPizza'
export default {
name: 'myadmin',
components:{
	NewPizza
},
data(){
	return{
		// pizzas:[]
	}
},
mounted: function(){
	this.$http.get('/alicemenu.json').then(res=>{
		var menuArray= []
		for (let key in res.data){
			// console.log(66,key)
			res.data[key].id = key
			menuArray.push(res.data[key])
		}
		//更新数据到vuex,数据同步
		this.$store.commit('setMenuItems',menuArray)

	})
},
computed:{
	pizzas(){
		//在vuex中获取数据
		// return this.$store.state.menuItems
		//通过getters获取数据
		return this.$store.getters.getMenuItems
		// get(){
		// 	return this.$store.state.menuItems
		// },
		// set(){

		// }
	},
	
},
methods:{
	deletepizza(item){
		this.$http.delete('/alicemenu/'+item.id+'.json').then(res=>{
			// console.log(55,res)
			// this.$router.push('/menu')
			this.$store.commit('removeMenuItems',item)


		})
	}
}
// data () {
// 	return {
// 		name:"Alice"
// 	}
// },
//组件内守卫
// 1.进入组件时的守卫
// beforeRouteEnter: (to, from, next)=>{
// 	// alert("Hello" + this.name)
// 	//next() 
// 	//此时会弹出hello undifined，因为在data渲染之前触发的beforeRouteEnter，但next()可以正常跳转。

// 	next( vm =>{
// 		alert("Hello" + vm.name)
// 	})
// 	在回调函数next()中。可以拿到data的值，并实现跳转。
// }
//2.离开组件时的守卫
// beforeRouteLeave (to, form ,next){
// 	if(confirm("确定离开吗？") == true){
// 		next()
// 	}else{
// 		next(false)
// 	}
// }

}	
</script>

<style scoped>
.pointer{
	cursor: pointer;
}
</style>