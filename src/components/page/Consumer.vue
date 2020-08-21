<template>
  <div class="add">
    <el-tabs type="border-card" style="height:400px">
      <el-tab-pane label="未审核">
        <el-table :data="tableData">
          <el-table-column prop="name" label="代理人姓名" width="200"></el-table-column>
          <el-table-column prop="danhao" label="大家保险保单号" width="200"></el-table-column>
          <el-table-column prop="sqtime" label="消费卡申请时间" width="200"></el-table-column>
          <el-table-column prop="cltime" label="审核时间" width="200"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.row, scope)">确定</el-button>
              <el-button size="mini" type="danger" @click="save(scope.row)">信息错误</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="审核通过">
        <el-table :data="tableData1" border style="width: 100%">
          <el-table-column prop="name" label="代理人姓名" width="200"></el-table-column>
          <el-table-column prop="danhao" label="大家保险保单号" width="200"></el-table-column>
          <el-table-column prop="sqtime" label="消费卡申请时间" width="200"></el-table-column>
          <el-table-column prop="cltime" label="审核时间" width="200"></el-table-column>
          <el-table-column prop="gname" label="管理员姓名" width="200"></el-table-column>
          <el-table-column prop="jieguo" label="处理结果" width="200"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="信息错误">
        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column prop="name" label="代理人姓名" width="200"></el-table-column>
          <el-table-column prop="danhao" label="大家保险保单号" width="200"></el-table-column>
          <el-table-column prop="sqtime" label="消费卡申请时间" width="200"></el-table-column>
          <el-table-column prop="cltime" label="审核时间" width="200"></el-table-column>
          <el-table-column prop="gname" label="管理员姓名" width="200"></el-table-column>
          <el-table-column prop="jieguo" label="处理结果" width="200"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          danhao: "1234567",
          sqtime: "2020-07-21",
          cltime: "无"
        },
        {
          name: "王虎",
          danhao: "6543211",
          sqtime: "2020-07-21",
          cltime: "无"
        },
        {
          name: "王二虎",
          danhao: "9876541",
          sqtime: "2020-07-21",
          cltime: "无"
        }
      ],
      tableData1: [
        {
          name: "王小虎",
          danhao: "1234567",
          sqtime: "2020-07-21",
          cltime: "2020-07-21",
          gname: "lizesheng",
          jieguo: "审核通过"
        },
        {
          name: "王er虎",
          danhao: "1234567",
          sqtime: "2020-07-21",
          cltime: "2020-07-21",
          gname: "lizesheng",
          jieguo: "审核通过"
        }
      ],
       tableData2: [
        {
          name: "王小虎",
          danhao: "1234567",
          sqtime: "2020-07-21",
          cltime: "2020-07-21",
          gname: "lizesheng",
          jieguo: "信息错误"
        },
        {
          name: "王er虎",
          danhao: "1234567",
          sqtime: "2020-07-21",
          cltime: "2020-07-21",
          gname: "lizesheng",
          jieguo: "信息错误"
        }
      ]
    };
  },
  methods: {
    edit(row, index) {
      row.seen = true;
    },
    save(row, index) {
      row.seen = false;
    }
  }
};
</script>

<style scoped>
.add /deep/ .el-tabs__item {
  width: 60%;
}
</style>