<template>
  <div>
    <!-- 台账管理 -->
    <el-tabs type="border-card" style="min-height:600px">
      <el-tab-pane label="总台账">
        <Standingbook></Standingbook>
      </el-tab-pane>
      <el-tab-pane label="个人台账">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input"
          style="width:20%"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="dailyTime" label="日期" width="180"></el-table-column>
          <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="departmentName" label="部门"></el-table-column>
          <el-table-column prop="agentName" label="代理点"></el-table-column>
          <el-table-column prop="licensePlateNumber" label="车牌号"></el-table-column>
          <el-table-column prop="compulsory" label="交强保费"></el-table-column>
          <el-table-column prop="commercial" label="商业保费"></el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 分页 -->
      <div :class="{'hidden':hidden}" class="pagination-container">
        <el-pagination
        hide-on-single-page
          :background="background"
          :layout="layout"
          :page-sizes="pageSizes"
          :page-size="pagesize"
          :current-page="currentPage"
          :total="total"
          v-bind="$attrs"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-tabs>
  </div>
</template>
<script>
import Standingbook from "../../view/Standingbook";
import { getsearchmessage } from "../../api/api";
export default {
  data() {
    return {
      input: "",
      tableData: [],
      adminId: "",
      adminRoleId: "",
      total: 0, // 总条数
      page: 1,
      limit: 20,
      pageSizes: [5, 10], // 选择每页显示条数
      pagesize: 0, // 每页显示条数
      layout: "total, sizes, prev, pager, next",
      currentPage: 1, // 默认开始页面
      background: true,
      autoScroll: true,
      hidden: false,
    };
  },
  components: {
    Standingbook,
  },
  methods: {
    search() {
      getsearchmessage({
        adminId: this.adminId,
        condition : this.input,
        index: 1
      })
        .then((res) => {
          this.tableData = res.data.data
          this.total = res.data.count // 总条数
          this.pagesize = res.data.size // 每页显示多少条
        })
        .catch((err) => console.log(err))
    },
        handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      let index = val
      getsearchmessage({
        adminId: this.adminId,
        condition : this.input,
        index: index
      })
        .then((res) => {
          this.tableData = res.data.data
          this.total = res.data.count // 总条数
          this.pagesize = res.data.size // 每页显示多少条
        })
        .catch((err) => console.log(err))
    }
  },
  mounted() {
    let cookie = this.common.getCookie(); // 获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; // 获取cookie下标为0的adminId
    this.adminRoleId = cookie.replace(/\"/g, "").split("#")[1];
    //判断是否为超级管理员  大于1跳转到403
    if (this.adminRoleId > 1) {
      this.$router.push({ path: "/403" });
    }
  },
};
</script>
<style scoped>
  .pagination-container{
    margin-top:20px;
  }
</style>
