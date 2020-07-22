import axios from 'axios';
let baseUrl = '';
export const getUserList = params => {
        return axios.get(`${baseUrl}/user/list`, { params: params })
    }
    // export const getSysmenu = () => {
    //     return axios.get('../../menu.json')
    // }
export const getDeleUser = params => {
        return axios.get('user/deletUsers', { params: params });
    }
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
export const getEditUser = params => {
    return axios.get(`${baseUrl}/user/editUser`, {
        params: params
    })
}
export const getAddUser = params => {
    return axios.get(`${baseUrl}/user/addUser`, {
        params: params
    })
}
export const getDeleteOne = params => {
    return axios.get(`${baseUrl}/user/DeleteOne`, { params: params })
}
export const testApi = () => {
    return axios.get("/testApi/getkeywhereisddata?CITY_NAME=全省&S_id=B08I00136&callback=")
}