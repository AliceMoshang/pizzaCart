<template>
  <div id="app">   
    <common-head></common-head>
    <div class="container">
    	<router-view></router-view>
    
    </div>
    <div class="container dis-box justify-content-between">
      <router-view name="order"></router-view>
      <router-view name="history"></router-view>
      <router-view name="dilivery"></router-view>
    </div>
  </div>
</template>

<script>
import CommonHead from "./components/CommonHead"
export default {
  name: 'App',
  components: {
    CommonHead
  }
}
</script>

<style>

</style>
