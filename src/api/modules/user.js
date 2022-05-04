import axios from 'axios';

// 普通用户列表
let list = (params) => axios.get('/user/list', { params })

// 删除用户
let remove = (data) => axios.post('/user/remove', data);

// 启用/禁用用户
let toggle = (data) => axios.post('/user/usable', data);

export default {
	list,
	remove,
	toggle,
}
