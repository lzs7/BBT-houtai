<template>
  <div class="add">
    <!-- 消费卡 -->
    <el-tabs
      type="border-card"
      style="min-height:400px"
      @tab-click="handleClick"
      v-model="activeName"
    >
      <el-tab-pane label="未审核" name="one">
        <cardnot></cardnot>
      </el-tab-pane>
      <el-tab-pane label="审核通过" name="two">
        <pass :tabledata1="this.tabledata1"></pass>
      </el-tab-pane>
      <el-tab-pane label="信息错误" name="three">
        <error :tabledata2="this.tabledata2"></error>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
import pass from "../../view/ConsumerPass";
import error from "../../view/ConsumerError";
import { getallconsume } from "../../api/api";
import cardnot from '../../view/Cardnot'

export default {

  data() {
    return {
      tabledata2: [],
      tabledata1: [],
      adminId: "",
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
      activeName: "one",
    };
  },
  components: {
    pass,
    error,
    cardnot
  },
  methods: {
   
    // 标签点击事件
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == "two") {
        // 触发‘配置管理’事件
        this.two();
      } else if (tab.name == "three") {
        // 触发‘用户管理’事件
        this.three();
      }
    },
    /**
     * 触发‘用户管理’事件 并发送请求 将数据传给子组件
     */
    two() {
      console.log("我是审核通过");
      getallconsume({
        adminId: this.adminId,
        consumeState: 1,
        index: 1,
      })
        .then((res) => {
          console.log(res.data);
          this.tabledata1 = res.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 触发‘配置管理’事件并发送请求 将数据传给子组件
     */
    three() {
      console.log("我是信息错误");
      getallconsume({
        adminId: this.adminId,
        consumeState: 2,
        index: 1,
      })
        .then((res) => {
          console.log(res.data);
          this.tabledata2 = res.data;
        })
        .catch((err) => console.log(err));
    },
   
  },
  mounted() {
    let cookie = this.common.getCookie(); //获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
  }
};
</script>

<style scoped>
.add /deep/ .el-tabs__item {
  width: 60%;
}
</style>