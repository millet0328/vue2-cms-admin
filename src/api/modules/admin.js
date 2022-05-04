import axios from 'axios';

// 管理员登陆
let login = (data) => axios.post('/admin/login', data);

// 管理员注册
let register = (data) => axios.post('/admin/register', data);

// 管理员列表
let list = (params) => axios.get('/admin/list', { params })

// 管理员资料
let info = (params) => axios.get('/admin/info', { params });

// 管理员编辑
let edit = (data) => axios.post('/admin/info', data);

// 管理员删除
let remove = (data) => axios.post('/admin/remove', data);

// 管理员账户修改
let account = (data) => axios.post('/admin/account', data);

export default {
    login,
    register,
    list,
    info,
    edit,
    remove,
    account,
}
