<template>
  <div>
    <!-- 未通过审核 -->
    <div class="filter-container">
      <span>用户姓名：</span>
      <el-input v-model="list.userName" placeholder="姓名" style="width: 200px;"></el-input>
      <span style="margin-left:10px">保险公司：</span>
      <el-select v-model="list.insuranceCompanyName" placeholder="选择保险公司">
        <el-option
          v-for="(item,index) in baoxian"
          :key="index"
          :label="item.insuranceCompanyName"
          :value="item.insuranceCompanyId"
        ></el-option>
      </el-select>
      <span style="margin-left:10px">手机号码：</span>
      <el-input v-model="list.userPhone" placeholder="手机号码" style="width: 200px;"></el-input>
      <div style="margin-top:10px">
        注册时间：
        <el-date-picker v-model="list.startTime" type="date" placeholder="开始日期"></el-date-picker>-
        <el-date-picker v-model="list.endTime" type="date" placeholder="结束日期"></el-date-picker>
      </div>
      <div style="width:200px;margin-top:20px">
        <el-button type="primary" icon="el-icon-search" @click="screen(list)">筛选</el-button>
      </div>
    </div>
    <div style="margin-top:10px">
      <el-table :data="tableData" style="width:100%">
        <el-table-column prop="userName" label="用户姓名" width="200"></el-table-column>
        <!-- <el-table-column prop="idcard" label="身份证号码" width="160"></el-table-column> -->
        <el-table-column prop="userPhone" label="用户电话" width="200"></el-table-column>
        <el-table-column prop="insuranceCompanyName" label="保险公司" width="300"></el-table-column>
        <el-table-column prop="userTime" label="注册时间" width="350"></el-table-column>
        <!-- <el-table-column prop="bianhao" label="保险公司编号" width="120"></el-table-column> -->
        <!-- <el-table-column prop="city" label="所在城市" width="180"></el-table-column> -->
        <!-- <el-table-column prop="queren" label="确认信息" width="120"></el-table-column> -->
        <!-- <el-table-column prop="shiming" label="实名状态"></el-table-column> -->
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini" @click="details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div :class="{'hidden':hidden}" class="pagination-container">
      <el-pagination
        :background="background"
        :layout="layout"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="centerDialogVisible" width="50%" center>
      <el-form :model="tableData1">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="tableData1.userName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="tableData1.userPhone" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" :label-width="formLabelWidth">
          <el-input v-model="tableData1.userIdentityCard" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="保险公司" :label-width="formLabelWidth">
          <el-input v-model="tableData1.insuranceCompanyName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="代理人编号" :label-width="formLabelWidth">
          <el-input v-model="tableData1.userNumber" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input v-model="tableData1.userAddress" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="实名状态" :label-width="formLabelWidth">
          <el-input
            v-model="tableData1.userState==2?'实名未通过':''"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认信息" :label-width="formLabelWidth">
          <el-input
            v-model="tableData1.testState==2?'审核未通过':''"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getnewuser } from "../api/api";
import { getuser } from "../api/api";
import { select } from "../api/api";
export default {
  data() {
    return {
      list: {
        userName: "",
        insuranceCompanyName: "",
        userPhone: "",
        startTime: "",
        endTime: "",
      },
      baoxian: [],
      shaixuan: {},
      dialogFormVisible: false,
      tableData: [],
      form: {
        name: "",
        region: "",
      },
      formLabelWidth: "120px",
      total: 0,
      page: 1,
      limit: 20,
      pageSizes: [5, 10],
      pageSize: 0,
      layout: "total, sizes, prev, pager, next",
      background: true,
      autoScroll: true,
      hidden: false,
      adminRoleId: "",
      tableData1: {}, //详情
      centerDialogVisible: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //查看详情
    details(val) {
      this.centerDialogVisible = true;
      let userId = val.userId;
      console.log(userId);
      getuser({
        userId: userId,
        adminRoleId: this.adminRoleId,
      })
        .then((res) => {
          this.tableData1 = res.data.data;
          console.log(this.tableData1);
        })
        .catch((err) => console.log(err));
    },
    // 筛选
    screen(val) {
      console.log(11);
      console.log(val);
      let data = val;
      let cookie = this.common.getCookie(); //获取cookie
      let adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
      this.$set(data, "adminId", adminId);
      this.$set(data, "userState", 2);
      getnewuser(data)
        .then((res) => {
          console.log(res.data);
          this.shaixuan = res.data.data;
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "筛选成功",
              type: "success",
            });
            this.tableData = this.shaixuan;
          } else if (res.data.code == null) {
            this.$message("暂无数据");
          }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    let cookie = this.common.getCookie(); //获取cookie
    let adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    this.adminRoleId = cookie.replace(/\"/g, "").split("#")[1];
    getnewuser({
      adminId: adminId,
      userState: 2,
    })
      .then((res) => {
        console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.count; //总条数
        this.pageSize = res.data.size; //每页显示多少条
      })
      .catch((err) => console.log(err));
    //保险公司
    select()
      .then((res) => {
        this.baoxian = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style scoped>
span {
  font-size: 14px;
}
.pagination-container {
  margin-top: 20px;
  font-size: 16px;
}
</style>
