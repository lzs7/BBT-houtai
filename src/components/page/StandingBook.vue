<template>
  <div>
    <!-- 台账管理 -->
    <el-tabs type="border-card" style="min-height:400px">
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
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="bumen" label="部门"></el-table-column>
          <el-table-column prop="daili" label="代理点"></el-table-column>
          <el-table-column prop="chepai" label="车牌号"></el-table-column>
          <el-table-column prop="jiaoqiang" label="交强保费"></el-table-column>
          <el-table-column prop="sahngye" label="商业保费"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Standingbook from '../../view/Standingbook'
export default {
  data() {
    return {
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          bumen: "车商一部",
          daili: "国合快车",
          chepai: "湘A98985",
          jiaoqiang: "650",
          sahngye : "650",
        },
        {
         date: "2016-05-02",
          name: "王小虎",
          bumen: "车商一部",
          daili: "国合快车",
          chepai: "湘A98985",
          jiaoqiang: "650",
          sahngye : "650",
        },
      ],
    };
  },
  components:{
      Standingbook,
  },
  methods: {
    search() {
      console.log(this.input);
    },
  },
};
</script>