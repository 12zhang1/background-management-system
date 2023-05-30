<template>
  <div class="login-container">
    <!-- 
      color: String类型。默认'#dedede'。粒子颜色。
      particleOpacity: Number类型。默认0.7。粒子透明度。
      particlesNumber: Number类型。默认80。粒子数量。
      shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
      particleSize: Number类型。默认80。单个粒子大小。
      linesColor: String类型。默认'#dedede'。线条颜色。
      linesWidth: Number类型。默认1。线条宽度。
      lineLinked: 布尔类型。默认true。连接线是否可用。
      lineOpacity: Number类型。默认0.4。线条透明度。
      linesDistance: Number类型。默认150。线条距离。
      moveSpeed: Number类型。默认3。粒子运动速度。
      hoverEffect: 布尔类型。默认true。是否有hover特效。
      hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
      clickEffect: 布尔类型。默认true。是否有click特效。
      clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"
    -->
    <vue-particles color="#ffffff" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle" :particleSize="4"
      linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2"
      :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <!-- 登录 -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <!-- 登录 -->
      <div class="title-container">
        <h3 class="title" style="letter-spacing: 20px; font-size: 40px;">登录</h3>
      </div>
      <!-- 账号 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: 111111</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    //这里面在进行表单验证，验证用户名与密码操作
    const validateUsername = (rule, value, callback) => {
      if (!(value.length > 2 && value.length < 12)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
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
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    //登录业务：发请求，单着用户名与密码给服务器(成功与失败)
    handleLogin() {
      //这里是在验证表单元素(用户名与密码)是否符合规则
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //logint效果
          this.loading = true
          //派发登录的action
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            //路由跳转
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  max-height: 100vh;

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
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: rgb(30, 30, 30);
  // background: url(~@/assets/2.jpg) no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;

  .login-form {
    // position: relative;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 520px;
    height: 350px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 150px auto;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-radius: 25px;
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
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
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 10px auto 10px auto;
      text-align: center;
      font-weight: bold;
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
</style>
