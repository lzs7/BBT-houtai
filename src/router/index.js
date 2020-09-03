import Vue from 'vue'
import Router from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: { title: '自述文件' },
    children: [{
      path: '/dashboard',
      component: resolve => require(['../components/page/Dashboard.vue'], resolve),
      meta: { title: '系统首页' }
    },
    {
      path: '/hedou',
      component: resolve => require(['../components/page/Hedou.vue'], resolve),
      meta: { title: '和豆申请' }
    },
    {
      path: '/table',
      component: resolve => require(['../components/page/BaseTable.vue'], resolve),
      meta: { title: '委托监控' }
    },
    {
      path: '/administrators',
      component: resolve => require(['../components/page/administrators.vue'], resolve),
      meta: { title: '人员管理' }
    },
    {
      path: '/tabs',
      component: resolve => require(['../components/page/Tabs.vue'], resolve),
      meta: { title: '用户注册审核' }
    },
    {
      path: '/form',
      component: resolve => require(['../components/page/BaseForm.vue'], resolve),
      meta: { title: '基本表单' }
    },
    {
      path: '/tree1',
      component: resolve => require(['../components/page/tree1.vue'], resolve),
      meta: { title: '基本树' }
    },
    {
      path: '/tree2',
      component: resolve => require(['../components/page/tree2.vue'], resolve),
      meta: { title: '可选择树' }
    },
    {
      path: '/tree3',
      component: resolve => require(['../components/page/tree3.vue'], resolve),
      meta: { title: '可编辑树' }
    },
    {
      // 富文本编辑器组件
      path: '/tree4',
      component: resolve => require(['../components/page/tree4.vue'], resolve),
      meta: { title: '可查询树' }
    },
    {
      // 富文本编辑器组件
      path: '/tree5',
      component: resolve => require(['../components/page/tree5.vue'], resolve),
      meta: { title: '节点选择' }
    },
    {
      // 富文本编辑器组件
      path: '/editor',
      component: resolve => require(['../components/page/VueEditor.vue'], resolve),
      meta: { title: '富文本编辑器' }
    },
    {
      // markdown组件
      path: '/markdown',
      component: resolve => require(['../components/page/Markdown.vue'], resolve),
      meta: { title: 'markdown编辑器' }
    },
    {
      // 图片上传组件
      path: '/upload',
      component: resolve => require(['../components/page/Upload.vue'], resolve),
      meta: { title: '文件上传' }
    },
    {
      // vue-schart组件
      path: '/Consumer',
      component: resolve => require(['../components/page/Consumer.vue'], resolve),
      meta: { title: '消费卡申请' }
    },
    {
      path: '/StandingBook',
      component: resolve => require(['../components/page/StandingBook.vue'], resolve),
      meta: { title: '台账管理' }
    },
    {
      // 拖拽列表组件
      path: '/drag',
      component: resolve => require(['../components/page/DragList.vue'], resolve),
      meta: { title: '拖拽列表' }
    },
    {
      // 拖拽Dialog组件
      path: '/dialog',
      component: resolve => require(['../components/page/DragDialog.vue'], resolve),
      meta: { title: '拖拽弹框' }
    },
    {
      // 权限页面
      path: '/permission',
      component: resolve => require(['../components/page/Permission.vue'], resolve),
      meta: { title: '权限测试', permission: true }
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve),
      meta: { title: '404' }
    },
    {
      path: '/403',
      component: resolve => require(['../components/page/403.vue'], resolve),
      meta: { title: '403' }
    },
    {
      path: '/admin',
      component: resolve => require(['../components/page/admin.vue'], resolve),
      meta: { title: '用户信息' }
    }
      // {
      //     path: '/usermanager',
      //     component: resolve => require(['../components/page/sysmanager/usermanager.vue'], resolve),
      //     meta: { title: '用户管理' }
      // }
    ]
  },
  {
    path: '/login',
    component: resolve => require(['../components/page/Login.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/404'
  }
  ]
})
