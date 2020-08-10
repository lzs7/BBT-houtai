<template>
  <div class="table">
    <span>委托状态：</span>
    <el-select v-model="list.zhuantai" placeholder="委托状态">
      <el-option label="状态一" value="shanghai"></el-option>
      <el-option label="状态二" value="beijing"></el-option>
    </el-select>
    <span style="margin-left:10px">保险公司：</span>
    <el-select v-model="list.baoxian" placeholder="选择保险公司">
      <el-option label="保险公司1" value="shanghai"></el-option>
      <el-option label="保险公司2" value="beijing"></el-option>
    </el-select>
    <span style="margin-left:10px">委托人电话：</span>
    <el-input v-model="list.phone" placeholder="手机号码" style="width: 200px;"></el-input>
    <span style="margin-left:10px">车牌号码：</span>
    <el-input v-model="list.chepai" placeholder="车牌号码" style="width: 200px;"></el-input>
    <div style="margin-top:10px">
      日期选择：
      <el-date-picker
        v-model="list.value"
        type="datetimerange"
        range-separator="-"
        start-placeholder="委托开始日期"
        end-placeholder="委托结束日期"
      ></el-date-picker>
    </div>
    <div style="width:200px;margin-top:20px">
      <el-button type="primary" icon="el-icon-search">筛选</el-button>
    </div>
    <div style="margin-top:10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="wname" label="委托人姓名" width="150"></el-table-column>
        <el-table-column prop="wphone" label="委托人电话" width="120"></el-table-column>
        <el-table-column prop="shoubao" label="受保公司" width="160"></el-table-column>
        <el-table-column prop="chexing" label="品牌车型" width="120"></el-table-column>
        <el-table-column prop="chepaihao" label="车牌号" width="120"></el-table-column>
        <el-table-column prop="xian" label="投保险种" width="120"></el-table-column>
        <el-table-column prop="qian" label="保费金额" width="120"></el-table-column>
        <el-table-column prop="time" label="委托时间" width="120"></el-table-column>
        <el-table-column prop="zt" label="委托状态" width="120"></el-table-column>
        <el-table-column prop="xiang" label="委托详情" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="委托详情" :visible.sync="dialogFormVisible" center width="60%">
      <el-table :data="tableData1" style="width: 100%" >
        <el-table-column prop="date" label="委托人" fixed="left" width="120">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.date" v-show="scope.row.seen"
            ></el-input>
            <span style="margin-left: 10px" v-show="!scope.row.seen">{{ scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="意向人数" width="120"></el-table-column>
        <el-table-column prop="jiedan" label="接单人"></el-table-column>
        <el-table-column prop="chubao" label="出保公司"></el-table-column>
        <el-table-column prop="chepai" label="车牌号"></el-table-column>
        <el-table-column prop="shou" label="受保公司"></el-table-column>
        <el-table-column prop="chep" label="品牌车型"></el-table-column>
        <el-table-column prop="chengshi" label="投保城市"></el-table-column>
        <el-table-column prop="zhaung" label="委托状态"></el-table-column>
        <el-table-column prop="time" label="委托时间"></el-table-column>
        <el-table-column prop="qian" label="保费金额"></el-table-column>
        <el-table-column prop="fuwu" label="期望服务费"></el-table-column>
        <el-table-column prop="huan" label="还单金额"></el-table-column>
        <el-table-column prop="huantiam" label="还单时间"></el-table-column>
        <el-table-column prop="xianzhong" label="投保险种"></el-table-column>
        <el-table-column prop="beizhu" label="委托备注"></el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row, scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="save(scope.row)">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getentrust} from '../../api/api'
export default {
  name: "basetable",
  data() {
    return {
      list: {
        zhuangtai: "",
        baoxian: "",
        phone: "",
        chepai: "",
        value: ""
      },
      tableData: [
        {
          wname: "王小虎",
          wphone: "18645162100",
          shoubao: "平安保险",
          chexing: "奥迪",
          chepaihao: "湘A88888",
          xian: "商业险",
          qian: "5000",
          time: "2020-07-20",
          zt: "接单"
        },
        {
          wname: "王小虎",
          wphone: "18645162100",
          shoubao: "平安保险",
          chexing: "大众",
          chepaihao: "湘A99999",
          xian: "商业险",
          qian: "5000",
          time: "2020-07-20",
          zt: "接单"
        }
      ],
      tableData1: [
        {
          seen: false,
          date: "王小虎",
          number: "1",
          jiedan: "张飞",
          chubao: "大家保险",
          chepai: "湘A99999",
          shou: "平安保险",
          chep: "奥迪",
          chengshi: "湖南省长沙市雨花区",
          zhaung: "接单",
          time: "2020-07-20",
          qian: "5000",
          fuwu: "2500",
          huan: "2500",
          huantiam: "30天",
          xianzhong: "商业险",
          beizhu: "哈哈哈"
        }
      ],
      dialogFormVisible: false
    };
  },
  created() {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
    },
    edit(row, index) {
      row.seen = true;
    },
    save(row, index) {
      row.seen = false;
    }

  },
  mounted () {
    let cookie = this.common.getCookie(); //获取cookie
    let adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    getentrust({
      adminId : adminId
    }).then((res) => {
      console.log(res.data)
    })
    .catch((err) => console.log(err));
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
</style>
