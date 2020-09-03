<template>
  <div class="table">
    <div style="display:flex;width:100%">
      <div>
        <span>委托状态：</span>
        <el-select v-model="list.entrustState" placeholder="委托状态">
          <el-option
            v-for="(item,index) in entrustState"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:10px">保险公司：</span>
        <el-select v-model="list.insuranceCompanyId" placeholder="选择保险公司">
          <el-option
            v-for="(item,index) in baoxian"
            :key="index"
            :label="item.insuranceCompanyName"
            :value="item.insuranceCompanyId"
          ></el-option>
        </el-select>
      </div>
      <div>
        <span style="margin-left:10px">委托人电话：</span>
        <el-input v-model="list.userPhone" placeholder="手机号码" style="width: 200px;"></el-input>
      </div>
    </div>
    <div style="display:flex;margin-top:10px;width:100%">
      <div>
        <span>车牌号码：</span>
        <el-input v-model="list.licensePlateNumber" placeholder="车牌号码" style="width: 200px;"></el-input>
      </div>
      <div style="margin-left:10px">
        <span>日期选择：</span>
        <el-date-picker
          v-model="list.startTime"
          type="date"
          placeholder="开始日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-
        <el-date-picker
          v-model="list.endTime"
          type="date"
          placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
    <div style="width:200px;margin-top:20px">
      <el-button type="primary" icon="el-icon-search" @click="shaixuan(list)">筛选</el-button>
    </div>
    <div style="margin-top:10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userName" label="委托人姓名" width="150"></el-table-column>
        <el-table-column prop="userPhone" label="委托人电话" width="120"></el-table-column>
        <el-table-column prop="insuranceCompanyName" label="受保公司" width="160"></el-table-column>
        <!-- <el-table-column prop="chexing" label="品牌车型" width="120"></el-table-column> -->
        <el-table-column prop="licensePlateNumber" label="车牌号" width="120"></el-table-column>
        <!-- <el-table-column prop="xian" label="投保险种" width="120"></el-table-column> -->
        <el-table-column prop="entrustMoney" label="保费金额(元)" width="120"></el-table-column>
        <el-table-column prop="entrustStartTime" label="委托时间" width="300"></el-table-column>
        <!-- <el-table-column prop="zt" label="委托状态" width="120"></el-table-column> -->
        <el-table-column prop="xiang" label="委托详情" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)" type="primary">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <!-- 弹窗 -->
    <el-dialog title="委托详情" :visible.sync="dialogFormVisible" center width="80%">
      <el-table :data="tableData1" style="width: 100%">
        <el-table-column prop="userName" label="委托人" fixed="left" width="120">
          <!-- <template slot-scope="scope">
            <el-input v-model="scope.row.userName" v-show="scope.row.zz"></el-input>
            <span style="margin-left: 10px" v-show="!scope.row.zz">{{ scope.row.userName}}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="newUserIdCount" label="意向人数" width="120"></el-table-column>
        <el-table-column prop="finallyUserId" label="接单人" :formatter="userTypeList"></el-table-column>
        <el-table-column prop="insuranceCompanyName" label="出保公司"></el-table-column>
        <el-table-column prop="licensePlateNumber" label="车牌号"></el-table-column>
        <el-table-column prop="newInsuranceCompanyName" label="受保公司"></el-table-column>
        <el-table-column prop="entrustCarBrand" label="品牌车型"></el-table-column>
        <el-table-column prop="entrustAddress" label="投保城市" width="150"></el-table-column>
        <el-table-column prop="entrustState" label="委托状态" :formatter="entruststate"></el-table-column>
        <el-table-column prop="entrustStartTime" label="委托时间" width="180"></el-table-column>
        <el-table-column prop="entrustMoney" label="保费金额"></el-table-column>
        <el-table-column prop="entrustServiceCharge" label="期望服务费" :formatter="Charge"></el-table-column>
        <el-table-column prop="entrustReturnMoney" label="还单金额"></el-table-column>
        <el-table-column prop="entrustReturnTime" label="还单时间（天）"></el-table-column>
        <el-table-column prop="entrustInsure" label="投保险种" width="150"></el-table-column>
        <el-table-column prop="entrustRemark" label="委托备注" :formatter="beizhu" width="200"></el-table-column>
        <!-- <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row, scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="save(scope.row)">保存</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getentrust, getentrustId, select, getscreenentrust } from '../../api/api'

