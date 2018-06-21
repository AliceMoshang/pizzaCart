<template>
	<div class="mymenu container">
		<el-row :gutter="20">
			<el-col :sm="24" :md="16">
				<el-row class="bb pd-10">
				  <el-col :span="12"><div class="fw-b fs14">尺寸</div></el-col>
				  <el-col :span="6"><div class="fw-b fs14">价格</div></el-col>
				  <el-col :span="6"><div class="fw-b fs14">加入</div></el-col>
				</el-row>
				<div v-for="item in Items">
					<el-row class="fw-b fs14 pd-10 bb" > {{item.name}}</el-row>
					<el-row class="bb pd-10" v-for="option in item.options">
					  <el-col :span="12"><div class="fs12">{{option.size}}</div></el-col>
					  <el-col :span="6"><div class="fs12">{{option.price}}</div></el-col>
					  <el-col :span="6"><div class="iconfont icon-tianjia fs14" @click="additem(item,option)"></div></el-col>
					</el-row>
				</div>
			</el-col>
			<!-- 购物车 -->
		  	<el-col :sm="24" :md="8">
			  	<div class="bb pd-10 fs14 c9" v-if="baskets.length==0">购物车没有任何商品</div>
			  	<div v-if="baskets.length>0">
			  		<div class="bb pd-10" >
			  		<el-row>
					  <el-col :span="9"><div class="fw-b fs14">数量</div></el-col>
					  <el-col :span="11"><div class="fw-b fs14 ">品种</div></el-col>
					  <el-col :span="4"><div class="fw-b fs14">价格</div></el-col>
					</el-row>
			  	</div>

			  	<div class="bb pd-10" v-for="item in baskets">
			  		<el-row>
					  <el-col :span="9">
					  	<div class="fs14">
					  	  <span class="pr-5 pointer  el-icon-minus" @click="decreaseNum(item)"></span>
					  	  <span class="pr-5 fs12">{{item.quantity}}</span>
					  	  <span @click="increaseNum(item)" class="pointer el-icon-plus"></span>
					    </div>
					  </el-col>
					  <el-col :span="11"><div class="fs12 ">{{item.name}}&nbsp{{item.size}}寸</div></el-col>
					  <el-col :span="4"><div class="fs12 ">{{item.price*item.quantity}}</div></el-col>
					</el-row>
			  	</div>

			  	<div class="fs12 mt-10">总价：<span>{{total}}RMB</span></div>
			  	<el-button type="success" class="w-full mt-10 pd-10">提交</el-button>
			  	</div>
			  	
		 	 </el-col>
		</el-row>
	
	</div>
	
</template>

<script>
export default {
name: 'mymenu',
data () {
	return {
	 baskets:[],	
	 // Items:[]
	}
},
// watch:{
// 	state: function(){
// 		if(this.baskets.length == 0){
// 			return true
// 		}else{
// 			return false
// 		}
// 	}
// },
created(){
	//组件内请求赋值Items
	// this.$http.get('/alicemenu.json').then(res=>{
	// 	// console.log(res.data)
	// 	for(let key in res.data){
	// 		this.Items.push(res.data[key])
	// 	}
	// 	// console.log(this.Items)
	// })

	//将请求下来的数据存储到vuex中
	this.$http.get('/alicemenu.json').then(res=>{
		let menuArr= []
		for(let key in res.data){
			menuArr.push(res.data[key])
		}
		this.$store.commit("setMenuItems",menuArr)//commit代表改变属性状态，就是在mutations里有一个方法setMenuItems可以改变属性。 并将res.data当作参数传递到setMenuItems方法中。
	})

},
computed:{
	Items(){
		//在vuex中获取数据
		return this.$store.state.menuItems
	},
	total(){
		let totalCost = 0
		for(let index in this.baskets){
			let everyItem = this.baskets[index]
			totalCost += everyItem.quantity*everyItem.price
		}
		return totalCost
	}
},
methods:{
	additem(item,option){
		let basket = {name:item.name,size:option.size,price:option.price,quantity:1}
		if(this.baskets.length>0){
			//过滤
			let result = this.baskets.filter((basket)=>{
				return basket.name == item.name && basket.price == option.price
			})
			console.log(555,result)
			if(result !== null && result.length > 0){
				result[0].quantity++
			}else{
				this.baskets.push(basket)
			}

		}else{
			this.baskets.push(basket)	
		}
		
	},
	decreaseNum(item){
		if(item.quantity>1){
			item.quantity--
		}else{
			this.removeNum(item)
		}
	},
	increaseNum(item){
		item.quantity++
	},
	removeNum(item){
		this.baskets.splice(this.baskets.indexOf(item),1)
	}
}
}	
</script>

<style scoped>
.pointer{
	cursor: pointer;
}
</style>