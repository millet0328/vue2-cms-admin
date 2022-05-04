import axios from "axios";

//评论列表
const list = (params) => axios.get('/comment/recent', { params });

//回复评论
const reply = (data) => axios.post('/comment/reply', data);

export default {
    list,
    reply,
}