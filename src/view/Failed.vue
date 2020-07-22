<template>
  <div>
      <!-- 通过审核 -->
    <div class="filter-container">
      用户姓名：
      <el-input v-model="list.name" placeholder="姓名" style="width: 200px;"></el-input>保险公司：
      <el-select v-model="list.baoxian" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>手机号码：
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
        <el-table-column fixed prop="name" label="用户姓名" width="150"></el-table-column>
        <el-table-column prop="idcard" label="身份证号码" width="160"></el-table-column>
        <el-table-column prop="phone" label="用户电话" width="120"></el-table-column>
        <el-table-column prop="baoxian" label="保险公司" width="120"></el-table-column>
        <el-table-column prop="time" label="注册时间" width="120"></el-table-column>
        <el-table-column prop="bianhao" label="保险公司编号" width="120"></el-table-column>
        <el-table-column prop="city" label="所在城市" width="180"></el-table-column>
        <el-table-column prop="queren" label="确认信息" width="120"></el-table-column>
        <el-table-column prop="shiming" label="实名状态" width="120"></el-table-column>
      </el-table>
    </div>
    <div :class="{'hidden':hidden}" class="pagination-container">
      <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total"
        v-bind="$attrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: {
        name: "",
        baoxian: "",
        phone: "",
        value1: ""
      },
      dialogFormVisible: false,
      tableData: [
        {
          name: "王小虎",
          idcard: "430125633215896243",
          phone: "18645162100",
          baoxian: "平安保险",
          time: "2020-07-17",
          bianhao: "001",
          city: "湖南省长沙市雨花区",
          queren: "未确认",
          shiming: "未实名"
        },
        {
          name: "王小虎",
          idcard: "430125633215896243",
          phone: "18645162100",
          baoxian: "平安保险",
          time: "2020-07-17",
          bianhao: "001",
          city: "湖南省长沙市雨花区",
          queren: "未确认",
          shiming: "未实名"
        }
      ],
      form: {
        name: "",
        region: ""
      },
      formLabelWidth: "120px",
      total: 10,
      page: 1,
      limit: 20,
      pageSizes: [5, 10],
      layout: "total, sizes, prev, pager, next, jumper",
      background: true,
      autoScroll: true,
      hidden: false,
      currentPage: 3
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
    }
  }
};
</script>
<style scoped>
.pagination-container {
  margin-top:20px
}
</style>
