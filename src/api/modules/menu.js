import axios from 'axios';

// 加载下一级菜单
const submenu = (params) => axios.get('/menu/sub', { params });

// 添加菜单
const insert = (formData) => axios.post('/menu', formData);

// 更新菜单
const update = (id, formData) => axios.put(`/menu/${id}`, formData);

// 删除菜单
const remove = (id, params) => axios.delete(`/menu/${id}`, { params });

// 设置菜单icon
const setIcon = (id, formData) => axios.put(`/menu/icon/${id}`, formData);

// 所有菜单
let loadAll = (params) => axios.get('/menu/all', { params });

export default {
	loadAll,
	submenu,
	insert,
	update,
	remove,
	setIcon,
}
