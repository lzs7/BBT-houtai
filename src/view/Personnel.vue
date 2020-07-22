<template>
  <div>
    <!-- 人员管理 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="管理员姓名" width="180"></el-table-column>
      <el-table-column prop="phone" label="管理员电话" width="180"></el-table-column>
      <el-table-column prop="zhanghao" label="管理员账号"></el-table-column>
      <el-table-column prop="shenfen" label="身份"></el-table-column>
      <el-table-column prop="zhaungtai" label="状态"></el-table-column>
      <el-table-column prop="xiang" label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">修改信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="管理员姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号" :label-width="formLabelWidth">
          <el-input v-model="form.zhanghao" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="formLabelWidth">
          <el-input v-model="form.psw" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.qpsw" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select v-model="form.shenfen" placeholder="请选择身份">
            <el-option label="超级管理员" value="shanghai"></el-option>
            <el-option label="管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.zhaungtai" placeholder="状态">
            <el-option label="正常" value="shanghai"></el-option>
            <el-option label="冻结" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          phone: "18652365212",
          zhanghao: "admin",
          shenfen: "超级管理员",
          zhaungtai: "正常"
        },
        {
          name: "王虎",
          phone: "18652365212",
          zhanghao: "admin11",
          shenfen: "普通管理员",
          zhaungtai: "冻结"
        },
        {
          name: "王er虎",
          phone: "18652365212",
          zhanghao: "admin22",
          shenfen: "管理员",
          zhaungtai: "冻结"
        }
      ],
      dialogFormVisible: false,
      form:{
          name:'',
          phone:'',
          zhanghao:'',
          psw:'',
          qpsw:'',
          shenfen:'',
          zhaungtai:'',
      },
      formLabelWidth:'120px'
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
    }
  }
};
</script>