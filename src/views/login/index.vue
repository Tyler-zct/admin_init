<template>
  <div class="login-container">
    <div class="log-bg">
        <div class="log-cloud cloud1"></div>
        <div class="log-cloud cloud2"></div>
        <div class="log-cloud cloud3"></div>
        <div class="log-cloud cloud4"></div>
        <div class="log-logo">Welcome!</div>
    </div>
    <el-form class='login-form' autoComplete='on' :model='loginForm' :rules='loginRules' ref='loginForm' label-position='left'>
      <div class='title-container'>
        <h3 class='title'>{{$t('login.title')}}</h3>
        <lang-select class='set-language'></lang-select>
      </div>
      <el-form-item prop='username'>
        <span class='svg-container svg-container_login'>
          <svg-icon icon-class='user' />
        </span>
        <el-input name='username' type='text' v-model='loginForm.username' autoComplete='on' placeholder='username' />
      </el-form-item>

      <el-form-item prop='password'>
        <span class='svg-container'>
          <svg-icon icon-class='password' />
        </span>
        <el-input name='password' :type='passwordType' @keyup.enter.native='handleLogin' v-model='loginForm.password' autoComplete='on' placeholder='password' />
        <span class='show-pwd' @click='showPwd'>
          <svg-icon icon-class='eye' />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

    </el-form>
  </div>
</template>

<script>
import { validateLowerCase } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  components: { LangSelect },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validateLowerCase(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel='stylesheet/scss' lang='scss'>
$bg: #2d3a4b;
$light_gray: #000;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(5, 1, 1, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background-color: white;
  }
}
</style>

<style rel='stylesheet/scss' lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #000;
.login-container {
  // background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  // background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  // background: linear-gradient(to bottom, #2b2d42 0%, #ff7c00 100%);
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    top: 155px;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 11px 26px 0px rgba(0, 0, 0, 0.28);
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #2d3a4b;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login {
	position:fixed;
	overflow:hidden;
	left:50%;
	margin-left:-250px;
	top:50%;
	margin-top:-350px;
	width:500px;
	min-height:555px;
	z-index:10;
	right:140px;
	background:#fff;
	-webkit-border-radius:5px;
	-moz-border-radius:5px;
	-ms-border-radius:5px;
	-o-border-radius:5px;
	border-radius:5px;
	-webkit-box-shadow:0px 3px 16px -5px #070707;
	box-shadow:0px 3px 16px -5px #070707
}
.log-close {
	display:block;
	position:absolute;
	top:12px;
	right:12px;
	opacity:1;
}
.log-close:hover .icons {
	transform:rotate(180deg);
}
.log-close .icons {
	opacity:1;
	transition:all .3s
}
.log-cloud {
	background-image:url(images/login-cloud.png);
	width:63px;
	height:40px;
	position:absolute;
	z-index:1
}
.login .cloud1 {
	top:21px;
	left:-30px;
	transform:scale(.6);
	animation:cloud1 20s linear infinite;
}
.login .cloud2 {
	top:87px;
	right:20px;
	animation:cloud2 19s linear infinite;
}
.login .cloud3 {
	top:160px;
	left:5px;
	transform:scale(.8);
	animation:cloud3 21s linear infinite;
}
.login .cloud4 {
	top:150px;
	left:-40px;
	transform:scale(.4);
	animation:cloud4 19s linear infinite;
}
.log-bg {
	background:url(images/login-bg.jpg);
	width:100%;
	height:312px;
	overflow:hidden;
}
.log-logo {
	height:80px;
	margin:55px auto 25px;
	text-align:center;
	color:#1fcab3;
	font-weight:bold;
	font-size:40px;
}
.log-text {
	color:#57d4c3;
	font-size:13px;
	text-align:center;
	margin:0 auto;
}
.log-logo,.log-text {
	z-index:2
}
.icons {
	background:url(images/icons.png) no-repeat;
	display:inline-block;
}
.close {
	height:16px;
	width:16px;
	background-position:-13px 0;
}
.log-bg .cloud1{top:21px; left: -30px; transform: scale(.6); animation: cloud1 20s linear infinite;}
.log-bg .cloud2{top:87px; right: 20px; animation: cloud2 19s linear infinite;}
.log-bg .cloud3{top:160px; left: 5px;transform: scale(.8);animation: cloud3 21s linear infinite;}
.log-bg .cloud4{top:150px; left: -40px;transform: scale(.4);animation: cloud4 19s linear infinite;}

@-webkit-keyframes cloud1 {
	0% {
	left:400px;
}
100% {
	left:-130px;
}
}@keyframes cloud1 {
	0% {
	left:400px;
}
100% {
	left:-130px;
}
}@-webkit-keyframes cloud2 {
	0% {
	left:700px;
}
100% {
	left:-90px;
}
}@keyframes cloud2 {
	0% {
	left:700px;
}
100% {
	left:-90px;
}
}@-webkit-keyframes cloud3 {
	0% {
	left:820px;
}
100% {
	left:-70px;
}
}@keyframes cloud3 {
	0% {
	left:820px;
}
100% {
	left:-70px;
}
}@-webkit-keyframes cloud4 {
	0% {
	left:300px;
}
100% {
	left:-70px;
}
}@keyframes cloud4 {
	0% {
	left:300px;
}
100% {
	left:-70px;
}
}
</style>
