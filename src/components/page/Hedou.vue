<template>
  <div class="add">
    <el-tabs
      type="border-card"
      style="min-height:400px"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane label="未审核" name="1">
        <reviewed></reviewed>
      </el-tab-pane>
      <el-tab-pane label="审核通过" name="2">
        <approved :tabledata1='this.tabledata1'></approved>
      </el-tab-pane>
      <el-tab-pane label="信息错误" name="3">
        <wrong :tabledata2='this.tabledata2'></wrong>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { getallbeans, getcheckbeans } from '../../api/api'

import approved from '../../view/Approved'
import wrong from '../../view/Wrong'
import reviewed from '../../view/Notreviewed'
export default {
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      tabledata1: [],
      tabledata2: [],
      adminId: '',
      activeName: '1'
    }
  },
  components: {
    approved,
    wrong,
    reviewed
  },
  methods: {
    // 标签点击事件
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.name == '2') {
        // 触发‘审核通过’事件
        this.two()
      } else if (tab.name == '3') {
        // 触发‘信息错误’事件
        this.three()
      }
    },
    /**
     * 触发‘用户管理’事件 并发送请求 将数据传给子组件
     */
    two () {
      getallbeans({
        adminId: this.adminId,
        beansState: 1,
        index: 1
      })
        .then((res) => {
          console.log(res.data)
          this.tabledata1 = res.data
        })
        .catch((err) => console.log(err))
    },
    /**
     * 触发‘配置管理’事件并发送请求 将数据传给子组件
     */
    three () {
      getallbeans({
        adminId: this.adminId,
        beansState: 2,
        index: 1
      })
        .then((res) => {
          console.log(res.data)
          this.tabledata2 = res.data
        })
        .catch((err) => console.log(err))
    }
  },
  mounted () {
    let cookie = this.common.getCookie() // 获取cookie
    this.adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
  }
}
</script>

<style scoped>
.add /deep/ .el-tabs__item {
  width: 60%;
}
</style>
