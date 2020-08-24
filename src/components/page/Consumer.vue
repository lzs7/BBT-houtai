<template>
  <div class="add">
    <!-- 消费卡 -->
    <el-tabs type="border-card" style="height:400px">
      <el-tab-pane label="未审核">
        <el-table :data="tabledata">
          <el-table-column prop="userName" label="代理人姓名" width="200"></el-table-column>
          <el-table-column prop="consumeNumber" label="大家保险保单号" width="200"></el-table-column>
          <el-table-column prop="consumeTime" label="消费卡申请时间" width="200"></el-table-column>
          <el-table-column
            prop="newconsumeTime"
            label="审核时间"
            width="200"
            :formatter="newconsumeTime"
          ></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row, scope)">确定</el-button>
              <el-button size="mini" type="danger" @click="save(scope.row)">信息错误</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="审核通过">
        <pass></pass>
      </el-tab-pane>
      <el-tab-pane label="信息错误">
        <error></error>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pass from "../../view/ConsumerPass";
import error from '../../view/ConsumerError'
import { getallconsume } from "../../api/api";
import { getcheckconsume } from '../../api/api'
export default {
  inject: ["reload"],
  data() {
    return {
      tabledata: [],
      adminId: "",
    };
  },
  components: {
    pass,
    error
  },
  methods: {
    //确认按钮
    edit(row) {
      console.log(row)
      getcheckconsume ({
        consumeId : row.consumeId,
        adminId : this.adminId,
        index : 1
      }) .then((res) =>{
        console.log(res.data)
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
       getcheckconsume ({
        consumeId : row.consumeId,
        adminId : this.adminId,
        index : 2
      }) .then((res) =>{
        console.log(res.data)
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
    newconsumeTime(row) {
      return row.newconsumeTime == null ? "无" : row.newconsumeTime;
    },
  },
  mounted() {
    var that=this
    let cookie = this.common.getCookie(); //获取cookie
    that.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    getallconsume({
      adminId: that.adminId,
      consumeState: 0,
    })
      .then((res) => {
        console.log(res.data.data);
        that.tabledata = res.data.data;
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