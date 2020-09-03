<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () { // 刷新当前页面 其它组件inject:['reload'], this.reload()在页面上使用
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created () { // 刷新页面显示加载中
    let loading = document.getElementById('Loading')
    if (loading != null) {
      document.body.removeChild(loading)
    }
  }
}
</script>
<style>
    @import "./assets/css/main.css";
    /* @import "./assets/css/color-dark.css"; */     /*深色主题*/
    @import "./assets/css/theme-green/color-green.css";   /*浅绿色主题*/
    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
}
</style>
