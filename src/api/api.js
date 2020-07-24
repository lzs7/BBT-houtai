// import axios from 'axios';
// let baseUrl = '';
// export const getUserList = params => {
//         return axios.get(`${baseUrl}/user/list`, { params: params })
//     }
// export const getSysmenu = () => {
//     return axios.get('../../menu.json')
// }
// export const getDeleUser = params => {
//         return axios.get('user/deletUsers', { params: params });
//     }
// saveUser() {页面使用
//     let params = Object.assign({}, this.addUserForm);//data 里的对象
//     params.username = params.username.trim();
//     getAddUser(params).then(res => {
//       this.$message({
//         message: "添加成功",
//         type: "success"
//       });
//       this.addUserVisible = false;
//       this.addUserForm = {};
//       this.getUsers();
//     });
// export const getEditUser = params => {
//     return axios.get(`${baseUrl}/user/editUser`, {
//         params: params
//     })
// }
// export const getAddUser = params => {
//     return axios.get(`${baseUrl}/user/addUser`, {
//         params: params
//     })
// }
// export const getDeleteOne = params => {
//     return axios.get(`${baseUrl}/user/DeleteOne`, { params: params })
// }
// export const testApi = () => {
//     return axios.get("/testApi/getkeywhereisddata?CITY_NAME=全省&S_id=B08I00136&callback=")
// }

import http from '../utils/http'
// 

// @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...

let baseUrl = "http://localhost:8888"

// get请求
//登陆
export function getAdminLogin(params) {
    return http.get(`${baseUrl}/admin/getadminlogin`, params)
}
// post请求
export function postFormAPI(params) {
    return http.post(`${baseUrl}/postForm.json`, params)
}
//页面中
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