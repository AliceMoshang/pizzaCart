<template>
  <div class="common-head container dis-box justify-content-between">
  	<div class="dis-box">
  		<div class="iconfont icon-lixue c-blue pr-20"><span class="pl-10 fw-b">Pizza点餐系统</span></div>
		<nav class="dis-box ">
		
      <router-link to="/">主页</router-link>
      <router-link to="/menu">菜单</router-link>
      <router-link to="/myadmin">管理</router-link>
      <router-link to="/about">关于我们</router-link>
		</nav>
  	</div>

  	<div class="dis-box">
  		<router-link to="/login" v-show="!isLogin">登陆</router-link>
  		<router-link to="/register" v-show="!isLogin">注册</router-link>
      <div class="dis-box"  v-show="isLogin">
        <div class="pd-10 fs14">{{currentUser}}</div>
        <router-link to="/login" class="pd-10 fs14">[退出]</router-link>
      </div>      
  	</div>	

  </div>
</template>

<script>
export default {
  name: 'common-head',
  data () {
    return {
     
    }
  },
 
  computed:{
    currentUser(){
      return this.$store.getters.currentUser
    },
    isLogin(){
      return this.$store.getters.isLogin

    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.common-head{
  background: #eee;
  padding-left: 15px;
}
</style>
