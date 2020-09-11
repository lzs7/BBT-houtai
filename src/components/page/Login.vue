<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">宝保通后台系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i slot="suffix" class="iconfont icon-crmzhanghao"></i>
        </span>
        <el-input v-model="loginForm.adminAccount" placeholder="账号" />
      </el-form-item>

      <el-form-item prop="password" v-if="visible">
        <span class="svg-container">
          <i slot="suffix" class="iconfont icon-crmmima"></i>
        </span>
        <el-input
          type="password"
          placeholder="密码"
          v-model="loginForm.adminPassword"
          @keyup.enter.native="submitForm('ruleForm')"
        />
        <span class="show-pwd">
          <i
            slot="suffix"
            title="显示密码"
            @click="changePass('show')"
            style="cursor:pointer;"
            class="iconfont icon-crmbiyan"
          ></i>
        </span>
      </el-form-item>
      <!-- **** -->
      <el-form-item prop="password" v-else>
        <span class="svg-container">
          <i slot="suffix" class="iconfont icon-crmmima"></i>
        </span>
        <el-input
          type="text"
          placeholder="密码"
          v-model="loginForm.adminPassword"
          @keyup.enter.native="submitForm('ruleForm')"
        />
        <span class="show-pwd">
          <i
            slot="suffix"
            title="隐藏密码"
            @click="changePass('hide')"
            style="cursor:pointer;"
            class="iconfont icon-crmzhengyanzhuanhuan"
          ></i>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="submitForm('loginForm')"
      >登陆</el-button>
    </el-form>
  </div>
</template>

<script>
import { getAdminLogin } from '../../api/api'
export default {
  data () {
    return {
      loginForm: {
        adminAccount: '',
        adminPassword: ''
      },
      loginRules: {
        adminAccount: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        adminPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      visible: true
    }
  },
  methods: {
    changePass (value) {
      this.visible = !(value === 'show')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.loginForm
          getAdminLogin(data)
            .then((res) => {
              if (res.data.code == 200) {
                let cookie = this.common.getCookie()
                let userId = cookie.replace(/\"/g, '').split('#')[1]
                localStorage.setItem('ms_username', userId)
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                })
                this.$router.push({ path: '/' })
              } else if (res.data.code == 400) {
                this.$message.error('账号或密码错误')
              }
            })
            .catch((err) => console.log(err))
          // this.$router.push('/');
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
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
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
      margin: 0px auto 40px auto;
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
