<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="管理员姓名" prop="adminName">
        <el-input v-model="ruleForm.adminName"></el-input>
      </el-form-item>
      <el-form-item label="管理员电话" prop="adminPhone">
        <el-input v-model.number="ruleForm.adminPhone"></el-input>
      </el-form-item>
      <el-form-item label="管理员账号" prop="adminAccount">
        <el-input v-model="ruleForm.adminAccount"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="adminPassword">
        <el-input v-model="ruleForm.adminPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="qpswr">
        <el-input v-model="ruleForm.qpswr"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="adminRoleId">
        <el-select v-model="ruleForm.adminRoleId" placeholder="请选择身份">
          <el-option
            v-for="(item,index) in adminRoleId"
            :key="index"
            :label="item.adminRoleName"
            :value="item.adminRoleId"
          ></el-option>
          <!-- <el-option label="管理员" value="beijing"></el-option> -->
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
import { getadminrole, postadmin } from '../api/api'

export default {
  inject: ['reload'],
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.qpswr !== '') {
          this.$refs.ruleForm.validateField('qpswr')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.adminPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      adminRoleId: [],
      ruleForm: {
        adminName: '',
        adminPhone: '',
        adminAccount: '',
        adminPassword: '',
        qpswr: '',
        adminRoleId: ''
      },
      rules: {
        adminName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        adminPhone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            required: true,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          },
          { type: 'number', message: '必须为数字值' }
        ],
        adminAccount: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        adminPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        qpswr: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        adminRoleId: [
          {
            type: 'date',
            required: true,
            message: '请选择身份',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          let cookie = this.common.getCookie() // 获取cookie
          let adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
          let adminid = parseInt(adminId)
          console.log(adminid)
          let data = this.ruleForm
          this.$set(data, 'adminId', adminid) // adminid存入data中
          postadmin(data)
            .then((res) => {
              console.log(res.data)
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                })
                this.reload()
              }
            })
            .catch((err) => console.log(err))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    getadminrole()
      .then((res) => {
        this.adminRoleId = res.data.data
        console.log(this.adminRoleId)
      })
      .catch((err) => console.log(err))
  }
}
</script>
