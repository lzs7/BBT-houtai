<template>
  <div>
    <el-tabs type="border-card" style="height:500px">
      <el-tab-pane label="人员管理">
        <span>管理员姓名：</span>
        <el-input v-model="list.adminName" placeholder="姓名" style="width: 200px;"></el-input>
        <span style="margin-left:10px">管理员账号：</span>
        <el-input v-model="list.adminAccount" placeholder="账号" style="width: 200px;"></el-input>
        <span style="margin-left:10px">管理员电话：</span>
        <el-input v-model="list.adminPhone" placeholder="手机号码" style="width: 200px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search(list)">搜索</el-button>
        <div style="margin-top:10px">
          <Personnel :selectTable="this.selectTable"></Personnel>
        </div>
      </el-tab-pane>
      <el-tab-pane label="添加管理员">
        <div style="width:50%">
          <Addpeople />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Personnel from '../../view/Personnel'
import Addpeople from '../../view/Addpeople'
import {getadministration} from '../../api/api'
export default {
  data () {
    return {
      list: {
        adminName: '',
        adminAccount: '', // 账号
        adminPhone: ''
      },
      selectTable: {}
    }
  },
  methods: {
    // 筛选功能
    search (val) {
      let data = val
      let cookie = this.common.getCookie() // 获取cookie
      let adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
      let adminRoleId = cookie.replace(/\"/g, '').split('#')[1]
      this.$set(data, 'adminId', adminId)
      this.$set(data, 'adminRoleId', adminRoleId)
      // 发送请求
      getadministration(data).then((res) => {
        this.selectTable = res.data.data
        if (res.data.code == 200) {
          this.$notify({
            title: '成功',
            message: '查询成功',
            type: 'success'
          })
        }
      })
        .catch((err) => console.log(err))
    }
  },
  components: {
    Personnel,
    Addpeople
  }
}
</script>
<style scoped>
span {
  font-size: 14px;
}
</style>
