<template>
  <div class="tabs">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      type="border-card"
      style="min-height:600px"
    >
      <el-tab-pane label="待审核" name="first">
        <Reviewed></Reviewed>
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
import Reviewed from '../../view/Reviewed'
import Passaudit from '../../view/Passaudit'
import Failed from '../../view/Failed'

import { getnewuser } from '../../api/api'
export default {
  name: 'tabs',
  data () {
    return {
      activeName: 'first',
      tongguo: {}
    }
  },
  components: {
    Reviewed,
    Passaudit,
    Failed
  },
  methods: {
    handleClick (tab, event) {
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped>
.tabs /deep/ .el-tabs__item {
  width: 60%;
}
</style>
