import axios from 'axios';
// 角色列表
let list = (data) => axios.get('/role/list', { params: data })
// 删除角色
let remove = (id) => axios.delete(`/role/${id}`);
// 更新角色
let edit = (id, name) => axios.put(`/role/${id}`, { name });
// 添加角色
let insert = (data) => axios.post('/role', data);

export default {
	list,
	remove,
	edit,
	insert,
}
