<template>
	<div class="newpizza container">
		<el-row >
		  <el-col>
		  	<div class="fw-b ptb-15 bb c6">添加新的pizza:</div>
		  	<div class="bb fw-b fs14 ptb-10">品种:<input type="text" class="pl-10" v-model="pizza.name"></div>
		  	<div class="fw-b fs14 pt-10">描述：<textarea rows="3" v-model="pizza.info"></textarea></div>
		  	<div class="fs14 fw-b ptb-10 bb">选项1</div>
		  	<div class="bb fs12 ptb-10">尺寸：<input type="text" class="pl-10" v-model="pizza.size1"></div>
		  	<div class="bb fs12 ptb-10">价格：<input type="text" class="pl-10" v-model="pizza.price1"></div>
			<div class="fs14 fw-b ptb-10 bb">选项2</div>
		  	<div class="bb fs12 ptb-10">尺寸：<input type="text" class="pl-10" v-model="pizza.size2"></div>
		  	<div class="bb fs12 ptb-10">价格：<input type="text" class="pl-10" v-model="pizza.price2"></div>
		  	<el-button type="success" class="pd-10 w-full fs12" @click="addpizza">添加</el-button>
		  </el-col>
		  
		</el-row>
		
	</div>
	
</template>

<script>
export default {
name: 'newpizza',
data(){
	return{
		pizza:{}
	}
},
methods:{
	addpizza(){
		let data ={
			name: this.pizza.name,
			description: this.pizza.info,
			options: [
			{
				size: this.pizza.size1,
				price: this.pizza.price1
			},
			{
				size: this.pizza.size2,
				price: this.pizza.price2
			}
			]
		}
		this.$http.post('/alicemenu.json',data).then(res=>{
			//将数据发送到接口，并更新数据到vuex
			this.$store.commit('addMenuItems',data)

		})
		
	}
}

}	
</script>

<style scoped>
	
</style>