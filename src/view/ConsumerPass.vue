<template>
  <div>
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column prop="userName" label="代理人姓名" width="200"></el-table-column>
      <el-table-column prop="consumeNumber" label="大家保险保单号" width="200"></el-table-column>
      <el-table-column prop="consumeTime" label="消费卡申请时间" width="200"></el-table-column>
      <el-table-column prop="newconsumeTime" label="审核时间" width="200"></el-table-column>
      <el-table-column prop="adminName" label="管理员姓名" width="200"></el-table-column>
      <el-table-column prop="consumeState" label="处理结果" width="200" :formatter="consumeState"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getallconsume } from "../api/api";
export default {
  data() {
    return {
      tableData1: [],
      adminId : ''
    };
  },
  methods : {
      consumeState(row) {
          return row.consumeState == 1 ? '审核通过' : ''
      }
  },
  mounted() {
    let cookie = this.common.getCookie(); //获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    getallconsume({
      adminId: this.adminId,
      consumeState: 1,
    })
      .then((res) => {
        console.log(res.data);
        this.tableData1 = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>