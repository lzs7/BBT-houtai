import http from '../utils/http'
let baseUrl = '/api'
    // get请求
    // 登陆
export function getAdminLogin(params) {
    return http.get(`${baseUrl}/admin/getadminlogin`, params)
}
// 查询个人信息
export function getadminparticulars(params) {
    return http.get(`${baseUrl}/admin/getadminparticulars`, params)
}
// 修改个人资料
export function putAdminParticulars(params) {
    return http.get(`${baseUrl}/admin/putadminparticulars`, params)
}
// 查询总委托人数 总委托数 今天注册人数 当天发布委托人数
export function getadmindata(params) {
    return http.get(`${baseUrl}/admin/getadmindata`, params)
}
// 查询所有身份的方法
export function getadminrole(params) {
    return http.get(`${baseUrl}/admin/getadminrole`, params)
}
// 添加新管理员
export function postadmin(params) {
    return http.post(`${baseUrl}/admin/postadmin`, params)
}
// 超级管理员查看所有管理员 getadministration
export function getadministration(params) {
    return http.get(`${baseUrl}/admin/getadministration`, params)
}
// 超级管理员修改管理员的信息putadministratormessage
export function putadministratormessage(params) {
    return http.get(`${baseUrl}/admin/putadministratormessage`, params)
}
// 退出登录
export function exit(params) {
    return http.get(`${baseUrl}/admin/exit`, params)
}
// 用户注册审核getnewuser
export function getnewuser(params) {
    return http.get(`${baseUrl}/admin/getnewuser`, params)
}
// 委托监控 getentrust
export function getentrust(params) {
    return http.get(`${baseUrl}/admin/getentrust`, params)
}
// 用户注册审核  确认按钮 getlogincheck
export function getlogincheck(params) {
    return http.get(`${baseUrl}/admin/getlogincheck`, params)
}
// 查看用户注册详情 getuser
export function getuser(params) {
    return http.get(`${baseUrl}/admin/getuser`, params)
}
// 查询保险公司
export function select(params) {
    return http.get(`${baseUrl}/insurance/select`, params)
}
// 查看委托详情 getentrustId
export function getentrustId(params) {
    return http.get(`${baseUrl}/admin/getentrustId`, params)
}
// 查询和豆申请数据 getallbeans
export function getallbeans(params) {
    return http.get(`${baseUrl}/admin/getallbeans`, params)
}
// 处理和豆申请的方法 getcheckbeans
export function getcheckbeans(params) {
    return http.get(`${baseUrl}/admin/getcheckbeans`, params)
}
// 查询消费卡申请 getallconsume
export function getallconsume(params) {
    return http.get(`${baseUrl}/admin/getallconsume`, params)
}
// 处理消费卡的方法 getcheckconsume
export function getcheckconsume(params) {
    return http.get(`${baseUrl}/admin/getcheckconsume`, params)
}
// 筛选委托的方法 getscreenentrust
export function getscreenentrust(params) {
    return http.get(`${baseUrl}/admin/getscreenentrust`, params)
}
//查询所有台账、
export function getsumdaily(params) {
    return http.get(`${baseUrl}/djledger/getsumdaily`, params)
}
//查询对应月份的台账 getmonth
export function getmonth(params) {
    return http.get(`${baseUrl}/djledger/getmonth`, params)
}
//查询对应时间段 部门 代理人的台账 getsumselect
export function getsumselect(params) {
    return http.get(`${baseUrl}/djledger/getsumselect`, params)
}
//查询所有部门 getdepartment
export function getdepartment(params) {
    return http.get(`${baseUrl}/djledger/getdepartment`, params)
}
//查询所有代理人 getagent
export function getagent(params) {
    return http.get(`${baseUrl}/djledger/getagent`, params)
}
//管理查询 个人的保单信息 可以通过车牌号和用户的姓名查询
export function getsearchmessage(params) {
    return http.get(`${baseUrl}/djledger/getsearchmessage`, params)
}
// 页面中
// import {getListAPI,postFormAPI, putSomeAPI, deleteListAPI} from '@/api/api'

//   methods: {
//       //promise调用，链式调用
//       //   不传参
//       getList() {
//         getListAPI().then(res => console.log(res)).catch(err => console.log(err))
//       },
// 		//传参
//       getList(formData) {
//         let data = formData
//         getListAPI(data).then(res => console.log(res)).catch(err => console.log(err))
//       }

//     }