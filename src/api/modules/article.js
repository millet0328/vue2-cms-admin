import axios from 'axios';

// 文章列表
let list = (data) => axios.get('/article/list', { params: data });

// 发布文章
let release = (data) => axios.post('/article/add', data);

// 删除文章
let remove = (data) => axios.post('/article/delete', data);

// 编辑文章
let edit = (data) => axios.post('/article/edit', data);

// 获取文章详情
let detail = (data) => axios.get('/article/detail', { params: data });

export default {
	list,
	release,
	remove,
	edit,
	detail,
}
