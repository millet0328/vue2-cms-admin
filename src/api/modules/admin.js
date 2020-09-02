import axios from 'axios';

// 管理员登陆
let login = (data) => axios.post('/admin/login', data);

// 管理员注册
let register = (data) => axios.post('/admin/register', data);

// 管理员列表
let list = (data) => axios.get('/admin/list', { params: data })

// 管理员资料
let info = (data) => axios.get('/admin/info', { params: data });

// 管理员编辑
let edit = (data) => axios.post('/admin/info', data);

export default {
	login,
	register,
	list,
	info,
	edit,
}
