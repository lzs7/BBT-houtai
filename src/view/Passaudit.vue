<template>
  <div>
    <!-- 通过审核 -->
    <div class="filter-container">
      <span>用户姓名：</span>
      <el-input v-model="list.name" placeholder="姓名" style="width: 200px;"></el-input>
      <span style="margin-left:10px">保险公司：</span>
      <el-select v-model="list.baoxian" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <span style="margin-left:10px">手机号码：</span>
      <el-input v-model="list.phone" placeholder="手机号码" style="width: 200px;"></el-input>
      <div style="margin-top:10px">
        注册时间：
        <el-date-picker
          v-model="list.value1"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div style="width:200px;margin-top:20px">
        <el-button type="primary" icon="el-icon-search">筛选</el-button>
      </div>
    </div>
    <div style="margin-top:10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userName" label="用户姓名" width="170"></el-table-column>
        <!-- <el-table-column prop="idcard" label="身份证号码" width="160"></el-table-column> -->
        <el-table-column prop="userPhone" label="用户电话" width="200"></el-table-column>
        <el-table-column prop="insuranceCompanyName" label="保险公司" width="300"></el-table-column>
        <el-table-column prop="userTime" label="注册时间" width="300"></el-table-column>
        <!-- <el-table-column prop="bianhao" label="保险公司编号" width="120"></el-table-column>
        <el-table-column prop="city" label="所在城市" width="180"></el-table-column>
        <el-table-column prop="queren" label="确认信息" width="120"></el-table-column>
        <el-table-column prop="shiming" label="实名状态" width="120"></el-table-column>-->
        <el-table-column label="操作" width="183">
          <template slot-scope="scope">
            <el-button size="mini" @click="xiangqing(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div :class="{'hidden':hidden}" class="pagination-container">
      <el-pagination
        :background="background"
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="centerDialogVisible" width="50%" center>
       <el-form :model="tableData1">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="tableData1.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getnewuser } from "../api/api";
import { getuser } from "../api/api";
export default {
  data() {
    return {
      list: {
        name: "",
        baoxian: "",
        phone: "",
        value1: "",
      },
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
      pageSize: "pageSize",
      layout: "total, sizes, prev, pager, next",
      background: true,
      autoScroll: true,
      hidden: false,
      adminId: "",
      adminRoleId: "",
      centerDialogVisible : false,
      tableData1:{}, //详情
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
    xiangqing(val) {
      this.centerDialogVisible  = true;
      console.log(val);
      let userId = val.userId;
      console.log(userId);
      getuser({
        userId: userId,
        adminRoleId: this.adminRoleId,
      })
        .then((res) => {
          this.tableData1 = res.data.data;
          
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    let cookie = this.common.getCookie(); //获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    this.adminRoleId = cookie.replace(/\"/g, "").split("#")[1];
    getnewuser({
      adminId: this.adminId,
      userState: 3,
    })
      .then((res) => {
        console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.count; //总条数
        this.pageSize = res.data.size; //每页显示多少条
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
}
</style>
