<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="b-img">
              <img src="../../assets/img/renshu.png" alt />
            </div>
            <div class="tite">总的委托人数</div>
            <h1 class="Number">{{list.userCount}}</h1>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="b-img">
              <img src="../../assets/img/weituo.png" alt />
            </div>
            <div class="tite">总的委托数</div>
            <h1 class="Number">{{list.entrustCount}}</h1>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="b-img">
              <img src="../../assets/img/zhuce.png" alt />
            </div>
            <div class="tite">今天注册人数</div>
            <h1 class="Number">{{list.newUserCount}}</h1>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="nei">
            <div class="b-img">
              <img src="../../assets/img/fabu.png" alt />
            </div>
            <div class="tite">当天发布的委托数</div>
            <h1 class="Number">{{list.newEntrustCount}}</h1>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getadmindata } from '../../api/api'
export default {
  data () {
    return {
      list: {}
    }
  },
  mounted () {
    let cookie = this.common.getCookie() // 获取cookie
    let adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
    getadmindata({
      adminId: adminId
    })
      .then((res) => {
        this.list = {
          entrustCount: res.data.entrustCount, // 总的委托条数 ,
          userCount: res.data.userCount, // 表示总的委托人数
          newUserCount: res.data.newUserCount, // 表示当天注册的委托人数 ,
          newEntrustCount: res.data.newEntrustCount // 当天发布的委托数 ,
        }
      })
      .catch((err) => {})
  }
}
</script>
<style lang="less" scope>
img {
  width: 100%;
}
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
  box-shadow: darkgrey 3px 3px 24px 3px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.nei {
  height: 200px;
  position: relative;
}
.tite {
  position: absolute;
  top: 40%;
  width: 100%;
  text-align: center;
  font-family: "KaiTi";
  font-size:18px
}
.Number {
  position: absolute;
  top: 56%;
  width: 100%;
  text-align: center;

}
.b-img {
  width: 20%;
  height: 50px;
  // margin-left:40%;
  // padding-top:10px
  position: absolute;
  top: 8%;
  left: 42%;
}

</style>
