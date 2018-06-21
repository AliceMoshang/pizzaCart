<template>
	<div class="container">
		<div class="dis-box align-items-top">
			<div>
				<div class="item">
					<router-link to="/contactus">联系我们</router-link>
				</div>
				<div class="item">
					<router-link to="/dilivery">快递信息</router-link>
				</div>
				<div class="item">
					<router-link to="/history">订单历史</router-link>
				</div>
				<div class="item">
					<router-link to="/order">我的订单</router-link>
				</div>
				
			</div>
			<div class="pd-10"><router-view></router-view></div>
		</div>
	</div>
	
</template>

<script>
export default {
name: 'about',
data () {
	return {
	 
	}
}
}	
</script>

<style scoped>
.item{
	padding: 10px 15px;
	border: 1px solid #f3f3f3;
	margin-top: 10px;
	border-radius: 5px;
	width: 130px;
}
</style>