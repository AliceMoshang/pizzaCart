<template>
  <div class="login">
  
  	<el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm mt-20">
    <!-- <el-form-item label="邮箱" prop="email">
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item> -->
	<el-form-item label="手机号" prop="mobile" >
		<el-input type="text" v-model="loginForm.mobile" auto-complete="off"></el-input>
	</el-form-item>

	<el-form-item label="密码" prop="pass">
		<el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
	</el-form-item>
	  	
	<el-form-item label="确认密码" prop="checkPass">
		<el-input type="password" v-model="loginForm.checkPass" auto-complete="off"></el-input>
	</el-form-item>
	
	<div class="rel">
		<div>
			<el-form-item label="短信验证码" prop="smsCode">
				<el-input type="text" v-model="loginForm.smsCode" auto-complete="off"></el-input>
			</el-form-item>
		</div>
		<button class=" btn-block right" @click="getSmsCode">{{countText}}</button>
	</div>
	

	<!-- <div class="dis-box pb-30">
        <div class="left fs14 c-red">*<span class="pl-5 c-main">短信验证码</span></div>
        <div class="right flex-1 dis-box b justify-content-between">
            <div class="sms">
                <input type="text"  v-model="loginForm.code">
            </div>
            <button class=" btn-block" @click="getSmsCode">{{countText}}</button>
        </div>               
    </div>
 -->
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
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.loginForm.checkPass !== '') {
            this.$refs.loginForm.validateField('checkPass');
          }
          callback();
        }
      };
	var validatePass2 = (rule, value, callback) => {
	if (value === '') {
	  callback(new Error('请再次输入密码'));
	} else if (value !== this.loginForm.pass) {
	  callback(new Error('两次输入密码不一致!'));
	} else {
	  callback();
	}
	};
	var validatePass3 = (rule, value, callback) => {
	if (value === '') {
	  callback(new Error('请输入验证码'));
	} else {
	  callback();
	}
	};
	var validatePass4 = (rule, value, callback) => {
	if (!(/0?(13|14|15|18)[0-9]{9}/.test(value))) {
	  callback(new Error('手机号码格式错误！'));
	} else {
	  callback();
	}
	};
	return {
	alertM:'',
	countText:'点击获取',
	loginForm: {
	  pass: '',
	  checkPass: '',
	  smsCode:'',
	  mobile:''
	},
	rules2: {
	  pass: [
	    { validator: validatePass1, trigger: 'blur',required: true }
	  ],
	  checkPass: [
	    { validator: validatePass2, trigger: 'blur',required: true }
	  ],
	  // email: [
	  // 	{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
			// { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
	  // ],
	  smsCode: [
	  	{ validator: validatePass3, trigger: 'blur',required: true}
	  ],
	  mobile: [
	    { validator: validatePass4, trigger: 'blur',required: true }
	  ],
	}
	};
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$http.post('/aliceusers.json',this.loginForm).then(res=>{
          		// console.log(res)
          		this.alertM = "用户注册成功！"
          		setTimeout(()=>{
          			this.$router.push('/login')
          		},1000)
          		
          	})
            
          } else {
            console.log('error submit!!');
            return false;
          }	
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getSmsCode () {
        if(!this.duration) return;
        this.$http.post(Api+'login/sendcode', {mobile: this.mobile}).then((res)=>{
            if(res.data.err_code == 0){
                var time = 180;
                this.duration = false;
                this.countText = time +'s 后重新获取';
                var t = setInterval(()=>{
                    time --;
                    this.countText = time +'s 后重新获取';
                    if(time < 0){
                        this.countText = '获取验证码';
                        this.duration = true;
                        clearInterval(t);
                    }  
                },1000)
            }else{
                jqueryAlert({
                    'content' : res.data.msg,
                    'closeTime' : 1000
                })
            }
        })
        }, 
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
.left{
	width: 88px;
	padding-right: 12px;
	text-align: right;
}
.right{
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 40px;
	padding: 5px 18px;
	margin: 5px 4px;
	background: #409EFF;
	color: #fff; 
}

</style>
