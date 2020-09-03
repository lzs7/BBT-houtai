<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <el-dialog title="密码修改" :visible.sync="isShow" v-dialogDrag :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input v-model="form.adminPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
            <el-input show-password v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDailog">取 消</el-button>
        <el-button type="primary" @click="hideDailog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import vTags from './Tags.vue'
import bus from './bus'
import { mapGetters, mapActions } from 'vuex'

import { getadminparticulars } from '../../api/api'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false,
      form: {
        adminPassword: '',
        newPassword: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters('dailog', {
      isShow: 'isShow'
    })
  },
  methods: {
    ...mapActions('dailog', ['hideDailog', 'showDailog']),
    handleClose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.hideDailog()
          // this.$store.dispatch('dailog/hideDailog')
        }).bind(this)
        .catch(_ => {})
    }
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
    // let cookie = this.common.getCookie(); //获取cookie
    // this.adminId = cookie.replace(/\"/g, "").split("#")[0]; //获取cookie下标为0的adminId
    // console.log(this.adminId);
    // getadminparticulars({
    //   adminId: this.adminId,
    // })
    //   .then((res) => {
    //     let list = res.data.data;
    //     this.form={
    //      adminPassword:list.adminPassword,//当前密码
    //       newPassword:list.newPassword//新密码
    //     }
    //     console.log(this.form)
    //     this.adminRoleId = this.list.adminRoleId;
    //   })
    //   .catch((err) => console.log(err));
  }
}
</script>
<style scoped>
  .content{
        background-color: #f0f2f5;
  }
</style>
