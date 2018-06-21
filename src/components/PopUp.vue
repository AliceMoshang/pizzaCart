<template>
  <transition class="popup" name="fade">
  	<div v-if="message">
  		<div class="content dis-box justify-content-center"  >
  		{{message}}
  		</div>
  	</div>
  </transition>
</template>

<script>
export default {
  name: 'popup',
  props:["message"],
  data () {
    return {
     
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .popup{
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.1);
} */
.content{
  background: #ddd;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  color: #777;
  /* width: 200px; */
  /* height: 100px; */
  /* margin: 150px auto; */
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
