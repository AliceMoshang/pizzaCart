<template>
  <div class="login">
  
  	<el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm mt-20">
    <!-- <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
    >
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item> -->
    <el-form-item label="手机号" prop="mobile">
      <el-input type="text" v-model="loginForm.mobile" auto-complete="off"></el-input>
    </el-form-item>

	  <el-form-item label="密码" prop="pass">
	    <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
	  </el-form-item>
 
	  <el-form-item>
	    <el-button type="primary" @click="submitForm('loginForm')" class="btn-main">提交</el-button>
	    <el-button @click="resetForm('loginForm')" class="btn-main">重置</el-button>
	  </el-form-item>
    
	</el-form>

  <pop-up :message="alertM" ></pop-up>  
   
  </div>
</template>

<script>
  import PopUp from './PopUp.vue'
  export default {
  	name: 'login',
    components:{
      PopUp
    },
    watch:{
    alertM: function(){
     return setTimeout(()=>{
      this.alertM =""
     },1000)
    }
    },
    
    data() {
      var validatePass1 = (rule, value, callback) => {
        if (!(/0?(13|14|15|18)[0-9]{9}/.test(value))) {
          callback(new Error('手机号码格式错误！'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
   
      return {
        alertM:'',
        loginForm: {
          pass: '',
          mobile: ''
        },
        rules2: {
          pass: [
            { validator: validatePass2, trigger: 'blur',required: true }
          ],
          mobile: [
            { validator: validatePass1, trigger: 'blur',required: true }
          ],
        }
      };
    },
    //组件内守卫
    beforeRouteEnter: (to,from, next)=>{
      next(vm => 
        vm.$store.dispatch("setCurrentUser",null)
        // 或者
        // vm.$store.commit("userStatus",null)
      )
    }, //每进入登陆页面则清空user
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.get('/aliceusers.json').then(res=>{
              console.log(res.data)
              const users= []
              for(let key in res.data){
                const user = res.data[key]
                console.log(user)
                users.push(user)
              }
              console.log(11,users)
              //实现过滤
              let result = users.filter((user)=>{
                return user.mobile === this.loginForm.mobile && user.pass === this.loginForm.pass
              })
              console.log(55,result)
              if(result.length>0){

                this.alertM = "用户登陆成功！"
                this.$store.commit('userStatus',result[0].mobile)
                // this.$store.dispatch('setCurrentUser',result[0].mobile) //在action里定义setCurrentUser
                setTimeout(()=>{
                  this.$router.push('/')
                },1000)

              }else{
                this.alertM = "用户登陆失败！"
                this.$store.dispatch('setCurrentUser',null)
              }
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  position: relative;
}
.btn-main{  
  padding: 8px 18px ;
} 

</style>
