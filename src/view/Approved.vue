<template>
  <div>
    <!-- 和豆申请审核通过页面 -->
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column prop="userName" label="代理人姓名" width="200"></el-table-column>
      <el-table-column prop="cardNumber" label="人车生活卡号" width="200"></el-table-column>
      <el-table-column prop="beansTime" label="和豆申请时间" width="200"></el-table-column>
      <el-table-column prop="newbeansTime" label="处理时间" width="200"></el-table-column>
      <el-table-column prop="adminName" label="管理员姓名" width="200"></el-table-column>
      <el-table-column prop="beansState" label="处理结果" width="200" :formatter="beansState"></el-table-column>
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
import { getallbeans } from '../api/api'
export default {
  props: ['tabledata1'],
  data () {
    return {
      tableData1: [],
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
    beansState (row) {
      return row.beansState == 1 ? '审核通过' : ''
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
        beansState: 1,
        index: index
      })
        .then((res) => {
          this.tableData1 = res.data.data
          this.total = res.data.count // 总条数
          this.pagesize = res.data.size // 每页显示多少条
        })
        .catch((err) => console.log(err))
    }
  },
  watch: {
    // 监听传值的变化，
    tabledata1: function (a, b) {
      // a是新值，b是旧值
      let data = a
      this.tableData1 = data.data
      this.total = data.count // 总条数
      this.pagesize = data.size // 每页显示多少条
    }
  },

  mounted () {
    let cookie = this.common.getCookie() // 获取cookie
    this.adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
  }
}
</script>
