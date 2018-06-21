<template>
	<div class="home container dis-box justify-content-center">
		<div class="middle dis-box justify-content-center flex-direction-column">
			<h1 class="mt-20">欢迎大家品尝Pizza!</h1>
			<h3 class="mt-20">这里有你非常喜欢的Pizza!</h3>
			<el-button type="primary" class="mt-20 btn" @click="gotoMenu">Let's Order!</el-button>
		</div>
	</div>
	
</template>

<script>
export default {
name: 'home',
data () {
	return {
	 
	}
},
methods:{
	gotoMenu(){
		this.$router.push('/menu')
	}
}
}
</script>

<style scoped>
.home{
	background: url('../assets/pizza.jpg');
	min-height: 500px;
	min-width: 730px;
	background-repeat: no-repeat;
	background-size:100% 
}
.middle{
	height: 300px;
	width: 80%;
	background: #fff;
	opacity: 0.6;
}
</style>