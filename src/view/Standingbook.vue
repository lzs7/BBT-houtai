<template>
  <div>
    <div style="margin-left:10px">
      <el-button type="primary" icon="el-icon-download">导出本日台账</el-button>
      <el-button type="primary" icon="el-icon-download">导出本月台账</el-button>
    </div>
    <div class="count">
      <div class="mokuai">
        <p class="title">今日交强总台账</p>
        <p class="shuju">
          <span>{{list2.todaySumCompulsory}}元</span>
          <span>{{list2.todaySumCompulsoryPercentage}}</span>
        </p>
      </div>
      <div class="mokuai">
        <p class="title">今日商业总台账</p>
        <p class="shuju">
          <span>{{list2.todaySumCommercial}}元</span>
          <span>{{list2.todaySumCommercialPercentage}}</span>
        </p>
      </div>
      <div class="mokuai">
        <p class="title">本月交强总台账</p>
        <p class="shuju">
          <span>{{list2.monthSumCompulsory}}元</span>
          <span>{{list2.monthSumCompulsoryPercentage}}</span>
        </p>
      </div>
      <div class="mokuai">
        <p class="title">本月商业总台账</p>
        <p class="shuju">
          <span>{{list2.monthSumCommercial}}元</span>
          <span>{{list2.monthSumCommercialPercentage}}</span>
        </p>
      </div>
    </div>
    <!-- 月份 -->
    <div class="yue">
      <div class="block">
        <span class="demonstration">选择月份：</span>
        <el-select v-model="value" placeholder="请选择" @change="getValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="sj">
        <div>商业险：</div>
        <div class="yuan">{{timeData.commercial}}元</div>
        <div class="yuan">{{timeData.percentageCommercial}}</div>
      </div>
       <div class="sj">
        <div>交强险：</div>
        <div class="yuan">{{timeData.compulsory}}元</div>
        <div class="yuan">{{timeData.percentageCompulsory}}</div>
      </div>
    </div>
    <!-- ***************************** -->
    <div class="last_mokuai">
      <div class="xuanze">
        <el-select v-model="aggregate.departmentId" placeholder="选择部门">
          <el-option v-for="item in list" :key="item.value" :label="item.departmentName" :value="item.departmentId"></el-option>
        </el-select>
        <!-- 选择日期 -->
        <span>日期选择：</span>
        <el-date-picker
          v-model="aggregate.startTime"
          type="date"
          placeholder="开始日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-
        <el-date-picker
          v-model="aggregate.endTime"
          type="date"
          placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="query(aggregate)">查询</el-button>
      </div>
      <!-- 内容 -->
      <div class="shuju_content">
        <div>交强险</div>
        <div>{{bumenData.compulsory}}元</div>
        <div>{{bumenData.percentageCompulsory}}</div>
      </div>
      <div class="shuju_content">
        <div>商业险</div>
        <div>{{bumenData.commercial}}元</div>
        <div>{{bumenData.percentageCommercial}}</div>
      </div>
    </div>
    <!-- ************ -->
    <div class="last_mokuai">
      <div class="xuanze">
        <el-select v-model="personal.agentId" placeholder="选择代理人">
          <el-option v-for="item in data" :key="item.value" :label="item.agentName" :value="item.agentId"></el-option>
        </el-select>
        <!-- 选择日期 -->
        <span>日期选择：</span>
        <el-date-picker
          v-model="personal.startTime"
          type="date"
          placeholder="开始日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-
        <el-date-picker
          v-model="personal.endTime"
          type="date"
          placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="chaxun(personal)">查询</el-button>
      </div>
      <!-- 内容 -->
      <div class="shuju_content">
        <div>交强险</div>
        <div>{{dailiData.compulsory}}元</div>
        <div>{{dailiData.percentageCompulsory}}</div>
      </div>
      <div class="shuju_content">
        <div>商业险</div>
        <div>{{dailiData.commercial}}元</div>
        <div>{{dailiData.percentageCommercial}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { dateType} from "../utils/date.js";
import { getsumdaily, getmonth,getsumselect,getdepartment,getagent } from "../api/api";
export default {
  data() {
    return {
      value: "",
      aggregate: {
        departmentId: "",//部门id
        startTime: "",
        endTime: "",
      },
      personal: {
        agentId: "",//代理人id
        startTime: "",
        endTime: "",
      },
      options: dateType,
      list: [],//部门
      data: [],//代理人
      adminId: "",
      list2: {},//总台账
      timeData:{},//按月份查询台账
      bumenData:{},//部门台账  默认显示全部门
      dailiData:{}//代理人台账 默认显示全部人
    };
  },
  methods: {
    getValue(val) {
      var month = val;
      getmonth({
        adminId: this.adminId,
        month: month,
      })
        .then((res) => {
          this.timeData=res.data.data
        })
        .catch((err) => console.log(err));
      //   this.value = val;
    },
    // 查询
    query(val) {
      var data=val;
      this.$set(data, 'adminId', this.adminId)
      getsumselect(data).then((res) =>{
        this.bumenData=res.data.data
      })
      .catch((err) => console.log(err));
    },
    chaxun(val) {
      var data=val;
       this.$set(data, 'adminId', this.adminId)
      getsumselect(data).then((res) =>{
        this.dailiData=res.data.data
      })
      .catch((err) => console.log(err));
    },
  },
  mounted() {
    let cookie = this.common.getCookie(); // 获取cookie
    this.adminId = cookie.replace(/\"/g, "").split("#")[0]; // 获取cookie下标为0的adminId
    getsumdaily({//查询所有台账
      adminId: this.adminId,
    })
      .then((res) => {
        this.list2 = res.data.data;
      })
      .catch((err) => console.log(err));
      //默认查询一月份
       getmonth({
        adminId: this.adminId,
        month: 1,
      })
        .then((res) => {
          this.timeData=res.data.data
        })
        .catch((err) => console.log(err));
     //默认查询全部门当天的数据
      getsumselect({
        adminId:this.adminId,
        departmentId : 0
      }).then((res) =>{
        this.bumenData=res.data.data
      })
      .catch((err) => console.log(err));
      //默认查询全部人当天的数据
 getsumselect({
        adminId:this.adminId,
        agentId : 0
      }).then((res) =>{
        this.dailiData=res.data.data
      })
      .catch((err) => console.log(err));
    //查询所有部门
    getdepartment().then((res) => {
      this.list=res.data.data
    })
    //查询所有代理人
    getagent().then((res) => {
      this.data=res.data.data
    })
  },
  created() {
      this.value = this.options[0].value;
    },
};
</script>
<style scoped>
.count {
  width: 98%;
  margin: 0 auto;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.count div {
  width: 20%;
  height: 150px;
  box-shadow: darkgrey 10px 10px 30px 5px;
}
.mokuai {
  position: relative;
  width: 100%;
}
.title {
  position: absolute;
  top: 20%;
  width: 100%;
  text-align: center;
  letter-spacing: 2px;
  font-family: "KaiTi";
  font-size: 18px;
  font-weight: 700;
}
.shuju {
  position: absolute;
  top: 53%;
  left: 26%;
  width: 50%;
  height: 23px;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: sandybrown;
}
.shuju span:nth-child(2) {
  margin-left: 3px;
}
.block {
  padding-top: 30px;
  display: flex;
}
.sj {
  display: flex;
  margin-left: 20px;
  margin-top:10px;
}
.yuan {
  width: 200px;
  margin-left: 13px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: rgb(174, 180, 182);
  border-radius: 5px;
}
.sj div:nth-child(3) {
  margin-left: 50px;
}
.xuanze {
  padding-top: 15px;
  padding-left: 10px;
}
.yue {
  width: 98%;
  height: 175px;
  margin: 0 auto;
  box-shadow: darkgrey 10px 10px 30px 5px;
}
.demonstration {
  margin-left: 20px;
}
.last_mokuai {
  width: 98%;
  height: 175px;
  margin: 0 auto;
  margin-top: 25px;
  box-shadow: darkgrey 10px 10px 30px 5px;
}
.shuju_content {
  width: 74%;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shuju_content div {
  width: 32%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background-color: rgb(211, 207, 205);
  border-radius: 5px;
}
</style>
