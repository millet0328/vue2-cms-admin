import axios from 'axios';

// 管理员登陆
let login = (data) => axios.post('/admin/login', data);

// 管理员注册
let register = (data) => axios.post('/admin/register', data);

// 管理员列表


export default {
	login,
	register
}
