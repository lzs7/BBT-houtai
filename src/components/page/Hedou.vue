<template>
  <div class="add">
    <el-tabs type="border-card" style="height:400px">
      <el-tab-pane label="未审核">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="userName" label="代理人姓名" width="200"></el-table-column>
          <el-table-column prop="cardNumber" label="人车生活卡号" width="200"></el-table-column>
          <el-table-column prop="beansTime" label="和豆申请时间" width="200"></el-table-column>
          <el-table-column prop="newbeansTime" label="处理时间" width="200" :formatter="newbeansTime"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row, scope)">确定</el-button>
              <el-button size="mini" type="danger" @click="save(scope.row)">信息错误</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="审核通过">
        <approved></approved>
      </el-tab-pane>
      <el-tab-pane label="信息错误">
        <wrong></wrong>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getallbeans } from "../../api/api";
import { getcheckbeans } from "../../api/api";
import approved from "../../view/Approved";
import wrong from "../../view/Wrong";
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      adminId: "",
    };
  },
  components: {
    approved,
    wrong,
  },
  methods: {
    edit(row) {
      console.log(row);
      let beansId = row.beansId;
      getcheckbeans({
        adminId: this.adminId,
        beansId: beansId,
        index: 1,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "确认成功",
              type: "success",
            });
            this.reload();
          }
        })
        .catch((err) => console.log(err));
    },
    save(row) {
      console.log(row);
      let beansId = row.beansId;
      getcheckbeans({
        adminId: this.adminId,
        beansId: beansId,
        index: 2,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: "处理成功",
              type: "success",
            });
            this.reload();
          }
        })
        .catch((err) => console.log(err));
    },
    newbeansTime(row) {
      return row.newbeansTime == null ? "无" : row.newbeansTime;
    },
  },
  mounted() {
    let cookie = this.common.getCookie(); //获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    getallbeans({
      adminId: this.adminId,
      beansState: 0,
    })
      .then((res) => {
        console.log(res.data);
        this.tableData = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
.add /deep/ .el-tabs__item {
  width: 60%;
}
</style>