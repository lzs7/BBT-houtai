<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="tite">总的委托人数</div>
            <h1 class="Number">10</h1>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="tite">总的委托数</div>
            <h1 class="Number">10</h1>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="tite">今天注册人数</div>
            <h1 class="Number">10</h1>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="tite">当天发布的委托数</div>
            <h1 class="Number">10</h1>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scope>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 200px;
    margin-top: 50px;

  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

.nei{
  height:200px;
 position: relative;

}
.tite{
  position: absolute;
  top: 25%;

  width:100%;
  text-align: center;
}
.Number{
  position: absolute;
  top: 45%;
  width: 100%;
  text-align: center;
}
</style>