export default {
  name: 'basetable',
  data () {
    return {
      list: {
        entrustState: '',
        insuranceCompanyId: '',
        userPhone: '',
        licensePlateNumber: '',
        startTime: '',
        endTime: ''
      },
      tableData: [],
      tableData1: [],
      dialogFormVisible: false,
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
      hidden: false,
      baoxian: [],
      entrustState: [
        { value: 0, label: '未接单' },
        { value: 1, label: '已接单' },
        { value: 2, label: '待确认完成' },
        { value: 3, label: '已完成' },
        { value: 4, label: '无人接单' },
        { value: 5, label: '已撤单' },
        { value: 6, label: '还单结束' }
      ]
    }
  },
  methods: {
    // 筛选功能
    shaixuan (val) {
      console.log(val)
      let data = val
      this.$set(data, 'adminId', this.adminId)
      getscreenentrust(data)
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.data
          this.total = res.data.count // 总条数
          this.pagesize = res.data.size // 每页显示多少条
          if (res.data.code == 200) {
            this.$notify({
              title: '成功',
              message: '查询成功',
              type: 'success'
            })
          }
        })
        .catch((err) => console.log(err))
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      let index = val
      getentrust({
        adminId: this.adminId,
        index: index
      })
        .then((res) => {
          console.log(res.data)
          this.tableData = res.data.data
          this.total = res.data.count // 总条数
          this.pagesize = res.data.size // 每页显示多少条
        })
        .catch((err) => console.log(err))
    },
    handleEdit (row) {
      // 打开弹窗
      this.dialogFormVisible = true
      let entrustId = row.entrustId
      console.log(entrustId)
      // 查看详情
      getentrustId({
        adminId: this.adminId,
        entrustId: entrustId
      })
        .then((res) => {
          // this.tableData1= res.data.data
          // console.log(this.tableData1)
          let arr = []
          arr.push(res.data.data)
          this.tableData1 = arr
          console.log(this.tableData1)
        })
        .catch((err) => console.log(err))
    },
    // edit(row, index) {
    //   row.zz = true;
    // },
    // save(row, index) {
    //   row.zz = false;
    // },
    // 判断
    userTypeList (row) {
      return row.finallyUserId == null ? '暂无接单人员' : row.finallyUserId
    },
    // 判断委托状态显示什么内容
    entruststate (row) {
      return row.entrustState == 0
        ? '未接单'
        : row.entrustState == 1
          ? '已接单'
          : row.entrustState == 2
            ? '待确认完成'
            : row.entrustState == 3
              ? '已完成'
              : row.entrustState == 4
                ? '无人接单'
                : row.entrustState == 5
                  ? '委托人已撤单'
                  : row.entrustState == 6
                    ? '还单结束'
                    : ''
    },
    // 判断服务费显示内容
    Charge (row) {
      return row.entrustServiceCharge == null
        ? '私下交易'
        : row.entrustServiceCharge
    },
    // 备注
    beizhu (row) {
      return row.entrustRemark == '' ? '无备注' : row.entrustRemark
    }
  },
  mounted () {
    let cookie = this.common.getCookie() // 获取cookie
    this.adminId = cookie.replace(/\"/g, '').split('#')[0] // 获取cookie下标为0的adminId
    getentrust({
      adminId: this.adminId,
      index: 1
    })
      .then((res) => {
        console.log(res.data)
        this.tableData = res.data.data
        this.total = res.data.count // 总条数
        this.pagesize = res.data.size // 每页显示多少条
      })
      .catch((err) => console.log(err))
    // 保险公司
    select()
      .then((res) => {
        this.baoxian = res.data.data
      })
      .catch((err) => console.log(err))
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
</style>
