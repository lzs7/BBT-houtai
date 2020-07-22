<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="管理员姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="管理员电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="管理员账号" prop="zhanghao">
        <el-input v-model="ruleForm.zhanghao"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="pswr">
        <el-input v-model="ruleForm.pswr"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="qpswr">
        <el-input v-model="ruleForm.qpswr"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="shenfen">
        <el-select v-model="ruleForm.shenfen" placeholder="请选择身份">
          <el-option label="超级管理员" value="shanghai"></el-option>
          <el-option label="管理员" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        phone: "",
        zhanghao: "",
        pswr: "",
        qpswr: "",
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        zhanghao: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        pswr: [{ required: true, message: "请输入密码", trigger: "blur" }],
        qpswr: [{ required: true, message: "请输入密码", trigger: "blur" }],
        shenfen: [
          {
            type: "date",
            required: true,
            message: "请选择身份",
            trigger: "change"
          }
        ],
        
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>