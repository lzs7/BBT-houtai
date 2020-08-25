<template>
  <div>
    <!-- 人员管理 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="adminName" label="管理员姓名" width="180"></el-table-column>
      <el-table-column prop="adminPhone" label="管理员电话" width="180"></el-table-column>
      <el-table-column prop="adminAccount" label="管理员账号"></el-table-column>
      <el-table-column prop="adminRoleName" label="身份"></el-table-column>
      <el-table-column prop="adminState" label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.adminState==0?'正常':'冻结' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="xiang" label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" type="primary">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div :class="{'hidden':hidden}" class="pagination-container">
      <el-pagination
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
    <!-- 弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="管理员姓名" :label-width="formLabelWidth">
          <el-input v-model="form.adminName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员电话" :label-width="formLabelWidth" prop="adminPhone">
          <el-input v-model.number="form.adminPhone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号" :label-width="formLabelWidth">
          <el-input v-model="form.adminAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="formLabelWidth">
          <el-input v-model="form.adminPassword" autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.newAdminPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select v-model="form.adminRoleId" placeholder="请选择身份">
            <el-option
              v-for="(item,index) in adminRoleId"
              :key="index"
              :label="item.adminRoleName"
              :value="item.adminRoleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="adminState">
          <el-select v-model="form.adminState" placeholder="选择账号状态">
            <el-option
              v-for="(item,index) in adminState"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getadministration } from "../api/api";
import { getadminrole } from "../api/api";
import { putadministratormessage } from "../api/api";
export default {
  inject: ["reload"],
  props: ["selectTable"], //接受父组件穿过来的值
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      total: 0, //总条数
      page: 1,
      limit: 20,
      pageSizes: [5, 10], //选择每页显示条数
      pagesize: 0, //每页显示条数
      layout: "total, sizes, prev, pager, next",
      currentPage: 1, //默认开始页面
      background: true,
      autoScroll: true,
      hidden: false,
      adminRoleId: [],
      adminState: [
        { value: "0", label: "正常" },
        { value: "1", label: "冻结" },
      ],
      rules: {
        adminPhone: [
          {
            required: false,
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的电话号码",
            trigger: "blur",
          },
        ],
        adminState: [
          { required: true, message: "请选择状态", trigger: "change" },
        ],
      },
      newAdminId: "",
      adminId:'',
      adminRoleId:''
    };
  },
  methods: {
    handleEdit(row) {
      this.form = row;
      console.log(this.form);
      this.newAdminId = row.adminId;
      console.log(this.newAdminId);
      this.$set(this.form, "adminPassword", "");
      this.$set(this.form, "adminState", "");
      this.dialogFormVisible = true;
    },
    determine(formName) {
      //确定
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form);
          if (this.form.adminPassword == "") {
            this.$set(this.form, "adminPassword", null);
          }
          let data = this.form;
          // console.log("data:"+this.form)
          this.$set(this.form, "newAdminId", this.newAdminId);
          putadministratormessage(data)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
                this.reload();
              }
            })
            .catch((err) => console.log(err));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      let index = val;
      getadministration({
        adminId: this.adminId,
        adminRoleId: this.adminRoleId,
        index: index,
      })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = res.data.count; //总条数
          this.pagesize = res.data.size; //每页显示多少条
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    let cookie = this.common.getCookie(); //获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    this.adminRoleId = cookie.replace(/\"/g, "").split("#")[1];
    getadministration({
      adminId: this.adminId,
      adminRoleId: this.adminRoleId,
      index: 1,
    })
      .then((res) => {
        console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.count; //总条数
        this.pagesize = res.data.size; //每页显示多少条
      })
      .catch((err) => console.log(err));
    //获取身份
    getadminrole()
      .then((res) => {
        this.adminRoleId = res.data.data;
      })
      .catch((err) => console.log(err));
  },
  watch: {
    //监听传值的变化，
    selectTable: function (a, b) {
      //a是新值，b是旧值
      console.log(a);
      this.tableData = a;
    },
  },
};
</script>
<style scoped>
.pagination-container {
  margin-top: 20px;
}
</style>