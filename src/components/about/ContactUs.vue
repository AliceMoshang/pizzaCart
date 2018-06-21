<template>
	<div class="home container">
		<h3>联系我们</h3>
		<div class="dis-box pt-10 pb-10">
			<router-link to="/person">联系人</router-link>
			<router-link to="/phone">电话</router-link>
		</div>
		
		<router-view></router-view>
	</div>
	
</template>

<script>
export default {
name: 'home',
data () {
	return {
	 
	}
}
}
</script>

<style scoped>
	
</style>