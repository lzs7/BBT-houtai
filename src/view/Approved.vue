<template>
  <div>
    <!-- 和豆申请审核通过页面 -->
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column prop="userName" label="代理人姓名" width="200"></el-table-column>
      <el-table-column prop="cardNumber" label="人车生活卡号" width="200"></el-table-column>
      <el-table-column prop="beansTime" label="和豆申请时间" width="200"></el-table-column>
      <el-table-column prop="newbeansTime" label="处理时间" width="200"></el-table-column>
      <el-table-column prop="adminName" label="管理员姓名" width="200"></el-table-column>
      <el-table-column prop="beansState" label="处理结果" width="200" :formatter="beansState"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getallbeans } from '../api/api'
export default {
  data() {
    return {
      tableData1: [],
      adminId: "",
    };
  },
  methods:{
      beansState(row){
          return row.beansState == 1?'审核通过': ''
      }
  },
  mounted() {
    let cookie = this.common.getCookie(); //获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    getallbeans({
      adminId: this.adminId,
      beansState: 1,
    })
      .then((res) => {
        console.log(res.data);
        this.tableData1 = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>