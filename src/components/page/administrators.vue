<template>
  <div>
    <el-tabs type="border-card" style="height:500px">
      <el-tab-pane label="人员管理">
        管理员姓名：
        <el-input v-model="list.name" placeholder="姓名" style="width: 200px;"></el-input>管理员账号：
        <el-input v-model="list.zhanghao" placeholder="账号" style="width: 200px;"></el-input>管理员电话：
        <el-input v-model="list.phone" placeholder="手机号码" style="width: 200px;"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <div style="margin-top:10px">
          <Personnel></Personnel>
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
import Personnel from "../../view/Personnel";
import Addpeople from "../../view/Addpeople";
export default {
  data() {
    return {
      list: {
        name: "",
        zhanghao: "",
        phone: ""
      }
    };
  },
  components: {
    Personnel,
    Addpeople
  }
};
</script>