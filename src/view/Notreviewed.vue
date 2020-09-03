<template>
  <div>
    <!-- 和豆未审核组件 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="代理人姓名" width="200"></el-table-column>
      <el-table-column prop="cardNumber" label="人车生活卡号" width="200"></el-table-column>
      <el-table-column prop="beansTime" label="和豆申请时间" width="200"></el-table-column>
      <el-table-column prop="newbeansTime" label="处理时间" width="200" :formatter="newbeansTime"></el-table-column>
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
import { getcheckbeans, getallbeans } from '../api/api'

export default {
  inject: ['reload'],
  data () {
    return {
      tableData: [],
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
      let beansId = row.beansId
      getcheckbeans({
        adminId: this.adminId,
        beansId: beansId,
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
    // 信息错误按钮
    save (row) {
      console.log(row)
      let beansId = row.beansId
      getcheckbeans({
        adminId: this.adminId,
        beansId: beansId,
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
    newbeansTime (row) {
      return row.newbeansTime == null ? '无' : row.newbeansTime
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // 切换页数
      console.log(`当前页: ${val}`)
      this.currentPage = val
      let index = val
      getallbeans({
        adminId: this.adminId,
        beansState: 0,
        index: index
      })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.data
          this.total = res.data.count // 总条数
          this.pagesize = res.data.size // 每页显示多少条
        })
        .catch((err) => console.log(err))
    }
  },
  mounted () {
    let cookie = this.common.getCookie() // 获取cookie
    this.adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
    getallbeans({
      adminId: this.adminId,
      beansState: 0,
      index: 1
    })
      .then((res) => {
        console.log(res.data)
        this.tableData = res.data.data
        this.total = res.data.count // 总条数
        this.pagesize = res.data.size // 每页显示多少条
      })
      .catch((err) => console.log(err))
  }
}
</script>
