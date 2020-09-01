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
          <span>650元</span>
          <span>10%</span>
        </p>
      </div>
      <div class="mokuai">
        <p class="title">今日商业总台账</p>
        <p class="shuju">
          <span>650元</span>
          <span>10%</span>
        </p>
      </div>
      <div class="mokuai">
        <p class="title">本月交强总台账</p>
        <p class="shuju">
          <span>650元</span>
          <span>10%</span>
        </p>
      </div>
      <div class="mokuai">
        <p class="title">本月商业总台账</p>
        <p class="shuju">
          <span>650元</span>
          <span>10%</span>
        </p>
      </div>
    </div>
    <!-- 月份 -->
    <div class="yue">
      <div class="block">
        <span class="demonstration">商业险：</span>
        <el-select v-model="value" placeholder="请选择" @change="getValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="yuan">650元</div>
        <div class="yuan">10%</div>
      </div>
      <!-- 交强险月份模块 -->
      <div class="block">
        <span class="demonstration">交强险：</span>
        <el-select v-model="value1" placeholder="请选择" @change="getvalue1">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="yuan">650元</div>
        <div class="yuan">10%</div>
      </div>
    </div>
    <!-- ***************************** -->
    <div class="last_mokuai">
      <div class="xuanze">
        <el-select v-model="aggregate.value2" placeholder="选择部门">
          <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        <div>650</div>
        <div>10%</div>
      </div>
      <div class="shuju_content">
        <div>商业险</div>
        <div>650</div>
        <div>10%</div>
      </div>
    </div>
    <!-- ************ -->
    <div class="last_mokuai">
      <div class="xuanze">
        <el-select v-model="personal.value3" placeholder="选择">
          <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        <div>650</div>
        <div>10%</div>
      </div>
      <div class="shuju_content">
        <div>商业险</div>
        <div>650</div>
        <div>10%</div>
      </div>
    </div>
  </div>
</template>
<script>
import { dateType, dateType1 } from "../utils/date.js";

export default {
  data() {
    return {
      value: "",
      value1: "",
      aggregate: {
        value2: "",
        startTime: "",
        endTime: "",
      },
      personal: {
        value3: "",
        startTime: "",
        endTime: "",
      },
      options: dateType,
      options1: dateType1,
      list: [
        {
          value: "1",
          label: "全部门",
        },
        {
          value: "2",
          label: "车商",
        },
      ],
      data: [
        {
          value: "1",
          label: "个人",
        },
        {
          value: "2",
          label: "车商",
        },
      ],
    };
  },
  methods: {
    getValue(val) {
      console.log(val);
      //   this.value = val;
    },
    getvalue1(val) {
      console.log(val);
    },
    //查询
    query(val) {
      console.log(val);
    },
    chaxun(val) {
      console.log(val);
    },
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
.yuan {
  width: 200px;
  margin-left: 50px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: rgb(174, 180, 182);
  border-radius: 5px;
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
