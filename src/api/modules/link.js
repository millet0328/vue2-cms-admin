import axios from 'axios';

// 友情链接列表
let list = (params) => axios.get('/link/list', { params })

// 添加友情链接
let insert = (data) => axios.post('/link/', data);

// 删除友情链接
let remove = (id, params) => axios.delete(`/link/${id}`, { params });

// 编辑友情链接
let edit = (id, data) => axios.put(`/link/${id}`, data);

// 启用/禁用友情链接
let toggle = (data) => axios.post('/slide/usable', data);

export default {
    list,
    insert,
    remove,
    edit,
    toggle,
}