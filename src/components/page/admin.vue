<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20" style="height:270px;">
          <div class="user-info">
            <img src="../../assets/img/img.gif" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{list.adminName}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">
            管理员姓名：
            <span>{{list.adminName}}</span>
          </div>
          <div class="user-info-list">
            管理员电话：
            <span>{{list.adminPhone}}</span>
          </div>
          <div class="user-info-list btn">
            <el-button type="primary" plain @click="dialogFormVisible = true">修改资料</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="管理员姓名">
          <el-input v-model="form.adminName"></el-input>
        </el-form-item>
        <el-form-item label="管理员电话">
          <el-input v-model="form.adminPhone"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号">
          <el-input v-model="form.adminAccount"></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input type="password" v-model="form.adminPassword" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" show-password v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份(不可修改)" readonly>
          <el-input v-model="role"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modify('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getadminparticulars, putAdminParticulars } from '../../api/api'

export default {
  inject: ['reload'],
  name: 'admin',
  data () {
    return {
      list: {},
      form: {},
      rules: {
        adminName: [
          { required: false, message: '请输入用户名', trigger: 'blur' }
        ],
        adminPhone: [
          { required: false, message: '请输入电话号码', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' },
          {
            required: false,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ],
        adminAccount: [
          { required: false, message: '请输入账号', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      readonly: true, // 只读
      adminId: '',
      adminRoleId: ''
    }
  },
  methods: {
    modify (formName) {
      // 表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form
          putAdminParticulars(data)
            .then((res) => {
              if (res.data.code == 200) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                })
                this.reload()
              }
            })
            .catch((err) => console.log(err))
        } else {
          console.log('error submit！')
          return false
        }
      })
      this.dialogFormVisible = false
    }
  },
  mounted () {
    let cookie = this.common.getCookie() // 获取cookie
    this.adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
    getadminparticulars({
      adminId: this.adminId
    })
      .then((res) => {
        this.list = res.data.data
        this.form = {
          adminId: this.list.adminId,
          adminName: this.list.adminName,
          adminPhone: this.list.adminPhone,
          adminAccount: this.list.adminAccount,
          adminPassword: '',
          newPassword: ''
        }
        this.adminRoleId = this.list.adminRoleId
      })
      .catch((err) => console.log(err))
  },
  computed: {
    role () {
      return this.adminRoleId == 1 ? '超级管理员' : this.adminRoleId == 2 ? '高级管理员' : this.adminRoleId == 3 ? '中级管理员' : this.adminRoleId == 4 ? '初级管理员' : this.adminRoleId == 5 ? '管理员' : ''
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
