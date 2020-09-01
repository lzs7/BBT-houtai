<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.adminAccount" placeholder="请输入账号">
            <el-button slot="prepend" icon="iconfont icon-crmzhanghao"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.adminPassword"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="iconfont icon-crmmima"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getAdminLogin } from "../../api/api";
export default {
  data: function () {
    return {
      ruleForm: {
        adminAccount: "",
        adminPassword: "",
      },
      rules: {
        adminAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        adminPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.ruleForm;
          console.log(data);
          getAdminLogin(data)
            .then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                let cookie = this.common.getCookie();
                let userId = cookie.replace(/\"/g, "").split("#")[1];
                localStorage.setItem("ms_username", userId);
                this.$message({
                  message: "登陆成功",
                  type: "success",
                });
                this.$router.push({ path: "/" });
              }else if(res.data.code == 400) {
                  this.$message.error('账号或密码错误');
              }
            })
            .catch((err) => console.log(err));
          // this.$router.push('/');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #000;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-heigh: #000;
}
</style>