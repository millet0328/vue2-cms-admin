import axios from 'axios';

// 普通用户列表
let list = (data) => axios.get('/user/list', { params: data })
// 删除用户
let remove = (id) => axios.delete(`/user/${id}`);
// 获取用户资料
let profile = (data) => axios.get('/user', { params: data });
// 编辑资料
let edit = (id, data) => axios.put(`/user/${id}`, data);

export default {
	list,
	remove,
	profile,
	edit,
}
