import axios from 'axios';

// 轮播图列表
let list = (params) => axios.get('/slide/list', { params })

// 添加轮播图
let insert = (data) => axios.post('/slide/add', data);

// 删除轮播图
let remove = (data) => axios.post('/slide/remove', data);

// 编辑轮播图
let edit = (data) => axios.post('/slide/edit', data);

// 启用/禁用幻灯片
let toggle = (data) => axios.post('/slide/usable', data);

export default {
    list,
    insert,
    remove,
    edit,
    toggle,
}