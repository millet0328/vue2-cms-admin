import axios from "axios";

//发布公告
const release = (data) => axios.post('/notice/release', data);

//公告列表
const list = (params) => axios.get('/notice/list', { params });

//公告详情
const detail = (params) => axios.get('/notice/detail', { params });

//编辑公告
const edit = (data) => axios.post('/notice/edit', data);

//置顶/取消置顶
const stick = (data) => axios.post('/notice/stick', data);

//删除公告
const remove = (data) => axios.post('/notice/remove', data);

export default {
    release,
    list,
    detail,
    edit,
    stick,
    remove,
}
