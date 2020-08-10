<template>
  <div class="tabs">
    <div class="filter-container">
      <span>用户姓名：</span>
      <el-input v-model="list.userName" placeholder="姓名" style="width: 200px;"></el-input>
      <span style="margin-left:10px">保险公司：</span>
      <el-select v-model="list.insuranceCompanyName" placeholder="保险公司">
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
        <el-date-picker
          v-model="list.value1"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div style="width:200px;margin-top:20px">
        <el-button type="primary" icon="el-icon-search" @click="screen(list)">筛选</el-button>
      </div>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      type="border-card"
      style="min-height:600px"
    >
      <el-tab-pane label="待审核" name="first">
        <Reviewed :shaixuan="this.shaixuan"></Reviewed>
      </el-tab-pane>
      <el-tab-pane label="通过审核" name="second">
        <Passaudit></Passaudit>
      </el-tab-pane>
      <el-tab-pane label="未通过审核" name="third">
        <Failed></Failed>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Reviewed from "../../view/Reviewed";
import Passaudit from "../../view/Passaudit";
import Failed from "../../view/Failed";
import { select } from "../../api/api";
import {getnewuser} from '../../api/api'
export default {
  name: "tabs",
  data() {
    return {
      list: {
        userName: "",
        insuranceCompanyName: "",
        phone: "",
        value1: "",
      },
      activeName: "first",
      baoxian: [],
      shaixuan:{},
    };
  },
  components: {
    Reviewed,
    Passaudit,
    Failed,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    screen(val) {
      console.log(val);
      let data = val;
      let cookie = this.common.getCookie(); //获取cookie
      let adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
      this.$set(data, "adminId", adminId);
      getnewuser(data)
        .then((res) => {
          console.log(res.data);
          this.shaixuan=res.data.data
          if(res.data.code==200){
          this.$notify({
          title: '成功',
          message: '筛选成功',
          type: 'success'
        });
        }
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    select()
      .then((res) => {
        console.log(res.data);
        this.baoxian = res.data.data;
      })
      .catch((err) => console.log(err));
  },
  computed: {},
};
</script>

<style scoped>
.tabs /deep/ .el-tabs__item {
  width: 60%;
}
</style>

