<template>
  <div>
    <!-- 消费卡未审核 -->
    <el-table :data="tabledata">
      <el-table-column prop="userName" label="代理人姓名" width="200"></el-table-column>
      <el-table-column prop="consumeNumber" label="大家保险保单号" width="200"></el-table-column>
      <el-table-column prop="consumeTime" label="消费卡申请时间" width="200"></el-table-column>
      <el-table-column prop="newconsumeTime" label="审核时间" width="200" :formatter="newconsumeTime"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row, scope)">确定</el-button>
          <el-button size="mini" type="danger" @click="save(scope.row)">信息错误</el-button>
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
  </div>
</template>
<script>
import { getallconsume, getcheckconsume } from '../api/api'

export default {
  inject: ['reload'],
  data () {
    return {
      tabledata: [],
      adminId: '',
      total: 0, // 总条数
      page: 1,
      limit: 20,
      pageSizes: [5, 10], // 选择每页显示条数
      pagesize: 0, // 每页显示条数
      layout: 'total, sizes, prev, pager, next',
      currentPage: 1, // 默认开始页面
      background: true,
      autoScroll: true,
      hidden: false
    }
  },
  methods: {
    // 确认按钮
    edit (row) {
      console.log(row)
      getcheckconsume({
        consumeId: row.consumeId,
        adminId: this.adminId,
        index: 1
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: '确认成功',
              type: 'success'
            })
            this.reload()
          }
        })
        .catch((err) => console.log(err))
    },
    save (row) {
      getcheckconsume({
        consumeId: row.consumeId,
        adminId: this.adminId,
        index: 2
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.$message({
              showClose: true,
              message: '处理成功',
              type: 'success'
            })
            this.reload()
          }
        })
        .catch((err) => console.log(err))
    },
    newconsumeTime (row) {
      return row.newconsumeTime == null ? '无' : row.newconsumeTime
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // 切换页数
      console.log(`当前页: ${val}`)
      this.currentPage = val
      let index = val
      getallconsume({
        adminId: this.adminId,
        consumeState: 0,
        index: index
      })
        .then((res) => {
          console.log(res.data)
          this.tabledata = res.data.data
          this.total = res.data.count // 总条数
          this.pagesize = res.data.size // 每页显示多少条
        })
        .catch((err) => console.log(err))
    }
  },
  mounted () {
    var that = this
    let cookie = this.common.getCookie() // 获取cookie
    that.adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
    getallconsume({
      adminId: that.adminId,
      consumeState: 0,
      index: 1
    })
      .then((res) => {
        console.log(res.data.data)
        that.tabledata = res.data.data
        that.total = res.data.count // 总条数
        that.pagesize = res.data.size // 每页显示多少条
      })
      .catch((err) => console.log(err))
  }
}
</script>
