<template>
  <div>
    <div class="filter-container">
      <span>用户姓名：</span>
      <el-input v-model="list.userName" placeholder="输入姓名筛选" style="width: 200px;"></el-input>
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
      <el-input v-model="list.userPhone" placeholder="输入手机号码筛选" style="width: 200px;"></el-input>
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
      <el-table :data="tableData"  style="width: 100%">
        <el-table-column fixed prop="userName" label="用户姓名" width="200"></el-table-column>
        <el-table-column prop="userPhone" label="用户电话" width="300"></el-table-column>
        <el-table-column prop="insuranceCompanyName" label="保险公司" width="300"></el-table-column>
        <el-table-column prop="userTime" label="注册时间" width="340"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="详情" :visible.sync="centerDialogVisible" width="50%" center>
      <div>
        <span style="margin-left:50px">姓名</span>
        <el-input
          v-model="xiangqing.userName"
          placeholder="姓名"
          style="width: 200px;"
          :disabled="true"
        ></el-input>
        <span style="margin-left:50px">保险公司</span>
        <el-input
          v-model="xiangqing.insuranceCompanyName"
          placeholder="保险公司名称"
          style="width: 200px;"
          :disabled="true"
        ></el-input>
      </div>
      <div style="margin-top:10px" >
        <span style="margin-left:50px">电话</span>
        <el-input
          v-model="xiangqing.userPhone"
          placeholder="电话号码"
          style="width: 200px;"
          :disabled="true"
        ></el-input>
        <span style="margin-left:50px">代理人编号</span>
        <el-input
          v-model="xiangqing.userNumber"
          placeholder="编号"
          style="width: 200px;"
          :disabled="true"
        ></el-input>
      </div>
      <div style="margin-top:10px">
        <span style="margin-left:50px">城市</span>
        <el-input
          v-model="xiangqing.userAddress"
          placeholder="城市"
          style="width: 200px;"
          :disabled="true"
        ></el-input>
        <span style="margin-left:50px">身份证号码</span>
        <el-input
          v-model="xiangqing.userIdentityCard"
          placeholder="身份证号码"
          style="width: 200px;"
          :disabled="true"
        ></el-input>
      </div>
      <div style="margin-top:10px">
        <span style="margin-left:50px">确认信息</span>
        <el-select v-model="xiangqing.testState" placeholder="请选择">
          <el-option
            v-for="(item,index) in testState"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <span style="margin-left:50px">实名状态</span>
        <el-select v-model="xiangqing.userState" placeholder="请选择">
          <el-option
            v-for="(item,index) in userState"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="queren(xiangqing)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
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
  </div>
</template>
<script>
import { getnewuser } from "../api/api";
import { getlogincheck } from "../api/api";
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
      dialogFormVisible: false,
      tableData: [],
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
      xiangqing: {},
      centerDialogVisible: false,
      testState: [
        { value: 0, label: "待审核" },
        { value: 1, label: "已审核" },
        { value: 2, label: "未通过" },
      ],
      userState: [
        { value: 1, label: "待审核" },
        { value: 2, label: "不通过" },
        { value: 3, label: "实名通过" },
      ],
      shaixuan: {},
    };
  },
  methods: {
    //通过审核的方法
    handleEdit(row) {
      this.centerDialogVisible = true;
      console.log(row);
      // let cookie = this.common.getCookie(); //获取cookie
      // let adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
      // let data=row
      // getlogincheck(data).then((res) => {
      //   console.log(res.data)
      // })
      // .catch((err) => console.log(err));
      let userId = row.userId;
      getuser({
        userId: userId,
        adminRoleId: this.adminRoleId,
      })
        .then((res) => {
          console.log(res.data.data);
          this.xiangqing = res.data.data;
        })
        .catch((err) => console.log(err));
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
    queren(val) {
      console.log(val);
      let testState = val.testState;
      let userState = val.userState;
      let userId = val.userId;
      console.log(userId);
      getlogincheck({
        testState: testState,
        userState: userState,
        userId: userId,
        adminId: this.adminId,
      })
        .then((res) => {
          console.log(res.data);
          this.centerDialogVisible;
        })
        .catch((err) => console.log(err));
    },
    // 筛选
    screen(val) {
      console.log(val);
      let data = val;
      let cookie = this.common.getCookie(); //获取cookie
      let adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
      this.$set(data, "adminId", adminId);
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
            this.tableData=this.shaixuan
          }
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
        userState: 1,
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
          console.log(res.data);
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
}
</style>
